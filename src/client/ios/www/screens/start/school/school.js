gui.screens["start/school"].data = {
	id: "start/school",
	hideTabBar: true,
    navBars: [
        {
            title: "Select Your School",
            
            buttons: {
				left: {
					type: "back",
					title: "Login",
					action: function() {
						setScreen("start/login");
					}
				}
			}
        }
    ],
		
	setup: function(contentManager) {
		$(".next").click(function() {
			setScreen("start/register");
		});
	}
};