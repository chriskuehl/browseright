var APP_VERSION = "1.0";
var PLATFORM; // not really a constant, but it acts like one for everyone else
var PLATFORM_IOS = 0;
var PLATFORM_ANDROID = 1;
var PLATFORM_PC = 2;
var DEVELOPER = localStorage.developer == "true";

var deviceReady = false;
var domReady = false;

// bootstrap the app
document.addEventListener("deviceready", function() {
	deviceReady = true;
	attemptStart();
});

$(document).ready(function () {
	PLATFORM = determinePlatform();
	
	preload([
		"css/assets/navbar-back-active.png",
		"css/assets/navbar-back-back-l-active.png",
		"css/assets/navbar-back-back-l.png",
		"css/assets/navbar-back-l-active.png",
		"css/assets/navbar-back-l.png",
		"css/assets/navbar-back-r-active.png",
		"css/assets/navbar-back-r.png",
		"css/assets/navbar-back.png",
		"css/assets/navbar-separator.png",
		"css/assets/navbar.png"
	]);
	
	domReady = true;
	attemptStart();
});

function determinePlatform() {
	if (navigator.userAgent.toLowerCase().indexOf('chrome') > (- 1)) {
		return PLATFORM_PC;
	}
	
	return PLATFORM_IOS;
}

function attemptStart() {
	if (domReady && deviceReady || (domReady && ! deviceReady && PLATFORM == PLATFORM_PC)) {
		start();
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