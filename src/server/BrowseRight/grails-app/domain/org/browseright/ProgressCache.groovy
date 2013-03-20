package org.browseright

class ProgressCache {
    static constraints = {
		quizzes(nullable: false, cascade: "all")
    }
	static belongsTo = [student: Student]
	static hasMany = [quizzes: QuizScore]
	
	Map quizzes = [:]
	
	def recalculateProgress() {
		Quiz.findAll().each { quiz ->
			def uid = quiz.getFullUID()
			def bestScore = calculateBestScore(quiz)
			
			if (bestScore != null) {
				def passed = (bestScore >= student.school.quizPassThreshold)
				quizzes[uid] = new QuizScore(score: bestScore, passed: passed, cache: this)
				
				println "Best attempt (\"$uid\" (${quiz.id})): score=$bestScore passed=$passed"
			} else {
				println "No attempt found for \"$uid\" (${quiz.id})"
			}
		}
	}
	
	def calculateBestScore(quiz) {
		def attempts = QuizAttempt.where {
			student == student
			quiz == quiz
		}.list(sort: "percentCorrect", order: "desc", max: 1)
		
		if (attempts.size() <= 0) {
			return null
		} else {
			return attempts[0].percentCorrect
		}
	}
}