


Alloy.Globals.Navigator = {
	win : null,
	open: function(controller, options){
		
		Alloy.Globals.Navigator.win = Alloy.createController(controller, options).getView();
		 
		if(OS_IOS){
			$.index.openWindow(Alloy.Globals.Navigator.win);
		}
		else if(OS_MOBILEWEB){
			$.index.open(Alloy.Globals.Navigator.win);
		} 
		else {
			Alloy.Globals.Navigator.win.open();
		}
	}
};

if(OS_ANDROID){
	$.index.getView().open();
}
else {
	$.index.open();
}