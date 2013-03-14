// first action after loading (can be overwritten by a server-loaded JS file, which is why this is separated)

function startApp() {
	if (isLoggedIn()) {
		setScreen("user/login");
		
		loadStudentData(function() {
			setScreen("lesson/categories");
		});
	} else {
		setScreen("user/login");
	}
}
