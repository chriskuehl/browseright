package org.browseright

abstract class User {
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
}