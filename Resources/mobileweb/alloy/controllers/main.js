function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId17(e) {
        if (e && e.fromAdapter) return;
        __alloyId17.opts || {};
        var models = __alloyId16.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId7 = models[i];
            __alloyId7.__transform = onItemTransform(__alloyId7);
            var __alloyId9 = Ti.UI.createTableViewRow({
                selectedBackgroundColor: "#038BC8",
                hasChild: "true",
                modelid: "undefined" != typeof __alloyId7.__transform["alloy_id"] ? __alloyId7.__transform["alloy_id"] : __alloyId7.get("alloy_id")
            });
            rows.push(__alloyId9);
            var __alloyId11 = Ti.UI.createView({
                height: 65,
                layout: "vertical"
            });
            __alloyId9.add(__alloyId11);
            var __alloyId13 = Ti.UI.createLabel({
                width: Ti.UI.SIZE,
                height: Ti.UI.SIZE,
                color: "#555",
                left: 15,
                font: {
                    fontSize: 16,
                    fontWeight: "bold"
                },
                top: 10,
                text: "undefined" != typeof __alloyId7.__transform["title"] ? __alloyId7.__transform["title"] : __alloyId7.get("title")
            });
            __alloyId11.add(__alloyId13);
            var __alloyId15 = Ti.UI.createLabel({
                width: Ti.UI.SIZE,
                height: Ti.UI.SIZE,
                color: "undefined" != typeof __alloyId7.__transform["dateColor"] ? __alloyId7.__transform["dateColor"] : __alloyId7.get("dateColor"),
                left: 15,
                font: {
                    fontSize: 14
                },
                top: 3,
                text: "undefined" != typeof __alloyId7.__transform["date"] ? __alloyId7.__transform["date"] : __alloyId7.get("date")
            });
            __alloyId11.add(__alloyId15);
        }
        $.__views.tableView.setData(rows);
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
    $.__views.tableView = Ti.UI.createTableView({
        id: "tableView"
    });
    $.__views.main.add($.__views.tableView);
    var __alloyId16 = Alloy.Collections["item"] || item;
    __alloyId16.on("fetch destroy change add remove reset", __alloyId17);
    onTableViewClick ? $.__views.tableView.addEventListener("click", onTableViewClick) : __defers["$.__views.tableView!click!onTableViewClick"] = true;
    onDeleteRow ? $.__views.tableView.addEventListener("delete", onDeleteRow) : __defers["$.__views.tableView!delete!onDeleteRow"] = true;
    exports.destroy = function() {
        __alloyId16.off("fetch destroy change add remove reset", __alloyId17);
    };
    _.extend($, $.__views);
    var moment = (arguments[0] || {}, require("alloy/moment"));
    var items = Alloy.Collections.item;
    items.fetch();
    __defers["$.__views.tableView!click!onTableViewClick"] && $.__views.tableView.addEventListener("click", onTableViewClick);
    __defers["$.__views.tableView!delete!onDeleteRow"] && $.__views.tableView.addEventListener("delete", onDeleteRow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;