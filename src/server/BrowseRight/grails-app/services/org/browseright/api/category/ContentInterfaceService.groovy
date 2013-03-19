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
        if (! params.uid) {
	   response.apiCode = AppInterface.codes.MISSING_BAD_PARAMS
	   response.error = "SPECIFY_UID"
	   return
        }
		
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
				
	       sectionData.items.add(itemData)
	   }
			
	   sections.add(sectionData)
        }
		
        response.sections = sections
    }
	
    def _item = { response, action, params, user, request ->
        if (! params.id) {
	   response.apiCode = AppInterface.codes.MISSING_BAD_PARAMS
	   response.error = "SPECIFY_ID"
	   return
        }
		
        def item = SectionItem.findById(params.id)
        def isQuiz = (item instanceof Quiz)
		
        def itemInfo = [
	   id: item.id,
	   type: isQuiz ? "QUIZ" : "ARTICLE",
	   title: item.title
        ]
		
        if (isQuiz) {
	   itemInfo.questionsToShow = item.questionsToShow
	   itemInfo.questions = []
			
	   item.questions.each { question ->
	       itemInfo.questions.add([
		      text: question.text,
		      correctAnswer: question.correctAnswer,
		      incorrectAnswers: question.incorrectAnswers
		  ])
	   }
        } else {
	   itemInfo.text = item.text
        }
		
        response.item = itemInfo
    }
}