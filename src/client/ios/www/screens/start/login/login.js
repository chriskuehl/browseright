gui.screens["start/login"].data = {
	id: "start/login",
	//hideTabBar: true,
		
	setup: function(contentManager) {
		$(".login").click(function() {
			setScreen("test/one");
		});
	}
};