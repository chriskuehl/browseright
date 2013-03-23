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
	
	// TODO: remove this
	/*
	var str = "";
	
	for (var i = 0; i < 255; i ++) str += "0";
	
	localStorage["userToken"] = str; */
	
	if (localStorage["userToken"]) {
		log("Adding user token to request because user is logged in.");
		params.token = localStorage["userToken"];
	} 
	
	params.temp = Math.floor(Math.random() * 10000000);

	$.ajax({
		url: (false ? "http://10.0.0.10:8080/BrowseRight/api/" : "https://browseright.org/api/") + command,
		data: params,
		crossDomain: false,
		cache: false,
		timeout: 5000,
		type: "POST",
		
		success: function(data) {
			log("Received response for command \"" + command + "\".");
			
			if (acceptableResponses.indexOf(data.apiCode) > (-1)) {
				// everything is normal
				log("Received acceptable response for command \"" + command + "\", executing callback...");
				callback(data.apiCode, data);
			} else {
				// soft error: something really weird, this really should not happen!
				log("!!!! Received unacceptable response for command \"" + command + "\", trying to recover...");
				log("     response code: " + data.apiCode);
				log("     error (if any): " + (data.error ? data.error : "(none)"));
				
				if (data.apiCode == RESP_UPGRADE_APP) {
					dialog("Upgrade App", "To use BrowseRight, please download the latest update from the App Store.", ["Will do!"]);
				}
				
				networkReset();
			}
		},

		error: function() {
			// hard error: internal server error, network down, etc.
			log("Encountered network error for command \"" + command + "\".");

			dialog("Network Error", "We encountered a network error. Please make sure your internet is working properly. Would you like to try again?", ["Cancel", "Try Again"], function(tryAgain) {
				if (tryAgain) {
					// recurse
					api(command, params, acceptableResponses, callback);
				} else {
					networkReset();
				}
			});
		}
	});
}

// convenience function for API requests with a loading screen

function apiWithLoading(text, command, params, acceptableResponses, callback) {
	showLoading(text);

	api(command, params, acceptableResponses, function(code, data) {
		callback(code, data);
		hideLoading();
	});
}

function networkReset() {
	log("Resetting application.");
	
	delete localStorage["userToken"];
	hideLoading();
	setScreen("user/login");
}
