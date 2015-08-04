var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

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
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

model = Alloy.M("item", exports.definition, []);

collection = Alloy.C("item", exports.definition, model);

exports.Model = model;

exports.Collection = collection;