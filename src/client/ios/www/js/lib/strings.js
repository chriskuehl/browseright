// http://stackoverflow.com/questions/646628/javascript-startswith
if (typeof String.prototype.startsWith != 'function') {
	String.prototype.startsWith = function(str) {
		return this.indexOf(str) == 0;
	};
}

if (typeof String.prototype.endsWith != 'function') {
	String.prototype.endsWith = function(str) {
		return this.slice(-str.length) == str;
	};
}

if (typeof String.prototype.contains != 'function') {
	String.prototype.contains = function(it) {
		return this.indexOf(it) != -1;
	};
}

http: //stackoverflow.com/questions/2390789/how-to-replace-all-points-in-a-string-in-javascript
/**
 * ReplaceAll by Fagner Brack (MIT Licensed)
 * Replaces all occurrences of a substring in a string
 */
String.prototype.replaceAll = function(token, newToken, ignoreCase) {
	var _token;
	var str = this + "";
	var i = -1;

	if (typeof token === "string") {

		if (ignoreCase) {

			_token = token.toLowerCase();

			while ((
			i = str.toLowerCase().indexOf(
			token, i >= 0 ? i + newToken.length : 0)) !== -1) {
				str = str.substring(0, i) +
					newToken +
					str.substring(i + token.length);
			}

		} else {
			return this.split(token).join(newToken);
		}

	}
	return str;
};
