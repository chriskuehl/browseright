package org.browseright

class ProgressCache {
    static constraints = {
		bestScores(nullable: false)
    }
	static belongsTo = [student: Student]
	
	Map bestScores
	
	def recalculateProgress() {
		bestScores = [:]
		
		Quiz.findAll().each { quiz ->
			def uid = quiz.getFullUID()
			def bestScore = calculateBestScore(quiz)
			def passed = (bestScore >= student.school.quizPassThreshold)
			
			println "Best attempt (\"$uid\" (${quiz.id})): score=$bestScore passed=$passed"
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