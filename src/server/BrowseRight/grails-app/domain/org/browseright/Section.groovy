package org.browseright

class Section {
    static constraints = {
    }
    
    static hasMany = [items: SectionItem]
    
    String title
    String description
}
