gui.screens["lesson/quiz"].data = {
	id: "lesson/quiz",
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
			},
		}

	},

	{
		title: "Progress"
	}],

	parents: ["lesson/category"],


	setup: function(contentManager) {

	}
};
