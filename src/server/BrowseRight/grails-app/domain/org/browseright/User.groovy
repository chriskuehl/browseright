package org.browseright

abstract class User {
    def hashingService
    
    static mapping = { 
        tablePerHierarchy false
    }
    
    static constraints = {
        firstName(size: 1..255, nullable: false, blank: false)
        lastName(size: 1..255, nullable: false, blank: false)
	email(email: true, unique: true)
	school(nullable: true)
	lastPasswordChangeTime(nullable: true)
    }
    
    static transients = ["hashingService"]
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
    
    def passwordMatches(def password) {
	hashingService.matches(passwordHash, password)
    }
    
    def setLastSeen(request) {
	if (request != null) {
	    lastSeenIP = request.getHeader("X-Forwarded-For") ? request.getHeader("X-Forwarded-For") : "none"
	    lastSeenUserAgent = request.getHeader("User-Agent") ? request.getHeader("User-Agent") : "none"
	} else {
	    lastSeenIP = "none"
	    lastSeenUserAgent = "none"
	}
	
	lastSeenTime = new Date()
    }
    
    def setRegistration(request) {
	if (request != null) {
	    registerIP = request.getHeader("X-Forwarded-For") ? request.getHeader("X-Forwarded-For") : "none"
	    registerUserAgent = request.getHeader("User-Agent") ? request.getHeader("User-Agent") : "none"
	} else {
	    registerIP = "none"
	    registerUserAgent = "none"
	}
	
	registerTime = new Date()
    }
}