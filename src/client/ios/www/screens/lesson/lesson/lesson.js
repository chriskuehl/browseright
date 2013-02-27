gui.screens["lesson/lesson"].data = {
	id: "lesson/lesson",
	navBars: [
		{
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
				
				right: {
					type: "action",
					title: "Do not tap!",
					action: function() {
						alert("I asked you not to tap me!");
					}
				}
			}
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
		// TODO: Fix this
		registerScrollContainers($(".scroll"));
	}
};