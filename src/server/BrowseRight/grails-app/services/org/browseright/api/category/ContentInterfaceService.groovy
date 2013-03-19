package org.browseright.api.category

import org.browseright.*
import org.browseright.api.*

class ContentInterfaceService {
    def contentService
    
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
    
    def _gradeQuiz = { response, action, params, user, request ->
        def quizID = params.quizID
        def quizType = params.quizType
        
        def quiz = Quiz.findById(quizID)
        
        if (quiz == null) {
	   response.apiCode = AppInterface.codes.MISSING_BAD_PARAMS
	   response.error = "BAD_QUIZ_ID"
	   return
        }
        
        def quizAttempt = new QuizAttempt(quiz: quiz, student: user, quizType: (quizType == "QUIZ" ? QuizAttempt.QUIZ : QuizAttempt.REVIEW))
        def questions = contentService.parseJSONString(params.questions)
        
        questions.each { question ->
	   def questionAttempt = new QuestionAttempt()
	   
	   // add selected answer
	   questionAttempt.selectedAnswer = new QuestionAttemptAnswer(text: question.selectedAnswer.text, correct: question.selectedAnswer.correct)
	   
	   // add not-selected answers
	   question.notSelectedAnswers.each { nonSelectedAnswer ->
	       def answer = new QuestionAttemptAnswer(text: nonSelectedAnswer.text, correct: nonSelectedAnswer.correct)
	       questionAttempt.addToNotSelectedAnswers(answer)
	   }
	   
	   quizAttempt.addToQuestions(questionAttempt)
        }
        
        if (quizAttempt.validate()) {
	   quizAttempt.save()
	   
	   response.quizScore = quizAttempt.getPercentCorrect()
	   println response.quizScore
        } else {
	   if (! params.id) {
	       response.apiCode = AppInterface.codes.MISSING_BAD_PARAMS
	       response.error = "UNKNOWN_ERROR"
	       return
	   }
        }
    }
}