<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="layout" content="bootstrap/main">
    <title>BrowseRight Online Content Editor</title>
  </head>
  <body>
	<h1>Add Section</h1>
	<form method="post">
	  <fieldset>
		<legend>Section Properties</legend>
		
		<label>Category</label>
		<input type="hidden" name="category" value="${params.category}" />
		<input type="text" disabled="disabled" value="${category.title}" />
		
		<label>UID</label>
		<input type="text" name="uid" placeholder="importance-of-privacy" />
		
		<label>Section Title</label>
		<input type="text" name="title" placeholder="The Importance of Privacy" />
		
		<label>Ordering</label>
		<input type="text" name="ordering" value="0" placeholder="3" />
		
		<label>Description</label>
		<textarea rows="3" name="description" placeholder="A description of privacy in today's world."></textarea>
		
		<p><button type="submit" name="submit" value="1" class="btn">Create Section</button></p>
	  </fieldset>
	</form>
  </body>
</html>