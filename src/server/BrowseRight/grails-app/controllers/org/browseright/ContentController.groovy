package org.browseright

class ContentController {
	def index() {
		render(view: "index.gsp", model: [])
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
		
		render(view: "add-section.gsp", model: [category: category])
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
		
		render(view: "section.gsp", model: [section: section])
	}
}