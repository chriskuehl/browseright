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
