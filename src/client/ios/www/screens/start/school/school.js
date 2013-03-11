gui.screens["start/school"].data = {
	id: "start/school",
	hideTabBar: true,
    navBars: [
        {
            title: "Select Your School",
            
            buttons: {
				left: {
					type: "back",
					title: "Login",
					action: function() {
						setScreen("start/login");
					}
				}
			}
        }
    ],
    
    parents: ["start/login"],
		
	setup: function(contentManager) {
		for (var i = 0; i < 20; i ++) {
			addSchool(i, "School #" + i, i + " Some Street", "Middle of Nowhere, IA 52246");
		}
		
		registerScrollContainers($(".scroll"));
		
		$(".next").click(function() {
			setScreen("start/register");
		});
	}
};

function addSchool(i, name, street1, street2) {
	var ul = $(".schools").find("ul");
	
	var li = $("<li />");
	var a = $("<a />").appendTo(li);
	$("<h2 />").text(name).appendTo(a);
	$("<p />").addClass("address").text(street1).appendTo(a);
	$("<p />").addClass("address").text(street2).appendTo(a);
	$("<div />").addClass("arrow").html("&gt;").appendTo(a);
	
	li.appendTo(ul);
}