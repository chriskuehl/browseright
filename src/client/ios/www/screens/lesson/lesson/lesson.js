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
		$(".nav").empty();
		apiWithLoading("Loading lessons...", "content/category", {uid: selectedCategory}, [RESP_OK], function(code, data) {
			for (var i = 0; i < data.sections.length; i ++) {
				addSection(data.sections[i]);
			}
		});

		// TODO: Fix this
		//registerScrollContainers($(".scroll"));
	}
};

function addSection(section) {
	var header = $("<li />");
	header.addClass("section");
	header.appendTo($(".nav"));
	var d = $("<div />");
	d.appendTo(header);
	d.text(section.title);
	
	// now add the items
	for (var i = 0; i < section.items.length; i ++) {
		var item = section.items[i];
		
		var li = $("<li />");
		li.appendTo($(".nav"));
		var d = $("<div />");
		d.appendTo(li);
		d.text(item.title);
		
		li.data("itemID", item.id);
		
		li.click(function() {
			var id = $(this).data("itemID");
			$(".nav").find("li").removeClass("current");
			$(this).addClass("current");
		});
	}
}
