package org.browseright

abstract class SectionItem {
    static belongsTo = [section: Section]
	static mapping = {
		sort "ordering"
	}
	static transients = ["fullUID"]
    
    String title
	int ordering
	
	def getFullUID() {
		 section.category.uid + "/" + section.uid + "/" + id
	}
}