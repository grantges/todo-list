function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function onClickCancel() {
        $.AddItem.close();
        _callback && _callback({
            cancelled: true
        });
    }
    function onClickSave() {
        if ($.titleTxt.value) {
            _callback && _callback({
                title: $.titleTxt.value,
                notes: $.notesTxt.value,
                dueDate: $.dateTxt.value
            });
            $.AddItem.close();
        } else alert("Oops! Did you forget to add a title?");
    }
    function onCalendarClick() {
        function onCancel() {
            $.AddItem.remove(datePicker);
        }
        function onOk(e) {
            $.dateTxt.value = e.date;
            $.AddItem.remove(datePicker);
        }
        Ti.API.info("Calendar Clicked");
        var datePicker;
        datePicker = Alloy.createController("datePicker", {
            cancel: onCancel,
            ok: onOk
        }).getView();
        datePicker.bottom = 0;
        $.AddItem.add(datePicker);
        false;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "AddItem";
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
    $.__views.AddItem = Ti.UI.createWindow({
        backgroundColor: "#fff",
        modal: "true",
        navBarHidden: "true",
        titleid: "add-item",
        id: "AddItem"
    });
    $.__views.AddItem && $.addTopLevelView($.__views.AddItem);
    $.__views.scrollView_1 = Ti.UI.createScrollView({
        id: "scrollView_1",
        layout: "vertical"
    });
    $.__views.AddItem.add($.__views.scrollView_1);
    $.__views.titleLbl = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: "20dp",
        color: "#4c4c4c",
        font: {
            fontSize: "18",
            fontFamily: "Arial",
            fontStyle: "normal",
            fontWeight: "normal"
        },
        id: "titleLbl",
        left: "5%",
        text: "Title",
        top: "5%"
    });
    $.__views.scrollView_1.add($.__views.titleLbl);
    $.__views.titleTxt = Ti.UI.createTextField({
        height: "45dp",
        backgroundColor: "#e7e7e7",
        borderColor: "#d8d8d8",
        borderRadius: "3",
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_NONE,
        borderWidth: "1",
        id: "titleTxt",
        left: "5%",
        paddingLeft: "15",
        right: "5%",
        top: "10"
    });
    $.__views.scrollView_1.add($.__views.titleTxt);
    $.__views.descriptionLbl = Ti.UI.createLabel({
        width: "44.06%",
        height: "20dp",
        color: "#4c4c4c",
        font: {
            fontSize: "18",
            fontFamily: "Arial",
            fontStyle: "normal",
            fontWeight: "normal"
        },
        id: "descriptionLbl",
        left: "5%",
        text: "Notes",
        top: "20"
    });
    $.__views.scrollView_1.add($.__views.descriptionLbl);
    $.__views.notesTxt = Ti.UI.createTextArea({
        color: "#666",
        font: {
            fontSize: "18",
            fontFamily: "Arial",
            fontStyle: "normal",
            fontWeight: "normal"
        },
        backgroundColor: "#e7e7e7",
        borderColor: "#d8d8d8",
        borderRadius: "3",
        borderWidth: "1",
        height: "40%",
        id: "notesTxt",
        left: "5%",
        right: "5%",
        top: "10"
    });
    $.__views.scrollView_1.add($.__views.notesTxt);
    $.__views.View_2 = Ti.UI.createView({
        height: "7%",
        id: "View_2",
        left: "5%",
        right: "5%",
        top: "15dp"
    });
    $.__views.scrollView_1.add($.__views.View_2);
    onCalendarClick ? $.__views.View_2.addEventListener("click", onCalendarClick) : __defers["$.__views.View_2!click!onCalendarClick"] = true;
    $.__views.dateTxt = Ti.UI.createTextField({
        height: "45dp",
        touchEnabled: true,
        backgroundColor: "#e7e7e7",
        borderColor: "#d8d8d8",
        borderRadius: "3",
        borderWidth: "1",
        color: "#333333",
        enabled: "false",
        hintText: "Due Date",
        id: "dateTxt",
        left: "0",
        name: "dateTxt",
        paddingLeft: "15",
        right: "0",
        rightButtonMode: Titanium.UI.INPUT_BUTTONMODE_ALWAYS,
        rightButtonPadding: "15",
        top: "0"
    });
    $.__views.View_2.add($.__views.dateTxt);
    $.__views.calendarBtn = Ti.UI.createImageView({
        touchEnabled: true,
        height: "40dp",
        id: "calendarBtn",
        image: "/images/calendar.png",
        name: "ImageView_2",
        right: "5dp",
        top: "5dp",
        width: "40dp"
    });
    $.__views.View_2.add($.__views.calendarBtn);
    $.__views.View_1 = Ti.UI.createView({
        height: "50",
        id: "View_1",
        layout: "absolute",
        top: "20"
    });
    $.__views.scrollView_1.add($.__views.View_1);
    $.__views.cancelBtn = Ti.UI.createButton({
        color: "#ffffff",
        borderRadius: "10",
        borderWidth: "0",
        height: "45",
        width: "27%",
        titleid: "cancelBtn",
        left: "5%",
        top: 0,
        backgroundColor: "#cb564d",
        id: "cancelBtn"
    });
    $.__views.View_1.add($.__views.cancelBtn);
    onClickCancel ? $.__views.cancelBtn.addEventListener("click", onClickCancel) : __defers["$.__views.cancelBtn!click!onClickCancel"] = true;
    $.__views.saveBtn = Ti.UI.createButton({
        color: "#ffffff",
        borderRadius: "10",
        borderWidth: "0",
        height: "45dp",
        width: "27%",
        titleid: "saveBtn",
        right: "5%",
        top: "0",
        backgroundColor: "#3792c6",
        id: "saveBtn"
    });
    $.__views.View_1.add($.__views.saveBtn);
    onClickSave ? $.__views.saveBtn.addEventListener("click", onClickSave) : __defers["$.__views.saveBtn!click!onClickSave"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    require("alloy/animation");
    var _callback = args.callback || null;
    __defers["$.__views.View_2!click!onCalendarClick"] && $.__views.View_2.addEventListener("click", onCalendarClick);
    __defers["$.__views.cancelBtn!click!onClickCancel"] && $.__views.cancelBtn.addEventListener("click", onClickCancel);
    __defers["$.__views.saveBtn!click!onClickSave"] && $.__views.saveBtn.addEventListener("click", onClickSave);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;