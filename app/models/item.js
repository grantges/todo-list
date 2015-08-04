

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
	
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			
		});

		return Collection;
	}
};
