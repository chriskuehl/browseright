package org.browseright

abstract class SectionItem {
    static belongsTo = [section: Section]
    
    String title
	int ordering
}