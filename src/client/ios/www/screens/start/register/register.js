gui.screens["start/register"].data = {
	id: "start/register",
	hideTabBar: true,
    navBars: [
        {
            title: "Create an Account",
            
            buttons: {
				left: {
					type: "back",
					title: "Select school",
					action: function() {
						setScreen("start/school");
					}
				}
			}
        }
    ],
		
	setup: function(contentManager) {
		$(".create").click(function() {
			setScreen("user/portal");
		});
	}
};