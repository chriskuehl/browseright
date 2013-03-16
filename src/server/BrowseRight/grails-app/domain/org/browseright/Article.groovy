package org.browseright

class Article extends SectionItem {
    static constraints = {
	text (maxSize: 8192)
    }
    static belongsTo = [section: Section]
    
    String text
}