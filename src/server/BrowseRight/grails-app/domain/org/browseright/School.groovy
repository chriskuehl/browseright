package org.browseright

class School {
    static constraints = {
	registerCode(unique: true)
	helpEmail(email: true)
    }
    
    static hasMany = [teachers: Teacher, students: Student, requiredCategories: Category]
    
    String name
    
    String street
    String city
    String zipCode
    String state
    double latitude
    double longitude
    
    String registerCode
    
    double quizPassThreshold = 0.7
    double reviewPassThreshold = 0.8
    int questionsPerReview = 5
    
    String helpEmail
    String announcementText = "Welcome to BrowseRight!"
    String helpText = "For help, please contact your school."
}