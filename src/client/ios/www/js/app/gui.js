var gui = {};

function initInterface() {
	log("Initializing interface");
	
	applyInterfaceTweaks();
	
	if (PLATFORM == PLATFORM_IOS) {
		initTabBar();
	}
	
	initScreenHolder();
	setScreen("test/1");
	
	setTimeout(function() {
		setScreen("test/2");
	}, 1500);
}

function applyInterfaceTweaks() {
	document.body.addEventListener('touchmove', function(e){ e.preventDefault(); });
}

function initTabBar() {
	plugins.tabBar.init();
    plugins.tabBar.create();
	
    plugins.tabBar.createItem("contacts", "Unused, iOS replaces this text by Contacts", "tabButton:Contacts");
    plugins.tabBar.createItem("recents", "Unused, iOS replaces this text by Recents", "tabButton:Recents");
	
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
	resetScreen();
	
	// create a new screen container
	var screenContainer = createNewScreenContainer();
	
	// set state
	gui.currentScreen = {
		data: {
			
		}, 
		container: screenContainer
	};
	
	// display the new screen
	showNewScreen(function() {
		
	});
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
	
	if (gui.oldScreen.data.parent && gui.oldScreen.data.parent == gui.currentScreen.data.id) {
		// the new screen is the parent of the old one, so we need to slide in the new screen from the left
		gui.currentScreen.container.css({
			left: "-" + gui.currentScreen.container.width() + "px",
			backgroundColor: "purple"
		});
		
		gui.currentScreen.container.animate({
			left: "0px"
		}, 500, "swing", null);

		gui.oldScreen.container.animate({
			left: (ui.screenContainer.width()) + "px"
		}, 500, "swing", function() {
			$(this).remove();
			unblockTouchInput();
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
			left: "-" + (ui.screenContainer.width()) + "px"
		}, 500, "swing", function() {
			$(this).remove();
			unblockTouchInput();
		});
	}
}

function createNewScreenContainer() {
	var container = $("<div />");
	container.addClass("screenContainer");
	container.appendTo($("#contentHolder"));
	
	return container;
}