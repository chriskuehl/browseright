var lessonSections = null;
var currentItem = null;
var takingQuiz = false;

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
				addSectionLesson(data.sections[i], i);
			}
			
			lessonSections = data.sections;
			
			if (data.sections.length > 0) {
				// load the first item
				currentItem = [(- 1), (- 1)];
				loadNextItem(true);
			}
		});
	},
	
	navBarReady: function() {
		gui.currentScreen.navBarTitles[0].text(currentCategoryTitle);
	}
};

function addSectionLesson(section, sectionIndex) {
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
		
		if (item.completed) {
			li.addClass("completed");
			li.addClass("ready");
		}
		
		if (item.type == "ARTICLE") {
			li.data("isArticle", true);
		}
		
		li.data({
			id: item.id,
			sectionIndex: sectionIndex,
			itemIndex: i
		});
		
		li.click(function() {
			if (! ($(this).hasClass("ready") || $(this).hasClass("completed")) || (currentItem[0] == $(this).data("sectionIndex") && currentItem[1] == $(this).data("itemIndex"))) {
				return;
			}
			
			var id = $(this).data("id");
			var sectionIndex = $(this).data("sectionIndex");
			var itemIndex = $(this).data("itemIndex");
			
			var change = function() {
				currentItem = [sectionIndex, itemIndex];
				loadItem(id);
			};
			
			if (takingQuiz) {
				dialog("Abandon Quiz?", "Are you sure you want to abandon your current quiz?", ["Cancel", "Abandon Quiz"], function(r) {
					if (r) {
						change();
					}
				});
			} else {
				change();
			}
		});
	}
}

function addClassToItem(id, cl) {
	var ff;
	
	$.each($(".nav").find("li"), function(idx, e) {
		var f = $(e);
		
		if (f.data("id") == id) {
			f.addClass(cl);
			ff = f;
		}
	});
	
	return ff;
}

function loadItem(id) {
	// update nav bar selection
	$(".nav").find("li").removeClass("current");
	var li = addClassToItem(id, "current");
	
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
		
		takingQuiz = (item.type == "QUIZ");
			
		if (! takingQuiz) {
			li.addClass("completed");
			readyNext();
			content.css("padding", "60px");
			
			var d = $("<div />");
			d.html(markdown(item.text));
			d.appendTo(content);
			
			var q = $("<a />");
			q.addClass("button");
			q.text("Next Lesson");
			q.appendTo(content);
			
			q.click(function() {
				loadNextItem(false);
			});
			
		} else if (takingQuiz) {
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
				p.html(markdownLittle(question.text));
				p.appendTo(c);
				
				// answers
				for (var j = 0; j < question.displayAnswers.length; j ++) {
					var displayAnswer = question.displayAnswers[j];
					var a = $("<a />");
					a.addClass("answer");
					
					if ((j % 2) == 1) {
						a.addClass("odd");
					}
					
					a.html(markdownLittle(displayAnswer[0])); // + " (correct=" + displayAnswer[1] + ")");
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
								addClassToItem(id, "completed");
								readyNext();
								dialog("Quiz Passed!", "Congratulations! You passed with a score of " + Math.floor(data.quizScore * 100) + "%!", ["Great!"], function() {
									loadNextItem(true);
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

// TODO: this shouldn't be done in the DOM...
function readyNext() {
	var hasFoundIncompleted = false;
	
	$(".nav").find("li").each(function() {
		if (hasFoundIncompleted) {
			return;
		}
		
		var li = $(this);
		
		if (! li.hasClass("completed") && ! li.hasClass("section")) {
			li.addClass("ready");
			hasFoundIncompleted = true;
		}
	});
}

function loadNextItem(skipCompleted) {
	while (true) {
		// increment current item
		if (currentItem[0] <= (- 1)) { // no current lesson
			currentItem = [0, 0]; // start at the first
		} else {
			currentItem = [currentItem[0], currentItem[1] + 1];
		}
		
		// does this section even exist?
		if (currentItem[0] > (lessonSections.length - 1)) {
			break; // we ran out of sections to check; there is no next item
		}
		
		// does this item exist?
		if (currentItem[1] > (lessonSections[currentItem[0]].items.length - 1)) {
			// no, so go to the next section
			currentItem = [currentItem[0] + 1, (- 1)];
			continue;
		}
		
		// item DOES exist, so load it
		var item = lessonSections[currentItem[0]].items[currentItem[1]];
		
		if (item.completed && skipCompleted) {
			continue;
		}
		
		return loadItem(item.id);
	}
	
	// there is no next item, so just load the first item
	currentItem = [0, 0];
	loadItem(lessonSections[0].items[0].id);
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
