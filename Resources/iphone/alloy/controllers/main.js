function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId21(e) {
        if (e && e.fromAdapter) return;
        __alloyId21.opts || {};
        var models = __alloyId20.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId11 = models[i];
            __alloyId11.__transform = onItemTransform(__alloyId11);
            var __alloyId13 = Ti.UI.createTableViewRow({
                selectedBackgroundColor: "#038BC8",
                hasChild: "true",
                modelid: "undefined" != typeof __alloyId11.__transform["alloy_id"] ? __alloyId11.__transform["alloy_id"] : __alloyId11.get("alloy_id")
            });
            rows.push(__alloyId13);
            var __alloyId15 = Ti.UI.createView({
                height: 65,
                layout: "vertical"
            });
            __alloyId13.add(__alloyId15);
            var __alloyId17 = Ti.UI.createLabel({
                width: Ti.UI.SIZE,
                height: Ti.UI.SIZE,
                color: "#555",
                left: 15,
                font: {
                    fontSize: 16,
                    fontWeight: "bold"
                },
                top: 10,
                text: "undefined" != typeof __alloyId11.__transform["title"] ? __alloyId11.__transform["title"] : __alloyId11.get("title")
            });
            __alloyId15.add(__alloyId17);
            var __alloyId19 = Ti.UI.createLabel({
                width: Ti.UI.SIZE,
                height: Ti.UI.SIZE,
                color: "undefined" != typeof __alloyId11.__transform["dateColor"] ? __alloyId11.__transform["dateColor"] : __alloyId11.get("dateColor"),
                left: 15,
                font: {
                    fontSize: 14
                },
                top: 3,
                text: "undefined" != typeof __alloyId11.__transform["date"] ? __alloyId11.__transform["date"] : __alloyId11.get("date")
            });
            __alloyId15.add(__alloyId19);
        }
        $.__views.tableView.setData(rows);
    }
    function onAddItemClick() {
        Alloy.Globals.Navigator.open("addItem");
    }
    function onEditClick() {
        $.tableView.editing = !$.tableView.editing;
    }
    function onDeleteRow(e) {
        if (e.row && e.row.modelid) {
            var model = items.get(e.row.modelid);
            model.destroy();
            items.fetch();
        }
    }
    function onTableViewClick(e) {
        Alloy.Globals.Navigator.open("addItem", {
            id: e.row.modelid
        });
    }
    function onItemTransform(model) {
        var item = model.toJSON();
        item.date = item.dueDate ? moment(item.dueDate).format("MMMM Do, YYYY") : "";
        item.dateColor = moment(item.date).isBefore() ? "#cb564d" : "#999";
        return item;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "main";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    Alloy.Collections.instance("item");
    $.__views.main = Ti.UI.createWindow({
        backgroundColor: "#fff",
        barColor: "#CD1625",
        navTintColor: "#fff",
        titleAttributes: {
            color: "#fff"
        },
        titleid: "appname",
        id: "main"
    });
    $.__views.main && $.addTopLevelView($.__views.main);
    $.__views.__alloyId8 = Ti.UI.createButton({
        color: "#ffffff",
        borderRadius: "10",
        borderWidth: "0",
        height: "45",
        width: "27%",
        systemButton: Titanium.UI.iPhone.SystemButton.ADD,
        id: "__alloyId8"
    });
    onAddItemClick ? $.__views.__alloyId8.addEventListener("click", onAddItemClick) : __defers["$.__views.__alloyId8!click!onAddItemClick"] = true;
    $.__views.main.rightNavButton = $.__views.__alloyId8;
    $.__views.__alloyId10 = Ti.UI.createButton({
        color: "#ffffff",
        borderRadius: "10",
        borderWidth: "0",
        height: "45",
        width: "27%",
        systemButton: Titanium.UI.iPhone.SystemButton.EDIT,
        id: "__alloyId10"
    });
    onEditClick ? $.__views.__alloyId10.addEventListener("click", onEditClick) : __defers["$.__views.__alloyId10!click!onEditClick"] = true;
    $.__views.main.leftNavButton = $.__views.__alloyId10;
    $.__views.tableView = Ti.UI.createTableView({
        id: "tableView"
    });
    $.__views.main.add($.__views.tableView);
    var __alloyId20 = Alloy.Collections["item"] || item;
    __alloyId20.on("fetch destroy change add remove reset", __alloyId21);
    onTableViewClick ? $.__views.tableView.addEventListener("click", onTableViewClick) : __defers["$.__views.tableView!click!onTableViewClick"] = true;
    onDeleteRow ? $.__views.tableView.addEventListener("delete", onDeleteRow) : __defers["$.__views.tableView!delete!onDeleteRow"] = true;
    exports.destroy = function() {
        __alloyId20.off("fetch destroy change add remove reset", __alloyId21);
    };
    _.extend($, $.__views);
    var moment = (arguments[0] || {}, require("alloy/moment"));
    var items = Alloy.Collections.item;
    items.fetch();
    __defers["$.__views.__alloyId8!click!onAddItemClick"] && $.__views.__alloyId8.addEventListener("click", onAddItemClick);
    __defers["$.__views.__alloyId10!click!onEditClick"] && $.__views.__alloyId10.addEventListener("click", onEditClick);
    __defers["$.__views.tableView!click!onTableViewClick"] && $.__views.tableView.addEventListener("click", onTableViewClick);
    __defers["$.__views.tableView!delete!onDeleteRow"] && $.__views.tableView.addEventListener("delete", onDeleteRow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;