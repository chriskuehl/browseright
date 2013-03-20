package org.browseright

class Article extends SectionItem {
    static constraints = {
		text (maxSize: 8192)
    }
    
    String text
	
	def getFullUID() {
		println "id: " + this.id
		section.category.uid + "/" + section.uid + "/" + id
	}
}