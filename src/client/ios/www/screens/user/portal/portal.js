gui.screens["user/portal"].data = {
	id: "user/portal",
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
