<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="layout" content="bootstrap/main">
    <title>BrowseRight Online Content Editor</title>
  </head>
  <body>
	<h1>Add Question</h1>
	<form method="post">
	  <fieldset>
		<legend>Question Properties</legend>
		
		<label>Category</label>
		<input type="text" disabled="disabled" value="${quiz.section.category.title}" />
		
		<label>Section</label>
		<input type="text" disabled="disabled" value="${quiz.section.title}" />
		
		<label>Quiz Title</label>
		<input type="text" disabled="disabled" value="${quiz.title}" />
		
		<label>Question</label>
		<input type="text" class="input-xxlarge" name="question" value="" placeholder="What is 2 + 2?" />
		
		<div class="well">
		  <label>Correct Answer</label>
		  <input type="text" class="input-xxlarge" name="correctAnswer" value="" placeholder="2 + 2 = 4" />
		  
		  
		  <label>Incorrect Answers</label>
		  <g:each var="i" in="${(0..5)}">
			<p><input type="text" class="input-xxlarge" name="incorrectAnswer${i}" value="" placeholder="" /></p>
		  </g:each>
		</div>
		
		<p><button type="submit" name="submit" value="1" class="btn">Add Question</button></p>
	  </fieldset>
	</form>
  </body>
</html>