// first action after loading (can be overwritten by a server-loaded JS file, which is why this is separated)

function startApp() {
	if (isLoggedIn()) {
		setScreen("user/login");
		
		loadStudentData(function(success) {
			if (success) {
				// temp:
				currentCategory = "reputation";
				currentCategoryTitle = "Your Online Reputation";
				setScreen("lesson/lesson");
			}
		});
	} else {
		setScreen("user/login");
	}
}
