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
		  <div class="wmd-panel">
			  <div id="wmd-button-bar"></div>
			  <textarea class="wmd-input" name="text" id="wmd-input">${article.text.replace("\\n", "\n")}</textarea>
		  </div>
		  <div id="wmd-preview" class="wmd-panel wmd-preview"></div>
		</div>
		
		
		<p><button type="submit" name="submit" value="1" class="btn">Update Article</button> <button type="submit" name="delete" value="1" class="btn" onclick="return confirm('Are you SURE?');"><i class="icon-remove"></i> DELETE</button></p>
	</fieldset>
	</form>
	
	<script>
		jQuery(document).ready(function() {
			var converter = Markdown.getSanitizingConverter();
			var editor = new Markdown.Editor(converter);
			editor.run();

			jQuery("#wmd-input").bind("keydown keyup keypressed", function() {
				var v = jQuery(this).val();
				v = v.replace(/\n/g, "\\n");

				var w = JSON.stringify(v);

				jQuery("#json").text(w);
			});
		});
	</script>
  </body>
</html>