package org.browseright

class Question {
    static constraints = {
		text(minSize: 1)
		correctAnswer(minSize: 1)
    }
    
    static hasMany = [incorrectAnswers: String]
    static belongsTo = [quiz: Quiz]
    
    String text
    String correctAnswer
}