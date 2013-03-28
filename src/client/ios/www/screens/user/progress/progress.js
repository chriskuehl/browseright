gui.screens["user/progress"].data = {
	id: "user/progress",
	navBars: [{
		title: "Progress"
	}],

	setup: function(contentManager) {
		// load user information
		loadStudentData(function() {
			updateTotalProgress();
			
			// TODO: this is an absolute mess
			var categories = ["reputation", "relationships", "etiquette"];
			
			for (var k = 0; k < categories.length; k ++) {
				(function() {
					var kk = k;
					apiWithLoading("Loading progress...", "content/category", {uid: categories[k]}, [RESP_OK], function(code, data) {
						var list = $($(".progress.reputation")[kk]);
						
						for (var i = 0; i < data.sections.length; i ++) {
							var section = data.sections[i];
							var li = $("<li />");
							li.text(section.title);
							li.addClass("section");
							li.appendTo(list);
							
							for (var j = 0; j < section.items.length; j ++) {
								var item = section.items[j];
								
								var li2 = $("<li />");
								li2.text(item.title);
								
								if (item.completed) {
									li2.addClass("completed");
								}
								
								li2.appendTo(list);
							}
						}
						
						$(".scroll").hide().fadeIn(250);
						registerScrollContainers($(".scroll"));
						updateScrollContainers($(".scroll"));
					});
				})();
			}
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
