package stocksim.api.category

import stocksim.api.*

class LessonInterfaceService {
    // TODO: this whole lesson setup is a mess and isn't very compatible for
    // cross-interface viewing and should be redone
    def lessonService
    
    def list = { response, action, params, user ->
        response.introText =
            "trenders.org is based around our stock simulator. However, we also " +
            "offer lessons about other forms of personal finance. Select a lesson " +
            "from the list below to learn more."
        
        response.categories = lessonService.getLessonCategories()
    }
    
    def read = { response, action, params, user ->
        def lessonID = params.lesson
        def content = lessonService.getLessonContent(lessonID)
        
        if (content == null) {
            response.apiCode = AppInterface.codes.MISSING_BAD_PARAMS
        } else {
            response.title = content.title
            response.content = content.body
        }
    }
}