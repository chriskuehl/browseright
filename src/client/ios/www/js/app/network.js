// response code constants
RESP_OK = 200;

RESP_MISSING_BAD_PARAMS = 400;
RESP_SET_PASSWORD_FIRST = 401;
RESP_BAD_LOGIN_INFO = 402;
RESP_LOGIN_FIRST = 403;
RESP_NOT_AVAILABLE = 404;
RESP_UPGRADE_APP = 406;
RESP_HIT_RATE_LIMIT = 429;

RESP_UNABLE_TO_PERFORM_command = 450;

RESP_SERVER_ERROR = 500;

// helper methods
function api(command, params, acceptableResponses, callback) {
	log("Making API request for \"" + command + "\".");
	
	if (localStorage.token) {
		log("Adding user token to request because user is logged in.");
		params.token = localStorage.token;
	}
	
	$.ajax({
		url: "https://browseright2.org/api/" + command,
		data: params,
		crossDomain: false,
		cache: false,
		
		success: function(data) {
			log("Received response for command \"" + command + "\".");
			
			if (acceptableResponses.indexOf(data.apiCode) > (- 1)) {
				// everything is normal
				log("Received acceptable response for command \"" + command + "\", executing callback...");
				callback(data.apiCode, data);
			} else {
				// soft error: something really weird, this really should not happen!
				log("!! Received unacceptable response for command \"" + command + "\", trying to recover...");
			}
		},
		
		error: function() {
			log("Encountered network error for command \"" + command + "\".");
			// hard error: internal server error, network down, etc.
			dialog("Network Error", "We encountered a network error. Please make sure your internet is working properly. Would you like to try again?", ["Cancel", "Try Again"], function(resp) {
				alert(resp);
			});
		}
	});
}