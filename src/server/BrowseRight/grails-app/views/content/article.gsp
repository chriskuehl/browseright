<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="layout" content="bootstrap/main">
    <title>BrowseRight Online Content Editor</title>
  </head>
  <body>
	<h1>Edit Article: ${article.title}</h1>
	<form method="post">
	  <fieldset>
		<legend>Article Properties</legend>
		
		<label>Category</label>
		<input type="text" disabled="disabled" value="${article.section.category.title}" />
		
		<label>Section</label>
		<input type="text" disabled="disabled" value="${article.section.title}" />
		
		<label>Article Title</label>
		<input type="text" name="title" value="${article.title}" placeholder="What is Email?" />
		
		<label>Ordering</label>
		<input type="text" name="ordering" value="${article.ordering}" placeholder="3" />
		
		<legend>Article Content</legend>
		<div class="well">
		  <textarea name="text">${article.text}</textarea>
		</div>
		
		
		<p><button type="submit" name="submit" value="1" class="btn">Update Article</button> <button type="submit" name="delete" value="1" class="btn" onclick="return confirm('Are you SURE?');"><i class="icon-remove"></i> DELETE</button></p>
	</fieldset>
	</form>
  </body>
</html>