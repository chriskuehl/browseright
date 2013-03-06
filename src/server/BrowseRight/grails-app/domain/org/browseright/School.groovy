package org.browseright

class School {
    def schoolService
    
    static constraints = {
	registerCode(unique: true)
	helpEmail(email: true)
	announcementText(maxSize: 8192)
	helpText(maxSize: 8192)
    }
    
    static transients = ["schoolService"]
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
    
    def setLocation(def street, def city, def zipCode, def state) {
        // TODO: find latitude and longitude for location
        this.street = street
        this.city = city
        this.zipCode = zipCode
        this.state = state
    }
    
    def updateProgress() {
        // TODO: update progress caches for all students
    }
    
    def generateNewRegisterCode() {
        registerCode = schoolService.generateUnqiueCode()
    }
    
    def addStudent(Student student) {
        students.add(student)
    }
    
    def addTeacher(Teacher teacher) {
        teachers.add(teacher)
    }
}