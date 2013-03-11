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
    
    parents: ["start/school"],
		
	setup: function(contentManager) {
		$(".create").click(function() {
				
			var first = $(".first").val();
			var last = $(".last").val();
			var email = $(".email").val();
			var emailC = $(".confirmEmail").val();
			var password = $(".password").val();
			var passwordC = $(".confirmPassword").val();

			if (email != emailC) {
				return dialog("Make sure your email matches.", ["OK"]);
			}
			
			if (password != passwordC) {
				return dialog("Make sure your password matches.", ["OK"]);
			}
			
			apiWithLoading("Registering account...", "student/create", {firstName: first, lastName: last, email: email, password: password}, [RESP_OK, RESP_MISSING_BAD_PARAMS], function(code, data) {
				if (code == RESP_OK) {
					setScreen("user/portal");					
				} else if (code == RESP_MISSING_BAD_PARAMS) {
					dialog(data.error, ["OK"]);
				}
			});
		});
	}
};