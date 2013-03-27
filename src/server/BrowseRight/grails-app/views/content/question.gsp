<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="layout" content="bootstrap/main">
    <title>BrowseRight Online Content Editor</title>
  </head>
  <body>
	<h1>Edit Question</h1>
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
		<input type="text" class="input-xxlarge" name="quest" value="${question.text}" placeholder="What is 2 + 2?" />
		
		<div class="well">
		  <label>Correct Answer</label>
		  <input type="text" class="input-xxlarge" name="correctAnswer" value="${question.correctAnswer}" placeholder="2 + 2 = 4" />
		  
		  
		  <label>Incorrect Answers</label>
		  <g:each var="i" in="${(0..5)}">
			<p><input type="text" class="input-xxlarge" name="incorrectAnswer${i}" value="${question.incorrectAnswers.toList()[i]}" placeholder="" /></p>
		  </g:each>
		</div>
		
		<p><button type="submit" name="submit" value="1" class="btn">Save Question</button> <button type="submit" name="delete" value="1" class="btn" onclick="return confirm('Are you SURE?');"><i class="icon-remove"></i> DELETE</button></p>
	  </fieldset>
	</form>
  </body>
</html>