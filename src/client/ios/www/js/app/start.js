// first action after loading (can be overwritten by a server-loaded JS file, which is why this is separated)
function startApp() {
	if (true || isLoggedIn()) {
		setScreen("lesson/category");
	} else {
		loadStudentData();
	}
	
	//api("test/test", {fromApp: true}, [RESP_OK], function(status, data) {
	//	alert("Status [" + status + "], data: " + JSON.stringify(data));
	//});
	
	// setScreen("dev/console");
}