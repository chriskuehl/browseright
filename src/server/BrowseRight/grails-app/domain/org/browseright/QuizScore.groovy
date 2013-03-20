package org.browseright

class QuizScore {
	static constraints = {
		cache(nullable: true)
	}
	static belongsTo = [cache: ProgressCache]
	
	double score
	boolean passed
}