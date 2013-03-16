package org.browseright

import groovy.io.FileType
import groovy.json.JsonSlurper

class ContentService {
    def grailsApplication
    def jsonSlurper = new JsonSlurper()
    
    def initContentDatabase() {
        println "Initializing content database from files..."
        
        def reputation = new Category(title: "Your Online Reputation", shortDescription: "rep", longDescription: "repppppp").save()
        def health = new Category(title: "Technology and Your Health", shortDescription: "stay healthy", longDescription: "healthh").save()
        def peers = new Category(title: "Online Relationships", shortDescription: "how 2 relate online", longDescription: "onlineeeee").save()
	
        def contentDirectory = grailsApplication.parentContext.getResource("content").file
        def contentDirectoryPath = contentDirectory.toString()
        
        contentDirectory.eachFile (FileType.DIRECTORIES) { file ->
            initCategory(file)
        }
    }
    
    def initCategory(directory) {
        def categoryInfo = parseJSON(new File(directory.toString() + File.separator + "category.json"))
        def category = new Category(uid: categoryInfo.uid, title: categoryInfo.title, shortDescription: categoryInfo.shortDescription, longDescription: categoryInfo.longDescription).save()
        
        // now add 
    }
    
    def parseJSON(file) {
        jsonSlurper.parse(new FileReader(file))
    }
}