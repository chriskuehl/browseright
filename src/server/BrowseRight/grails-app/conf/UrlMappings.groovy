class UrlMappings {

    static mappings = {
        // api
        "/api/$apiCategory/$apiItem" (controller: "JSObjectAPI", action: "handleRequest", apiAction: "")
        "/api/$apiCategory/$apiItem/$apiAction" (controller: "JSObjectAPI", action: "handleRequest")

        "/"(view:"/index")
        "500"(view:'/error')
    }
}
