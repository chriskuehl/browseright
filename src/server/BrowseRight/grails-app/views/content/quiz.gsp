<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="layout" content="bootstrap/main">
    <title>BrowseRight Online Content Editor</title>
  </head>
  <body>
	<h1>Edit Quiz: ${quiz.title}</h1>
	<form method="post">
	  <fieldset>
		<legend>Quiz Properties</legend>
		
		<label>Category</label>
		<input type="text" disabled="disabled" value="${quiz.section.category.title}" />
		
		<label>Section</label>
		<input type="text" disabled="disabled" value="${quiz.section.title}" />
		
		<label>Quiz Title</label>
		<input type="text" name="title" value="${quiz.title}" placeholder="Checkpoint Quiz" />
		
		<label>Ordering</label>
		<input type="text" name="ordering" value="${quiz.ordering}" placeholder="3" />
		
		<label>Number of Questions to Show</label>
		<input type="text" name="questionsToShow" value="${quiz.questionsToShow ? quiz.questionsToShow : 0}" placeholder="3" />
		
		<p><button type="submit" name="submit" value="1" class="btn">Update Quiz</button> <button type="submit" name="delete" value="1" class="btn" onclick="return confirm('Are you SURE?');"><i class="icon-remove"></i> DELETE</button></p>
	  
		<legend>Quiz Questions</legend>
		<div class="well">
		  <ul id="questions">
			<g:each var="question" in="${quiz.questions}">
			  <li><g:link action="editQuestion" params="${[question: question.id]}">${question.text}</g:link></li>
			</g:each>
		  </ul>
		  
		  <p>
			<g:link action="addQuestion" params="${[quiz: quiz.id]}"><i class="icon-plus-sign"></i> Add New Question</g:link>
		  </p>
		</div>
		
	</fieldset>
	</form>
  </body>
</html>