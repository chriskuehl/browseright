<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="layout" content="bootstrap/main">
    <title>BrowseRight Online Content Editor</title>
  </head>
  <body>
	<h1>Add Item</h1>
	<form method="post">
	  <fieldset>
		<legend>Item Properties</legend>
		
		<label>Section</label>
		<input type="hidden" name="section" value="${section.id}" />
		<input type="text" disabled="disabled" value="${section.title}" />
		
		<label>Title</label>
		<input type="text" name="title" value="" placeholder="Checkpoint Quiz" />
		
		<label>Ordering</label>
		<input type="text" name="ordering" value="0" placeholder="3" />
		
		<label>Type</label>
		<label class="radio">
		  <input type="radio" name="type" value="article" checked>
		  Article
		</label>
		<label class="radio">
		  <input type="radio" name="type" value="quiz">
		  Checkpoint Quiz
		</label>

		
		<p><button type="submit" name="submit" value="1" class="btn">Create Item</button></p>
	  </fieldset>
	</form>
  </body>
</html>