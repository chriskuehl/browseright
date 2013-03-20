package org.browseright

class Quiz extends SectionItem {
    static hasMany = [questions: Question]
	
    int questionsToShow
	
	def getFullUID() {
		println "id: " + this.id
		section.category.uid + "/" + section.uid + "/" + id
	}
}