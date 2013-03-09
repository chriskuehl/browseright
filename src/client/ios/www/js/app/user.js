function loadStudentData() {
	apiWithLoading("Loading student data...", "test/whoami", {}, [RESP_OK], function(code, data) {
		alert(JSON.stringify(data));
		setScreen("start/login");
	});
}

function isLoggedIn() {
	return localStorage["token"] ? true : false;
}

function logOut() {
	delete localStorage["token"];
}
