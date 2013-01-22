var exampleHails = [
	"Mrs. Marks for helping me grow as an artist :).",
	"Daniels, Cunliffe, and Pollock. Stealing shopping carts, running shirtless, and mumble.",
	"Mrs. Porter, the best teacher I ever had.",
	"the last day of school!",
	"Mrs. Thacker; we miss you...",
	"Ralph.",
	"all the people in my class!",
	"Mrs. Swinford, for all the help she gave me.",
	"Coach Parrett...for making my four years as a baseball player here memorable.",
	"Coach Carr Sr.",
	"Mrs. Hamilton for helping me improve my writing.",
	"the chaos crew.",
	"the class of 2012, the greatest class anyone could have asked for.",
	"the rides down country roads.",
	"Mrs. Taylor.",
	"everything and all things, especially the Shady Crew +1!",
	"the haters.",
	"the K-Mart parking lot!",
	"all the hail I raised.",
	"Mr. Mastin, Mrs. Turner, and Mrs. Hamilton; their combined efforts and time have made an enormous impact on my success.",
	"nacho day.",
	"my parents for everything they've done for me.",
	"those who never stopped believing in me.",
	"tech school, for making the rest of the day tolerable.",
	"the band for being my family!"
];

var exampleHailIndex = 0;
var hailCounterGlobal = 0;

var screenHailWoodford = {
	id: "hail-woodford",
	title: "Hail Woodford",
	parent: "voice",

	titleButton: {
		text: "Back to My Voice",
		event: function () {
			setScreen(screenVoice);
		}
	},

	setup: function (container) {
		container.css({
			backgroundColor: "rgba(253, 249, 207, 0.2)",
			boxShadow: "inset 0px 0px 900px rgba(253, 249, 207, 0.8)"
		});

		var introText2 = $("<h2 />");
		introText2.appendTo(container);
		introText2.css({
			textAlign: "center",
			fontSize: "96px",
			lineHeight: "1.6em",
			margin: "30px",
			marginTop: "100px",
			fontFamily: "\"Helvetica Neue Bold\", \"HelveticaNeue-Bold\"",
			color: "rgba(0, 0, 0, 0.7)"
		});
		introText2.html("What do you hail?");
		
		var introText = $("<p />");
		introText.appendTo(container);
		introText.css({
			textAlign: "center",
			fontSize: "38px",
			lineHeight: "1.6em",
			margin: "30px",
			marginLeft: "100px",
			marginRight: "100px",
			color: "rgba(0, 0, 0, 0.7)"
		});
		introText.html("Hail Woodford! There's a lot to hail at this school. Help us pick the best things to nominate by filling in the form below. Don't worry&ndash;you can submit as many as you want. If we like your suggestion (or just need to fill space), we'll include it in the book!");
		
		// name holder
		var nameHolder = $("<div />");
		nameHolder.appendTo(container);
		nameHolder.css({
			marginLeft: "auto",
			marginRight: "auto",
			width: "1800px"
		});
		
		var nameLabel = $("<p />");
		nameLabel.css({
			fontSize: "58px",
			fontFamily: "\"Helvetica Neue Bold\", \"HelveticaNeue-Bold\"",
			color: "rgba(0, 0, 0, 0.5)"
		});
		nameLabel.appendTo(nameHolder);
		nameLabel.html("Hail to: ");

		// name
		var inputName = $("<input type=\"text\" />");
		inputName.appendTo(nameLabel);
		inputName.attr({
			name: "inputName",
			placeHolder: randomPlaceholderHail(),
			autoCorrect: "on",
			autoCapitalize: "off"
		});
		inputName.css({
			padding: "10px",
			width: "1150px",
			marginLeft: "30px",
			marginRight: "10px",
			padding: "20px",
			fontSize: "48px"
		});
		inputName.val(name);

		// submit
		var submit = $("<input type=\"button\" />");
		submit.appendTo(nameLabel);
		submit.css({
			fontSize: "48px",
			backgroundColor: "rgba(100, 100, 0, 0.1)",
			marginLeft: "20px"
		});
		submit.val("Submit");

		submit.click(function () {
			// validate the name they've entered
			var valid = true;
			var invalidReason;

			var text = inputName.val().trim();

			if (text.length < 1) {
				valid = false;
				invalidReason = "Please enter something to hail.";
			}

			if (!valid) {
				return navigator.notification.alert(invalidReason, null, "Invalid Message", "Oops!");
			}

			// name was valid, so upload it to the server
			updateInformation({
				path: "hail.php",
				data: {
					user: getLoginDetails().user,
					token: localStorage.loginToken,
					text: text
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

		
		var div = $("<div />");
		div.appendTo(container);
		div.css({
			marginTop: "100px",
			padding: "40px",
			height: "250px",
			width: "1800px",
			marginLeft: "auto",
			marginRight: "auto",
			backgroundColor: "rgba(253, 249, 207, 1)",
			// borderRadius: "15px",
			border: "solid 2px rgba(150, 150, 150, 1)",
			boxShadow: "0px 0px 15px 5px rgba(255, 255, 255, 0.5)",
			boxShadow: "inset 0px 0px 20px rgba(100, 100, 0, 0.1)",
			fontSize: "72px",
			lineHeight: "1em",
			color: "rgba(0, 0, 0, 0.65)",
			position: "relative"
		});
		
		var hailMessage = $("<p />");
		hailMessage.attr("id", "hailMessageWrapper");
		hailMessage.css({
			fontSize: "48px"
		});
		hailMessage.appendTo(div);
		hailMessage.html("<span style=\"font-family: HelveticaNeue-Bold; color: rgba(0, 0, 0, 0.3)\">Hail to</span> <span id=\"hailMessage\">" + exampleHails[0] + "</span>");
		
		var hailTip = $("<p />");
		hailTip.appendTo(div);
		hailTip.css({
			position: "absolute",
			bottom: "0px",
			left: "30px",
			color: "rgba(0, 0, 0, 0.4)",
			fontFamily: "\"Helvetica Neue Bold\", \"HelveticaNeue-Bold\"",
			fontSize: "24px"
		});
		hailTip.text("example from last year's yearbook");
		
		hailCounterGlobal ++;
		startExampleHailTimer(hailCounterGlobal, exampleHails[0].length);
	}
};

function startExampleHailTimer(hailCounter, messageLength) {
	if (hailCounter != hailCounterGlobal) {
		return; // another timeout must have started
	}
	
	setTimeout(function() {
		exampleHail(hailCounter);
	}, 1500 + (messageLength * 20));
}

function exampleHail(hailCounter) {
	exampleHailIndex ++;
	var text = exampleHails[exampleHailIndex % exampleHails.length];
	
	$("#hailMessageWrapper").fadeOut(200, function() {
		$("#hailMessage").text(text);
		$("#hailMessageWrapper").fadeIn(200, function() {
			startExampleHailTimer(hailCounter, text.length);
		});
	});
}

function randomPlaceholderHail() {
	var randomHails = [
		"all the yerds I used to know",
		"bonfires of proof pages",
		"Adobe InDesign and Photoshop",
		"missing deadlines & missing links",
		"9.1 TB of available storage space",
		"the on-the-fly T3i",
		"an infinite supply of SD cards (hah)"
	];
	
	return randomHails[Math.floor(Math.random() * randomHails.length)];
}
