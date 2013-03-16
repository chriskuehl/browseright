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
        
        println "Initialized content database from files."
    }
    
    def initCategory(directory) {
        def categoryInfo = parseJSON(new File(directory.toString() + File.separator + "category.json"))
        def category = new Category(uid: categoryInfo.uid, title: categoryInfo.title, shortDescription: categoryInfo.shortDescription, longDescription: categoryInfo.longDescription).save()
        
        // now add sections to the category
        directory.eachFile (FileType.DIRECTORIES) { file ->
            initSection(file, category)
        }
    }
    
    def initSection(directory, category) {
        def sectionInfo = parseJSON(new File(directory.toString() + File.separator + "section.json"))
        def section = new Section(uid: sectionInfo.uid, title: sectionInfo.title, description: sectionInfo.description)
        
        category.addToSections(section)
        category.save()
        section.save()
        
        directory.eachFile (FileType.FILES) { file ->
            if (file.name != "section.json") {
                initSectionItem(file, section)
            }
        }
    }
    
    def initSectionItem(file, section) {
        def itemInfo = parseJSON(file)
        
        if (itemInfo.type == "article") {
            initArticle(itemInfo, section)
        } else if (itemInfo.type == "quiz") {
            initQuiz(itemInfo, section)
        }
    }
    
    def initArticle(info, section) {
        def article = new Article(title: info.title, text: info.text)
        
        section.addToItems(article)
        section.save()
        article.save()
    }
    
    def initQuiz(info, section) {
        def quiz = new Quiz(title: info.title, questionsToShow: info.questionsToShow)
        
        section.addToItems(quiz)
        section.save()
        
        // create questions
        info.questions.each { questionInfo ->
            def question = new Question(text: questionInfo.question, correctAnswer: questionInfo.correct)
            
            questionInfo.incorrect.each { incorrectAnswer ->
                question.addToIncorrectAnswers(incorrectAnswer)
            }
            
            quiz.addToQuestions(question)
        }
        
        quiz.save()
    }
    
    def parseJSON(file) {
        jsonSlurper.parse(new FileReader(file))
    }
}