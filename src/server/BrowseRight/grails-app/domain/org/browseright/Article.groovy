package org.browseright

class Article {
    static constraints = {
	text (maxSize: 8192)
    }
    static belongsTo = [section: Section]
    
    String text
}