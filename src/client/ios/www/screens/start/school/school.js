gui.screens["start/school"].data = {
	id: "start/school",
	hideTabBar: true,
    navBars: [
        {
            title: "Select Your School"
        }
    ],
		
	setup: function(contentManager) {
		$(".next").click(function() {
			setScreen("start/register");
		});
	}
};