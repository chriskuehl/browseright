var screenContact = {
	id: "contact",
	title: "Contact Yearbook",
	parent: "help",

	titleButton: {
		text: "Back to My Yearbook",
		event: function () {
			setScreen(screenHelp);
		}
	},

	setup: function (container) {
		container.css({
			backgroundColor: "rgba(253, 249, 207, 0.2)",
			boxShadow: "inset 0px 0px 900px rgba(253, 249, 207, 0.8)"
		});

		var introText = $("<p />");
		introText.appendTo(container);
		introText.css({
			textAlign: "center",
			fontSize: "38px",
			lineHeight: "1.6em",
			margin: "50px",
			color: "rgba(0, 0, 0, 0.7)"
		});
		introText.html("If you're having issues purchasing a yearbook, placing an advertisement, or with any other yearbook-related task, you can use this form to send an email to a yearbook staff member.");
		
		// name holder
		var nameHolder = $("<div />");
		nameHolder.appendTo(container);
		nameHolder.css({
			marginLeft: "auto",
			marginRight: "auto",
			width: "1640px"
		});

		// name
		var inputEmail = $("<input type=\"email\" />");
		inputEmail.appendTo(nameHolder);
		inputEmail.attr({
			placeHolder: "person@example.com (your email address)",
			autoCorrect: "off",
			autoCapitalize: "off"
		});
		inputEmail.css({
			fontSize: "48px",
			width: "1600px",
			padding: "20px",
			marginBottom: "40px"
		});
		inputEmail.val(userInfo.Email);
		
		// text field
		var textAreaHolder = $("<div />");
		textAreaHolder.appendTo(container);
		textAreaHolder.css({
			textAlign: "center"
		});

		var textArea = $("<textarea />");
		textArea.appendTo(textAreaHolder);
		textArea.css({
			width: "1600px",
			height: "500px",
			fontSize: "44px",
			padding: "20px",
			lineHeight: "1.6em"
		});
		textArea.attr({
			placeholder: ""
		});
		textArea.val("");

		// submit button
		var submit = $("<input type=\"button\" />");
		submit.appendTo(textAreaHolder);
		submit.css({
			fontSize: "44px",
			backgroundColor: "rgba(100, 100, 0, 0.1)",
			textAlign: "center",
			marginTop: "100px"
		});
		submit.val("Submit Message");

		submit.click(function () {
			var suggestion = textArea.val();

			if (suggestion.length <= 0) {
				return navigator.notification.alert("Please fill in a message! If you're not ready to submit a message, hit cancel at the top-right of the screen.", null, "Empty Message", "Oops!");
			}
			
			if (! validateEmail(inputEmail.val())) {
				return navigator.notification.alert("Please enter a valid email address!", null, "Invalid Email Address", "Oops!");
			}

			// name was valid, so upload it to the server
			updateInformation({
				path: "message.php",
				data: {
					user: getLoginDetails().user,
					email: inputEmail.val(),
					token: localStorage.loginToken,
					suggestion: suggestion
				}
			});
		});
	}
};

// http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 
