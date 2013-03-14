package org.browseright.api.category

import browseright.*
import browseright.api.*

class ContentInterfaceService {
    def _categories = { response, action, params, user, request ->
        def categories = []
        
        // groovy.lang.Category exists therefore use full name for our Category
        org.browseright.Category.findAll().each { category ->
	   categories.add([
		  title: category.title,
		  shortDescription: category.shortDescription,
		  longDescription: category.longDescription
	   ])
        }
        
        response.categories = categories
    }
}