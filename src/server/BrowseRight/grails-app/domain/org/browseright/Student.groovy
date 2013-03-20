package org.browseright

class Student extends User {
    static constraints = {
	progressCache (nullable: true)
    }
    
    static hasMany = [quizAttempts: QuizAttempt]
    
    ProgressCache progressCache
    
    def isStudent() {
        true
    }
	
	def updateProgress() {
		if (progressCache != null) {
			progressCache.delete()
		}
		
		def cache = new ProgressCache(student: this)
		cache.recalculateProgress()
		
		progressCache = cache
	}
}