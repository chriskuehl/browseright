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
    
    def _joinSchool = { response, action, params, user, request ->
        if (user.school != null) {
            response.apiCode = AppInterface.codes.UNABLE_TO_PERFORM_ACTION
            response.error = "ALREADY_IN_SCHOOL"
            return
        }
    }
    
    def _leaveSchool = { response, action, params, user, request ->
        
    }
}