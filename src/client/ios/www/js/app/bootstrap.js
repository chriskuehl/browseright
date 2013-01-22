var APP_VERSION = "1.0";
var deviceReady = false;
var domReady = false;

// bootstrap the app
document.addEventListener("deviceready", function() {
	deviceReady = true;
	attemptStart();
});

$(document).ready(function () {
	domReady = true;
	attemptStart();
});

function attemptStart() {
	if (domReady && deviceReady) {
		setTimeout(start, 1000);
	}
}

function start() {
	initialize();
	
	loadDefaultJavaScriptFiles(function() {
		startApp();
	});
}

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