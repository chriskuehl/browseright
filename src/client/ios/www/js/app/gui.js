function initInterface() {
	console.log("PhoneGap ready")
	document.body.addEventListener('touchmove', function(e){ e.preventDefault(); });
	try {
//	console.log("moved on");
//	console.log("plugins: " + plugins);
//	console.log("plugins.tabBar: " + plugins.tabBar);
//	console.log(window.plugins);
//	console.log("ok");
	
	//var plugins = window.plugins;
	
	plugins.tabBar.init();
    plugins.tabBar.create();
    // or with an orange tint:
    plugins.tabBar.create({selectedImageTintColorRgba: '255,40,0,255'});

    plugins.tabBar.createItem("contacts", "Unused, iOS replaces this text by Contacts", "tabButton:Contacts", {"a" : "b"});
    plugins.tabBar.createItem("recents", "Unused, iOS replaces this text by Recents", "tabButton:Recents", {"a" : "b"});
    } catch (e) {
	    console.log(e);
    }
}