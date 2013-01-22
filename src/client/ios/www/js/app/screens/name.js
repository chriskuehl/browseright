var demoName = null;
var screenName = {
	id: "name",
	title: "Preferred Name",
	parent: "portrait",

	titleButton: {
		text: "Cancel",
		event: function () {
			navigator.notification.alert("Are you sure you want to go back? Any changes you've made will not be saved.", function (response) {
				if (response == 2) {
					setScreen(screenPortrait);
				}
			}, "Return to Portal", "Stay Here,Go Back");
		}
	},

	setup: function (container) {
		container.css({
			backgroundColor: "rgba(253, 249, 207, 0.2)",
			boxShadow: "inset 0px 0px 900px rgba(253, 249, 207, 0.8)"
		});

		var loginDetails = getLoginDetails();
		var backupName = userInfo.FirstName ? userInfo.FirstName + " " + userInfo.LastName : "John Doe";
		var name = userInfo.PreferredName ? userInfo.PreferredName : backupName;

		// intro
		var introText = $("<p />");
		introText.appendTo(container);
		introText.css({
			textAlign: "center",
			fontSize: "38px",
			lineHeight: "1.6em",
			margin: "50px",
			color: "rgba(0, 0, 0, 0.7)"
		});
		introText.html("Please enter your name exactly as you want it to appear in the yearbook next to your senior portrait.");

		// name holder
		var nameHolder = $("<div />");
		nameHolder.appendTo(container);
		nameHolder.css({
			marginLeft: "auto",
			marginRight: "auto",
			width: "1800px"
		});

		// name
		var inputName = $("<input type=\"text\" />");
		inputName.appendTo(nameHolder);
		inputName.attr({
			name: "inputName",
			placeHolder: "John Doe",
			autoCorrect: "off"
		});
		inputName.css({
			fontSize: "72px",
			padding: "10px",
			width: "1350px",
			marginRight: "10px",
			padding: "20px"
		});
		inputName.val(name);
		inputName.keyup(function () {
			demoName.html($(this).val().replace(/ /g, "<br />"));
		});

		// submit
		var submit = $("<input type=\"button\" />");
		submit.appendTo(nameHolder);
		submit.css({
			fontSize: "68px",
			backgroundColor: "rgba(100, 100, 0, 0.1)"
		});
		submit.val("Confirm");

		submit.click(function () {
			// validate the name they've entered
			var valid = true;
			var invalidReason;

			var name = inputName.val().trim();
			var words = name.split(" ");

			if (words.length < 2 || words.length > 4) {
				valid = false;
				invalidReason = "Please enter only your first name and last name. You should only enter more if you go by two or more names (such as \"Sarah Jane Smith\"). See the tips below for more details.";
			}

			if (!valid) {
				return navigator.notification.alert(invalidReason, null, "Invalid Name", "Oops!");
			}

			// name was valid, so upload it to the server
			updateInformation({
				path: "c-name.php",
				data: {
					user: getLoginDetails().user,
					token: localStorage.loginToken,
					name: name
				}
			});
		});

		// submit by enter on input field
		inputName.keypress(function (e) {
			if (e.which == 13) {
				submit.click();
				$(this).blur(); // hide the iPad keyboard

				e.preventDefault();
				return false;
			}
		});

		// tips holder
		var tipsHolder = $("<div />");
		tipsHolder.appendTo(container);
		tipsHolder.css({
			marginLeft: "130px",
			marginTop: "70px",
			width: "900px",
			"float": "left"
		});

		// tips header
		var tipsHeader = $("<h2 />");
		tipsHeader.appendTo(tipsHolder);
		tipsHeader.css({
			fontFamily: "\"Helvetica Neue Bold\", \"HelveticaNeue-Bold\"",
			fontSize: "36px"
		});
		tipsHeader.text("Name Instructions:");

		// tips list
		var tipsList = $("<ul />");
		tipsList.appendTo(tipsHolder);
		tipsList.css({
			//listStyle: "disc outside none",
			marginTop: "10px"
		});

		var tips = [
			"You <strong>must</strong> use your first name (the name you go by) and your full, legal last name.",
			"Do <strong>not</strong> include your middle name, unless you go by two first names.",
			"Enter your name exactly as you want it to appear in the book, including spelling, spaces, punctuation, and capitalization.",
			"You don't have to use your legal first name, but you must use your legal last name."];

		for (var i = 0; i < tips.length; i++) {
			var tip = tips[i];

			var li = $("<li />");
			li.appendTo(tipsList);
			li.css({
				fontSize: "36px",
				//textIndent: "60px",
				//marginLeft: "80px",
				lineHeight: "1.4em",
				marginBottom: "30px"
			});
			li.html(tip);
		}

		// demo holder
		var demoHolder = $("<div />");
		demoHolder.appendTo(container);
		demoHolder.css({
			marginRight: "130px",
			marginTop: "70px",
			width: "800px",
			"float": "right"
		});

		var demoHeader = $("<h2 />");
		demoHeader.appendTo(demoHolder);
		demoHeader.css({
			fontFamily: "\"Helvetica Neue Bold\", \"HelveticaNeue-Bold\"",
			fontSize: "48px",
			color: "rgba(0, 0, 0, 0.3)"
		});
		demoHeader.text("EXAMPLE");

		var demoBox = $("<div />");
		demoBox.appendTo(demoHolder);
		demoBox.css({
			border: "solid 6px rgba(0, 0, 0, 0.4)",
			width: "748px",
			padding: "20px",
			marginTop: "20px",
			backgroundColor: "rgb(100, 100, 100)"
		});

		var demoPortrait = $("<div />");
		demoPortrait.appendTo(demoBox);
		demoPortrait.css({
			"float": "left",
			border: "solid 4px rgba(0, 0, 0, 0.5)",
			width: "300px",
			height: "400px",
			backgroundColor: "rgb(200, 200, 200)",
			backgroundImage: "url(css/assets/executive.png)",
			backgroundRepeat: "none",
			backgroundPosition: "50% 0%"
		});

		var demoInfo = $("<div />");
		demoInfo.appendTo(demoBox);
		demoInfo.css({
			"float": "right",
			width: "400px"
		});

		demoName = $("<h3 />"); // this is global because we're on a deadline!
		demoName.appendTo(demoInfo);
		demoName.css({
			color: "white",
			fontFamily: "\"Helvetica Neue Bold\", \"HelveticaNeue-Bold\"",
			fontSize: "56px",
			textTransform: "uppercase"
		});
		demoName.html(name.replace(/ /g, "<br />"));

		var demoQuote = $("<p />");
		demoQuote.appendTo(demoInfo);
		demoQuote.css({
			color: "white",
			fontSize: "28px",
			marginTop: "20px",
			lineSpacing: "1.5em"
		});
		demoQuote.html("\"This is an example quote which will be replaced by your real quote in the book.\"<br />&ndash;John Doe");

		var demoSignature = $("<img />");
		demoSignature.appendTo(demoInfo);
		demoSignature.attr({
			src: "css/assets/jdoe.png",
			width: "292",
			height: "57"
		});
		demoSignature.css({
			marginTop: "40px"
		});

		// end demo box
		var clear = $("<div />");
		clear.appendTo(demoBox);
		clear.css("clear", "both");

		// reminder/disclaimer about example
		var exampleReminder = $("<p />");
		exampleReminder.appendTo(demoHolder);
		exampleReminder.css({
			marginTop: "7px",
			fontSize: "22px",
			lineHeight: "1.4em"
		});
		exampleReminder.html("This example is only to help you visualize layout. The picture, quote, and signature are placeholders. Don't worry about your name fitting on the lines&ndash;they are not the actual size as they will be in the book. We will make sure your name fits!");
	}
};
