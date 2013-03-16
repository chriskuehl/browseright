package org.browseright

class Quiz extends SectionItem {
    static constraints = {
	
    }
    
    static belongsTo = [section: Section]
    static hasMany = [questions: Question]
    
    int questionsToShow
}