package org.browseright

class Category {
    static constraints = {
	longDescription(maxSize: 2048)
    }
    
    static hasMany = [sections: Section]
    
    String title
    String shortDescription
    String longDescription
}