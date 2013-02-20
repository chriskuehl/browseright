gui.screens["lesson/lesson"].data = {
	id: "lesson/lesson",
	navBars: [
		{
			title: "Category One",
			width: 1406
		},
		
		{
			title: "Progress"
		}
	],
	parents: ["lesson/category"],
	
	setup: function(contentManager) {
		$(".lessonTitle").click(function() {
			setScreen("lesson/category");
		});
	}
};