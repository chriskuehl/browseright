gui.screens["user/progress"].data = {
	id: "user/progress",
	navBars: [
		{
			title: "Progress"
		}
	],
    
    setup: function(contentManager) {
        $(".signout").click(function() {
			setScreen("start/login");
		});

    }
};