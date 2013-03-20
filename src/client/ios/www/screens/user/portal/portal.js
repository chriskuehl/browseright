gui.screens["user/portal"].data = {
	id: "user/portal",
	hideTabBar: true,
	navBars: [{
		title: "Welcome"
	}],

	parents: ["user/login"],

	setup: function(contentManager) {
		$(".next").click(function() {
			setScreen("lesson/category");
		});
	}
};
