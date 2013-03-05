package org.browseright

class Category {
    static constraints = {
    }
    
    static hasMany = [sections: Section]
    
    String title
    String shortDescription
    String longDescription
}