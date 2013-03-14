gui.screens["dev/console"].data = {
	id: "dev/console",
	navBars: [{
		title: "Developer Console"
	}],

	setup: function(contentManager) {
		var logs = $(".logContainer");

		logs.html(logRecord);
		logs.scrollTop(logs[0].scrollHeight);
	}
};
