var superlativeChooseCover, superlativeTitleText, superlativeGenderText, superlativeStudentListScroll, studentListBlankElement, studentListContainer, superlativeIsMale, superlativeSelected, superlativeSearchBox, superlativeLoadingCover, superlativeListTable;

var screenSuperlatives = {
	id: "superlatives",
	title: "Senior Superlatives",
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

		/*
		var introText = $("<p />");
		introText.appendTo(container);
		introText.css({
			textAlign: "center",
			fontSize: "38px",
			lineHeight: "1.6em",
			margin: "50px",
			color: "rgba(0, 0, 0, 0.7)"
		});
		introText.html("SENIOR SUPERLATIVES");
		*/
		
		var headerTable = $("<table />");
		headerTable.appendTo(container);
		headerTable.css({
			margin: "32px",
			marginTop: "50px"
		});
		
		var headerRow = $("<th />");
		headerRow.appendTo(headerTable);
		
		var c1 = $("<td />");
		c1.appendTo(headerRow);
		c1.css({
			width: "580px"
		});
		c1.text("");
		
		var c2 = $("<td />");
		c2.appendTo(headerRow);
		c2.css({
			width: "700px",
			fontSize: "60px",
			fontFamily: "\"Helvetica Neue Medium\", \"HelveticaNeue-Medium\"",
			color: "rgba(0, 0, 0, 0.8)"
		});
		c2.text("Male");
		
		var c3 = $("<td />");
		c3.appendTo(headerRow);
		c3.css({
			width: "700px",
			fontSize: "60px",
			fontFamily: "\"Helvetica Neue Medium\", \"HelveticaNeue-Medium\"",
			color: "rgba(0, 0, 0, 0.8)"
		});
		c3.text("Female");
		
		var tableHolder = $("<div />");
		tableHolder.appendTo(container);
		tableHolder.attr("id", "superlativesHolder");
		tableHolder.css({
			overflow: "auto",
			width: "1980px",
			height: "1070px",
			marginLeft: "auto",
			marginRight: "auto",
			marginTop: "0px",
            //borderRadius: "15px",
            //border: "solid 2px rgba(150, 150, 150, 1)",
                        backgroundColor: "rgba(255,255,255,0.8)",
                        boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.15)"
		});
		
		superlativeListTable = $("<table />");
		superlativeListTable.appendTo(tableHolder);
		
		// populate the table
		updateSuperlativeChoices(superlativeCategories);
		
		// let the list of superlatives scroll
		var superlativesScroll = new iScroll("superlativesHolder", {bounce: false});
		
		// http://stackoverflow.com/questions/9210178/why-cant-i-click-input
		superlativesScroll.options.onBeforeScrollStart = function(e) {                
			var target = e.target;

			while (target.nodeType != 1) target = target.parentNode;
			if (target.tagName != 'A') {
				e.preventDefault();
			}
		};
		
		// help text at bottom
		var helpText = $("<p />");
		helpText.appendTo(container);
		helpText.css({
			textAlign: "center",
			fontSize: "36px",
			lineHeight: "1.6em",
			color: "rgba(0, 0, 0, 0.6)",
			fontFamily: "\"Helvetica Neue\", \"HelveticaNeue\"",
			marginLeft: "40px",
			marginRight: "40px",
			marginTop: "20px"
		});
		helpText.html("Scroll the area above to see all possible superlatives. Tap a button to nominate a student (or to change your current selection). All superlatives are optional. If you can't think of a good match, just leave it blank.");
		
		// "choose student" window
		superlativeChooseCover = $("<div />");
		superlativeChooseCover.appendTo(container);
		superlativeChooseCover.css({
			position: "absolute",
			top: "0px",
			left: "0px",
			right: "0px",
			bottom: "0px",
			backgroundColor: "rgba(0, 0, 0, 0.5)",
			zIndex: "100",
			display: "none"
		});

		var superlativeChooseBox = $("<div />");
		superlativeChooseBox.appendTo(superlativeChooseCover);
		superlativeChooseBox.css({
			position: "absolute",
			top: "50%",
			left: "50%",

			width: "1020px",

			marginLeft: "-540px",
			marginTop: "-450px",

			backgroundColor: "rgba(255, 255, 255, 1)",
			borderRadius: "20px",
			boxShadow: "0px 20px 20px rgba(0, 0, 0, 0.2)",

			padding: "30px"
		});
		
		superlativeLoadingCover = $("<div />");
		superlativeLoadingCover.appendTo(superlativeChooseBox);
		superlativeLoadingCover.css({
			position: "absolute",
			top: "0px",
			left: "0px",
			right: "0px",
			bottom: "0px",
			backgroundColor: "rgba(0, 0, 0, 0.8)",
			borderRadius: "20px",
			zIndex: "1000",
			display: "none"
		});
		
		var superlativeLoadingText = $("<p />");
		superlativeLoadingText.appendTo(superlativeLoadingCover);
		superlativeLoadingText.css({
			color: "rgba(255, 255, 255, 0.9)",
			fontSize: "64px",
			fontFamily: "\"Helvetica Neue Bold\", \"HelveticaNeue-Bold\"",
			textAlign: "center",
			marginTop: "500px"
		});
		superlativeLoadingText.html("Saving...");

		superlativeTitleText = $("<h3 />");
		superlativeTitleText.appendTo(superlativeChooseBox);
		superlativeTitleText.css({
			textAlign: "center",
			fontSize: "46px",
			marginTop: "10px",
			fontFamily: "\"Helvetica Neue Bold\", \"HelveticaNeue-Bold\"",
			marginBottom: "10px"
		});

		superlativeGenderText = $("<h3 />");
		superlativeGenderText.appendTo(superlativeChooseBox);
		superlativeGenderText.css({
			textAlign: "center",
			fontSize: "32px",
			marginTop: "0px",
			fontFamily: "\"Helvetica Neue Bold\", \"HelveticaNeue-Bold\"",
			marginBottom: "30px",
			color: "rgba(0, 0, 0, 0.6)"
		});
		
		superlativeSearchBox = $("<input type=\"text\" />");
		superlativeSearchBox.appendTo(superlativeChooseBox);
		superlativeSearchBox.attr({
			placeholder: "Start typing a first or last name...",
			autoCorrect: "off",
			autoCapitalize: "off"
		});
		superlativeSearchBox.css({
			fontSize: "38px",
			padding: "10px",
			width: "1000px"
		});
		
		superlativeSearchBox.bind("keyup keydown", function() {
			updateStudentFilter($(this).val(), superlativeIsMale);
		});
		
		var studentListWrapper = $("<div />");
		studentListWrapper.attr("id", "studentListWrapper");
		studentListWrapper.appendTo(superlativeChooseBox);
		studentListWrapper.css({
			border: "solid 3px rgba(0, 0, 0, 0.3)",
			marginTop: "30px",
			overflow: "auto",
			width: "1020px",
			height: "500px",
			marginBottom: "30px"
		});
		
		studentListContainer = $("<div />");
		studentListContainer.appendTo(studentListWrapper);

		var cancelButton = $("<input type=\"button\" />");
		cancelButton.appendTo(superlativeChooseBox);
		cancelButton.css({
			width: "1020px",
			height: "80px",
			fontSize: "24px"
		});
		cancelButton.val("Cancel");
		cancelButton.click(function () {
			superlativeChooseCover.fadeOut(200);
		});
	}
};

function updateSuperlativeChoices(superlatives) {
	superlativeListTable.empty();
	
	for (var i = 0; i < superlatives.length; i ++) {
		var superlative = superlatives[i];
		var row = $("<tr />");
		if ((i % 2) == 0) {	 	
			row.css("backgroundColor", "rgba(255, 255, 100, 0.1)");
		} else {
            row.css("backgroundColor", "rgba(255, 255, 255, 1)");
        }
		row.appendTo(superlativeListTable);
	
		var d1 = $("<td />");
		d1.appendTo(row);
		d1.text(superlative[0]);
		d1.css({
			width: "540px",
			fontSize: "42px",
			textAlign: "center",
			padding: "20px",
			fontFamily: "\"Helvetica Neue Medium\", \"HelveticaNeue-Medium\"",
			verticalAlign: "middle",
			color: "rgba(0, 0, 0, 0.8)"
		});
	
		// male, female
		for (var j = 1; j >= 0; j--) {
			var selectedStudent = superlative[1 + j];
		
			var cell = $("<td />");
			cell.appendTo(row);
			cell.css({
				width: "660px",
				padding: "20px",
				verticalAlign: "middle"
			});
		
			var button = $("<a />");
			button.appendTo(cell);
			button.css({
				borderRadius: "15px",
				display: "block",
				padding: "40px",
				textAlign: "center",
				fontSize: "32px",
				border: "solid 2px rgba(150, 150, 150, 1)",
				boxShadow: "0px 0px 15px 5px rgba(255, 255, 255, 0.5)",
				boxShadow: "inset 0px 0px 20px rgba(100, 100, 0, 0.1)",
				backgroundColor: "rgba(253, 249, 207, 1)"
			});
			// button.addClass("buttonGrad");
		
			if (selectedStudent == null) {
				button.text("tap to select");
				button.css("color", "gray");
			} else {
				button.text(selectedStudent);
				button.css("fontFamily", "\"Helvetica Neue Bold\", \"HelveticaNeue-Bold\"");
			}
		
			button.data("superlative", superlative[0]);
			button.data("isMale", (j == 1));
		
			button.click(function() {
				var superlative = $(this).data("superlative");
				var isMale = $(this).data("isMale");
			
				superlativeChooseStudent(superlative, isMale);
			});
		}
	}
}

function superlativeChooseStudent(superlative, isMale) {
	superlativeLoadingCover.hide();
	superlativeSearchBox.val("");
	
	if (superlativeStudentListScroll) {
		superlativeStudentListScroll.scrollTo(0, 0, 0);
	}
	
	superlativeSelected = superlative;
	superlativeIsMale = isMale;
	superlativeTitleText.text(superlative);
	superlativeGenderText.text(isMale ? "Male" : "Female");

	updateStudentFilter("", isMale);
	
	superlativeChooseCover.fadeIn(200);
}

function setupStudentListScroll() {
	if (superlativeStudentListScroll) {
		return; // has already been setup
	}
	
	// let the list of students scroll
	// TODO: reduce duplicate code
	superlativeStudentListScroll = new iScroll("studentListWrapper", {bounce: false});
	
	// http://stackoverflow.com/questions/9210178/why-cant-i-click-input
	superlativeStudentListScroll.options.onBeforeScrollStart = function(e) {                
		var target = e.target;

		while (target.nodeType != 1) target = target.parentNode;
		if (target.tagName != 'A') {
			e.preventDefault();
		}
	};
}

function studentMatchesQuery(query, student) {
	if (query == "" || query == null) {
		return true;
	}
	
	query = query.toLowerCase();
	
	var possibilities = [
		student.FirstName + " " + student.LastName,
		student.FirstName + student.LastName,
		student.LastName + ", " + student.FirstName,
		student.LastName + " " + student.FirstName,
		student.LastName + student.FirstName,
		student.FirstName + " " + student.MiddleName + " " + student.LastName
	];
	
	for (var i = 0; i < possibilities.length; i ++) {
		var possibility = possibilities[i].toLowerCase();
		
		if (possibility.startsWith(query)) {
			return true;
		}
	}
	
	return false;
}

function updateStudentFilter(query, isMale) {
	setupStudentListScroll();
	
	studentListContainer.empty();
	
	var j = 0;
	for (var studentIndex = 0; studentIndex < studentList.length; studentIndex ++) {
		var student = studentList[studentIndex];
		
		if (student.IsMale == isMale && (! (student.FirstName == userInfo.FirstName && student.LastName == userInfo.LastName)) && studentMatchesQuery(query, student)) {
			var studentRow = $("<a />");
			studentRow.appendTo(studentListContainer);
			studentRow.css({
				display: "block",
				padding: "16px",
				fontSize: "48px"
			});
			
			if ((j % 2) == 0) {
				studentRow.css("backgroundColor", "rgba(255, 255, 0, 0.1)");
			}
			
			studentRow.data("student", student);
			studentRow.text(student.LastName + ", " + student.FirstName);
			
			studentRow.click(function() {
				var student = $(this).data("student");
				navigator.notification.alert("Are you sure you want to nominate " + student.FirstName + " " + student.LastName + " for " + superlativeSelected + " (" + (superlativeIsMale ? "male" : "female") + ")?", function (response) {
					if (response == 1) {
						superlativeLoadingCover.fadeIn(300, function() {
							// try to save
							saveSuperlative(superlativeSelected, superlativeIsMale, student);
						});
					}
				}, "Confirm Nomination", "Nominate,Cancel");
			});
			
			j ++;
		}
	}
	
	setTimeout(function() {
		superlativeStudentListScroll.refresh();
	}, 1000);
}

function saveSuperlative(superlative, isMale, student) {
	var loginDetails = getLoginDetails();
	
	req = $.ajax("https://jacketeer.org/app/superlative.php?a=" + (Math.floor(Math.random() * 99999999) + 1), {
		type: "POST",
		data: {
			superlative: superlative,
			isMale: isMale,
			studentFirstName: student.FirstName,
			studentMiddleName: student.MiddleName,
			studentLastName: student.LastName,
			user: loginDetails.user,
			token: localStorage.loginToken
		},
		cache: false
	});

	req.done(function (data) {
		if (data.success) {
			superlativeCategories = data.superlatives;
			updateSuperlativeChoices(data.superlatives);
		} else {
			navigator.notification.alert("Server error, please try again later or stop by the iPad Help Desk (room 117) for assistance.", null, "Server Error", "Uh oh!");
		}
		
		superlativeChooseCover.fadeOut(200);
	});

	req.fail(function () {
		navigator.notification.alert("Connection to the server failed. Please make sure you're connected to the internet or try again later. If you need help, you can stop by the iPad Help Desk (room 117) for assistance.", function (response) {
			if (response == 1) {
				saveSuperlative(superlative, isMale, student);
			} else {
				superlativeChooseCover.fadeOut(200);
			}
		}, "Connection Problems", "Try Again,Cancel");
	});
}
