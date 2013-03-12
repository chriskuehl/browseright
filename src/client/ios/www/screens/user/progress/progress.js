gui.screens["user/progress"].data = {
	id: "user/progress",
	navBars: [
		{
			title: "Progress"
		}
	],
    
    setup: function(contentManager) {
    	// TODO: use contentManager for this
    	// TODO: incorporate JS magic tokens
    	registerScrollContainers($(".scroll"));
    }
};

function addSection(category, completed, street1, street2) {
	$("<div />").addClass(".category");
	$("<div />").addClass(".title").text(category);
	var ul = $(".category").find("ul");
	var li = $("<li />");
	$("<li />").addClass("section").text(street1).appendTo(a);
	$("<p />").addClass("address").text(street2).appendTo(a);
	
	li.appendTo(ul);
}