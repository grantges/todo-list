function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId5() {
        $.__views.main.removeEventListener("open", __alloyId5);
        if ($.__views.main.activity) $.__views.main.activity.onCreateOptionsMenu = function(e) {
            var __alloyId4 = {
                title: "Add Item",
                icon: Ti.Android.R.drawable.ic_menu_add,
                showAsAction: Titanium.Android.SHOW_AS_ACTION_IF_ROOM,
                id: "__alloyId3"
            };
            $.__views.__alloyId3 = e.menu.add(_.pick(__alloyId4, Alloy.Android.menuItemCreateArgs));
            $.__views.__alloyId3.applyProperties(_.omit(__alloyId4, Alloy.Android.menuItemCreateArgs));
            $.__alloyId3 = $.__views.__alloyId3;
            onAddItemClick ? $.__views.__alloyId3.addEventListener("click", onAddItemClick) : __defers["$.__views.__alloyId3!click!onAddItemClick"] = true;
        }; else {
            Ti.API.warn("You attempted to attach an Android Menu to a lightweight Window");
            Ti.API.warn("or other UI component which does not have an Android activity.");
            Ti.API.warn("Android Menus can only be opened on TabGroups and heavyweight Windows.");
        }
    }
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
                selectedBackgroundColor: "#92C058",
                hasDetail: "undefined" != typeof __alloyId7.__transform["hasDetail"] ? __alloyId7.__transform["hasDetail"] : __alloyId7.get("hasDetail")
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
        $.__views.__alloyId6.setData(rows);
    }
    function onAddItemClick() {
        function saveItem(result) {
            if (result.canncelled) {
                Ti.Analytics.featureEvent("item.add.cancelled");
                return;
            }
            var item = Alloy.createModel("item", result);
            items.add(item);
            item.save();
            items.fetch();
            Ti.Analytics.featureEvent("item.add.success", {
                title: item.get("title") ? true : false,
                date: item.get("dueDate") ? true : false,
                notes: item.get("notes") ? true : false
            });
        }
        Alloy.createController("AddItem", {
            callback: saveItem
        }).getView().open();
    }
    function onItemTransform(model) {
        var item = model.toJSON();
        item.hasDetail = false;
        item.date = moment(item.dueDate).format("MMMM Do, YYYY");
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
        titleid: "appname",
        id: "main"
    });
    $.__views.main && $.addTopLevelView($.__views.main);
    $.__views.main.addEventListener("open", __alloyId5);
    $.__views.__alloyId6 = Ti.UI.createTableView({
        id: "__alloyId6"
    });
    $.__views.main.add($.__views.__alloyId6);
    var __alloyId16 = Alloy.Collections["item"] || item;
    __alloyId16.on("fetch destroy change add remove reset", __alloyId17);
    exports.destroy = function() {
        __alloyId16.off("fetch destroy change add remove reset", __alloyId17);
    };
    _.extend($, $.__views);
    var items = (arguments[0] || {}, Alloy.Collections.item), moment = require("alloy/moment");
    items.fetch();
    __defers["$.__views.__alloyId3!click!onAddItemClick"] && $.__views.__alloyId3.addEventListener("click", onAddItemClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;