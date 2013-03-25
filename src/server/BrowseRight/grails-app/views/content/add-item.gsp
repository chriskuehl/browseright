<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="layout" content="bootstrap/main">
    <title>BrowseRight Online Content Editor</title>
  </head>
  <body>
	<h1>Edit Section: ${section.title}</h1>
	<form method="post">
	  <fieldset>
		<legend>Section Properties</legend>
		
		<label>Category</label>
		<input type="text" disabled="disabled" value="${section.category.title}" />
		
		<label>UID</label>
		<input type="text" name="uid" value="${section.uid}" placeholder="importance-of-privacy" />
		
		<label>Section Title</label>
		<input type="text" name="title" value="${section.title}" placeholder="The Importance of Privacy" />
		
		<label>Ordering</label>
		<input type="text" name="ordering" value="${section.ordering}" placeholder="3" />
		
		<label>Description</label>
		<textarea rows="3" name="description" placeholder="A description of privacy in today's world.">${section.description}</textarea>
		
		<p><button type="submit" name="submit" value="1" class="btn">Update Section</button></p>
	  </fieldset>
	</form>
  </body>
</html>