package org.browseright

class ContentController {
	def index() {
		render(view: "index", model: [])
	}
	
	def addSection() {
		def category = org.browseright.Category.findById(params.category)
		
		if (params.submit) {
			def section = new Section(title: params.title, description: params.description, uid: params.uid, ordering: params.ordering, category: category)
			
			if (! section.validate()) {
				render section.errors.allErrors
				return
			} else {
				category.addToSections(section)
				section.save()
				category.save()
				
				redirect(action: "section", params: [section: section.id])
				return
			}
		}
		
		render(view: "add-section", model: [category: category])
	}
	
	def section() {
		def section = Section.findById(params.section)
		
		if (params.submit) {
			section.title = params.title
			section.description = params.description
			section.uid = params.uid
			
			section.ordering = params.ordering.toInteger()
			
			if (! section.validate()) {
				render section.errors.allErrors
				return
			} else {
				section.save()
				redirect(action: "section", params: [section: section.id])
				return
			}
		}
		
		render(view: "section", model: [section: section])
	}
	
	def addItem() {
		def section = Section.findById(params.section)
		
		if (params.submit) {
			if (params.type == "quiz") {
				def quiz = new Quiz(title: params.title, ordering: params.ordering.toInteger(), section: section)
				
				if (! quiz.validate()) {
					render quiz.errors.allErrors
					return
				} else {
					section.addToItems(quiz)
					quiz.save()
					section.save()
					
					redirect(action: "quiz", params: [id: quiz.id])
				}
			} else if (params.type == "article") {
				
			} else {
				render "Choose an option!"
				return
			}
		}
		
		render(view: "add-item", model: [section: section])
	}
	
	def quiz() {
		def quiz = Quiz.findById(params.id)
		render(view: "quiz", model: [quiz: quiz])
	}
	
	def addQuestion() {
		def quiz = Quiz.findById(params.quiz)
		
		if (params.submit) {
			def question = new Question(quiz: quiz)
			question.text = params.question
			question.correctAnswer = params.correctAnswer
			
			(0..5).each { i ->
				if (params["incorrectAnswer${i}"]) {
					question.addToIncorrectAnswers(params["incorrectAnswer${i}"])
				}
			}
			
			if (params.question.size() <= 1) {
				render "Longer question please"
				return
			} else if (question.incorrectAnswers == null || question.incorrectAnswers.size() <= 0) {
				render "Please add some bad answers!"
				return
			} else if (! question.validate()) {
				render question.errors.allErrors
				return
			} else {
				quiz.addToQuestions(question)
				question.save()
				quiz.save()

				redirect(action: "quiz", params: [id: quiz.id])
			}
		}
		
		render(view: "add-question", model: [quiz: quiz])
	}
	
	def editQuestion() {
		def question = Question.findById(params.question)
		def quiz = question.quiz
		
		if (params.delete) {
			quiz.removeFromQuestions(question)
			question.delete()
			
			redirect(action: "quiz", params: [id: quiz.id])
			return
		}
		
		if (params.submit) {
			question.text = params.quest
			question.correctAnswer = params.correctAnswer
			question.incorrectAnswers = []
			
			(0..5).each { i ->
				if (params["incorrectAnswer${i}"]) {
					question.addToIncorrectAnswers(params["incorrectAnswer${i}"])
				}
			}
			
			if (params.quest.size() <= 1) {
				render "Longer question please"
				return
			} else if (question.incorrectAnswers == null || question.incorrectAnswers.size() <= 0) {
				render "Please add some bad answers!"
				return
			} else if (! question.validate()) {
				render question.errors.allErrors
				return
			} else {
				question.save()

				redirect(action: "quiz", params: [id: quiz.id])
			}
		}
		
		render(view: "question", model: [question: question, quiz: quiz])
	}
}