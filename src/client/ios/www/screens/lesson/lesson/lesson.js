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
		if (currentCategory == null) {
			dialog("Select a Category", "Please select a category first!", ["OK"], function() {
				setScreen("lesson/category");
			});

			return;
		}
		
		$(".nav").empty();
		apiWithLoading("Loading lessons...", "content/category", {uid: currentCategory}, [RESP_OK], function(code, data) {
			for (var i = 0; i < data.sections.length; i ++) {
				addSectionLesson(data.sections[i]);
			}
		});

		// TODO: Fix this
		//registerScrollContainers($(".scroll"));
	}
};

function addSectionLesson(section) {
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
			
			loadItem(id);
		});
	}
}

function loadItem(id) {
	var content = $(".content");
	content.empty();
	
	apiWithLoading("Loading lesson...", "content/item", {id: id}, [RESP_OK], function(code, data) {
		var item = data.item;
		
		var h2 = $("<h2 />");
		h2.text(item.title);
		h2.appendTo(content);
			
		if (item.type == "ARTICLE") {
			var p = $("<p />");
			p.text(item.text);
			p.appendTo(content);
		} else if (item.type == "QUIZ") {
			
		}
	});
}
