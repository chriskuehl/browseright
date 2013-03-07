gui.screens["start/login"].data = {
	id: "start/login",
	hideTabBar: true,
    navBars: [
        {
            title: "Login"
        }
    ],
		
	setup: function(contentManager) {
		$(".login").click(function() {
			setScreen("user/portal");
		});
		
		$(".createAccount").click(function() {
			setScreen("start/school");
		});
	}
};