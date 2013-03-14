gui.screens["user/register"].data = {
	id: "user/register",
	hideTabBar: true,
	navBars: [{
		title: "Create an Account",

		buttons: {
			left: {
				type: "back",
				title: "Select a School",
				action: function () {
					setScreen("user/school");
				}
			}
		}
	}],

	parents: ["user/school"],

	setup: function (contentManager) {
		if (selectedSchool == null) {
			dialog("Select a School", "Please select a school first!", ["OK"], function () {
				setScreen("user/login");
			});

			return;
		}

		// login by enter on input fields
		$("input").keypress(function (e) {
			if (e.which == 13) {
				$(".create").click();
				$(this).blur(); // hide the iPad keyboard

				e.preventDefault();
				return false;
			}
		});

		$(".schoolUN").val(selectedSchool.name);

		$(".create").click(function () {
			var first = $(".first").val();
			var last = $(".last").val();
			var email = $(".email").val();
			var emailC = $(".confirmEmail").val();
			var password = $(".password").val();
			var passwordC = $(".confirmPassword").val();

			if (email != emailC) {
				return dialog("Confirm Email", "Make sure your email matches.", ["OK"]);
			}

			if (password != passwordC) {
				return dialog("Confirm Password", "Make sure your password matches.", ["OK"]);
			}

			apiWithLoading("Registering account...", "student/create", {
				firstName: first,
				lastName: last,
				email: email,
				password: password
			}, [RESP_OK, RESP_MISSING_BAD_PARAMS], function (code, data) {
				if (code == RESP_OK) {
					setScreen("user/portal");
				} else if (code == RESP_MISSING_BAD_PARAMS) {
					dialog("Registration Error", "The " + errorToEnglish(data.error, " you entered") + ".", ["OK"]);
				}
			});
		});
	}
};
