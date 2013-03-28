package org.browseright.api.category

import org.browseright.*
import org.browseright.api.*

class StudentInterfaceService {
    def create = { response, action, params, user, request ->
        def firstName = params.firstName
		def lastName = params.lastName
		def email = params.email
		def password = params.password
	
		if (password.length() < 5) {
			response.apiCode = AppInterface.codes.MISSING_BAD_PARAMS
			response.error = "PASSWORD_SIZE.TOOSMALL"
			return
		}
	
		def student = new Student(firstName: firstName, lastName: lastName, email: email)
	
		student.setPassword(password)
		student.setLastSeen(request)
		student.setRegistration(request)
	
		if (! student.validate()) {
			response.apiCode = AppInterface.codes.MISSING_BAD_PARAMS
			response.error = "UNKNOWN"
            
            student.errors.allErrors.each { error ->
                response.error = "${error.field}_${error.codes[-1]}".toUpperCase()
            }
		} else {
			student.save()
		}
    }
    
    def login = { response, action, params, user, request ->
		def email = params.email
		
		// special exceptions when demoing
		if (email == "demo") {
			// create a new user
			def newEmail = "demo" + Math.floor(Math.random() * 100000) + "@browseright.org"			
			def student = new Student(firstName: "Demo", lastName: "User", email: newEmail)
			
			student.setPassword("demo")
			student.setLastSeen(request)
			student.setRegistration(request)
			
			student.save(flush: true)
			
			// add to the first school
			def school = School.findAll()[0]
            school.addToStudents(student)
			school.save(flush: true)
			
			// proceed with login
			email = newEmail
			params.password = "demo"
		}
		
		def password = params.password
	
		def student = Student.findByEmail(email)
	
		if (student == null) {
			response.apiCode = AppInterface.codes.BAD_LOGIN_INFO
			response.error = "EMAIL"
	    
			return
		}
	
		if (! student.passwordMatches(password)) {
			response.apiCode = AppInterface.codes.BAD_LOGIN_INFO
			response.error = "PASSWORD"
	    
			return
		}
	
		def token = student.getSessionToken(request)
		student.save()
	
		response.token = token
    }
	
	def updateProgress = { response, action, params, user, request ->
		user.updateProgress()
		user.save()
	}
}