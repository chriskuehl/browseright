package org.browseright

class Article extends SectionItem {
    static constraints = {
		text (maxSize: 8192)
    }
    
    String text
}