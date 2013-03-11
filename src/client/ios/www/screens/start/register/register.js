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
			
			
			
			setScreen("user/portal");
		});
	}
};