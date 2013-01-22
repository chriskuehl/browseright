var screenPortrait = {
	id: "portrait",
	title: "My Portrait and Information",
	parent: "portal",

	titleButton: {
		text: "Back to Portal",
		event: function () {
			setScreen(screenPortal);
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
		introText.html("To make your yearbook portrait more personal, tap on one of the areas below. If you want to revisit one of the sections, you can always go back to it. Make sure that you complete every item; your total progress is at the bottom. A yearbook is a lifelong memory, so make it yours!");

		// sections to complete
		var sections = [{
			id: "name",
			title: "Preferred Name",
			description: "The name you want to be used next to identify you in the yearbook.",
			complete: (userInfo.PreferredName != null)
		},
		
		{
			id: "signature",
			title: "Personal Signature",
			description: "Your personal, hand-written signature, done from your iPad.",
			complete: (userInfo.Signature != null)
		},

		{
			id: "quote",
			title: "Featured Quote",
			description: "An inspiring, witty, or memorable quote of your choice.",
			complete: (userInfo.Quote != null)
		}];

		var total = 0;
		var signatureCover;

		for (var i = 0; i < sections.length; i++) {
			var section = sections[i];

			if (section.complete) {
				total++;
			}

			var sectionButton = $("<a />");
			sectionButton.appendTo(container);
			sectionButton.css({
				display: "block",
				margin: "60px",
				padding: "70px",
				paddingLeft: "225px",
				backgroundColor: "rgba(253, 249, 207, 1)",
				backgroundImage: "url('css/assets/" + (section.complete ? "accept" : "alert") + ".png')",
				backgroundPosition: "50px 50%",
				backgroundRepeat: "no-repeat",
				borderRadius: "15px",
				marginBottom: "30px !important",
				position: "relative",
				border: "solid 2px rgba(150, 150, 150, 1)",
				boxShadow: "0px 0px 15px 5px rgba(255, 255, 255, 0.5)",
				boxShadow: "inset 0px 0px 20px rgba(100, 100, 0, 0.1)"
			});

			sectionButton.data("section", section);
			sectionButton.click(function () {
				var selectedSection = $(this).data("section");

				if (selectedSection.id == "name") {
					setScreen(screenName);
				} else if (selectedSection.id == "signature") {
					if (userInfo.Signature != null) {
						return signatureCover.stop(true).fadeIn(250);
					}

					setScreen(screenSignature);
				} else if (selectedSection.id == "quote") {
					setScreen(screenQuote);
				}
			});

			var header = $("<h1 />");
			header.appendTo(sectionButton);
			header.css({
				fontFamily: "\"Helvetica Neue Bold\", \"HelveticaNeue-Bold\"",
				fontSize: "48px",
				color: "rgba(0, 0, 0, 0.7)"
			});
			header.text(section.title);

			var description = $("<h2 />");
			description.appendTo(sectionButton);
			description.css({
				fontFamily: "\"Helvetica Neue\", \"HelveticaNeue\"",
				fontSize: "36px",
				color: "rgba(0, 0, 0, 0.7)",
				marginTop: "15px"
			});
			description.text(section.description);

			var status = $("<h3 />");
			status.appendTo(sectionButton);
			status.css({
				fontFamily: "\"Helvetica Neue Bold\", \"HelveticaNeue-Bold\"",
				fontSize: "36px",
				color: "rgba(0, 0, 0, 0.7)",
				position: "absolute",
				right: "150px",
				top: "50%",
				marginTop: "-14px"
			});
			status.text(section.complete ? "COMPLETE" : "INCOMPLETE");

			var arrow = $("<h4 />");
			arrow.appendTo(sectionButton);
			arrow.css({
				fontFamily: "\"Helvetica Neue Light\", \"HelveticaNeue-Light\"",
				fontSize: "70px",
				color: "rgba(0, 0, 0, 0.4)",
				position: "absolute",
				right: "50px",
				top: "50%",
				marginTop: "-40px"
			});
			arrow.text(">");
		}

		var calculatedPercent = Math.floor((total / sections.length) * 100);

		var progressText = $("<p />");
		progressText.appendTo(container);
		progressText.css({
			textAlign: "center",
			fontSize: "48px",
			lineHeight: "1.6em",
			margin: "80px",
			marginBottom: "0px",
			color: "rgba(0, 0, 0, 0.4)",
			fontFamily: "\"Helvetica Neue Bold\", \"HelveticaNeue-Bold\""
		});
		progressText.html("<a onclick=\"updateInformation();\">Current Progress: <span style=\"color: rgba(0, 0, 0, 0.6);\">" + calculatedPercent + "%</span></a>");

		var helpText = $("<p />");
		helpText.appendTo(container);
		helpText.css({
			textAlign: "center",
			fontSize: "30px",
			lineHeight: "1.6em",
			color: "rgba(0, 0, 0, 0.6)",
			fontFamily: "\"Helvetica Neue\", \"HelveticaNeue\""
		});
		helpText.html("<span style=\"color: rgba(0, 0, 0, 0.4);\">If you need help with this app, stop by the iPad Help Desk (room 117) or Mr. Ruff's room (room 138).</span>");

		// signature preview cover
		signatureCover = $("<div />");
		signatureCover.appendTo(container);
		signatureCover.css({
			position: "absolute",
			top: "0px",
			left: "0px",
			right: "0px",
			bottom: "0px",
			backgroundColor: "rgba(0, 0, 0, 0.5)",
			zIndex: "100",
			display: "none"
		});

		var signatureBox = $("<div />");
		signatureBox.appendTo(signatureCover);
		signatureBox.css({
			position: "absolute",
			top: "50%",
			left: "50%",

			width: "1600px",
			height: "1050px",

			marginLeft: "-830px",
			marginTop: "-630px",

			backgroundColor: "rgba(255, 255, 255, 1)",
			borderRadius: "20px",
			boxShadow: "0px 20px 20px rgba(0, 0, 0, 0.2)",

			padding: "30px"
		});

		var signatureImageContainer = $("<div />");
		signatureImageContainer.appendTo(signatureBox);
		signatureImageContainer.css({
			marginLeft: "auto",
			marginRight: "auto",
			marginTop: "30px",
			border: "solid 8px gray",
			width: "1500px",
			height: "800px"
		});

		var signatureImage = $("<embed />");
		signatureImage.appendTo(signatureImageContainer);
		
		if (userInfo.Signature != null) {
			signatureImage.attr({
				src: "data:image/svg+xml;charset=utf-8;base64," + Base64.encode(userInfo.Signature),
				width: 1500,
				height: 800,
				marginLeft: "-146px"
			});
		}

		var signatureText = $("<p />");
		signatureText.appendTo(signatureBox);
		signatureText.css({
			textAlign: "center",
			fontSize: "38px",
			marginTop: "30px",
			fontSize: "32px",
			fontFamily: "\"Helvetica Neue Bold\", \"HelveticaNeue-Bold\""
		});
		signatureText.text("Above is the signature you already completed. Do you want to change it?");

		var buttonHolder = $("<div />");
		buttonHolder.appendTo(signatureBox);
		buttonHolder.css({
			textAlign: "center",
			marginTop: "5px"
		});

		var cancelButton = $("<input type=\"button\" />");
		cancelButton.appendTo(buttonHolder);
		cancelButton.css({
			width: "400px",
			height: "80px",
			fontSize: "24px",
			marginRight: "60px"
		});
		cancelButton.val("Cancel");
		cancelButton.click(function () {
			signatureCover.fadeOut(200);
		});

		var continueButton = $("<input type=\"button\" />");
		continueButton.appendTo(buttonHolder);
		continueButton.css({
			width: "400px",
			height: "80px",
			fontSize: "24px",
			marginTop: "40px"
		});
		continueButton.val("Make Changes");
		continueButton.click(function () {
			setScreen(screenSignature);
		});

	}
};
