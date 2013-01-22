var orderIframeLoader;

var screenOrder = {
	id: "order",
	title: "Order Your Yearbook",
	parent: "help",

	titleButton: {
		text: "Back to My Yearbook",
		event: function () {
			setScreen(screenHelp);
		}
	},

	setup: function (container) {
		container.css({
			backgroundColor: "rgba(253, 249, 207, 0.2)",
			boxShadow: "inset 0px 0px 900px rgba(253, 249, 207, 0.8)"
		});

		var introText = $("<p />");
		introText.appendTo(container);
		introText.css({
			textAlign: "center",
			fontSize: "38px",
			lineHeight: "1.6em",
			margin: "50px",
			color: "rgba(0, 0, 0, 0.7)"
		});
		introText.html("To order your yearbook, visit www.yearbookordercenter.com and use the school code \"14548\".");
		
		// submit button
		/*var p = $("<p />");
		p.appendTo(container);
		p.css("textAlign", "center");
		
		
		var submit = $("<a />");
		submit.attr({
			href: "https://jacketjournal.com/index.cfm/jobSearch/displayLanding?searchNbr=jobNbr&txtSearchNbr=14548",
			target: "_blank"
		});
		submit.appendTo(p);
		submit.css({
			fontSize: "48px",
			backgroundColor: "rgba(100, 100, 0, 0.1)",
			textAlign: "center",
			marginTop: "100px",
			border: "solid 4px rgba(0, 0, 0, 0.4)",
			backgroundColor: "rgba(255, 255, 0, 0.4)",
			padding: "30px",
			borderRadius: "15px",
			textDecoration: "none",
			color: "rgba(0, 0, 0, 0.8)"
		});
		submit.text("Place an Order"); */
		
		/*
		var iframeHolder = $("<div />");
		iframeHolder.css({
			border: "solid 4px rgba(0, 0, 0, 0.5)",
			width: "1800px",
			height: "1200px",
			marginLeft: "auto",
			marginRight: "auto"
		});
		iframeHolder.appendTo(container);
		
		orderIframeLoader = $("<iframe />");
		orderIframeLoader.appendTo(container);
		orderIframeLoader.attr({
			width: "1",
			height: "1"
		});
		
		loadOrder("https://www.yearbookordercenter.com/index.cfm/jobSearch/displayLanding", {searchNbr: "jobNbr", txtSearchNbr: "14548"}, function(data) {
			var hasLoaded = false;
			
			var iframe = $("<iframe />");
			iframe.appendTo(iframeHolder);
			iframe.attr({
				src: "https://www.yearbookordercenter.com/index.cfm/Product/index",
				width: iframeHolder.innerWidth() / 2,
				height: iframeHolder.innerHeight() / 2,
				seamless: "seamless"
			});
			
			//iframe[0].contentDocument.open();
			//iframe[0].contentDocument.write(data);
			//iframe[0].contentDocument.close();
			
			iframe.load(function() {
				var contents = $(this).contents();
				
				if (contents.find("html")[0].outerHTML.contains("jacketeer.org")) {
					return alert("l8r=" + iframe[0].contentDocument.cookie);;
				}
				
				//alert(iframe[0].contentDocument.cookie);
				
				// contents.find('head').append('<meta id="viewport" name="viewport" content="width=1024, initial-scale=5.0, maximum-scale=5.0, user-scalable=0, minimum-scale=5.0">');
				contents.find("body").css("zoom", 2); // = 2.0;
				contents.find("script[src='https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js']").attr("src", "https://jacketeer.org/app/order/jquery.min.js");
				
				console.log(contents.find("html")[0].outerHTML);
				var html = contents.find("html")[0].outerHTML;
				
				
				//iframe[0].contentDocument.open();
				iframe[0].contentDocument.write(html + "<script>document.domain = \"www.yearbookordercenter.com\";</script>"); // + " <!-- test --> <script>alert(document.cookie);</script>");
				//iframe[0].contentDocument.domain = ";
				//iframe[0].contentDocument.close();
				alert("after=" + iframe[0].contentDocument.cookie);
			});
		});*/

	}
};

function loadOrder(url, data, callback) {
	orderIframeLoader.attr("src", url);
	orderIframeLoader.load(function() {
		callback();
	});
}
