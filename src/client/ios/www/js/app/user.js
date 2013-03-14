var selectedSchool = null;
var userInfo = null;

function loadStudentData(callback) {
	log("Loading student data...");
	
	apiWithLoading("Loading student data...", "user/info", {}, [RESP_OK, RESP_LOGIN_FIRST], function(code, data) {
		if (code == RESP_OK) {
			log("Successfully loaded student data.");
			
			userInfo = data.info;
			
			if (callback) {
				callback(true);
			}
		} else {
			// something went wrong, so reset the user token
			log("Failed to load student data, code: " + code);
			log("    (this usually means the token expired)");
			
			delete localStorage["userToken"];
			
			if (callback) {
				callback(false);
			}
		}
	});
}

function isLoggedIn() {
	return localStorage["userToken"] ? true : false;
}

function logOut(dontChangeScreen) {
	delete localStorage["userToken"];

	if (!dontChangeScreen) {
		setScreen("user/login");
	}
}
