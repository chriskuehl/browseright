var globalLoadingCover;
var globalLoadingBox = null;
var globalLoadingText = null;
var globalLoadingCancelEvent = null;

var screenIntro = {
	id: "intro",
	title: "Jacketeer 2013",

	setup: function (container) {
		container.css({
			backgroundColor: "rgba(253, 249, 207, 0.2)",
			boxShadow: "inset 0px 0px 900px rgba(253, 249, 207, 0.8)"
		});

		var loginDetails = getLoginDetails();

		var page = $("<div />");
		page.appendTo(container);
		page.css({
			backgroundColor: "rgba(255, 255, 255, 0.99)",

			borderRadius: "15px",
			padding: "80px",

			position: "absolute",
			top: "50%",
			left: "50%",

			width: "1200px",
			height: "725px",

			marginLeft: "-680px",
			marginTop: "-500px",

			boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.3)"
		});

		var title = $("<p />");
		title.appendTo(page);
		title.text("Jacketeer 2013 Student Portal");
		title.css({
			textAlign: "center",
			fontFamily: "\"Helvetica Neue Bold\", \"HelveticaNeue-Bold\"",
			fontSize: "72px"
		});

		var introText = $("<p />");
		introText.appendTo(page);
		introText.html("As you probably know, the senior section of the WCHS <em>Jacketeer</em> contains not only your senior picture, but also your favorite quote and your signature. This app will help you submit all of this informaton to us. In order to get started, please log in like you would at a WCHS computer.");
		introText.css({
			fontSize: "28px",
			marginTop: "40px",
			lineHeight: "1.8em",
			textAlign: "justify"
		});

		var tableHolder = $("<div />");
		tableHolder.appendTo(page);
		tableHolder.css({
			padding: "50px",
			borderRadius: "20px",
			//backgroundColor: "rgba(255, 249, 90, 0.8)",
			backgroundColor: "rgba(253, 249, 207, .7)",
			marginTop: "30px",
			position: "relative",
			border: "solid 2px rgba(150, 150, 150, 1)",
			boxShadow: "0px 0px 15px 5px rgba(255, 255, 255, 0.5)",
			boxShadow: "inset 0px 0px 20px rgba(100, 100, 0, 0.1)"
		});

		var table = $("<table />");
		table.appendTo(tableHolder);

		// user row
		var rowUser = $("<tr />");
		rowUser.appendTo(table);

		var labelUser = $("<label />");
		labelUser.text("Username:");
		labelUser.attr({
			"for": "inputUser"
		});
		labelUser.css({
			fontSize: "34px",
			paddingRight: "20px",
			fontFamily: "\"Helvetica Neue Medium\", \"HelveticaNeue-Medium\"",
			marginRight: "10px"
		});

		rowUser.append($("<th />").css("paddingBottom", "20px").append(labelUser));

		var inputUser = $("<input type=\"text\" />");
		inputUser.attr({
			name: "inputUser",
			placeholder: "13jpdoe",
			autoCorrect: "off",
			autoCapitalize: "off"
		});
		inputUser.css({
			fontSize: "38px",
			padding: "10px",
			width: "610px"
		});

		if (loginDetails) {
			inputUser.val(loginDetails.user);
		}

		rowUser.append($("<td />").css("paddingBottom", "20px").append(inputUser));

		// password row
		var rowPassword = $("<tr />");
		rowPassword.appendTo(table);
		rowPassword.css({
			paddingBottom: "20px"
		});

		var labelPassword = $("<label />");
		labelPassword.text("Password:");
		labelPassword.attr({
			"for": "inputPassword"
		});
		labelPassword.css({
			fontSize: "34px",
			paddingRight: "20px",
			fontFamily: "\"Helvetica Neue Medium\", \"HelveticaNeue-Medium\"",
			marginRight: "10px"
		});

		rowPassword.append($("<th />").append(labelPassword));

		var inputPassword = $("<input type=\"password\" />");
		inputPassword.attr({
			name: "inputPassword"
		});
		inputPassword.css({
			fontSize: "38px",
			padding: "10px",
			width: "610px"
		});

		if (loginDetails) {
			inputPassword.val(loginDetails.password);
		}

		rowPassword.append($("<td />").append(inputPassword));

		// loading cover
		var loadingCover = $("<div />");
		globalLoadingCover = loadingCover;
		loadingCover.appendTo(container);
		loadingCover.css({
			position: "absolute",
			top: "0px",
			left: "0px",
			right: "0px",
			bottom: "0px",
			backgroundColor: "rgba(0, 0, 0, 0.5)",
			zIndex: "100",
			display: "none"
		});

		var loadingBox = $("<div />");
		globalLoadingBox = loadingBox;
		loadingBox.appendTo(loadingCover);
		loadingBox.css({
			position: "absolute",
			top: "50%",
			left: "50%",

			width: "400px",
			height: "240px",

			marginLeft: "-230px",
			marginTop: "-150px",

			backgroundColor: "rgba(255, 255, 255, 1)",
			borderRadius: "20px",
			boxShadow: "0px 20px 20px rgba(0, 0, 0, 0.2)",

			padding: "30px"
		});

		var loadingImageContainer = $("<p />");
		loadingImageContainer.appendTo(loadingBox);
		loadingImageContainer.css({
			textAlign: "center"
		});

		var loadingImage = $("<img />");
		loadingImage.appendTo(loadingImageContainer);
		loadingImage.attr({
			src: "css/assets/loading.gif",
			width: 64,
			height: 64
		});

		var loadingText = $("<p />");
		globalLoadingText = loadingText;
		loadingText.appendTo(loadingBox);
		loadingText.css({
			textAlign: "center",
			fontSize: "38px",
			marginTop: "10px"
		});
		loadingText.text("Logging in...");

		var cancelButton = $("<input type=\"button\" />");
		cancelButton.appendTo(loadingBox);
		cancelButton.css({
			width: "400px",
			height: "80px",
			fontSize: "24px",
			marginTop: "40px"
		});
		cancelButton.val("Cancel");
		cancelButton.click(function () {
			if (globalLoadingCancelEvent) {
				globalLoadingCancelEvent();
			}
		});

		// login button
		var loginButton = $("<a />");
		loginButton.appendTo(tableHolder);
		loginButton.css({
			position: "absolute",
			top: "30px",
			right: "30px",
			bottom: "30px",
			width: "250px",
			borderRadius: "20px",
			backgroundColor: "rgba(255, 255, 255, 0.4)",
			fontSize: "96px",
			border: "solid 1px rgba(0, 0, 0, 0.3)",
			paddingTop: "50px",
			textAlign: "center",
			textDecoration: "none",
			color: "rgba(0, 0, 0, 0.5)"
		});
		loginButton.click(function () {
			loadingCover.stop(true).fadeIn(500);

			// send the request
			var req = $.ajax("https://jacketeer.org/app/login.php?a=" + (Math.floor(Math.random() * 99999999) + 1), {
				type: "POST",
				data: {
					user: inputUser.val(),
					password: inputPassword.val()
				},
				cache: false
			});

			globalLoadingText.text("Logging in...");
			globalLoadingCancelEvent = function () {
				if (req.aborted) {
					return;
				}
				
				req.aborted = true;
				req.abort();

				globalLoadingCover.stop(true).fadeOut(200);
			};

			req.done(function (content) {
				if (content.success) {
					if (!inputUser.val().startsWith("13")) {
						navigator.notification.alert("Only seniors need to fill in their information on this app. If you think you're seeing this message in error, please stop by the iPad Help Desk (room 117) for assistance.", null, "You're Not a Senior!", "Sorry!");
						loadingCover.stop(true).hide();
						return;
					}

					var map = {
						user: inputUser.val(),
						password: inputPassword.val()
					};

					localStorage.loginToken = content.user.SessionToken;
					localStorage.loginDetails = JSON.stringify(map);

					// load the information we need for the portal
					updateInformation();
				} else {
					navigator.notification.alert("Your username or password was incorrect. Please try again, or visit the iPad Help Desk (room 117) for assistance.", null, "Unsuccessful Login");
					loadingCover.stop(true).hide();
				}
			});

			req.fail(function () {
				if (req.aborted) {
					return;
				}

				navigator.notification.alert("Connection to the server failed. Please make sure you're connected to the internet or try again later. If you need help, you can stop by the iPad Help Desk (room 117) for assistance.", function (response) {
					if (response == 1) {
						loginButton.click();
					}
				}, "Connection Problems", "Try Again,Cancel");
				loadingCover.stop(true).hide();
			});
		});
		loginButton.html("&raquo;");

		// login by enter on input fields
		$("input[name='inputPassword'], input[name='inputUser']").keypress(function (e) {
			if (e.which == 13) {
				loginButton.click();
				$(this).blur(); // hide the iPad keyboard

				e.preventDefault();
				return false;
			}
		});

		// username tip at bottom
		var tipText = $("<p />");
		tipText.appendTo(page);
		tipText.html("Your username is the last two digits of your graduation year, followed by your first initial, your middle initial, and your full last name. For example, \"13jpdoe\" for \"John Price Doe\" graduating in 2013. It's the same thing you use to login to computers at WCHS.");
		tipText.css({
			fontSize: "24px",
			marginTop: "40px",
			lineHeight: "1.4em",
			textAlign: "justify"
		});
	}
};
