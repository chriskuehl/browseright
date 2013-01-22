var globalTension = 0.35;
var globalInterval = 0;
var sigIntro = null;

var screenSignature = {
	id: "signature",
	title: "Senior Signature",
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

		sigPaths = [];

		var intro = $("<p />");
		sigIntro = intro;
		intro.appendTo(container);
		intro.css({
			margin: "100px",
			fontSize: "44px",
			textAlign: "center"
		});
		intro.text("Either with a stylus or your finger, sign your personal signature below.");

		var artHolder = $("<div />");
		artHolder.appendTo(container);
		artHolder.css({
			width: "1800px",
			height: "800px",
			marginLeft: "auto",
			marginRight: "auto"
		});

		var canvasHolder = $("<div />");
		canvasHolder.appendTo(artHolder);
		canvasHolder.css({
			width: "1500px",
			height: "800px",
			border: "solid 2px rgba(150, 150, 150, 1)",
			"float": "left"
		});

		var buttonHolder = $("<div />");
		buttonHolder.appendTo(artHolder);
		buttonHolder.css({
			"float": "right",
			width: "240px",
			height: "820px"
		});

		var undoButton = $("<a />");
		undoButton.appendTo(buttonHolder);
		undoButton.text("Undo");
		undoButton.addClass("signatureButton");
		undoButton.addClass("disabled");
		undoButton.attr({
			id: "signatureUndoButton"
		});

		undoButton.click(function () {
			if ($(this).hasClass("disabled")) {
				return;
			}

			sigPaths.remove(sigPaths.length - 1);
			redrawCanvas(canvas, ctx);

			if (sigPaths.length <= 0) {
				undoButton.addClass("disabled");
				clearButton.addClass("disabled");
				doneButton.addClass("disabled");
			}
		});

		var clearButton = $("<a />");
		clearButton.appendTo(buttonHolder);
		clearButton.text("Clear");
		clearButton.addClass("signatureButton");
		clearButton.addClass("disabled");
		clearButton.attr({
			id: "signatureClearButton"
		});

		clearButton.click(function () {
			if ($(this).hasClass("disabled")) {
				return;
			}

			penData = null;
			sigPaths = [];
			redrawCanvas(canvas, ctx);

			undoButton.addClass("disabled");
			clearButton.addClass("disabled");
			doneButton.addClass("disabled");
		});

		var doneButton = $("<a />");
		doneButton.appendTo(buttonHolder);
		doneButton.text("Done");
		doneButton.addClass("signatureButton");
		doneButton.addClass("disabled");
		doneButton.attr({
			id: "signatureDoneButton"
		});

		doneButton.click(function () {
			if ($(this).hasClass("disabled")) {
				return;
			}

			navigator.notification.alert("Are you sure you want to use this signature?", function (response) {
				if (response == 2) {
					var img = canvas[0].toDataURL("image/png");
					// name was valid, so upload it to the server
					updateInformation({
						path: "c-signature.php",
						data: {
							user: getLoginDetails().user,
							token: localStorage.loginToken,
							signature: img
						}
					});
				}
			}, "Signature Confirmation", "Cancel,Use Signature");

			//
			//$.post("https://jacketeer.org/app/up.php", {img: img}, function() {
			//	alert("done!");
			//});
		});

		var canvas = $("<canvas />");
		canvas.appendTo(canvasHolder);
		canvas.attr({
			width: canvasHolder.innerWidth(),
			height: canvasHolder.innerHeight(),
			id: "handwritingCanvas"
		});
		canvas.css({
			backgroundColor: "solid rgba(255, 255, 255, 1)",
			boxShadow: "inset 0px 0px 15px 10px rgba(100, 100, 0, 0.05)"
		});
		canvas.data("paths", []);

		var ctx = canvas[0].getContext("2d");

		// tips holder left
		var tipsHolderLeft = $("<div />");
		tipsHolderLeft.appendTo(container);
		tipsHolderLeft.css({
			marginLeft: "130px",
			marginTop: "50px",
			width: "800px",
			"float": "left"
		});

		// tips list
		var tipsListLeft = $("<ul />");
		tipsListLeft.appendTo(tipsHolderLeft);
		tipsListLeft.css({
			//listStyle: "disc outside none",
			marginTop: "10px"
		});

		var tipsLeft = [
			"Sign as you normally would; you can use your full name, your initials, or whatever you go by.",
			"Go slow. Take your time, and don't worry&ndash;we'll smooth out the wrinkles automagically."
		];

		for (var i = 0; i < tipsLeft.length; i++) {
			var tip = tipsLeft[i];

			var li = $("<li />");
			li.appendTo(tipsListLeft);
			li.css({
				fontSize: "36px",
				//textIndent: "60px",
				//marginLeft: "80px",
				lineHeight: "1.4em",
				marginBottom: "30px"
			});
			li.html(tip);
		}

		// tips holder
		var tipsHolderRight = $("<div />");
		tipsHolderRight.appendTo(container);
		tipsHolderRight.css({
			marginRight: "130px",
			marginTop: "30px",
			width: "800px",
			"float": "right"
		});

		// tips list
		var tipsListRight = $("<ul />");
		tipsListRight.appendTo(tipsHolderRight);
		tipsListRight.css({
			//listStyle: "disc outside none",
			marginTop: "10px"
		});

		var tipsRight = [
			"You can always redo the signature. Don't worry about getting it perfect the first time.",
			"If you need a stylus, go find Mr. Ruff (room 138), or stop by the help desk (room 117)."
		];

		for (var i = 0; i < tipsRight.length; i++) {
			var tip = tipsRight[i];

			var li = $("<li />");
			li.appendTo(tipsListRight);
			li.css({
				fontSize: "36px",
				//textIndent: "60px",
				//marginLeft: "80px",
				lineHeight: "1.4em",
				marginBottom: "30px"
			});
			li.html(tip);
		}

		// iPad touch events
		canvas[0].addEventListener("touchstart", function (e) {
			penData = {
				points: [],
				lastEvent: 0
			};

			// draw the first point
			addPenPosition(ctx, canvas, e);
		}, false);

		canvas[0].addEventListener("touchmove", function (e) {
			// are we drawing?
			if (penData == null) {
				return;
			}

			// test if it's time for another point
			var cur = currentTime();
			var ignore = cur - penData.lastEvent < globalInterval;

			// draw the point
			addPenPosition(ctx, canvas, e, ignore);
		}, false);

		canvas[0].addEventListener("touchend", function (e) {
			// are we drawing?
			if (penData == null) {
				return;
			}

			// draw the last point
			try {
				addPenPosition(ctx, canvas, e);
			} catch (err) {}

			// remove any points to ignore
			for (var i = penData.points.length - 1; i >= 0; i--) {
				if (penData.points[i][3]) {
					penData.points.remove(i);
				}
			}

			// end the drawing
			sigPaths.push(penData.points);
			penData = null;
			lastPointIndex = (-1);

			redrawCanvas(canvas, ctx);

			// change button statuses
			clearButton.removeClass("disabled");
			undoButton.removeClass("disabled");
			doneButton.removeClass("disabled");
		}, false);
	}
};

var sigPaths = null;
var penData = null;

function currentTime() {
	return (new Date()).getTime();
}

var lastPointIndex = (-1);

function addPenPosition(ctx, canvas, e, ignore) {
	if (ignore === undefined) {
		ignore = false;
	}

	var pos = getPenPosition(canvas, e);
	var velocity = 0;

	if (penData.points.length > 0) {
		var lastPoint = penData.points[penData.points.length - 1];
		velocity = dist(pos, penData.points[lastPointIndex]);
	}

	pos.push(velocity);
	pos.push(ignore);
	penData.points.push(pos);

	if (!ignore) {
		lastPointIndex = penData.points.length - 1;
		penData.lastEvent = currentTime();
	}

	redrawCanvas(canvas, ctx);
}

function dist(p1, p2) {
	return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
}

function redrawCanvas(canvas, ctx) {
	// clear canvas
	ctx.clearRect(0, 0, canvas.width(), canvas.height());

	// draw the current path	
	if (penData) {
		drawSpline(ctx, penData.points, globalTension, false);
	}

	// draw the rest of the paths
	if (sigPaths.length > 0) {
		for (var i = 0; i < sigPaths.length; i++) {
			drawSpline(ctx, sigPaths[i], globalTension, false);
		}
	}
}

function getPenPosition(canvas, e) {
	var ep = canvas.offset();
	return [e.targetTouches[0].pageX - ep.left, e.targetTouches[0].pageY - ep.top];
}
