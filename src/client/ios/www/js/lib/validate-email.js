function isValidEmail(str) {
	var pattern = "^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$";
	return str.match(pattern);
}
