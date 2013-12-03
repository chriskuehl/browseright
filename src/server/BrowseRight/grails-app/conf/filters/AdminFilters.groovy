package filters

import org.apache.commons.codec.binary.Base64
import org.apache.commons.codec.binary.StringUtils
import org.codehaus.groovy.grails.commons.GrailsApplication
import grails.util.GrailsUtil

class AdminFilters {
    def request
	def response
	def hashingService
    
    def filters = {
        adminFilter(uri: "/dev/**") {
            before = {
                if (GrailsUtil.getEnvironment().equals(GrailsApplication.ENV_PRODUCTION) || System.env["BROWSERIGHT_RESTRICT_ADMIN"]) {
                    // check the provided username and password
					def success = false
					def auth = request.getHeader("Authorization")
					
					if (auth) {
						def b64 = auth - 'Basic '  
						def raw =  StringUtils.newStringUtf8(Base64.decodeBase64(b64))
						def parts = raw.split(':')
						
						if (parts.size() == 2 && parts[0].length() > 0 && parts[1].length() > 0) {
							def hash = System.env["BROWSERIGHT_ADMIN_" + parts[0].toUpperCase()]
							
							try {
								if (hash && hash.length() > 0 && hashingService.matches(hash, parts[1])) {
									success = true
								}
							} catch (IllegalArgumentException ex) {}
						}
					}	
					
					if (! success) {
						response.addHeader("WWW-Authenticate", "Basic realm=\"BrowseRight Admin Panel\"")
						render(view: "/denied", status: 401)
						return false
					}
                }
            }
        }
    }
}
