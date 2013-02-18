var gui = {
	screens: {},
	hasHiddenSplashScreen: false,
	screenContainerIndex: (- 1)
};

function initInterface() {
	log("Initializing interface");
	
	applyInterfaceTweaks();
	
	if (PLATFORM == PLATFORM_IOS) {
		initTabBar();
	}
	
	initScreenHolder();
}

function applyInterfaceTweaks() {
	document.body.addEventListener('touchmove', function(e){ e.preventDefault(); });
}

function initTabBar() {
	plugins.tabBar.init();
    plugins.tabBar.create();
	
    plugins.tabBar.createItem("account", "Account", "/www/css/assets/tabbar/accounticon.png", {
	    onSelect: function() {
		    setScreen("start/login");
	    }
    });
    plugins.tabBar.createItem("lessons", "Lessons", "/www/css/assets/tabbar/lessons.png", {
	    onSelect: function() {
		    setScreen("lesson/category");
	    }
    });
    plugins.tabBar.createItem("progress", "Progress", "/www/css/assets/tabbar/progress.png", {
		onSelect: function() {
			setScreen("lesson/quiz");
		}
	});
    plugins.tabBar.createItem("settings", "Settings", "/www/css/assets/tabbar/settings.png", {
		onSelect: function() {
			setScreen("lesson/lesson");
		}
	});
    
	
	gui.showingTabBar = false;
	plugins.tabBar.showItems("account", "lessons", "progress", "settings");
}

function initScreenHolder() {
	resetScreen();
}

function resetScreen() {
	if (! gui.currentScreen) {
		return;
	}
	
	gui.oldScreen = gui.currentScreen;
	gui.currentScreen = null;
}

function setScreen(screenPath) {
	log("Changing screen to: " + screenPath);
	
	// load JS (and other files) if they haven't already been loaded
	if (! gui.screens[screenPath] || ! gui.screens[screenPath].fullyLoaded) {
		log("Data not loaded for screen \"" + screenPath + "\", requesting load...");
		
		loadScreen(screenPath, function() {
			log("Screen load OK");
			setScreenWithLoadedData(screenPath);
		});
	} else {
		log("Already have data for screen: " + screenPath);
		setScreenWithDataLoaded(screenPath);
	}
}

function loadScreen(screenPath, callback) {
	log("Loading data for screen: " + screenPath);
	
	// initialize screen storage
	var screenName = getScreenNameFromPath(screenPath);
	
	gui.screens[screenPath] = {
		fullyLoaded: false,
		loaded: []
	};
	
	var screenFilePath = "screens/" + screenPath + "/" + screenName;
	log("File path: " + screenFilePath);
	
	// html
	$.get(screenFilePath + ".html", function(data) {
		log("Component loaded for screen: html");
		gui.screens[screenPath].loaded.push("html");
		gui.screens[screenPath].html = data;
		
		checkScreenLoaded(screenPath);
		
	});
	
	// css
	$.get(screenFilePath + ".css", function(data) {
		log("Component loaded for screen: css");
		gui.screens[screenPath].loaded.push("css");
		gui.screens[screenPath].css = data;
		
		checkScreenLoaded(screenPath);
	});
	
	// js
	loadJavaScriptFiles([screenFilePath + ".js"], function() {
		log("Component loaded for screen: js");
		gui.screens[screenPath]["loaded"].push("js");
		checkScreenLoaded(screenPath);
	});
}

function updateCSSForScreenContainer(css, screenContainer, path) {
	css = css.replaceAll("$ASSETS", path + "assets");
	css = css.replaceAll("$PATH", path);
	css = css.replaceAll("$BOLD", "\"HelveticaNeue-Bold\"");
	css = css.replaceAll("$SCREEN", "#" + screenContainer.attr("id"));
	
	return css;
}

function checkScreenLoaded(screenPath) {
	var elementsToLoad = ["html", "css", "js"];
	var currentlyLoaded = gui.screens[screenPath].loaded.slice(0);
	
	for (var i = 0; i < gui.screens[screenPath].loaded.length; i ++) {
		var loadedElement = gui.screens[screenPath].loaded[i];
		elementsToLoad.removeElement(loadedElement);
	}
	
	if (elementsToLoad.length > 0) {
		log("Still waiting for: " + JSON.stringify(elementsToLoad));
	} else {
		log("All data loaded for screen " + screenPath);
		gui.screens[screenPath].fullyLoaded = true;
		
		setScreenWithDataLoaded(screenPath);
	}
}

function setScreenWithDataLoaded(screenPath) {
	var screenName = getScreenNameFromPath(screenPath);
	
	log("Finally changing screen for: " + screenPath);
	resetScreen();
	
	var screenData = gui.screens[screenPath];
	
	// create a new screen container
	var screenContainer = createNewScreenContainer();
	var screenContainerID = "screenContainer-" + (++ gui.screenContainerIndex);
	
	screenContainer.attr({
		id: screenContainerID
	});
	
	// create the CSS container
	var cssContainer = createNewCSSContainer();
	var cssContainerID = "cssContainer-" + (++ gui.screenContainerIndex);
	
	cssContainer.attr({
		id: cssContainerID
	});
	
	// set state
	gui.currentScreen = {
		data: gui.screens[screenPath], 
		container: {
			screen: screenContainer,
			css: cssContainer
		}
	};
	
	// fill CSS container with the rules we loaded
	var logicalPath = "screens/" + screenPath + "/";
	cssContainer.html("<style>" + updateCSSForScreenContainer(screenData.css, screenContainer, logicalPath) + "</style>");
	
	// fill screen with content
	screenContainer.html(screenData.html);
	
	// call JavaScript setup
	screenData.data.setup(null); // TODO: contentManager
	
	// display the new screen
	showNewScreen(function() {
		if (! gui.hasHiddenSplashScreen) {
			log("Hiding splash screen for the first time.");
			
			if (PLATFORM == PLATFORM_IOS) {
				gui.hasHiddenSplashScreen = true;
				navigator.splashscreen.hide();
			} else {
				log("Not really hiding splash screen (not iOS).");
			}
		}
	});
}

function getScreenNameFromPath(screenPath) {
	var tokens = screenPath.split("/");
	return tokens[tokens.length - 1];
}

function showTabBar() {
	log("Showing tab bar");
	gui.showingTabBar = true;
	plugins.tabBar.show();
}

function hideTabBar() {
	log("Hiding tab bar");
	gui.showingTabBar = false;
	plugins.tabBar.hide();
}

function showNewScreen(callback) {
	// iOS changes (nav bar and tab bar)
	if (PLATFORM == PLATFORM_IOS) {
		// tab bar
		var shouldShowTabBar = (! gui.currentScreen.data.data.hideTabBar);
		
		if (shouldShowTabBar && ! gui.showingTabBar) {
			showTabBar();
		} else if (! shouldShowTabBar && gui.showingTabBar) {
			hideTabBar();
		}
	}
	
	// nav bar
	var oldNavBarContainer = $(".navBarContainer").children();
	
	oldNavBarContainer.each(function() {
		var n = $(this);
		n.animate({
			left: "-" + (n.width()) + "px",
			opacity: 0
		}, 500, "linear", function() {
			$(this).remove();
		});
	});
	
	var navBarContainer = createNewNavBarContainer();
	navBarContainer.css({
		left: (navBarContainer.width() / 3) + "px",
		opacity: 0
	});
	
	// add each new nav bar
	if (gui.currentScreen.data.data.navBars) {
		var navBars = gui.currentScreen.data.data.navBars;
		var startX = 0;
		
		
		for (var i = 0; i < navBars.length; i ++) {
			var navBarData = navBars[i];
			
			if (i > 0) {
				// add a separator
				var sep = $("<div />");
				sep.appendTo(navBarContainer);
				sep.addClass("separator");
				sep.css("left", (startX - 7) + "px");
			}
			
			var fullWidth = i >= (navBars.length - 1); // is there anything to the right?
			var width = fullWidth ? ($("#navBar").width() - startX) : navBarData.width; // ignore given width if full; otherwise, use it
			
			// add the title text
			var title = $("<h1 />");
			title.appendTo(navBarContainer);
			title.css({
				position: "absolute",
				
				left: startX + "px",
				width: width + "px"
			});
			title.text(navBarData.title);
			
			// adjust start position for future bars
			if (! fullWidth) {
				startX += width;
			}
		}
		
		setTimeout(function() {
			navBarContainer.css({
				left: "0px",
				opacity: 1
			});
		}, 1000);
	}
	
	if (! gui.oldScreen) {
		gui.currentScreen.container.screen.show();
		gui.currentScreen.container.screen.css({
			left: "0px"
		});
		
		callback();
		return;
	}
	
	if (gui.oldScreen.data.data.parents && gui.oldScreen.data.data.parents.indexOf(gui.currentScreen.data.data.id) > (- 1)) {
		// the new screen is the parent of the old one, so we need to slide in the new screen from the left
		gui.currentScreen.container.screen.css({
			left: "-" + gui.currentScreen.container.screen.width() + "px"
		});
		
		gui.currentScreen.container.screen.animate({
			left: "0px"
		}, 500, "swing", null);

		gui.oldScreen.container.screen.animate({
			left: (gui.currentScreen.container.screen.width()) + "px"
		}, 500, "swing", function() {
			$(this).remove();
		//	unblockTouchInput();
		});
	} else {
		// slide in the new screen from the right
		gui.currentScreen.container.screen.css({
			left: gui.currentScreen.container.screen.width() + "px"
		});
		
		gui.currentScreen.container.screen.animate({
			left: "0px"
		}, 500, "swing", null);

		gui.oldScreen.container.screen.animate({
			left: "-" + (gui.currentScreen.container.screen.width()) + "px"
		}, 500, "swing", function() {
			$(this).remove();
		//	unblockTouchInput();
		});
	}
}

function createNewNavBarContainer() {
	var container = createNewContainer();
	container.addClass("navBarContainer");
	container.appendTo($("#navBar"));
	
	return container;
}

function createNewScreenContainer() {
	var container = createNewContainer();
	container.addClass("screenContainer");
	container.appendTo($("#contentHolder"));
	
	return container;
}

function createNewCSSContainer() {
	var container = createNewContainer();
	container.addClass("cssContainer");
	container.appendTo($("#cssHolder"));
	
	return container;
}

function createNewContainer() {
	return $("<div />");
}