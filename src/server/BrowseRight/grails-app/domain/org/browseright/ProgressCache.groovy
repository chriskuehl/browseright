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
			println uid
		}
	}
}