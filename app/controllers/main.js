var args = arguments[0] || {},
	moment = require('alloy/moment');
	

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//# Initialization 

/**
 * Create a reference to the Alloy collections for the `item` model
 */
var items = Alloy.Collections.item;


/**
 * Trigger the initial fetch of available models from the SQLite database. This will initialize / load the
 * TableView automatically from the current data stored in the database.
 */
items.fetch();	


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//# NavigationBar / Menu Event Handlers

/**
 * onClick event handler for Adding a New Item
 */
function onAddItemClick() {
	
	/**
	 * Cross Platform Navigation (see index.js)
	 * ProTip - CMD+Click (mac) or CTRL+Click (win) the `open` function to jump to its definition
	 */
	Alloy.Globals.Navigator.open('addItem');
};

/**
 * IOS: Enables / Disables TableView Editing Mode
 */
function onEditClick() {
	$.tableView.editing = !$.tableView.editing;
};


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//# TableView Event Handlers

/**
 * onDelete event handler
 */
function onDeleteRow(e){
	
	/** 
	 * Check to make sure that we have a valid row with model id
	 */
	if(e.row && e.row.modelid){
		
		/**
		 * GET the model from the Collection instance. This is done by calling the `.get` function on the collection and passing in the
		 * model id.
		 */
		var model = items.get(e.row.modelid);
		
		/**
		 * Delete the model using the `.destroy` function
		 */
		model.destroy();
		
		/**
		 * Lets reset the TableView by re-fetching the collection.
		 */
		items.fetch();
	}
}

/**
 * onClick event handler for the TableView. When a row is click this is fired, and will pass in the clicked row as an object to the function.
 * @param {Object} e - The Event Object
 */
function onTableViewClick(e){
	
	Alloy.Globals.Navigator.open('addItem', {
		id: e.row.modelid,
	});
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//# Data Binding Event Handlers

/**
 * Transformation function for models prior to rendering in the TableView
 * @param {Object} model - A refernce to the Alloy Model currently being rendered
 */
function onItemTransform(model){
	
	// Convert the Alloy Model to JSON
	var item = model.toJSON();
	
	/**
	 * Transformation for the dueDate field, notice we're creating a new custom property on the 
	 * model. This property is derived at runtime and not saved to the database.
	 */
	item.date = item.dueDate ? moment(item.dueDate).format("MMMM Do, YYYY") : "";
	
	/**
	 * New Custom property `dateColor`. This derived value determines if the item/task due date has
	 * expired and allows us to specify an updated text color on the `Label.subtitle` element
	 */
	item.dateColor = moment(item.date).isBefore() ? '#cb564d' : '#999';
	
	return item;
}

