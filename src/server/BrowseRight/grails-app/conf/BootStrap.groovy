import org.browseright.*

class BootStrap {
    def geolocationService
    def appInterfaceService
    
    def init = { servletContext ->
        geolocationService.initZipCodeDatabase()
	
        // execute some API methods to add some data for testing
        appInterfaceService.generateResponse(null, "teacher", "create", null, [firstName: "Some", lastName: "Teacher", email: "teacher.test@browseright.org", password: "teacher"])
        appInterfaceService.generateResponse(null, "school", "create", null, [name: "Fake High School", street: "127 Lemon Drive", city: "Iowa City", zipCode: "52246", helpEmail: "help@browseright.org"])
	
        appInterfaceService.generateResponse(null, "student", "create", null, [firstName: "Some", lastName: "Student", email: "student.test@browseright.org", password: "student"])
	
        // create some categories
        def reputation = new Category(title: "Your Online Reputation", shortDescription: "rep", longDescription: "repppppp").save()
        def health = new Category(title: "Technology and Your Health", shortDescription: "stay healthy", longDescription: "healthh").save()
        def peers = new Category(title: "Online Relationships", shortDescription: "how 2 relate online", longDescription: "onlineeeee").save()
	
        // login once, then change the token to something we can easily test with
        def resp = appInterfaceService.generateResponse(null, "student", "login", null, [email: "student.test@browseright.org", password: "student"])
        def session = UserSession.findByToken(resp.token)
        session.setToken("0" * 255)
        session.save(flush: true)
    }
    
    def destroy = {
    }
}