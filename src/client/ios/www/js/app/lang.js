// it's only necessary to define fields that can't be inferred (e.g. multi-word fields)
var errorFields = {
	FIRSTNAME: "first name",
	LASTNAME: "last name"
};

var failureFields = {
	TOOSMALL: "too short",
	TOOLARGE: "too long",
	BLANK: "empty",
	UNIQUE: "already used",
	INVALID: "invalid",
	NULL: "empty",
	EMPTY: "empty"
};

// errors are in a format like "PASSWORD_SIZE.TOOSMALL"
// explanation here: http://static.springsource.org/spring/docs/2.5.x/api/org/springframework/validation/DefaultMessageCodesResolver.html
// this returns "password is too small" with option for field suffix for e.g. "password you entered is too small"
function errorToEnglish(error, fieldSuffix) {
	var parts = error.split(".");
	var fieldAndConstraint = parts[0].split("_");
	var field = fieldAndConstraint[0];
	var constraint = fieldAndConstraint[1];
	var failure = parts.length >= 2 ? parts[1] : null;
	
	var str = fieldToEnglish(field) + (fieldSuffix ? fieldSuffix : "") + " is " + failureToEnglish(failure != null ? failure : constraint);
	
	return str;
}

function fieldToEnglish(field) {
	if (errorFields[field]) {
		return errorFields[field];
	}
	
	return field.toLowerCase();
}

function failureToEnglish(failure) {
	if (failureFields[failure]) {
		return failureFields[failure];
	}
	
	return "invalid";
}
