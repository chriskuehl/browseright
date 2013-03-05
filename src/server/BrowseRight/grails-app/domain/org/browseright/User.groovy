package org.browseright

abstract class User {
    def hashingService
    
    static constraints = {
	email(email: true, unique: true)
	school(nullable: true)
	lastPasswordChangeTime(nullable: true)
    }
    
    static hasMany = [sessions: UserSession]
    
    // basic user properties
    String firstName
    String lastName
    String email
    String passwordHash
    Date lastPasswordChangeTime
    
    // registration
    String registerIP
    String registerUserAgent
    Date registerTime

    // last seen
    String lastSeenIP
    String lastSeenUserAgent
    Date lastSeenTime

    // BR-specific stuff
    School school
    
    def setPassword(def password) {
	passwordHash = hashingService.hash(password)
    }
    
    def setLastSeen(request) {
	lastSeenIP = request.getHeader("X-Forwarded-For") ? request.getHeader("X-Forwarded-For") : "none"
	lastSeenUserAgent = request.getHeader("User-Agent") ? request.getHeader("User-Agent") : "none"
	lastSeenTime = new Date()
    }
    
    def setRegistration(request) {
	registerIP = request.getHeader("X-Forwarded-For") ? request.getHeader("X-Forwarded-For") : "none"
	registerUserAgent = request.getHeader("User-Agent") ? request.getHeader("User-Agent") : "none"
	registerTime = new Date()
    }
}