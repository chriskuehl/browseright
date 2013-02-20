gui.screens["user/account"].data = {
	id: "user/account",
	navBars: [
		{
			title: "Account"
		}
	],
	
	parents: ["start/login"],
    
    setup: function(contentManager) {
        $(".signout").click(function() {
			setScreen("start/login");
		});

    }
};