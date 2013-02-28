// handles core features (e.g. logging, device management)

// device management and state
var ready = false;
var online = false;

document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("online", onDeviceOnline, false);
document.addEventListener("offline", onDeviceOffline, false);
document.addEventListener("pause", onDevicePaused, false);
document.addEventListener("resume", onDeviceResumed, false);

function onDeviceReady() {
	log("Device is ready.");
	
	ready = true;
	attemptInitialization();
}

function onDeviceOnline() {
	log("Device is online.");
	
	online = true;
	attemptInitialization();
}

function onDeviceOffline() {
	log("Device is offline.");
	
	online = false;
	attemptInitialization();
}

function onDevicePaused() {
	log("Device has been paused.");
}

function onDeviceResumed() {
	log("Device has been resumed.");
}

function attemptInitialization() {
	// TODO: initialize
}

// check user agent for testing on PC
if (PLATFORM == PLATFORM_PC) {
	// simulate normal events
	onDeviceReady();
	onDeviceOnline();
}

// logging
var logRecord = "Welcome to the BrowseRight console.";

function dd(str) {
	str = str.toString();
	
	if (str.length < 2) {
		return "0" + str;
	}
	
	return str;
}

function log(msg) {
	var now = new Date();
	msg = "[" + dd(now.getHours()) + ":" + dd(now.getMinutes()) + ":" + dd(now.getSeconds()) + "]: " + msg;
	
	logRecord += "<br />" + msg;
	console.log(msg);
	
	var logs = $(".logContainer");
	
	if (logs[0]) {
		logs.html(logRecord);
		logs.scrollTop(logs[0].scrollHeight);
	}
}