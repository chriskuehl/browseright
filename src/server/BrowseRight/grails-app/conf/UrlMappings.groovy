class UrlMappings {

    static mappings = {
        // api
        "/api/$apiCategory/$apiItem" (controller: "JSObjectAPI", action: "handleRequest", apiAction: "")
        "/api/$apiCategory/$apiItem/$apiAction" (controller: "JSObjectAPI", action: "handleRequest")

        "/" (view:"/index")
        "/dev/api" (view:"/dev/api")
        "/dev/content" (controller:"content")
        "/dev/content/$action" (controller:"content")
		"404" (view: "/error")
        "500" (view:'/error')
    }
}