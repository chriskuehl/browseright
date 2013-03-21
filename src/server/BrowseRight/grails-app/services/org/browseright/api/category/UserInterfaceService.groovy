package org.browseright.api.category

import org.browseright.*
import org.browseright.api.*

class UserInterfaceService {
    def _info = { response, action, params, user, request ->
        def info = [
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			lastPasswordChangeTime: user.lastPasswordChangeTime
        ]
	
        if (user.school) {
			info.school = [
				name: user.school.name,
				street: user.school.street,
				city: user.school.city,
				zipCode: user.school.zipCode,
				state: user.school.state,
				latitude: user.school.latitude,
				longitude: user.school.longitude,
				quizPassThreshold: user.school.quizPassThreshold,
				reviewPassThreshold: user.school.reviewPassThreshold,
				questionsPerReview: user.school.questionsPerReview,
				helpEmail: user.school.helpEmail,
				announcementText: user.school.announcementText,
				helpText: user.school.helpText,
				teachers: []
			]
	   
			user.school.teachers.each { teacher ->
				info.school.teachers.add([
						firstName: teacher.firstName,
						lastName: teacher.lastName
					])
			}
        }
        
        response.info = info
    }
    
    def _joinSchool = { response, action, params, user, request ->
        if (user.school != null) {
            response.apiCode = AppInterface.codes.UNABLE_TO_PERFORM_ACTION
            response.error = "ALREADY_IN_SCHOOL"
            return
        }
        
        def newSchoolID
        
        try {
            newSchoolID = params.school.toInteger()
        } catch (Exception ex) {
            newSchoolID = 0
        }
        
        def school = School.findById(newSchoolID)
        
        if (school == null) {
            response.apiCode = AppInterface.codes.MISSING_BAD_PARAMS
            response.error = "NO_SCHOOL_EXISTS"
            return
        }
        
        if (user.isStudent()) {
            school.addToStudents(user)
        } else if (user.isTeacher()) {
            school.addToTeachers(user)
        } else {
            // ??? who are they
            response.apiCode = AppInterface.codes.UNABLE_TO_PERFORM_ACTION
            response.error = "BAD_USER_TYPE"
            return
        }
    }
}