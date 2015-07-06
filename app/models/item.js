var moment = require('alloy/moment');

exports.definition = {
	config: {
		columns: {
		    "title": "text",
		    "notes": "text",
		    "dueDate": "text",
		    "status": "integer"
		},
		adapter: {
			type: "sql",
			collection_name: "item"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
			
			isBefore: function(date){
				var model = this.toJSON();
				
				if(model.dueDate){
					return moment(model.dueDate.substring(0, model.dueDate.indexOf(" "))).isBefore();
				}
				
				return false;
			}
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			
			/**
			 * Comparator function for the collection specifying that we want to sort the collection
			 * by date in ascending order.
			 * 
 			 * @param {Object} a - Reference to the active Model
			 */
			comparator: function(a){
				return moment(a.get('dueDate'));
			}
		});

		return Collection;
	}
};
