// first action after loading
function startApp() {
	if (isLoggedIn()) {
		setScreen("user/login");
		
		loadStudentData(function(success) {
			if (success) {
				setScreen("lesson/category");
			}
		});
	} else {
		setScreen("user/login");
	}
}
