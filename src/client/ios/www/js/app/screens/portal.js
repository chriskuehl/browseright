var screenPortal = {
	id: "portal",
	title: "Jacketeer 2013 Student Portal",
	parent: "into",

	titleButton: {
		text: "Sign Out",
		event: function () {
			navigator.notification.alert("Are you sure you want to sign out?", function (response) {
				if (response == 2) {
					localStorage.removeItem("loginDetails");
					localStorage.removeItem("loginToken");
					setScreen(screenIntro);
				}
			}, "Sign Out", "Cancel,Sign Out");
		}
	},
	
	setup: function (container) {
		if (userInfo.PreferredName) {
			updateTitle(userInfo.PreferredName);
		} else {
			updateTitle(localStorage.loginDetails.user);
		}
		
		container.css({
			backgroundColor: "rgba(253, 249, 207, 0.2)",
			boxShadow: "inset 0px 0px 900px rgba(253, 249, 207, 0.8)"
		});

		var loginDetails = getLoginDetails();
		
		var introText = $("<p />");
		introText.appendTo(container);
		introText.css({
			textAlign: "center",
			fontSize: "38px",
			lineHeight: "1.6em",
			margin: "50px",
			color: "rgba(0, 0, 0, 0.7)"
		});
		introText.html("Welcome to the Jacketeer 2013 student app. This app is a virtual artery from your mind directly to yearbook HQ. From here, you can share information, vote on superlatives, order a yearbook, and get assistance. This app is probably the best thing since sliced bread. Remember, though: with great power comes great responsibility.");
		
		var boxContainer = $("<div />");
		boxContainer.appendTo(container);
		boxContainer.css({
		//	border: "solid 2px red",
			margin: "116px",
			marginRight: "0px"
		});
		
		var boxes = [
			{
				title: "My Portrait",
				items: [
					"Submit your name as you want it to appear",
					"Sign your signature next to your portrait",
					"Share your favorite quote with us and your classmates"
				],
				complete: (userInfo.PreferredName != null && userInfo.Signature != null && userInfo.Quote != null),
				completable: true,
				screen: screenPortrait
			},
			
			{
				title: "My Voice",
				items: [
					"Hail that which you appreciate at WCHS",
					"Vote for your classmates for senior superlatives",
					"Nominate events or activities that deserve a page"
				],
				complete: false,
				completable: false,
				screen: screenVoice
			},
			
			{
				title: "My Yearbook",
				items: [
					"Order your yearbook over the phone or on your iPad",
					"Contact a staff members with questions or concerns",
					"Sign for and pick up your yearbook upon release"
				],
				complete: false,
				completable: false,
				screen: screenHelp
			}
		];
		
		for (var boxIndex = 0; boxIndex < boxes.length; boxIndex ++) {
			var boxData = boxes[boxIndex];
			var box = $("<a />");
			box.appendTo(boxContainer);
			box.css({
				display: "block",
				width: "500px",
				padding: "40px",
				marginRight: "30px",
				borderRadius: "15px",
				"float": "left",
                border: "solid 2px rgba(150, 150, 150, 1)",
                boxShadow: "0px 0px 15px 5px rgba(255, 255, 255, 0.5)",
                boxShadow: "inset 0px 0px 20px rgba(100, 100, 0, 0.1)"
			});
			
			if (boxData.completable) {
				if (boxData.complete) {
					box.css("backgroundColor", "rgba(253, 249, 207, 1)");
				} else {
					box.css("backgroundColor", "rgba(253, 229, 150, 1)");
				}
			} else {
				box.css("backgroundColor", "rgba(253, 249, 207, 1)");
			}
			
			box.data({
				screen: boxData.screen
			});
			box.click(function(e) {
				setScreen($(this).data("screen"));
				
				e.preventDefault();
				return false;
			});
			
			var header = $("<h1 />");
			header.appendTo(box);
			header.css({
				fontFamily: "\"Helvetica Neue Bold\", \"HelveticaNeue-Bold\"",
				fontSize: "48px",
				color: "rgba(0, 0, 0, 0.7)",
				textAlign: "center",
				marginTop: "30px",
				marginBottom: "60px"
			});
			header.text(boxData.title);
			
			var list = $("<ul />");
			list.css({
				listStyleType: "disc",
				marginLeft: "30px"
			});
			list.appendTo(box);
			
			for (var itemIndex = 0; itemIndex < boxData.items.length; itemIndex ++) {
				var item = boxData.items[itemIndex];
				var li = $("<li />");
				li.css({
					fontSize: "32px",
					marginBottom: "15px",
					lineHeight: "1.8em"
				});
				li.appendTo(list);
				li.html(item);
			}
			
			var incomplete = $("<p />");
			incomplete.appendTo(box);
			incomplete.css({
				marginTop: "60px",
				marginBottom: "30px",
				fontSize: "40px",
				color: "rgba(0, 0, 0, .6)",
				fontFamily: "\"Helvetica Neue Bold\", \"HelveticaNeue-Bold\"",
				textAlign: "center"
			});
			incomplete.html(boxData.completable ? (boxData.complete ? "COMPLETE" : "INCOMPLETE") : "&nbsp;");
		}
		
		var clear = $("<div />");
		clear.appendTo(boxContainer);
		clear.css("clear", "both");
		
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
		progressText.html("Tap one of the boxes above to get started.");

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
	}
};
