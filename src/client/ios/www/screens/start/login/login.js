gui.screens["start/login"].data = {
	id: "start/login",
	hideTabBar: true,
	navBars: [{
		title: "Login"
	}],

	setup: function (contentManager) {
		$(".login").click(function () {
			var email = $(".email").val();
			var password = $(".password").val();

			apiWithLoading("Logging in...", "student/login", {
				email: email,
				password: password
			}, [RESP_OK, RESP_BAD_LOGIN_INFO], function (code, data) {
				if (code == RESP_OK) {
					localStorage["userToken"] = data.token;
					loadStudentData();
				} else if (code == RESP_BAD_LOGIN_INFO) {
					if (data.error == "PASSWORD") {
						dialog("Incorrect Password", "Your email is right, but that's the wrong password! Make sure you're using a student account (not a teacher account). Try again?", ["Oops!"]);
					} else if (data.error == "EMAIL") {
						dialog("Incorrect Email", "We don't recognize that email address. Try again?", ["Oops!"]);
					} else {
						// this shouldn't happen
						dialog("Unknown Error", "We weren't able to log you in for an unknown reason.", ["OK"]);
					}
				}
			});
		});

		$(".createAccount").click(function () {
			setScreen("start/school");
		});
	}
};
