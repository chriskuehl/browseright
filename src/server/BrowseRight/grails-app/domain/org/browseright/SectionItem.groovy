package org.browseright

abstract class SectionItem {
    static belongsTo = [section: Section]
	static mapping = {
		sort "ordering"
	}
	static transients = ["fullUID"]
    
    String title
	int ordering
	
	def getFullUID(idd) {
		section.category.uid + "/" + section.uid + "/" + (idd ? idd : id)
	}
}