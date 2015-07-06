var args = arguments[0] || {};
var cancel = args.cancel || null;
var ok = args.ok || null;

/**
 * Take any Ti.UI attributes passed to the view and use them to properly style the view.
 */
_.extend($.datePicker, args.attributes);

var date = new Date($.picker.value).toGMTString();

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
