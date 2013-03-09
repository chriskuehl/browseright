gui.screens["user/progress"].data = {
	id: "user/progress",
	navBars: [{
		title: "Progress"
	}],

	setup: function (contentManager) {
		// TODO: use contentManager for this
		// TODO: incorporate JS magic tokens
		registerScrollContainers($(".scroll"));
	}
};
