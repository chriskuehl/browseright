// first action after loading
function startApp() {
	if (isLoggedIn()) {
		setScreen("user/login");
		
		loadStudentData(function(success) {
			if (success) {
				setScreen("user/progress");
			}
		});
	} else {
		setScreen("user/login");
	}
}
