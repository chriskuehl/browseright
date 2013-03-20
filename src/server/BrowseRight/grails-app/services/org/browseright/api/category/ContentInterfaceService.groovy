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
				def uid = item.getFullUID()
				def isQuiz = (item instanceof Quiz)
				
				def completed
				
				if (isQuiz) {
					completed = user.hasCompletedQuiz(uid)
				} else {
					completed = user.articlesRead.contains(uid)
				}
				
				def itemData = [
					id: item.id,
					type: isQuiz ? "QUIZ" : "ARTICLE",
					title: item.title,
					uid: uid,
					completed: completed
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
		
		def uid = item.getFullUID()
		itemInfo.uid = uid
		
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
			
			// mark the article as read
			if (! user.articlesRead.contains(uid)) {
				user.addToArticlesRead(uid)
			}
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
			def ansswer = new QuestionAttemptAnswer(text: question.selectedAnswer.text, correct: question.selectedAnswer.correct)
			ansswer.save()
			questionAttempt.selectedAnswer = ansswer
	   
			// add not-selected answers
			question.notSelectedAnswers.each { nonSelectedAnswer ->
				def answer = new QuestionAttemptAnswer(text: nonSelectedAnswer.text, correct: nonSelectedAnswer.correct)
				answer.save()
				questionAttempt.addToNotSelectedAnswers(answer)
			}
	   
			quizAttempt.addToQuestions(questionAttempt)
        }
        
        if (quizAttempt.validate()) {
			quizAttempt.save()
			
			quizAttempt.calculatePercentCorrect()
			response.quizScore = quizAttempt.percentCorrect
			
			// did they pass?
			def threshold = user.school.quizPassThreshold
			
			if (quizType == "REVIEW") {
				threshold = user.school.reviewPassThreshold
			}
			
			response.threshold = threshold
			response.passed = (response.quizScore >= threshold)
			
			user.updateProgress()
        } else {
			if (! params.id) {
				response.apiCode = AppInterface.codes.MISSING_BAD_PARAMS
				response.error = "UNKNOWN_ERROR"
				return
			}
        }
    }
}