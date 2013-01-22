var screenHelp = {
	id: "help",
	title: "My Yearbook: Ordering and Support",
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
		introText.html("Having trouble with your yearbook order? Got a question for the yearbook advisor? Have you decided it's time to order your book? You're in the right place!");
		
		// sections to complete
		var sections = [{
			id: "order",
			title: "Place an Order",
			description: "Order your yearbook online, directly from this app.",
			complete: (userInfo.PreferredName != null)
		},
		
		{
			id: "contact",
			title: "Contact a Staff Member",
			description: "Send an email to the yearbook staff team for assistance.",
			complete: (userInfo.Signature != null)
		},

		{
			id: "pickup",
			title: "Pick-Up Your Yearbook",
			description: "Pick up your yearbook, right from your iPad!",
			complete: (userInfo.Quote != null)
		}];

		var total = 0;

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
				backgroundColor: "rgba(253, 249, 207, 1)",
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

				if (selectedSection.id == "order") {
					setScreen(screenOrder);
				} else if (selectedSection.id == "contact") {
					setScreen(screenContact);
				} else if (selectedSection.id == "pickup") {
					navigator.notification.alert("Yearbooks haven't been released yet! This feature won't be available until late May, after the book has been released.", null, "Book Status: Incomplete", "Uh oh!");
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
	}
};
