var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

var moment = require("alloy/moment");

exports.definition = {
    config: {
        columns: {
            title: "text",
            notes: "text",
            dueDate: "text",
            status: "integer"
        },
        adapter: {
            type: "sql",
            collection_name: "item"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {
            isBefore: function() {
                var model = this.toJSON();
                if (model.dueDate) return moment(model.dueDate.substring(0, model.dueDate.indexOf(" "))).isBefore();
                return false;
            }
        });
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
            comparator: function(a) {
                return moment(a.get("dueDate"));
            }
        });
        return Collection;
    }
};

model = Alloy.M("item", exports.definition, []);

collection = Alloy.C("item", exports.definition, model);

exports.Model = model;

exports.Collection = collection;