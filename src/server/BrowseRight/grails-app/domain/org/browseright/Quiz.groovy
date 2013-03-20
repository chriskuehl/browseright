package org.browseright

class Quiz extends SectionItem {
    static hasMany = [questions: Question]
	
    int questionsToShow
}