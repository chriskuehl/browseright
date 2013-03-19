package org.browseright

class QuestionAttempt {
    static constraints = {
	
    }
    
    static belongsTo = [quiz: QuizAttempt]
    static hasMany = [notSelectedAnswers: QuestionAttemptAnswer]
    static transients = ["correct"]
    
    
    QuestionAttemptAnswer selectedAnswer
    
    boolean isCorrect() {
	selectedAnswer.correct
    }
}