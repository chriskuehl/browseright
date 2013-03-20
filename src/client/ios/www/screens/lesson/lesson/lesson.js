gui.screens["lesson/lesson"].data = {
	id: "lesson/lesson",
	navBars: [{
		title: "Category One",
		width: 1406,

		buttons: {
			left: {
				type: "back",
				title: "Categories",
				action: function() {
					setScreen("lesson/category");
				}
			}
		}
	},

	{
		title: "Progress"
	}],
	parents: ["lesson/category"],

	setup: function(contentManager) {
		if (currentCategory == null) {
			dialog("Select a Category", "Please select a category first!", ["OK"], function() {
				setScreen("lesson/category");
			});

			return;
		}
		
		registerScrollContainers($(".scroll"));
		$(".nav").empty();

		apiWithLoading("Loading lessons...", "content/category", {uid: currentCategory}, [RESP_OK], function(code, data) {
			for (var i = 0; i < data.sections.length; i ++) {
				addSectionLesson(data.sections[i]);
			}
			
			if (data.sections.length > 0) {
				// load the first item
				loadItem(data.sections[0].items[3].id);
			}
		});
	},
	
	navBarReady: function() {
		gui.currentScreen.navBarTitles[0].text(currentCategoryTitle);
	}
};

function addSectionLesson(section) {
	var header = $("<li />");
	header.addClass("section");
	header.appendTo($(".nav"));
	var d = $("<div />");
	d.appendTo(header);
	d.text(section.title);
	
	// now add the items
	for (var i = 0; i < section.items.length; i ++) {
		var item = section.items[i];
		
		var li = $("<li />");
		li.appendTo($(".nav"));
		var d = $("<div />");
		d.appendTo(li);
		d.text(item.title);
		
		li.data("id", item.id);
		
		li.click(function() {
			var id = $(this).data("id");
			loadItem(id);
		});
	}
}

function loadItem(id) {
	// update nav bar selection
	$(".nav").find("li").removeClass("current");
	$.each($(".nav").find("li"), function(idx, e) { // ugly way to add current to selected one
		var f = $(e);
		
		if (f.data("id") == id) {
			f.addClass("current");
		}
	});
	
	// clear existing content
	var content = $(".content");
	content.empty();
	
	// load new content
	apiWithLoading("Loading lesson...", "content/item", {id: id}, [RESP_OK], function(code, data) {
		var item = data.item;
		
		var h2 = $("<h2 />");
		h2.addClass("lessonTitle");
		h2.text(item.title);
		h2.appendTo(content);
			
		if (item.type == "ARTICLE") {
			content.css("padding", "60px");
			
			var d = $("<div />");
			d.html(markdown(item.text));
			d.appendTo(content);
			
			var q = $("<a />");
			q.addClass("next");
			q.text("Next Lesson");
			q.appendTo(content);
			
			q.click(function() {
				loadItem((id+1));
			});
			
		} else if (item.type == "QUIZ") {
			h2.addClass("quizTitle");
			content.css("padding", "0px");
			var p = $("<p />");
			p.html("For each question, choose the best answer. Don't worry&mdash;if you get it wrong, you can try again.");
			p.css({
				marginLeft: "60px",
				marginRight: "60px"
			});
			p.appendTo(content);
			
			var questions = shuffleQuestions(item.questions, item.questionsToShow);
			
			for (var i = 0; i < questions.length; i ++) {
				var question = questions[i];
				
				// display the question
				var c = $("<div />");
				c.addClass("question");
				c.css({
					marginLeft: "60px",
					marginRight: "60px"
				});
				c.appendTo(content);
				
				var p = $("<p />");
				p.addClass("title");
				p.text(question.text);
				p.appendTo(c);
				
				// answers
				for (var j = 0; j < question.displayAnswers.length; j ++) {
					var displayAnswer = question.displayAnswers[j];
					var a = $("<a />");
					a.addClass("answer");
					
					if ((j % 2) == 1) {
						a.addClass("odd");
					}
					
					a.text(displayAnswer[0] + " (correct=" + displayAnswer[1] + ")");
					a.data("isCorrect", displayAnswer[1]);
					a.appendTo(c);
					
					a.click(function() {
						$(this).parent().find("a").removeClass("selected");
						$(this).addClass("selected");
					});
				}
			}
			
			var button = $("<a />");
			button.addClass("button");
			button.html("Submit and Grade Quiz");
			button.appendTo(c);
			
			button.click(function() {
				dialog("Confirm Submission", "Are you sure you want to submit the quiz?", ["Cancel", "Submit Quiz"], function(submit) {
					if (submit) {
						// prepare data to send to the server
						var questions = [];
						
						$(".content").find(".question").each(function() {
							var q = {
								selectedAnswer: null,
								
								notSelectedAnswers: []
							};
							
							$(this).find(".answer").each(function() {
								if ($(this).hasClass("selected")) {
									q.selectedAnswer = {
										text: $(this).text(),
										correct: $(this).data("isCorrect")
									};
								} else {
									q.notSelectedAnswers.push({
										text: $(this).text(),
										correct: $(this).data("isCorrect")
									});
								}
							});
							
							questions.push(q);
						});
						
						apiWithLoading("Grading quiz...", "content/gradeQuiz", {quizID: id, quizType: "QUIZ", questions: JSON.stringify(questions)}, [RESP_OK], function(code, data) {
							if (data.passed) {
								dialog("Quiz Passed!", "Congratulations! You passed with a score of " + Math.floor(data.quizScore * 100) + "%!", ["Great!"], function() {
									alert("ok");
								});
							} else {
								dialog("Quiz Failed!", "Uh oh! You failed with a score of " + Math.floor(data.quizScore * 100) + "% (you need " + Math.floor(data.threshold * 100) + "% to pass).", ["Try Again"], function() {
									// start a new attempt
									loadItem(id);
								});
							}
						});
					}
				});
			});
		}
		
		updateScrollContainers($(".scroll"));
	});
}


function shuffleQuestions(questions, numQuestions) {
	return shuffleAnswers(pickQuestions(questions, numQuestions));
}

function pickQuestions(questions, numQuestions) {
	var pickedQuestions = [];
	numQuestions = Math.min(questions.length, numQuestions);
	
	for (var i = 0; i < numQuestions; i ++) {
		var j = Math.floor(Math.random() * questions.length);
		
		pickedQuestions.push(questions[j]);
		questions.remove(j);
	}
	
	return pickedQuestions;
}

function shuffleAnswers(questions) {
	for (var i = 0; i < questions.length; i ++) {
		var question = questions[i];
		question.displayAnswers = [];
		question.displayAnswers.push([question.correctAnswer, true]);
		
		for (var j = 0; j < question.incorrectAnswers.length; j ++) {
			question.displayAnswers.push([question.incorrectAnswers[j], false]);
		}
		
		question.displayAnswers.shuffle();
	}
	
	return questions;
}
