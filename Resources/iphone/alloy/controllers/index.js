function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function onClickDelete() {
        alert("Deleting model: \n\n" + JSON.stringify(myModel.toJSON()));
        myModel.destroy();
    }
    function onClickSave() {
        if ($.titleTxt.value) {
            myModel.set("title", $.titleTxt.value);
            myModel.set("notes", $.notesTxt.value);
            myModel.set("dueDate", $.dateTxt.value);
            myModel.save();
            alert("Your model was saved: \n\n" + JSON.stringify(myModel.toJSON()));
        } else alert("Oops! Did you forget to add a title?");
    }
    function onCalendarClick() {
        function onCancel() {
            datePicker.animate(closeAnimation, function() {
                $.addItemWindow.remove(datePicker);
            });
        }
        function onOk(e) {
            $.dateTxt.value = e.date;
            datePicker.animate(closeAnimation, function() {
                $.index.remove(datePicker);
            });
        }
        var datePicker;
        var openAnimation = Ti.UI.createAnimation({
            opacity: 1,
            bottom: 0,
            duration: 250
        });
        var closeAnimation = Ti.UI.createAnimation({
            bottom: -250,
            opacity: 0,
            duration: 250
        });
        datePicker = Alloy.createController("datePicker", {
            cancel: onCancel,
            ok: onOk,
            attributes: {
                bottom: -250,
                opacity: 0
            }
        }).getView();
        $.index.add(datePicker);
        true && datePicker.animate(openAnimation);
    }
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
    var __defers = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "#fff",
        barColor: "#CD1625",
        navTintColor: "#fff",
        titleAttributes: {
            color: "#fff"
        },
        titleid: "addItem",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.__alloyId0 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId0"
    });
    $.__views.index.add($.__views.__alloyId0);
    $.__views.titleLbl = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: "20",
        color: "#4c4c4c",
        font: {
            fontSize: "18",
            fontFamily: "Arial",
            fontStyle: "normal",
            fontWeight: "normal"
        },
        id: "titleLbl",
        left: "5%",
        top: "5%",
        textid: "titleLbl"
    });
    $.__views.__alloyId0.add($.__views.titleLbl);
    $.__views.titleTxt = Ti.UI.createTextField({
        backgroundColor: "#e7e7e7",
        borderColor: "#d8d8d8",
        borderRadius: "3",
        borderStyle: "Titanium.UI.INPUT_BORDERSTYLE_NONE",
        borderWidth: "1",
        height: "45",
        left: "5%",
        paddingLeft: "15",
        right: "5%",
        top: "10",
        id: "titleTxt"
    });
    $.__views.__alloyId0.add($.__views.titleTxt);
    $.__views.notesLbl = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: "20",
        color: "#4c4c4c",
        font: {
            fontSize: "18",
            fontFamily: "Arial",
            fontStyle: "normal",
            fontWeight: "normal"
        },
        id: "notesLbl",
        left: "5%",
        top: "5%",
        textid: "notesLbl"
    });
    $.__views.__alloyId0.add($.__views.notesLbl);
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
        left: "5%",
        right: "5%",
        top: "10",
        id: "notesTxt"
    });
    $.__views.__alloyId0.add($.__views.notesTxt);
    $.__views.View_2 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        top: "15dp",
        id: "View_2"
    });
    $.__views.__alloyId0.add($.__views.View_2);
    onCalendarClick ? $.__views.View_2.addEventListener("click", onCalendarClick) : __defers["$.__views.View_2!click!onCalendarClick"] = true;
    $.__views.dateTxt = Ti.UI.createTextField({
        backgroundColor: "#e7e7e7",
        borderColor: "#d8d8d8",
        borderRadius: "3",
        borderStyle: "Titanium.UI.INPUT_BORDERSTYLE_NONE",
        borderWidth: "1",
        height: "45",
        left: "5%",
        paddingLeft: "15",
        right: "5%",
        top: "0",
        touchEnabled: false,
        id: "dateTxt",
        name: "dateTxt"
    });
    $.__views.View_2.add($.__views.dateTxt);
    $.__views.calendarBtn = Ti.UI.createImageView({
        height: "40",
        image: "/images/calendar.png",
        right: "5.5%",
        width: Ti.UI.SIZE,
        id: "calendarBtn"
    });
    $.__views.View_2.add($.__views.calendarBtn);
    $.__views.View_1 = Ti.UI.createView({
        top: "15",
        height: Ti.UI.SIZE,
        id: "View_1"
    });
    $.__views.__alloyId0.add($.__views.View_1);
    $.__views.deleteBtn = Ti.UI.createButton({
        color: "#ffffff",
        borderRadius: "10",
        borderWidth: "0",
        height: "45",
        width: "27%",
        titleid: "deleteBtn",
        left: "5%",
        backgroundColor: "#cb564d",
        id: "deleteBtn"
    });
    $.__views.View_1.add($.__views.deleteBtn);
    onClickDelete ? $.__views.deleteBtn.addEventListener("click", onClickDelete) : __defers["$.__views.deleteBtn!click!onClickDelete"] = true;
    $.__views.saveBtn = Ti.UI.createButton({
        color: "#ffffff",
        borderRadius: "10",
        borderWidth: "0",
        height: "45dp",
        width: "27%",
        titleid: "saveBtn",
        right: "5%",
        backgroundColor: "#3792c6",
        id: "saveBtn"
    });
    $.__views.View_1.add($.__views.saveBtn);
    onClickSave ? $.__views.saveBtn.addEventListener("click", onClickSave) : __defers["$.__views.saveBtn!click!onClickSave"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var myModel = Alloy.createModel("item");
    $.index.open();
    __defers["$.__views.View_2!click!onCalendarClick"] && $.__views.View_2.addEventListener("click", onCalendarClick);
    __defers["$.__views.deleteBtn!click!onClickDelete"] && $.__views.deleteBtn.addEventListener("click", onClickDelete);
    __defers["$.__views.saveBtn!click!onClickSave"] && $.__views.saveBtn.addEventListener("click", onClickSave);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;