function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function onUpdate(e) {
        var d = new Date(e.value);
        date = d.toGMTString();
    }
    function onCancel() {
        cancel && cancel();
    }
    function onSubmit() {
        ok && ok({
            date: date
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "datePicker";
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
    $.__views.datePicker = Ti.UI.createView({
        backgroundColor: "#AA000000",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        id: "datePicker"
    });
    $.__views.datePicker && $.addTopLevelView($.__views.datePicker);
    $.__views.picker = Ti.UI.createPicker({
        maxDate: new Date("Fri May 01 2020 12:00:00 GMT-0500 (CDT)"),
        bottom: 70,
        height: 200,
        width: "90%",
        borderRadius: 3,
        format24: false,
        calendarViewShown: false,
        id: "picker",
        type: Ti.UI.PICKER_TYPE_DATE
    });
    $.__views.datePicker.add($.__views.picker);
    onUpdate ? $.__views.picker.addEventListener("change", onUpdate) : __defers["$.__views.picker!change!onUpdate"] = true;
    $.__views.submitBtn = Ti.UI.createButton({
        color: "#ffffff",
        borderRadius: "10",
        borderWidth: "0",
        height: "45",
        width: "27%",
        right: "5%",
        bottom: "2%",
        backgroundColor: "#3792c6",
        id: "submitBtn",
        titleid: "okBtn"
    });
    $.__views.datePicker.add($.__views.submitBtn);
    onSubmit ? $.__views.submitBtn.addEventListener("click", onSubmit) : __defers["$.__views.submitBtn!click!onSubmit"] = true;
    $.__views.cancelBtn = Ti.UI.createButton({
        color: "#ffffff",
        borderRadius: "10",
        borderWidth: "0",
        height: "45",
        width: "27%",
        left: "5%",
        bottom: "2%",
        backgroundColor: "#cb564d",
        id: "cancelBtn",
        titleid: "cancelBtn"
    });
    $.__views.datePicker.add($.__views.cancelBtn);
    onCancel ? $.__views.cancelBtn.addEventListener("click", onCancel) : __defers["$.__views.cancelBtn!click!onCancel"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var cancel = args.cancel || null;
    var ok = args.ok || null;
    _.extend($.datePicker, args.attributes);
    var date = new Date($.picker.value).toGMTString();
    __defers["$.__views.picker!change!onUpdate"] && $.__views.picker.addEventListener("change", onUpdate);
    __defers["$.__views.submitBtn!click!onSubmit"] && $.__views.submitBtn.addEventListener("click", onSubmit);
    __defers["$.__views.cancelBtn!click!onCancel"] && $.__views.cancelBtn.addEventListener("click", onCancel);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;