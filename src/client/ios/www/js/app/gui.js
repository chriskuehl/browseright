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
	
    plugins.tabBar.createItem("contacts", "Unused, iOS replaces this text by Contacts", "tabButton:Contacts", {
	    onSelect: function() {
		    setScreen("start/login");
	    }
    });
    plugins.tabBar.createItem("recents", "Unused, iOS replaces this text by Recents", "tabButton:Recents", {
	    onSelect: function() {
		    setScreen("test/one");
	    }
    });
	
	plugins.tabBar.show();
	plugins.tabBar.showItems("contacts", "recents");
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

function showNewScreen(callback) {
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