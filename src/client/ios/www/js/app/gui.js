var gui = {
	screens: {}
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
	var screenName = getScreenNameFromPath(screenPath);
	
	// load JS file if it hasn't already been loaded
	if (! gui.screens[screenPath]) {
		log("Loading data for screen: " + screenPath);
		loadJavaScriptFiles(["screens/" + screenPath + "/" + screenName + ".js"], function() {
			log("Loaded data for screen: " + screenPath);
			setScreenWithDataLoaded(screenPath);
		});
	} else {
		log("Already have data for screen: " + screenPath);
		setScreenWithDataLoaded(screenPath);
	}
}

function setScreenWithDataLoaded(screenPath) {
	log("Finally changing screen for: " + screenPath);
	resetScreen();
	
	// create a new screen container
	var screenContainer = createNewScreenContainer();
	
	// set state
	gui.currentScreen = {
		data: gui.screens[screenPath], 
		container: screenContainer
	};
	
	// display the new screen
	showNewScreen(function() {
		
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
			left: "-" + gui.currentScreen.container.width() + "px",
			backgroundColor: "purple"
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
			left: gui.currentScreen.container.width() + "px",
			backgroundColor: "yellow"
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