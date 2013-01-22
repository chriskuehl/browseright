var APP_VERSION = "1.0";

// bootstrap the app
$(document).ready(function () {
	initialize();
	loadDefaultJavaScriptFiles(function() {
		startApp();
	});
});

// set up the app to a working state
function initialize() {
	initInterface();
}

// handle JS loading
function loadDefaultJavaScriptFiles(callback) {
	var files = [
		"js/app/start.js"
	];
	
	loadJavaScriptFiles(files, callback);
}

function loadJavaScriptFiles(files, callback) {
	Loader.script(files, {complete: callback});
}