package org.browseright.api.category

import org.browseright.*

class TestInterfaceService {
    def test = { response, action, params, user, request ->
        response.itworked = true
    }
    
    def whoami = { response, action, params, user, request ->
	response.youare = [
	    teacher: (user instanceof Teacher),
	    email: user.email
	]
    }
}
