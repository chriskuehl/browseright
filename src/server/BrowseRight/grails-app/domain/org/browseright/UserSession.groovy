package org.browseright

class UserSession {
    def hashingService
    
    static constraints = {
	lastSeenIP(nullable: true)
	lastSeenTime(nullable: true)
	lastSeenUserAgent(nullable: true)
	token(size: 255..255)
    }
    
    static belongsTo = [user: User]
    static transients = ["hashingService"]
    
    User user
    String token

    // last seen info
    String lastSeenIP
    Date lastSeenTime
    String lastSeenUserAgent
    
    def generateNewToken() {
        def chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#%^&*()-=+_[]{}|,./?><`~"
	def str = ""
        
        (0..254).each {
            str += chars.charAt((int) Math.floor(Math.random() * chars.size()))
        }
	
	// TODO: session tokens are basically password equivalents, so they get
	// hashed like passwords
	token = str
        
	// return the non-hashed token, which is then given to the user
        str
    }
    
    def setLastSeen(request) {
	if (request != null) {
	    lastSeenIP = request.getHeader("X-Forwarded-For") ? request.getHeader("X-Forwarded-For") : request.getRemoteAddr()
	    lastSeenUserAgent = request.getHeader("User-Agent") ? request.getHeader("User-Agent") : "none"
	} else {
	    lastSeenIP = "none"
	    lastSeenUserAgent = "none"
	}
	
	lastSeenTime = new Date()
    }
}
