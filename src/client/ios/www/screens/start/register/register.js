gui.screens["start/register"].data = {
	id: "start/register",
	hideTabBar: true,
    navBars: [
        {
            title: "Create an Account"
        }
    ],
		
	setup: function(contentManager) {
		$(".create").click(function() {
			setScreen("user/portal");
		});
	}
};