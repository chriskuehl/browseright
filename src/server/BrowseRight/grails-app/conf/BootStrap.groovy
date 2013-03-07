class BootStrap {
    def geolocationService
    def appInterfaceService
    
    def init = { servletContext ->
	geolocationService.initZipCodeDatabase()
	
	// execute some API methods to add some data for testing
	appInterfaceService.generateResponse(null, "teacher", "create", null, [firstName: "Some", lastName: "Teacher", email: "teacher.test@browseright.org", password: "teacher"])
	appInterfaceService.generateResponse(null, "school", "create", null, [name: "Fake High School", street: "127 Lemon Drive", city: "Iowa City", zipCode: "52246", helpEmail: "help@browseright.org"])
	
    }
    def destroy = {
    }
}