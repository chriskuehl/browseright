class BootStrap {
    def geolocationService
    
    def init = { servletContext ->
	geolocationService.initZipCodeDatabase()
    }
    def destroy = {
    }
}
