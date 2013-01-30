var gui = {
	screens: {},
	hasHiddenSplashScreen: false
};

function initInterface() {
	log("Initializing interface");
	
	applyInterfaceTweaks();
	
	if (PLATFORM == PLATFORM_IOS) {
		initTabBar();
	}
	
	initScreenHolder();
	setScreen("start/login");
	
	setTimeout(function() {
		setScreen("test/one");
	}, 1500);
	
	setTimeout(function() {
		setScreen("start/login");
	}, 4000);
}

function applyInterfaceTweaks() {
	document.body.addEventListener('touchmove', function(e){ e.preventDefault(); });
}

function initTabBar() {
	plugins.tabBar.init();
    plugins.tabBar.create();
	
    plugins.tabBar.createItem("contacts", "Unused, iOS replaces this text by Contacts", "tabButton:Contacts", {
	    onSelect: function() {
		    setScreen("test/1");
	    }
    });
    plugins.tabBar.createItem("recents", "Unused, iOS replaces this text by Recents", "tabButton:Recents", {
	    onSelect: function() {
		    setScreen("test/2");
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
	
	// create a new screen container
	var screenContainer = createNewScreenContainer();
	
	// set state
	gui.currentScreen = {
		data: gui.screens[screenPath], 
		container: screenContainer
	};
	
	// fill screen with content
	
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
		gui.currentScreen.container.show();
		gui.currentScreen.container.css({
			left: "0px"
		});
		
		callback();
		return;
	}
	
	if (gui.oldScreen.data.parents && gui.oldScreen.data.parents.indexOf(gui.currentScreen.data.id) > (- 1)) {
		// the new screen is the parent of the old one, so we need to slide in the new screen from the left
		gui.currentScreen.container.css({
			left: "-" + gui.currentScreen.container.width() + "px"
		});
		
		gui.currentScreen.container.animate({
			left: "0px"
		}, 500, "swing", null);

		gui.oldScreen.container.animate({
			left: (gui.currentScreen.container.width()) + "px"
		}, 500, "swing", function() {
			$(this).remove();
		//	unblockTouchInput();
		});
	} else {
		// slide in the new screen from the right
		gui.currentScreen.container.css({
			left: gui.currentScreen.container.width() + "px"
		});
		
		gui.currentScreen.container.animate({
			left: "0px"
		}, 500, "swing", null);

		gui.oldScreen.container.animate({
			left: "-" + (gui.currentScreen.container.width()) + "px"
		}, 500, "swing", function() {
			$(this).remove();
		//	unblockTouchInput();
		});
	}
}

function createNewScreenContainer() {
	var container = $("<div />");
	container.addClass("screenContainer");
	container.appendTo($("#contentHolder"));
	
	return container;
}