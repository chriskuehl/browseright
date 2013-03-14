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
		$(".lessonTitle").click(function() {
			setScreen("lesson/category");
		});

		// TODO: Fix this
		registerScrollContainers($(".scroll"));
	}
};
