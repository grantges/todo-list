var args = arguments[0] || {};
var cancel = args.cancel || null;
var ok = args.ok || null;
var date;

initView();

function initView(){
	/**
	 * Take any Ti.UI attributes passed to the view and use them to properly style the view.
	 */
	_.extend($.datePicker, args.attributes);
	
	date = new Date().toGMTString();
}

function onUpdate(e){
	var d = new Date(e.value);
	date = d.toGMTString();
}

function onCancel(){
	cancel && cancel();
}

function onSubmit(){
	ok && ok({date: date});
}
