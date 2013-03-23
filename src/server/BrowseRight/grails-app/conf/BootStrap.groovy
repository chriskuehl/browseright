import org.browseright.*

class BootStrap {
    def contentService
    def geolocationService
    def appInterfaceService
    
    def init = { servletContext ->
        geolocationService.initZipCodeDatabase()
	}
    
    def destroy = {
    }
}