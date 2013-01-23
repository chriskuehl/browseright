function initInterface() {
	log("Initializing interface");
	
	applyInterfaceTweaks();
	initTabBar();
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