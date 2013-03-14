gui.screens["user/account"].data = {
	id: "user/account",
	navBars: [{
		title: "Account"
	}],

	parents: ["user/login"],

	setup: function (contentManager) {
		$(".signout").click(function () {
			logOut(false);
		});
	}
};
