function loadStudentData() {
	apiWithLoading("Loading student data...", "test/whoami", {}, [RESP_OK], function(code, data) {
		setScreen("user/portal");
	});
}

function isLoggedIn() {
	return localStorage["userToken"] ? true : false;
}

function logOut() {
	delete localStorage["userToken"];
}
