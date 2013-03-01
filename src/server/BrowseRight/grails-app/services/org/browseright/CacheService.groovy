package org.browseright

class CacheService {
    def servletContext
    
    def initService(def service) {
        if (! (servletContext["cache"] instanceof java.util.Map)) {
            servletContext["cache"] = [:]
        }
        
        if (! servletContext["cache"].containsKey(service)) {
            servletContext["cache"][service] = [:]
        }
    }
    
    // normally just call fetchFromCache and check if it's null
    def hasExpired(def service, def key, def minutes) {
        initService(service)
        
        if (! servletContext["cache"][service].containsKey(key)) {
            return true
        }
        
        ((new Date().getTime() - servletContext["cache"][service][key]["date"].getTime()) / (1000 * 60)) > minutes
    }
    
    def storeInCache(def service, def key, def value) {
        initService(service)
        servletContext["cache"][service][key] = [value: value, date: new Date()]
    }
    
    def fetchFromCache(def service, def key, def minutes) {
        initService(service)
            
        if ((minutes <= 0 || ! hasExpired(service, key, minutes)) && servletContext["cache"][service][key] != null)  {
            return servletContext["cache"][service][key]["value"]
        }
        
        servletContext["cache"][service].remove(key) // it's expired, let's save some memory
        null
    }
}