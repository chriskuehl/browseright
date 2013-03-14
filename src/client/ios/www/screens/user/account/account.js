gui.screens["user/account"].data = {
	id: "user/account",
	navBars: [{
		title: "Account"
	}],

	parents: ["user/login"],

	setup: function(contentManager) {
		$(".signout").click(function() {
			logOut(false);
		});
		
		// fill in student information
		$(".studentName").text(userInfo.firstName + " " + userInfo.lastName);
		$(".school").text(userInfo.school.name);
		$(".street").text(userInfo.school.street);
		$(".city").text(userInfo.school.city + ", " + userInfo.school.state + " " + userInfo.school.zipCode);
		$(".email").text(userInfo.school.helpEmail);
		
		//fill in school message
		$(".announcement").text(userInfo.school.announcementText);
	}
};
