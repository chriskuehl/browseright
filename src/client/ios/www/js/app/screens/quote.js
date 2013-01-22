var screenQuote = {
	id: "quote",
	title: "Featured Quote",
	parent: "portrait",

	titleButton: {
		text: "Cancel",
		event: function () {
			navigator.notification.alert("Are you sure you want to go back? This will revert your quote to its previous state.", function (response) {
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

		// intro text
		var introText = $("<p />");
		introText.appendTo(container);
		introText.css({
			textAlign: "center",
			fontSize: "38px",
			lineHeight: "1.6em",
			margin: "50px",
			color: "rgba(0, 0, 0, 0.7)"
		});
		introText.html("Tap the area below to edit your quote. Keep it appropriate&ndash;otherwise, we'll draw a frowny face next to your portrait. Be creative and remember to give credit to the person who originally said it, unless that was you. If your quote is in a language other than English, consider including a translation.");

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
			height: "300px",
			fontSize: "44px",
			padding: "20px",
			lineHeight: "1.6em"
		});
		textArea.attr({
			placeholder: "\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vitae nisi tortor, ac posuere massa. Etiam suscipit dolor at mi tincidunt dignissim. In hac habitasse platea dictumst.\" —Dan Ruff"
		});
		textArea.val(userInfo.Quote ? userInfo.Quote : "");

		// submit button
		var submit = $("<input type=\"button\" />");
		submit.appendTo(textAreaHolder);
		submit.css({
			fontSize: "68px",
			backgroundColor: "rgba(100, 100, 0, 0.1)",
			textAlign: "center",
			marginTop: "100px"
		});
		submit.val("Submit Quote");

		submit.click(function () {
			var quote = textArea.val();

			if (quote.length <= 0) {
				return navigator.notification.alert("Please fill in a quote! If you're not ready to submit your quote, hit cancel at the top-right of the screen.", null, "Empty Quote", "Oops!");
			}

			// name was valid, so upload it to the server
			updateInformation({
				path: "c-quote.php",
				data: {
					user: getLoginDetails().user,
					token: localStorage.loginToken,
					quote: quote
				}
			});
		});
	}
};
