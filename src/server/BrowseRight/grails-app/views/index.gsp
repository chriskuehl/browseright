<!DOCTYPE html>
<html>
  <head>
    <meta name="layout" content="main"/>
    <title>BrowseRight</title>
    <style type="text/css" media="screen">
#status {
  background-color: #eee;
  border: .2em solid #fff;
  margin: 2em 2em 1em;
  padding: 1em;
  width: 12em;
  float: left;
  -moz-box-shadow: 0px 0px 1.25em #ccc;
  -webkit-box-shadow: 0px 0px 1.25em #ccc;
  box-shadow: 0px 0px 1.25em #ccc;
  -moz-border-radius: 0.6em;
  -webkit-border-radius: 0.6em;
  border-radius: 0.6em;
}

.ie6 #status {
  display: inline; /* float double margin fix http://www.positioniseverything.net/explorer/doubled-margin.html */
}

#status ul {
  font-size: 0.9em;
  list-style-type: none;
  margin-bottom: 0.6em;
  padding: 0;
}

#status li {
  line-height: 1.3;
}

#status h1 {
  text-transform: uppercase;
  font-size: 1.1em;
  margin: 0 0 0.3em;
}

#page-body {
  margin: 2em 1em 1.25em 18em;
}

h2 {
  margin-top: 1em;
  margin-bottom: 0.3em;
  font-size: 1em;
}

p {
  line-height: 1.5;
  margin: 0.25em 0;
}

#controller-list ul {
  list-style-position: inside;
}

#controller-list li {
  line-height: 1.3;
  list-style-position: inside;
  margin: 0.25em 0;
}

@media screen and (max-width: 480px) {
  #status {
    display: none;
    }

      #page-body {
        margin: 0 1em 1em;
      }

      #page-body h1 {
        margin-top: 0;
      }
      }
    </style>
  </head>
  <body>
    <a href="#page-body" class="skip"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
    <div id="status" role="complementary">
      <h1>Application Status</h1>
      <ul>
        <li>App version: <g:meta name="app.version"/></li>
        <li>Grails version: <g:meta name="app.grails.version"/></li>
        <li>Groovy version: ${GroovySystem.getVersion()}</li>
        <li>JVM version: ${System.getProperty('java.version')}</li>
        <li>Reloading active: ${grails.util.Environment.reloadingAgentEnabled}</li>
        <li>Controllers: ${grailsApplication.controllerClasses.size()}</li>
        <li>Domains: ${grailsApplication.domainClasses.size()}</li>
        <li>Services: ${grailsApplication.serviceClasses.size()}</li>
        <li>Tag Libraries: ${grailsApplication.tagLibClasses.size()}</li>
      </ul>
      <h1>Installed Plugins</h1>
      <ul>
        <g:each var="plugin" in="${applicationContext.getBean('pluginManager').allPlugins}">
          <li>${plugin.name} - ${plugin.version}</li>
        </g:each>
      </ul>
    </div>
    <div id="page-body" role="main">
      <h1>Welcome to BrowseRight</h1>
      <div id="controller-list" role="navigation">
        <h2>List of API Commands:</h2>

        <g:set var="a" value="${[
    [category: "student", item: "create", action: "", params: [firstName: "John", lastName: "Student", email: "student@wchs.browseright.org", password: "student"]],
    [category: "student", item: "login", action: "", params: [email: "student.test@browseright.org", password: "student"]],
    [category: "teacher", item: "create", action: "", params: [firstName: "John", lastName: "Teacher", email: "teacher@wchs.browseright.org", password: "teacher"]],
    [category: "teacher", item: "login", action: "", params: [email: "teacher.test@browseright.org", password: "teacher"]],
    [category: "school", item: "_create", action: "", params: [token: ("1" * 255), name: "Woodford County High School", street: "180 Frankfort Street", city: "Versailles", zipCode: "40383", helpEmail: "help@wchs.browseright.org"]],
    [category: "school", item: "list", action: "", params: [:]],
    [category: "user", item: "_info", action: "", params: [token: ("0" * 255)]],
    [category: "user", item: "_joinSchool", action: "", params: [school: 1, token: ("0" * 255)]],
    [category: "test", item: "_whoami", action: "", params: [token: ("0" * 255)]],
    [category: "content", item: "_categories", action: "", params: [token: ("0" * 255)]]
  ]}" />
        <ul>
          <g:each var="c" in="${a}">
            <g:set var="p" value="" />

            <g:each var="j" in="${c.params.entrySet()}">
              <g:set var="p" value="${p}${j.key}=${j.value.encodeAsURL()}&" />
            </g:each>


            <li class="controller">
	      <g:link uri="/api/${c.category}/${c.item.startsWith("_") ? c.item.substring(1) : c.item}${c.action ? ("/" + c.action) : ""}?${p}">${c.category}/${c.item}${c.action ? ("/" + c.action) : ""}</g:link>
	      <% if (c.params.token) c.params.token = c.params.token.substring(0, 5) + "..." %>
	      <br />${c.params}
	    </li>
          </g:each>
        </ul>

        <h2>Useful Links:</h2>
        <ul>
          <li class="controller"><g:link uri="/dbconsole">Database Console</g:link></li>
        </ul>
      </div>
    </div>
  </body>
</html>
