gui.screens["lesson/category"].data = {
	id: "lesson/category",
	navBars: [{
		title: "Categories"
	}],

	setup: function(contentManager) {
		$($(".category")[0]).click(function() {
			setScreen("lesson/lesson");
		});
	}
};
