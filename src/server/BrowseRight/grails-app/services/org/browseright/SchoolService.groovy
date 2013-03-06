package org.browseright

class SchoolService {
    def generateUniqueCode() {
        def code = null
        
        while (code == null || School.findByRegisterCode(code) != null) {
            code = generateCode(5)
        }
        
        code
    }
    
    private def generateCode(def len) {
        def chars = "BCDFGHJKLMNPQRSTVWXZ123456789" // no vowels to avoid accidentally spelling words
        def str = ""
        
        (0..len).each {
            str += chars.charAt((int) Math.floor(Math.random() * chars.size()))
        }
        
        str
    }
}