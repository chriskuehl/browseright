package org.browseright

class Student extends User {
    static constraints = {
	
    }
    
    ProgressCache progressCache
    List<QuizAttempt> quizAttempts
}