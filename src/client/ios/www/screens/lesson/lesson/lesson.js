gui.screens["lesson/lesson"].data = {
	id: "lesson/lesson",
	navBars: [{
		title: "Category One",
		width: 1406,

		buttons: {
			left: {
				type: "back",
				title: "Categories",
				action: function() {
					setScreen("lesson/category");
				}
			}
		}
	},

	{
		title: "Progress"
	}],
	parents: ["lesson/category"],

	setup: function(contentManager) {
		apiWithLoading("Loading lessons...", "content/category", {uid: selectedCategory}, [RESP_OK], function(code, data) {
			$(".nav").empty();
			
			for (var i = 0; i < data.sections.length; i ++) {
				addSection(data.sections[i]);
			}
			
			$(".categoryHolder").fadeIn(250);
		});

		// TODO: Fix this
		registerScrollContainers($(".scroll"));
	}
};

function addSection(section) {
	var header = $("<li />");
	header.addClass("section");
	header.appendTo($(".nav"));
	var d = $("<div />");
	d.appendTo(header);
	d.text(section.title);
}
