package org.browseright.api.category

import org.browseright.*
import org.browseright.api.*

class TeacherInterfaceService {
    // http://localhost:8080/BrowseRight/api/teacher/create?firstName=Chris&lastName=Kuehl&email=chris%40techxonline.net&password=w00df0rd
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
}
