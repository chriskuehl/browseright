package org.browseright

class Student extends User {
    static constraints = {
	progressCache (nullable: true)
    }
    
    static hasMany = [quizAttempts: QuizAttempt]
    
    ProgressCache progressCache
}