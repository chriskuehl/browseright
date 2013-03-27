modules = {
    application {
        resource url:'js/application.js'
    }
	
	bootstrap {
		resource url: "js/jquery-1.9.1.min.js", disposition: "head"
		resource url: "js/bootstrap/bootstrap.min.js"
		resource url: "js/bootstrap/Markdown.Converter.js"
		resource url: "js/bootstrap/Markdown.Editor.js"
		resource url: "js/bootstrap/Markdown.Sanitizer.js"
		
		resource url: "css/bootstrap/bootstrap.min.css"
		resource url: "css/bootstrap/bootstrap-responsive.min.css"
		resource url: "css/bootstrap/editor.css"
	}
}