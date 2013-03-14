var selectedSchool = null;

function loadStudentData() {
	apiWithLoading("Loading student data...", "test/whoami", {}, [RESP_OK], function(code, data) {
		setScreen("user/portal");
	});
}

function isLoggedIn() {
	return localStorage["userToken"] ? true : false;
}

function logOut(dontChangeScreen) {
	delete localStorage["userToken"];
	
	if (! dontChangeScreen) {
		setScreen("user/login");
	}
}