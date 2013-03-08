package org.browseright

class UserService {
    def getUserForSessionToken(def token) {
	def session = UserSession.findByToken(token)
	session ? session.user : null
    }
}