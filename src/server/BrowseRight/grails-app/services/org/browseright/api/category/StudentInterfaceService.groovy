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
    
    def setSchool = { response, action, params, user, request ->
    
    }
}
