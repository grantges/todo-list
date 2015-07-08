function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId7() {
        $.__views.main.removeEventListener("open", __alloyId7);
        if ($.__views.main.activity) $.__views.main.activity.onCreateOptionsMenu = function(e) {
            var __alloyId6 = {
                title: "Add Item",
                icon: Ti.Android.R.drawable.ic_menu_add,
                showAsAction: Titanium.Android.SHOW_AS_ACTION_IF_ROOM,
                id: "__alloyId5"
            };
            $.__views.__alloyId5 = e.menu.add(_.pick(__alloyId6, Alloy.Android.menuItemCreateArgs));
            $.__views.__alloyId5.applyProperties(_.omit(__alloyId6, Alloy.Android.menuItemCreateArgs));
            $.__alloyId5 = $.__views.__alloyId5;
            onAddItemClick ? $.__views.__alloyId5.addEventListener("click", onAddItemClick) : __defers["$.__views.__alloyId5!click!onAddItemClick"] = true;
        }; else {
            Ti.API.warn("You attempted to attach an Android Menu to a lightweight Window");
            Ti.API.warn("or other UI component which does not have an Android activity.");
            Ti.API.warn("Android Menus can only be opened on TabGroups and heavyweight Windows.");
        }
    }
    function __alloyId18(e) {
        if (e && e.fromAdapter) return;
        __alloyId18.opts || {};
        var models = __alloyId17.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId8 = models[i];
            __alloyId8.__transform = onItemTransform(__alloyId8);
            var __alloyId10 = Ti.UI.createTableViewRow({
                selectedBackgroundColor: "#038BC8",
                hasChild: "true",
                modelid: "undefined" != typeof __alloyId8.__transform["alloy_id"] ? __alloyId8.__transform["alloy_id"] : __alloyId8.get("alloy_id")
            });
            rows.push(__alloyId10);
            var __alloyId12 = Ti.UI.createView({
                height: 65,
                layout: "vertical"
            });
            __alloyId10.add(__alloyId12);
            var __alloyId14 = Ti.UI.createLabel({
                width: Ti.UI.SIZE,
                height: Ti.UI.SIZE,
                color: "#555",
                left: 15,
                font: {
                    fontSize: 16,
                    fontWeight: "bold"
                },
                top: 10,
                text: "undefined" != typeof __alloyId8.__transform["title"] ? __alloyId8.__transform["title"] : __alloyId8.get("title")
            });
            __alloyId12.add(__alloyId14);
            var __alloyId16 = Ti.UI.createLabel({
                width: Ti.UI.SIZE,
                height: Ti.UI.SIZE,
                color: "undefined" != typeof __alloyId8.__transform["dateColor"] ? __alloyId8.__transform["dateColor"] : __alloyId8.get("dateColor"),
                left: 15,
                font: {
                    fontSize: 14
                },
                top: 3,
                text: "undefined" != typeof __alloyId8.__transform["date"] ? __alloyId8.__transform["date"] : __alloyId8.get("date")
            });
            __alloyId12.add(__alloyId16);
        }
        $.__views.tableView.setData(rows);
    }
    function onAddItemClick() {
        Alloy.Globals.Navigator.open("addItem");
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
    $.__views.main.addEventListener("open", __alloyId7);
    $.__views.tableView = Ti.UI.createTableView({
        id: "tableView"
    });
    $.__views.main.add($.__views.tableView);
    var __alloyId17 = Alloy.Collections["item"] || item;
    __alloyId17.on("fetch destroy change add remove reset", __alloyId18);
    onTableViewClick ? $.__views.tableView.addEventListener("click", onTableViewClick) : __defers["$.__views.tableView!click!onTableViewClick"] = true;
    onDeleteRow ? $.__views.tableView.addEventListener("delete", onDeleteRow) : __defers["$.__views.tableView!delete!onDeleteRow"] = true;
    exports.destroy = function() {
        __alloyId17.off("fetch destroy change add remove reset", __alloyId18);
    };
    _.extend($, $.__views);
    var moment = (arguments[0] || {}, require("alloy/moment"));
    var items = Alloy.Collections.item;
    items.fetch();
    __defers["$.__views.__alloyId5!click!onAddItemClick"] && $.__views.__alloyId5.addEventListener("click", onAddItemClick);
    __defers["$.__views.tableView!click!onTableViewClick"] && $.__views.tableView.addEventListener("click", onTableViewClick);
    __defers["$.__views.tableView!delete!onDeleteRow"] && $.__views.tableView.addEventListener("delete", onDeleteRow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;