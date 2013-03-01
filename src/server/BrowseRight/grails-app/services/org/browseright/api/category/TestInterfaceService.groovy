package org.browseright.api.category

class TestInterfaceService {
    def report = { response, action, params, user ->
        def email = params.email
        def name = params.name
        def comments = params.comments

        def body = "From: ${name} <${email}>\n\n"
        body += comments + "\n\n"
        body += "User Agent: ${params.info.userAgent}\n"
        body += "IP Address: ${params.info.ip}"

        emailService.sendMail("chris@trenders.org", "Comments from ${name}", body)
    }
}
