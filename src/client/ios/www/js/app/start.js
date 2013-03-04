// first action after loading (can be overwritten by a server-loaded JS file, which is why this is separated)
function startApp() {
	if (isLoggedIn()) {
		setScreen("lesson/category");
	} else {
		setScreen("start/login");
	}
	
	api("test/test", {fromApp: true}, [RESP_OK], function(status, data) {
		alert("Status [" + status + "], data: " + JSON.stringify(data));
	});
	
	// setScreen("dev/console");
}