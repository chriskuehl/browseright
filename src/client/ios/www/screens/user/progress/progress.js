gui.screens["user/progress"].data = {
	id: "user/progress",
	navBars: [{
		title: "Progress"
	}],

	setup: function(contentManager) {
		// TODO: use contentManager for this
		// TODO: incorporate JS magic tokens
		registerScrollContainers($(".scroll"));
		
		//calculate category and lesson percentages
		var thresholdLesson = (userInfo.school.quizPassThreshold * 100);
		var thresholdCat = (userInfo.school.reviewPassThreshold * 100);
		$(".percentageLesson").text(thresholdLesson + "%");
		$(".percentageCategory").text(thresholdCat + "%");
	}
};

function addSection(category, completed, street1, street2) {
	$("<div />").addClass(".category");
	$("<div />").addClass(".title").text(category);
	var ul = $(".category").find("ul");
	var li = $("<li />");
	$("<li />").addClass("section").text(street1).appendTo(a);
	$("<p />").addClass("address").text(street2).appendTo(a);

	li.appendTo(ul);
}
