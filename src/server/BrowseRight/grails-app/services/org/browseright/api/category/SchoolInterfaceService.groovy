package org.browseright.api.category

import org.browseright.*

class SchoolInterfaceService {
    // TODO: require a teacher to be authenticated in order to create a new school
    // and check tha they aren't already a member of a different school
    def _create = { response, action, params, user, request ->
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