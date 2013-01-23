// handles core features (e.g. logging)
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
	
	console.log(msg);
}