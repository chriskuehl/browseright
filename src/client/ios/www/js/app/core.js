// handles core features (e.g. logging)
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