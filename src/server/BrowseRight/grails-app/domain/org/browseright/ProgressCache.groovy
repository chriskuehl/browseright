package org.browseright

class ProgressCache {
    static constraints = {
		quizzes(nullable: false, cascade: "all")
    }
	static belongsTo = [student: Student]
	static hasMany = [quizzes: QuizScore]
	
	double totalProgress = 0
	Map categories = [:]
	Map quizzes = [:]
	
	def recalculateProgress() {
		// calculate best score for each quiz
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
		
		// calculate progress for each category
		def sum = 0
		def n = 0	
		
		org.browseright.Category.findAll().each { category ->
			sum += calculateProgressForCategory(category)
			n ++
		}
		
		totalProgress = (sum / n)
		println "Total progress: ${totalProgress}"
	}
	
	def calculateProgressForCategory(category) {
		// get a list of quizzes for the category
		def quizzes = []
		
		category.sections.findAll().each { section ->
			section.items.findAll().each { item ->
				if (item instanceof Quiz) {
					quizzes.add(item)
				}
			}
		}
		
		// see how many quizzes they've passed
		def passed = 0
		
		quizzes.each { quiz ->
			def uid = quiz.getFullUID()
			
			if (hasCompletedQuiz(uid)) {
				passed ++
			}
		}
		
		def percent = quizzes.size() <= 0 ? 0 : (passed / quizzes.size())
		categories[category.uid] = percent.toString()
		
		println "Category progress ($category): ${passed}/${quizzes.size()} (${percent * 100}%)"

		return percent
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
	
	def hasCompletedQuiz(quiz) {
		if (! quizzes[quiz]) {
			return false
		}
		
		return quizzes[quiz].passed
	}
}