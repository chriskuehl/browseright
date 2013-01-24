var gui = {};

function initInterface() {
	log("Initializing interface");
	
	applyInterfaceTweaks();
	initTabBar();
	
	initScreenHolder();
	setScreen("start/login");
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
	
	showNewScreen(function() {
		
	});
}

function showNewScreen(callback) {
	if (! gui.oldScreen) {
		gui.currentScreen.show();
		gui.currentScreen.css({
			left: "0px"
		});
		
		callback();
		return;
	}
}

function createNewScreenContainer() {
	var container = $("<div />");
	container.addClass("screenContainer");
	container.appendTo($("#contentHolder"));
	
	return container;
}