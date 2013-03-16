package org.browseright

class Quiz {
    static constraints = {
	
    }
    
    static belongsTo = [section: Section]
    static hasMany = [questions: Question]
    
    int questionsToShow
}