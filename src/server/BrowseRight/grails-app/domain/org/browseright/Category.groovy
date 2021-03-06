package org.browseright

class Category {
    static constraints = {
        uid(unique: true, nullable: false, blank: false)
		longDescription(maxSize: 2048)
    }
	
	static mapping = {
		sort "ordering"
		sections sort: "ordering"
	}
    
    static hasMany = [sections: Section]
    
    String uid
    String title
    String shortDescription
    String longDescription
	
	int ordering
}