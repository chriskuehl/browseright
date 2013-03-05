package org.browseright

class Quiz {
    static constraints = {
	
    }
    
    static hasMany = [questions: Question]
    
    int questionsToShow
}