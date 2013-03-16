package org.browseright

class Question {
    static constraints = {
    
    }
    
    static hasMany = [incorrectAnswers: String]
    static belongsTo = [quiz: Quiz]
    
    String text
    String correctAnswer
}