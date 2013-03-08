package org.browseright.api.category

import org.browseright.*
import org.browseright.api.*

class TeacherInterfaceService {
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
	
	def teacher = new Teacher(firstName: firstName, lastName: lastName, email: email)
	
	teacher.setPassword(password)
	teacher.setLastSeen(request)
	teacher.setRegistration(request)
	
	if (! teacher.validate()) {
	    response.apiCode = AppInterface.codes.MISSING_BAD_PARAMS
	    response.error = "UNKNOWN"
            
            teacher.errors.allErrors.each { error ->
                response.error = "${error.field}_${error.codes[-1]}".toUpperCase()
            }
	} else {
	    teacher.save()
	}
    }
    
    def login = { response, action, params, user, request ->
	def email = params.email
	def password = params.password
	
	def teacher = Teacher.findByEmail(email)
	
	if (teacher == null) {
	    response.apiCode = AppInterface.codes.BAD_LOGIN_INFO
	    response.error = "EMAIL"
	    
	    return
	}
	
	if (! teacher.passwordMatches(password)) {
	    response.apiCode = AppInterface.codes.BAD_LOGIN_INFO
	    response.error = "PASSWORD"
	    
	    return
	}
	
	def token = teacher.getSessionToken(request)
	teacher.save()
	
	response.token = token
    }
}