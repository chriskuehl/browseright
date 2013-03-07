package org.browseright

import au.com.bytecode.opencsv.CSVReader

class GeolocationService {
    def grailsApplication
    def zipCodes = [:]
    
    def initZipCodeDatabase() {
	println "Initializating zip code database..."
	
	def resourcePath = grailsApplication.parentContext.getResource(File.separator).file.getAbsolutePath()
	def zipCodeFile = new File(resourcePath + File.separator + "data" + File.separator + "geo" + File.separator + "zipcodes.csv")
	
	def reader = new CSVReader(new FileReader(zipCodeFile))
	
	def columns = reader.readNext()	
	def nextLine
	
	while ((nextLine = reader.readNext()) != null) {
	    zipCodes[nextLine[0]] = [:]
	    
	    columns.eachWithIndex { column, i ->
		zipCodes[nextLine[0]][column] = nextLine[i]
	    }
	}
	
	println "Finished initializing zip code database."
    }
    
    def findStateByZipCode(def zipCode) {
        zipCodes[zipCode]["State"]
    }
}