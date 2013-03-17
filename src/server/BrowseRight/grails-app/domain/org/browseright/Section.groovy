package org.browseright

class Section {
    static constraints = {
        uid(unique: ["category"])
    }
	
	static mapping = {
		sort "ordering"
		items sort: "ordering"
	}
    
    static belongsTo = [category: org.browseright.Category]
    static hasMany = [items: SectionItem]
    
    String uid
    String title
    String description
	
	int ordering
}