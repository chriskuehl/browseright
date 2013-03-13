package org.browseright.api.category

import org.browseright.*
import org.browseright.api.*

class UserInterfaceService {
    def info = { response, action, params, user, request ->
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
}