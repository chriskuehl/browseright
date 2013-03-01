package org.browseright.api

class LyricService {
    def cacheService
    def grailsApplication
    def currentSong = "cat-in-the-hat"
    
    def getLine() {
        def lines = cacheService.fetchFromCache("lyrics", currentSong, 0)
        
        if (lines == null) {
            refreshCache(currentSong)
            return getLine()
        }
        
        lines[(int) Math.floor(Math.random() * lines.size())]
    }
    
    def refreshCache(def song) {
        def lyricFile = grailsApplication.parentContext.getResource("lyrics/${song}.txt").file
        def lines = lyricFile.readLines()
        
        cacheService.storeInCache("lyrics", song, lines)
    }
}