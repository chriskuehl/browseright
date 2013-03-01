package org.browseright.api.category

class TestInterfaceService {
    def test = { response, action, params, user ->
        response.itworked = true
    }
}
