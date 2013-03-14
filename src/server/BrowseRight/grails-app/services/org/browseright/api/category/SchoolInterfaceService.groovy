package org.browseright.api.category

import org.browseright.*
import org.browseright.api.*

class SchoolInterfaceService {
    def _create = { response, action, params, user, request ->
        if (! user.isTeacher()) {
            response.apiCode = AppInterface.codes.UNABLE_TO_PERFORM_ACTION
            response.error = "BAD_USER_TYPE"
            return
        }
        
        if (user.school != null) {
            response.apiCode = AppInterface.codes.UNABLE_TO_PERFORM_ACTION
            response.error = "ALREADY_IN_SCHOOL"
            return
        }
        
        def name = params.name
    
        def street = params.street
        def city = params.city
        def zipCode = params.zipCode

        def helpEmail = params.helpEmail
        
        def school = new School(name: name, helpEmail: helpEmail)
        
        school.setLocation(street, city, zipCode)
        school.generateNewRegisterCode()
        
        if (! school.validate()) {
	    response.apiCode = AppInterface.codes.MISSING_BAD_PARAMS
	    response.error = "UNKNOWN"
            
            school.errors.allErrors.each { error ->
                response.error = "${error.field}_${error.codes[-1]}".toUpperCase()
            }
	} else {
            school.addToTeachers(user)
	    school.save()
	}
    }
    
    def list = { response, action, params, user, request ->
        def schools = []
        
        School.findAll().each { school ->
            schools.add([
                    id: school.id,
                    name: school.name,
                    street: school.street,
                    city: school.city,
                    zipCode: school.zipCode,
                    state: school.state,
                    latitude: school.latitude,
                    longitude: school.longitude
            ])
        }
        
        response.schools = schools
    }
}