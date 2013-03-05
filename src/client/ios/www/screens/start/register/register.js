gui.screens["start/register"].data = {
	id: "start/register",
	hideTabBar: true,
    navBars: [
        {
            title: "Create an Account"
        }
    ],
		
	setup: function(contentManager) {
		$(".createAccount").click(function() {
			setScreen("start/login");
		});
		
		$(".login").click(function() {
			setScreen("user/portal");
		});
	}
};