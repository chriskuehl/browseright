gui.screens["start/register"].data = {
	id: "start/register",
	hideTabBar: true,
	navBars: [{
		title: "Enter Your Information",

		buttons: {
			left: {
				type: "back",
				title: "Select School",
				action: function () {
					setScreen("start/school");
				}
			}
		}
	}],

	parents: ["start/school"],

	setup: function (contentManager) {
		$(".create").click(function () {
			setScreen("user/portal");
		});
	}
};
