package org.browseright

class Question {
    static constraints = {
    
    }
    
    static hasMany = [incorrectAnswers: String]
    
    String text
    String correctAnswer
}