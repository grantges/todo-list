
var args = arguments[0] || {};
var items = Alloy.Collections.item;


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//# Initialization

initView();


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//# Methods 

function initView(){
	
	if(args.id){
	
		$model = items.get(args.id);
		$.item.set($model);
		$.addItemWindow.title = $.item.get("title");
	
	}	
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//# Button Event Handlers


/**
 * onClick event handler for the Cancel Button
 */
function onClickCancel(e) {
	
	/**
	 * Appcelerator Analytics Event
	 */
	Ti.Analytics.featureEvent('item.add.cancel');
	
	
	/**
	 * Close the window
	 */
	$.addItemWindow.close();
	
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
		
		if(!$model) {
			$model = Alloy.createModel('item');
			items.add($model);
		}
		
		$model.set('title', $.titleTxt.value);
		$model.set('notes', $.notesTxt.value);
		$model.set('dueDate', $.dateTxt.value);
		
		$model.save();
		
		/**
		 * Appcelerator Analytics Event
		 */
		Ti.Analytics.featureEvent('item.add.success', {
			title: ($.titleTxt.value) ? true : false,
			notes: ($.notesTxt.value) ? true : false,
			dueDate: ($.dateTxt.value) ? true : false 
		});
		
		/** Close the Window **/
		$.addItemWindow.close();	
	}
	else {
		
		alert('Oops! Did you forget to add a title?');
		
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//# DatePicker Event Handler


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
