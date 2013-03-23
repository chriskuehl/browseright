gui.screens["lesson/category"].data = {
	id: "lesson/category",
	navBars: [{
		title: "Categories"
	}],

	setup: function(contentManager) {
		apiWithLoading("Loading lesson categories...", "content/categories", {}, [RESP_OK], function(code, data) {
			for (var i = 0; i < data.categories.length; i ++) {
				addCategory(i, data.categories[i]);
			}
			
			$(".categoryHolder").fadeIn(250);
		});
	}
};

/*

<div class="category">
    <div class="text"><h3>Category One</h3>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit feugiat aliquam condimcentum. Fusce
    </div>
</div>

*/

function addCategory(i, category) {
	$(".categoryHolder").hide();
	
	var div = $("<div />").addClass("category").addClass("category-" + i).data("uid", category.uid).data("title", category.title);
	
	if (i > 0) {
		div.addClass("disabled");
	}
	
	var text = $("<div />").addClass("text").appendTo(div);
	$("<h3 />").text(category.title).appendTo(text);
	$("<p />").text(category.shortDescription).appendTo(text);
	
	div.appendTo($(".categoryHolder"));
	
	div.click(function() {
		if (! $(this).hasClass("disabled")) {
			currentCategory = $(this).data("uid");
			currentCategoryTitle = $(this).data("title");
			setScreen("lesson/lesson");
		}
	});
}
