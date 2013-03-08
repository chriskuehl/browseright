function loadStudentData() {
	//apiWithLoading("Loading student data...", "student/login", {}, [RESP_OK], function(code, data) {
	//	setScreen("start/login");
	//});
}

function isLoggedIn() {
	return localStorage["token"] ? true : false;
}

function logOut() {
	delete localStorage["token"];
}