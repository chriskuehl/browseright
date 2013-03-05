package org.browseright

class UserSession {
    static constraints = {
	lastSeenIP(nullable: true)
	lastSeenTime(nullable: true)
	lastSeenUserAgent(nullable: true)
	lastSeenURL(nullable: true)
    }
    
    User user
    String sessionTokenHash

    // last seen info
    String lastSeenIP
    Date lastSeenTime
    String lastSeenUserAgent
    String lastSeenURL
}
