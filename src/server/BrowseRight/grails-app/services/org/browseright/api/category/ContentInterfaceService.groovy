package org.browseright.api.category

import org.browseright.*
import org.browseright.api.*

class ContentInterfaceService {
    def _categories = { response, action, params, user, request ->
        def categories = []
        
        // groovy.lang.Category exists therefore use full name for our Category
        org.browseright.Category.findAll().each { category ->
			categories.add([
					uid: category.uid,
					title: category.title,
					shortDescription: category.shortDescription,
					longDescription: category.longDescription
				])
        }
        
        response.categories = categories
    }
    
    def _category = { response, action, params, user, request ->
        def category = Category.findByUid(params.uid)
        
        if (category == null) {
			response.apiCode = AppInterface.codes.MISSING_BAD_PARAMS
			response.error = "NO_CATEGORY_EXISTS"
			return
        }
        
        def sections = []
        
        category.sections.each { section ->
			def sectionData = [
				uid: section.uid,
				title: section.title,
				description: section.description,
				items: []
			]
			
			section.items.each { item ->
				def isQuiz = (item instanceof Quiz)
				def itemData = [
					id: item.id,
					type: isQuiz ? "QUIZ" : "ARTICLE",
					title: item.title
				]
				
				if (isQuiz) {
					// quiz
				} else {
					// article
				}
				
				sectionData.items.add(itemData)
			}
			
			sections.add(sectionData)
        }
		
		response.sections = sections
    }
}