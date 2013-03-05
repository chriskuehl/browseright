package org.browseright

import org.mindrot.jbcrypt.BCrypt

class HashingService {
    def hash(def str) {
        // 6 rounds takes about a second on my development machine; additional
        // benchmarking and testing is needed before we go live
        BCrypt.hashpw(str, BCrypt.gensalt(9))
    }
    
    def hash(def str, def it) {
        BCrypt.hashpw(str, BCrypt.gensalt(it.toInteger()))
    }
    
    def matches(def hash, def str) {
        BCrypt.checkpw(str, hash)
    }
}