function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
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
    $.__views.__alloyId2 = Alloy.createController("main", {
        id: "__alloyId2"
    });
    $.__views.index = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.__alloyId2.getViewEx({
            recurse: true
        }),
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.Navigator = {
        win: null,
        open: function(controller, options) {
            Alloy.Globals.Navigator.win = Alloy.createController(controller, options).getView();
            $.index.openWindow(Alloy.Globals.Navigator.win);
        }
    };
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;