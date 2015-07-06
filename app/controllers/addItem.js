
var args = arguments[0] || {};
var $A = require('alloy/animation');
var _callback = args.callback || null;
var items = Alloy.Collections.item;

if(args.id){
	
	var model = items.get(args.id);
	
	$.item.set(model);
	$.addItemWindow.title = $.item.get("title");
	
}

/**
 * onClick event handler for the Cancel Button
 */
function onClickCancel(e) {
	$.addItemWindow.close();
	
	_callback && _callback({cancelled:true});
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
		 * check to make sure that a callback was passed into the view as an initial parameter (see above).
		 * If a callback exists then send the data captured in this form back to the main view.
		 * 
		 * Best Practice:
		 * Data Handling can be confusing, so localizing the data interactions as much as possible is key to your success
		 * in mobile. While we could save the model here and then just close the app, by using this as a view to gather 
		 * information and  pass it back to the main view, we can localize all data manipulation to a single view.
		 * 
		 * This practice also allows for greater use and flexibility of this view 
		 */
		_callback && _callback({
			title: $.titleTxt.value,
			notes: $.notesTxt.value,
			dueDate: $.dateTxt.value
		});
		
		$.addItemWindow.close();	
	}
	else {
		
		alert('Oops! Did you forget to add a title?');
		
	}
}

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
			$.addItemWindow.remove(datePicker);
		}
	}
		
	function onOk(e){
		
		$.dateTxt.value = e.date;
		if(OS_IOS){
			datePicker.animate(closeAnimation, function(){
				$.addItemWindow.remove(datePicker);
			});
		} 
		else{
			$.addItemWindow.remove(datePicker);
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
    $.addItemWindow.add(datePicker);
    
    /**
     * Animate if on iOS
     */
    OS_IOS && datePicker.animate(openAnimation);
	
}
