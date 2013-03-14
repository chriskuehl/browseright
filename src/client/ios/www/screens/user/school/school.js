gui.screens["user/school"].data = {
	id: "user/school",
	hideTabBar: true,
    navBars: [
        {
            title: "Select Your School",
            
            buttons: {
				left: {
					type: "back",
					title: "Login",
					action: function() {
						setScreen("user/login");
					}
				}
			}
        }
    ],
    
    parents: ["user/login"],
	
	setup: function(contentManager) {
		apiWithLoading("Loading schools...", "school/list", {}, [RESP_OK], function(code, data) {
			
		});
		
		for (var i = 0; i < 20; i ++) {
			addSchool(i, "School #" + i, i + " Some Street", "Middle of Nowhere, IA 52246");
		}
		
		registerScrollContainers($(".scroll"));
		
		$(".next").click(function() {
			if ($(this).hasClass("disabled")) {
				return;
			}
			
			setScreen("user/register");
		});
	}
};

function addSchool(id, name, street1, street2) {
	var ul = $(".schools").find("ul");
	
	// TODO: clean this up
	var li = $("<li />");
	var a = $("<a />").appendTo(li).data("schoolID", id).data("schoolName", name);
	$("<h2 />").text(name).appendTo(a);
	$("<p />").addClass("address").text(street1).appendTo(a);
	$("<p />").addClass("address").text(street2).appendTo(a);
	$("<div />").addClass("arrow").html("&gt;").appendTo(a);
	
	a.click(function() {
		$(this).parent().parent().find("a").removeClass("selected");
		$(this).addClass("selected");
		
		selectedSchool = {
			id: $(this).data("schoolID"),
			name: $(this).data("schoolName")
		};
		
		$(".next").removeClass("disabled");
	});
	
	li.appendTo(ul);
}