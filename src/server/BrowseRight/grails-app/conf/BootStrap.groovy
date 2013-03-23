import org.browseright.*

class BootStrap {
    def contentService
    def geolocationService
    def appInterfaceService
    
    def init = { servletContext ->
        geolocationService.initZipCodeDatabase()
        contentService.initContentDatabase()
	
        // execute some API methods to add some data for testing
		/*
        appInterfaceService.generateResponse(null, "teacher", "create", null, [firstName: "Some", lastName: "Teacher", email: "teacher.test@browseright.org", password: "teacher"])
        appInterfaceService.generateResponse(null, "student", "create", null, [firstName: "Some", lastName: "Student", email: "student.test@browseright.org", password: "student"])
	
        // login once, then change the token to something we can easily test with
        def resp = appInterfaceService.generateResponse(null, "student", "login", null, [email: "student.test@browseright.org", password: "student"])
        def session = UserSession.findByToken(resp.token)
        session.setToken("0" * 255)
        session.save(flush: true)
        
        resp = appInterfaceService.generateResponse(null, "teacher", "login", null, [email: "teacher.test@browseright.org", password: "teacher"])
        session = UserSession.findByToken(resp.token)
        session.setToken("1" * 255)
        session.save(flush: true)
        
        // create school and add student
        appInterfaceService.generateResponse(null, "school", "create", null, [token: "1" * 255, name: "Woodford County High School", street: "180 Frankfort Street", city: "Versailles", zipCode: "40383", helpEmail: "becky.keith@woodford.kyschools.us"])
        appInterfaceService.generateResponse(null, "user", "joinSchool", null, [token: "0" * 255, school: 1])
		*/
	}
    
    def destroy = {
    }
}