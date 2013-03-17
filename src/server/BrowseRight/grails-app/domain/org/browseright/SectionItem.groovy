package org.browseright

abstract class SectionItem {
    static belongsTo = [section: Section]
	static mapping = {
		sort "ordering"
	}
    
    String title
	int ordering
}