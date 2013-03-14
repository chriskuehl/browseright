package org.browseright.api.category

import org.browseright.*

class TestInterfaceService {
    def test = { response, action, params, user, request ->
        response.itworked = true
    }
    
    def _whoami = { response, action, params, user, request ->
	if (user) {
	    response.youare = [
		teacher: user.isTeacher(),
		email: user.email
	    ]
	} else {
	    response.youare = null
	}
    }
}
