package org.browseright

class QuizAttempt {
    final static int QUIZ = 0
    final static int REVIEW = 1
    
    static constraints = {
	
    }
    
    static transients = ["numberCorrect"]
    static belongsTo = [student: Student]
    static hasMany = [questions: QuestionAttempt]
    
    Quiz quiz
    Student student
    int quizType
    
    int getNumberCorrect() {
		int correct = 0
	
		questions.each { question ->
			if (question.isCorrect()) {
				correct ++
			}
		}
	
		correct
    }
    
    double getPercentCorrect() {
        if (questions == null || questions.size() <= 0) {
			return 0 // infinity
        }
        
        ((double) getNumberCorrect()) / ((double) questions.size())
    }
}