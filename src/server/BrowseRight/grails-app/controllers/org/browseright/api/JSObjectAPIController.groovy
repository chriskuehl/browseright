package org.browseright.api

import grails.converters.JSON
import grails.converters.XML

class JSObjectAPIController {
    def appInterfaceService
    
    def handleRequest() {
        def category = params.apiCategory
        def item = params.apiItem
        def action = params.apiAction
		
		def str = "[" + (new Date()).toString() + "]: \""
        str += category + "/" + item
		
		if (action) {
			str += "/" + action
		}
		
		str += "\" " + request.getRemoteAddr()
		
		println str
		
        def response = appInterfaceService.generateResponse(request, category, item, action, params)
        
        if (params.xml) {
            render response as XML
        } else {
            render response as JSON
        }
    }
}