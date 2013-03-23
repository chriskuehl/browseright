gui.screens["user/progress"].data = {
	id: "user/progress",
	navBars: [{
		title: "Progress"
	}],

	setup: function(contentManager) {
		// TODO: use contentManager for this
		// TODO: incorporate JS magic tokens
		registerScrollContainers($(".scroll"));
		
		// load user information
		loadStudentData(function() {
			updateTotalProgress();
		});
	}
};

function updateTotalProgress() {
	// calculate category and lesson percentages
	var thresholdLesson = (userInfo.school.quizPassThreshold * 100);
	var thresholdCat = (userInfo.school.reviewPassThreshold * 100);
	$(".percentageLesson").text(thresholdLesson + "%");
	$(".percentageCategory").text(thresholdCat + "%");
	
	// calculate and insert total progress
	var totalProgressPercent = ((0 + userInfo.totalProgress) * 100);
	totalProgressPercent = Math.floor(totalProgressPercent);
	$(".percent").text(totalProgressPercent + "%");
}
