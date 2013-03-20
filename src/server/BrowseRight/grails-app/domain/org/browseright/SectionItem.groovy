package org.browseright

abstract class SectionItem {
    static belongsTo = [section: Section]
	static mapping = {
		sort "ordering"
	}
	static transients = ["fullUID"]
    
    String title
	int ordering
	
	def getFullUID(sectionn, idd) {
		(sectionn ? sectionn : section).category.uid + "/" + (sectionn ? sectionn : section).uid + "/" + (idd ? idd : id)
	}
	
	def getFullUID() {
		getFullUID(null, null)
	}
}