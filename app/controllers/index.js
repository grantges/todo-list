
/**
 * Create an instance of your model
 */
var myModel = Alloy.createModel('item');
		

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//# Button Event Handlers for Saving and Deleting Alloy Models

/**
 * onClick event handler for the Cancel Button
 */
function onClickDelete(e) {

	alert("Deleting model: \n\n"+JSON.stringify(myModel.toJSON()));	

	/**
	 * Delete the Model from the Datbase
	 */
	myModel.destroy();
	
}

/**
 * onClick event handlers for the Save Button
 */
function onClickSave(e) {
	
	/**
	 * Validate that the user has specified at the very least a title for the 
	 * todo list item. If not, throw an alert.
	 */
	if($.titleTxt.value) {
		
		/**
		 * Models are references to native objects, which is why the `set` and `get`
		 * functions are required to set/access model data. You can use the .toJSON()
		 * function to convert the native object to a JS object to make it easier to
		 * access functionality.
		 */
		myModel.set('title', $.titleTxt.value);
		myModel.set('notes', $.notesTxt.value);
		myModel.set('dueDate', $.dateTxt.value);
		
		/**
		 * Use the .save() function to commit your updates to the database, 
		 * otherwise nothing will be saved. 
		 */
		myModel.save();
		
		alert("Your model was saved: \n\n"+JSON.stringify(myModel.toJSON()));	
	}
	else {
		
		alert('Oops! Did you forget to add a title?');
		
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//# DatePicker Event Handlers

function onCalendarClick(e){
	
	var datePicker;
	if(OS_IOS){
		var openAnimation = Ti.UI.createAnimation({
	        opacity: 1,
	        bottom:  0,
	        duration: 250
	    });
		var closeAnimation = Ti.UI.createAnimation({
	        bottom: -250,
	        opacity: 0,
	        duration: 250
	    });
	}    
		
	function onCancel(){
		if(OS_IOS){
			datePicker.animate(closeAnimation, function(){
				$.addItemWindow.remove(datePicker);
			});
		}
		else{
			$.index.remove(datePicker);
		}
	}
		
	function onOk(e){
		
		$.dateTxt.value = e.date;
		if(OS_IOS){
			datePicker.animate(closeAnimation, function(){
				$.index.remove(datePicker);
			});
		} 
		else{
			$.index.remove(datePicker);
		}
		
		
	}
	
	/**
	 * Create the DatePicker View
	 */
	datePicker = Alloy.createController('datePicker', {
		cancel: onCancel,
		ok: onOk, 
		attributes: {
			bottom: OS_IOS ? -250 : 0,
			opacity: OS_IOS ? 0.0 : 1.0
		}
	}).getView();
	
    /**
     * Add the DatePicker View to the main window
     */
    $.index.add(datePicker);
    
    /**
     * Animate if on iOS
     */
    OS_IOS && datePicker.animate(openAnimation);
	
}


// Open the Window
$.index.open();