package org.browseright.api.category

import org.browseright.*
import org.browseright.api.*

class StudentInterfaceService {
    // http://localhost:8080/BrowseRight/api/student/create?firstName=Chris&lastName=Kuehl&email=chris%40techxonline.net&password=w00df0rd
    def create = { response, action, params, user, request ->
        def firstName = params.firstName
	def lastName = params.lastName
	def email = params.email
	def password = params.password
	
	if (password.length() < 5) {
	    response.apiCode = AppInterface.codes.MISSING_BAD_PARAMS
	    response.error = "Please use a password with at least five characters."
	    return
	}
	
	def student = new Student(firstName: firstName, lastName: lastName, email: email)
	
	student.setPassword(password)
	student.setLastSeen(request)
	student.setRegistration(request)
	
	if (! student.validate()) {
	    response.apiCode = AppInterface.codes.MISSING_BAD_PARAMS
	    response.error = "Please use valid information to sign up."
	} else {
	    student.save()
	}
    }
    
    def setSchool = { response, action, params, user, request ->
    
    }
}
