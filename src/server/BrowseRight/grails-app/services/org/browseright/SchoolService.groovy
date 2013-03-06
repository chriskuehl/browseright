package org.browseright

class SchoolService {
    def generateUniqueCode() {
        def code
        
        while (code == null || School.findByCode(code) != null) {
            code = generateCode(5)
        }
        
        code
    }
    
    private def generateCode(def len) {
        def chars = "BCDFGHJKLMNPQRSTVWXZ123456789" // no vowels to avoid accidentally spelling words
        def str = ""
        
        (0..len).each {
            str += chars.charAt(Math.floor(Math.rand() * chars.size()))
        }
        
        str
    }
}