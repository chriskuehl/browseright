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
					
					redirect(action: "quiz", params: [quiz: quiz.id])
				}
			} else if (params.type == "article") {
				
			} else {
				render "Choose an option!"
				return
			}
		}
		
		render(view: "add-item", model: [section: section])
	}
}