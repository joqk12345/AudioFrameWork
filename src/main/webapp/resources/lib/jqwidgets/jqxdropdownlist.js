/*
 jQWidgets v3.1.0 (2013-Dec-23)
 Copyright (c) 2011-2014 jQWidgets.
 License: http://jqwidgets.com/license/
 */

(function (a) {
    a.jqx.jqxWidget("jqxDropDownList", "", {});
    a.extend(a.jqx._jqxDropDownList.prototype, {defineInstance: function () {
        this.disabled = false;
        this.width = null;
        this.height = null;
        this.items = new Array();
        this.selectedIndex = -1;
        this.source = null;
        this.scrollBarSize = 15;
        this.arrowSize = 19;
        this.enableHover = true;
        this.enableSelection = true;
        this.visualItems = new Array();
        this.groups = new Array();
        this.equalItemsWidth = true;
        this.itemHeight = -1;
        this.visibleItems = new Array();
        this.emptyGroupText = "Group";
        this.checkboxes = false;
        if (this.openDelay == undefined) {
            this.openDelay = 250
        }
        if (this.closeDelay == undefined) {
            this.closeDelay = 300
        }
        this.animationType = "default";
        this.autoOpen = false;
        this.dropDownWidth = "auto";
        this.dropDownHeight = "200px";
        this.autoDropDownHeight = false;
        this.keyboardSelection = true;
        this.enableBrowserBoundsDetection = false;
        this.dropDownHorizontalAlignment = "left";
        this.displayMember = "";
        this.valueMember = "";
        this.searchMode = "startswithignorecase";
        this.incrementalSearch = true;
        this.incrementalSearchDelay = 700;
        this.renderer = null;
        this.placeHolder = "Please Choose:";
        this.promptText = "Please Choose:";
        this.emptyString = "";
        this.rtl = false;
        this.selectionRenderer = null;
        this.listBox = null;
        this.popupZIndex = 9999999999999;
        this.renderMode = "default";
        this.touchMode = "auto";
        this._checkForHiddenParent = true;
        this.aria = {"aria-disabled": {name: "disabled", type: "boolean"}};
        this.events = ["open", "close", "select", "unselect", "change", "checkChange", "bindingComplete"]
    }, createInstance: function (b) {
        this.render()
    }, render: function () {
        if (!this.width) {
            this.width = 200
        }
        if (!this.height) {
            this.height = 25
        }
        this.element.innerHTML = "";
        this.isanimating = false;
        this.id = this.element.id || a.jqx.utilities.createId();
        this.host.attr("role", "combobox");
        a.jqx.aria(this, "aria-autocomplete", "both");
        a.jqx.aria(this, "aria-readonly", false);
        var d = a("<div tabIndex=0 style='background-color: transparent; -webkit-appearance: none; outline: none; width:100%; height: 100%; padding: 0px; margin: 0px; border: 0px; position: relative;'><div id='dropdownlistWrapper' style='outline: none; background-color: transparent; border: none; float: left; width:100%; height: 100%; position: relative;'><div id='dropdownlistContent' style='outline: none; background-color: transparent; border: none; float: left; position: relative;'/><div id='dropdownlistArrow' style='background-color: transparent; border: none; float: right; position: relative;'><div></div></div></div></div>");
        this._addInput();
        if (a.jqx._jqxListBox == null || a.jqx._jqxListBox == undefined) {
            throw new Error("jqxDropDownList: Missing reference to jqxlistbox.js.")
        }
        var h = this;
        this.touch = a.jqx.mobile.isTouchDevice();
        this.comboStructure = d;
        this.host.append(d);
        this.dropdownlistWrapper = this.host.find("#dropdownlistWrapper");
        this.dropdownlistArrow = this.host.find("#dropdownlistArrow");
        this.arrow = a(this.dropdownlistArrow.children()[0]);
        this.dropdownlistContent = this.host.find("#dropdownlistContent");
        this.dropdownlistContent.addClass(this.toThemeProperty("jqx-dropdownlist-content"));
        this.dropdownlistWrapper.addClass(this.toThemeProperty("jqx-disableselect"));
        if (this.rtl) {
            this.dropdownlistContent.addClass(this.toThemeProperty("jqx-rtl"));
            this.dropdownlistContent.addClass(this.toThemeProperty("jqx-dropdownlist-content-rtl"))
        }
        this.addHandler(this.dropdownlistWrapper, "selectstart", function () {
            return false
        });
        this.dropdownlistWrapper[0].id = "dropdownlistWrapper" + this.element.id;
        this.dropdownlistArrow[0].id = "dropdownlistArrow" + this.element.id;
        this.dropdownlistContent[0].id = "dropdownlistContent" + this.element.id;
        if (this.promptText != "Please Choose:") {
            this.placeHolder = this.promptText
        }
        var j = this.toThemeProperty("jqx-widget") + " " + this.toThemeProperty("jqx-dropdownlist-state-normal") + " " + this.toThemeProperty("jqx-rc-all") + " " + this.toThemeProperty("jqx-fill-state-normal");
        this.element.className += " " + j;
        this._firstDiv = this.host.find("div:first");
        try {
            var k = "listBox" + this.id;
            var f = a(a.find("#" + k));
            if (f.length > 0) {
                f.remove()
            }
            a.jqx.aria(this, "aria-owns", k);
            a.jqx.aria(this, "aria-haspopup", true);
            var b = a("<div style='overflow: hidden; background-color: transparent; border: none; position: absolute;' id='listBox" + this.id + "'><div id='innerListBox" + this.id + "'></div></div>");
            b.hide();
            b.appendTo(document.body);
            this.container = b;
            this.listBoxContainer = a(a.find("#innerListBox" + this.id));
            var c = this.width;
            if (this.dropDownWidth != "auto") {
                c = this.dropDownWidth
            }
            if (c == null) {
                c = this.host.width();
                if (c == 0) {
                    c = this.dropDownWidth
                }
            }
            if (this.dropDownHeight == null) {
                this.dropDownHeight = 200
            }
            var h = this;
            this.container.width(parseInt(c) + 25);
            this.container.height(parseInt(this.dropDownHeight) + 25);
            this.addHandler(this.listBoxContainer, "bindingComplete", function (e) {
                h._raiseEvent("6")
            });
            this.listBoxContainer.jqxListBox({_checkForHiddenParent: false, touchMode: this.touchMode, checkboxes: this.checkboxes, rtl: this.rtl, emptyString: this.emptyString, itemHeight: this.itemHeight, width: c, searchMode: this.searchMode, incrementalSearch: this.incrementalSearch, incrementalSearchDelay: this.incrementalSearchDelay, displayMember: this.displayMember, valueMember: this.valueMember, height: this.dropDownHeight, autoHeight: this.autoDropDownHeight, scrollBarSize: this.scrollBarSize, selectedIndex: this.selectedIndex, source: this.source, theme: this.theme, rendered: function () {
                if (h.selectedIndex != h.listBoxContainer.jqxListBox("selectedIndex")) {
                    h.listBox = a.data(h.listBoxContainer[0], "jqxListBox").instance;
                    h.listBoxContainer.jqxListBox({selectedIndex: h.selectedIndex});
                    h.renderSelection("mouse")
                } else {
                    h.renderSelection("mouse")
                }
            }, renderer: this.renderer});
            this.listBoxContainer.css({position: "absolute", zIndex: this.popupZIndex, top: 0, left: 0});
            this.listBox = a.data(this.listBoxContainer[0], "jqxListBox").instance;
            this.listBox.enableSelection = this.enableSelection;
            this.listBox.enableHover = this.enableHover;
            this.listBox.equalItemsWidth = this.equalItemsWidth;
            this.listBox.selectIndex(this.selectedIndex);
            this.listBox._arrange();
            this.listBoxContainer.addClass(this.toThemeProperty("jqx-popup"));
            if (a.jqx.browser.msie) {
                this.listBoxContainer.addClass(this.toThemeProperty("jqx-noshadow"))
            }
            this.addHandler(this.listBoxContainer, "unselect", function (e) {
                h._raiseEvent("3", {index: e.args.index, type: e.args.type, item: e.args.item})
            });
            this.addHandler(this.listBoxContainer, "change", function (e) {
                h._raiseEvent("4", {index: e.args.index, type: e.args.type, item: e.args.item})
            });
            if (this.animationType == "none") {
                this.container.css("display", "none")
            } else {
                this.container.hide()
            }
        } catch (g) {
        }
        var l = this;
        this.propertyChangeMap.disabled = function (e, n, m, o) {
            if (o) {
                e.host.addClass(l.toThemeProperty("jqx-dropdownlist-state-disabled"));
                e.host.addClass(l.toThemeProperty("jqx-fill-state-disabled"));
                e.dropdownlistContent.addClass(l.toThemeProperty("jqx-dropdownlist-content-disabled"))
            } else {
                e.host.removeClass(l.toThemeProperty("jqx-dropdownlist-state-disabled"));
                e.host.removeClass(l.toThemeProperty("jqx-fill-state-disabled"));
                e.dropdownlistContent.removeClass(l.toThemeProperty("jqx-dropdownlist-content-disabled"))
            }
            a.jqx.aria(e, "aria-disabled", e.disabled)
        };
        if (this.disabled) {
            this.host.addClass(this.toThemeProperty("jqx-dropdownlist-state-disabled"));
            this.host.addClass(this.toThemeProperty("jqx-fill-state-disabled"));
            this.dropdownlistContent.addClass(this.toThemeProperty("jqx-dropdownlist-content-disabled"))
        }
        this.arrow.addClass(this.toThemeProperty("jqx-icon-arrow-down"));
        this.arrow.addClass(this.toThemeProperty("jqx-icon"));
        if (this.renderMode === "simple") {
            this.arrow.remove();
            this.host.removeClass(this.toThemeProperty("jqx-fill-state-normal"));
            this.host.removeClass(this.toThemeProperty("jqx-rc-all"))
        }
        this._updateHandlers();
        this._setSize();
        this._arrange();
        if (this.listBox) {
            this.renderSelection()
        }
        if (a.jqx.browser.msie && a.jqx.browser.version < 8) {
            if (this.host.parents(".jqx-window").length > 0) {
                var i = this.host.parents(".jqx-window").css("z-index");
                b.css("z-index", i + 10);
                this.listBoxContainer.css("z-index", i + 10)
            }
        }
    }, val: function (c) {
        if (!this.dropdownlistContent) {
            return""
        }
        if (this.input && arguments.length == 0) {
            return this.input.val()
        }
        var b = this.getItemByValue(c);
        if (b != null) {
            this.selectItem(b)
        }
        if (this.input) {
            return this.input.val()
        }
    }, focus: function () {
        try {
            var d = this;
            var c = function () {
                d.host.focus();
                if (d._firstDiv) {
                    d._firstDiv.focus()
                }
            };
            c();
            setTimeout(function () {
                c()
            }, 10)
        } catch (b) {
        }
    }, _addInput: function () {
        var b = this.host.attr("name");
        if (!b) {
            b = this.element.id
        }
        this.input = a("<input type='hidden'/>");
        this.host.append(this.input);
        this.input.attr("name", b)
    }, getItems: function () {
        if (!this.listBox) {
            return new Array()
        }
        return this.listBox.items
    }, getVisibleItems: function () {
        return this.listBox.getVisibleItems()
    }, _setSize: function () {
        if (this.width != null && this.width.toString().indexOf("px") != -1) {
            this.host.width(this.width)
        } else {
            if (this.width != undefined && !isNaN(this.width)) {
                this.host.width(this.width)
            }
        }
        if (this.height != null && this.height.toString().indexOf("px") != -1) {
            this.host.height(this.height)
        } else {
            if (this.height != undefined && !isNaN(this.height)) {
                this.host.height(this.height)
            }
        }
        var e = false;
        if (this.width != null && this.width.toString().indexOf("%") != -1) {
            e = true;
            this.host.width(this.width)
        }
        if (this.height != null && this.height.toString().indexOf("%") != -1) {
            e = true;
            this.host.height(this.height)
        }
        var c = this;
        var d = function () {
            c._arrange();
            if (c.dropDownWidth == "auto") {
                var f = c.host.width();
                c.listBoxContainer.jqxListBox({width: f});
                c.container.width(parseInt(f) + 25)
            }
        };
        if (e) {
            var b = this.host.width();
            if (this.dropDownWidth != "auto") {
                b = this.dropDownWidth
            }
            this.listBoxContainer.jqxListBox({width: b});
            this.container.width(parseInt(b) + 25)
        }
        a.jqx.utilities.resize(this.host, function () {
            d()
        }, false, this._checkForHiddenParent)
    }, isOpened: function () {
        var c = this;
        var b = a.data(document.body, "openedJQXListBox" + this.id);
        if (b != null && b == c.listBoxContainer) {
            return true
        }
        return false
    }, _updateHandlers: function () {
        var c = this;
        var d = false;
        this.removeHandlers();
        if (!this.touch) {
            this.addHandler(this.host, "mouseenter", function () {
                if (!c.disabled && c.enableHover && c.renderMode !== "simple") {
                    d = true;
                    c.host.addClass(c.toThemeProperty("jqx-dropdownlist-state-hover"));
                    c.arrow.addClass(c.toThemeProperty("jqx-icon-arrow-down-hover"));
                    c.host.addClass(c.toThemeProperty("jqx-fill-state-hover"))
                }
            });
            this.addHandler(this.host, "mouseleave", function () {
                if (!c.disabled && c.enableHover && c.renderMode !== "simple") {
                    c.host.removeClass(c.toThemeProperty("jqx-dropdownlist-state-hover"));
                    c.host.removeClass(c.toThemeProperty("jqx-fill-state-hover"));
                    c.arrow.removeClass(c.toThemeProperty("jqx-icon-arrow-down-hover"));
                    d = false
                }
            })
        }
        if (this.host.parents()) {
            this.addHandler(this.host.parents(), "scroll.dropdownlist" + this.element.id, function (e) {
                var f = c.isOpened();
                if (f) {
                    c.close()
                }
            })
        }
        var b = "mousedown";
        if (this.touch) {
            b = a.jqx.mobile.getTouchEventName("touchstart")
        }
        this.addHandler(this.dropdownlistWrapper, b, function (f) {
            if (!c.disabled) {
                var e = c.container.css("display") == "block";
                if (!c.isanimating) {
                    if (e) {
                        c.hideListBox();
                        return false
                    } else {
                        c.showListBox()
                    }
                }
            }
        });
        if (c.autoOpen) {
            this.addHandler(this.host, "mouseenter", function () {
                var e = c.isOpened();
                if (!e && c.autoOpen) {
                    c.open();
                    c.host.focus()
                }
            });
            a(document).on("mousemove." + c.id, function (h) {
                var g = c.isOpened();
                if (g && c.autoOpen) {
                    var l = c.host.coord();
                    var k = l.top;
                    var j = l.left;
                    var i = c.container.coord();
                    var e = i.left;
                    var f = i.top;
                    canClose = true;
                    if (h.pageY >= k && h.pageY <= k + c.host.height()) {
                        if (h.pageX >= j && h.pageX < j + c.host.width()) {
                            canClose = false
                        }
                    }
                    if (h.pageY >= f && h.pageY <= f + c.container.height()) {
                        if (h.pageX >= e && h.pageX < e + c.container.width()) {
                            canClose = false
                        }
                    }
                    if (canClose) {
                        c.close()
                    }
                }
            })
        }
        if (this.touch) {
            this.addHandler(a(document), a.jqx.mobile.getTouchEventName("touchstart") + "." + this.id, c.closeOpenedListBox, {me: this, listbox: this.listBox, id: this.id})
        } else {
            this.addHandler(a(document), "mousedown." + this.id, c.closeOpenedListBox, {me: this, listbox: this.listBox, id: this.id})
        }
        this.addHandler(this.host, "keydown", function (f) {
            var e = c.container.css("display") == "block";
            if (c.host.css("display") == "none") {
                return true
            }
            if (f.keyCode == "13" || f.keyCode == "9") {
                if (!c.isanimating) {
                    if (e) {
                        c.renderSelection();
                        if (f.keyCode == "13") {
                            c._firstDiv.focus()
                        }
                        c.hideListBox();
                        if (!c.keyboardSelection) {
                            c._raiseEvent("2", {index: c.selectedIndex, type: "keyboard", item: c.getItem(c.selectedIndex)})
                        }
                    }
                    if (e && f.keyCode != "9") {
                        return false
                    }
                    return true
                }
            }
            if (f.keyCode == 115) {
                if (!c.isanimating) {
                    if (!c.isOpened()) {
                        c.showListBox()
                    } else {
                        if (c.isOpened()) {
                            c.hideListBox()
                        }
                    }
                }
                return false
            }
            if (f.altKey) {
                if (c.host.css("display") == "block") {
                    if (f.keyCode == 38) {
                        if (c.isOpened()) {
                            c.hideListBox();
                            return true
                        }
                    } else {
                        if (f.keyCode == 40) {
                            if (!c.isOpened()) {
                                c.showListBox();
                                return true
                            }
                        }
                    }
                }
            }
            if (f.keyCode == "27") {
                if (!c.ishiding) {
                    c.hideListBox();
                    if (c.tempSelectedIndex != undefined) {
                        c.selectIndex(c.tempSelectedIndex)
                    }
                    return true
                }
            }
            if (!c.disabled) {
                return c.listBox._handleKeyDown(f)
            }
        });
        this.addHandler(this.listBoxContainer, "checkChange", function (e) {
            c.renderSelection();
            c._updateInputSelection();
            c._raiseEvent(5, {label: e.args.label, value: e.args.value, checked: e.args.checked, item: e.args.item})
        });
        this.addHandler(this.listBoxContainer, "select", function (e) {
            if (!c.disabled) {
                if (e.args.type == "keyboard" && !c.isOpened()) {
                    c.renderSelection()
                }
                if (e.args.type != "keyboard" || c.keyboardSelection) {
                    c.renderSelection();
                    c._raiseEvent("2", {index: e.args.index, type: e.args.type, item: e.args.item, originalEvent: e.args.originalEvent});
                    if (e.args.type == "mouse") {
                        if (!c.checkboxes) {
                            c.hideListBox();
                            if (c._firstDiv) {
                                c._firstDiv.focus()
                            }
                        }
                    }
                }
            }
        });
        if (this.listBox) {
            if (this.listBox.content) {
                this.addHandler(this.listBox.content, "click", function (e) {
                    if (!c.disabled) {
                        if (c.listBox.itemswrapper && e.target === c.listBox.itemswrapper[0]) {
                            return true
                        }
                        c.renderSelection("mouse");
                        if (!c.touch) {
                            if (!c.ishiding) {
                                if (!c.checkboxes) {
                                    c.hideListBox();
                                    if (c._firstDiv) {
                                        c._firstDiv.focus()
                                    }
                                }
                            }
                        }
                        if (!c.keyboardSelection) {
                            if (c._oldSelectedInd == undefined) {
                                c._oldSelectedIndx = c.selectedIndex
                            }
                            if (c.selectedIndex != c._oldSelectedIndx) {
                                c._raiseEvent("2", {index: c.selectedIndex, type: "keyboard", item: c.getItem(c.selectedIndex)});
                                c._oldSelectedIndx = c.selectedIndex
                            }
                        }
                    }
                })
            }
        }
        this.addHandler(this.host, "focus", function (e) {
            if (c.renderMode !== "simple") {
                c.host.addClass(c.toThemeProperty("jqx-dropdownlist-state-focus"));
                c.host.addClass(c.toThemeProperty("jqx-fill-state-focus"))
            }
        });
        this.addHandler(this.host, "blur", function () {
            if (c.renderMode !== "simple") {
                c.host.removeClass(c.toThemeProperty("jqx-dropdownlist-state-focus"));
                c.host.removeClass(c.toThemeProperty("jqx-fill-state-focus"))
            }
        });
        this.addHandler(this._firstDiv, "focus", function (e) {
            if (c.renderMode !== "simple") {
                c.host.addClass(c.toThemeProperty("jqx-dropdownlist-state-focus"));
                c.host.addClass(c.toThemeProperty("jqx-fill-state-focus"))
            }
        });
        this.addHandler(this._firstDiv, "blur", function () {
            if (c.renderMode !== "simple") {
                c.host.removeClass(c.toThemeProperty("jqx-dropdownlist-state-focus"));
                c.host.removeClass(c.toThemeProperty("jqx-fill-state-focus"))
            }
        })
    }, removeHandlers: function () {
        var c = this;
        var b = "mousedown";
        if (this.touch) {
            b = a.jqx.mobile.getTouchEventName("touchstart")
        }
        this.removeHandler(this.dropdownlistWrapper, b);
        if (this.listBox) {
            if (this.listBox.content) {
                this.removeHandler(this.listBox.content, "click")
            }
        }
        this.removeHandler(this.host, "loadContent");
        this.removeHandler(this.listBoxContainer, "checkChange");
        this.removeHandler(this.host, "keydown");
        this.removeHandler(this.host, "focus");
        this.removeHandler(this.host, "blur");
        this.removeHandler(this._firstDiv, "focus");
        this.removeHandler(this._firstDiv, "blur");
        this.removeHandler(this.host, "mouseenter");
        this.removeHandler(this.host, "mouseleave");
        this.removeHandler(a(document), "mousemove." + c.id)
    }, getItem: function (b) {
        var c = this.listBox.getItem(b);
        return c
    }, getItemByValue: function (c) {
        var b = this.listBox.getItemByValue(c);
        return b
    }, selectItem: function (b) {
        if (this.listBox != undefined) {
            this.listBox.selectItem(b);
            this.selectedIndex = this.listBox.selectedIndex;
            this.renderSelection("mouse")
        }
    }, unselectItem: function (b) {
        if (this.listBox != undefined) {
            this.listBox.unselectItem(b);
            this.renderSelection("mouse")
        }
    }, checkItem: function (b) {
        if (this.listBox != undefined) {
            this.listBox.checkItem(b)
        }
    }, uncheckItem: function (b) {
        if (this.listBox != undefined) {
            this.listBox.uncheckItem(b)
        }
    }, indeteterminateItem: function (b) {
        if (this.listBox != undefined) {
            this.listBox.indeteterminateItem(b)
        }
    }, renderSelection: function () {
        if (this.listBox == null) {
            return
        }
        if (this.height && this.height.toString().indexOf("%") != -1) {
            this._arrange()
        }
        var q = this.listBox.visibleItems[this.listBox.selectedIndex];
        var n = this;
        if (this.checkboxes) {
            var h = this.getCheckedItems();
            if (h != null && h.length > 0) {
                q = h[0]
            } else {
                q = null
            }
        }
        if (q == null) {
            var d = a('<span style="color: inherit; border: none; background-color: transparent;"></span>');
            d.appendTo(a(document.body));
            d.addClass(this.toThemeProperty("jqx-widget"));
            d.addClass(this.toThemeProperty("jqx-listitem-state-normal"));
            d.addClass(this.toThemeProperty("jqx-item"));
            a.jqx.utilities.html(d, this.placeHolder);
            var c = this.dropdownlistContent.css("padding-top");
            var r = this.dropdownlistContent.css("padding-bottom");
            d.css("padding-top", c);
            d.css("padding-bottom", r);
            var b = d.outerHeight();
            d.remove();
            d.removeClass();
            a.jqx.utilities.html(this.dropdownlistContent, d);
            var p = this.host.height();
            if (this.height != null && this.height != undefined) {
                if (this.height.toString().indexOf("%") === -1) {
                    p = parseInt(this.height)
                }
            }
            var o = parseInt((parseInt(p) - parseInt(b)) / 2);
            if (o > 0) {
                this.dropdownlistContent.css("margin-top", o + "px");
                this.dropdownlistContent.css("margin-bottom", o + "px")
            }
            if (this.selectionRenderer) {
                a.jqx.utilities.html(this.dropdownlistContent, this.selectionRenderer());
                this._updateInputSelection()
            }
            this.selectedIndex = this.listBox.selectedIndex;
            if (this.width === "auto") {
                this._arrange()
            }
            return
        }
        this.selectedIndex = this.listBox.selectedIndex;
        var d = a('<span style="color: inherit; border: none; background-color: transparent;"></span>');
        d.appendTo(a(document.body));
        d.addClass(this.toThemeProperty("jqx-widget"));
        d.addClass(this.toThemeProperty("jqx-listitem-state-normal"));
        d.addClass(this.toThemeProperty("jqx-item"));
        var e = false;
        try {
            if (q.html != undefined && q.html != null && q.html.toString().length > 0) {
                a.jqx.utilities.html(d, q.html)
            } else {
                if (q.label != undefined && q.label != null && q.label.toString().length > 0) {
                    a.jqx.utilities.html(d, q.label)
                } else {
                    if (q.label === null || q.label === "") {
                        e = true;
                        a.jqx.utilities.html(d, "")
                    } else {
                        if (q.value != undefined && q.value != null && q.value.toString().length > 0) {
                            a.jqx.utilities.html(d, q.value)
                        } else {
                            if (q.title != undefined && q.title != null && q.title.toString().length > 0) {
                                a.jqx.utilities.html(d, q.title)
                            } else {
                                if (q.label == "" || q.label == null) {
                                    e = true;
                                    a.jqx.utilities.html(d, "")
                                }
                            }
                        }
                    }
                }
            }
        } catch (m) {
            var j = m
        }
        var c = this.dropdownlistContent.css("padding-top");
        var r = this.dropdownlistContent.css("padding-bottom");
        d.css("padding-top", c);
        d.css("padding-bottom", r);
        var b = d.outerHeight();
        if (b === 0) {
            b = 16
        }
        if ((q.label == "" || q.label == null) && e) {
            a.jqx.utilities.html(d, "")
        }
        var g = this.width && this.width.toString().indexOf("%") <= 0;
        d.remove();
        d.removeClass();
        if (this.selectionRenderer) {
            a.jqx.utilities.html(this.dropdownlistContent, this.selectionRenderer(d, q.index, q.label, q.value))
        } else {
            if (this.checkboxes) {
                var k = this.getCheckedItems();
                var l = "";
                for (var f = 0; f < k.length; f++) {
                    if (f == k.length - 1) {
                        l += k[f].label
                    } else {
                        l += k[f].label + ","
                    }
                }
                d.text(l);
                if (g) {
                    d.css("max-width", this.host.width() - 30)
                }
                d.css("overflow", "hidden");
                d.css("display", "block");
                if (!this.rtl) {
                    if (g) {
                        d.css("width", this.host.width() - 30)
                    }
                }
                d.css("text-overflow", "ellipsis");
                d.css("padding-bottom", 1 + parseInt(r));
                this.dropdownlistContent.html(d)
            } else {
                if (this.width && this.width !== "auto") {
                    if (g) {
                        if (!this.rtl) {
                            d.css("max-width", this.host.width() - 10)
                        }
                    }
                    d.css("overflow", "hidden");
                    d.css("display", "block");
                    d.css("padding-bottom", 1 + parseInt(r));
                    if (!this.rtl) {
                        if (g) {
                            d.css("width", this.host.width() - 10)
                        }
                    }
                    d.css("text-overflow", "ellipsis")
                }
                this.dropdownlistContent.html(d)
            }
        }
        var p = this.host.height();
        if (this.height != null && this.height != undefined) {
            if (this.height.toString().indexOf("%") === -1) {
                p = parseInt(this.height)
            }
        }
        var o = parseInt((parseInt(p) - parseInt(b)) / 2);
        if (o > 0) {
            this.dropdownlistContent.css("margin-top", o + "px");
            this.dropdownlistContent.css("margin-bottom", o + "px")
        }
        if (this.dropdownlistContent && this.input) {
            this._updateInputSelection()
        }
        if (this.listBox && this.listBox._activeElement) {
            a.jqx.aria(this, "aria-activedescendant", this.listBox._activeElement.id)
        }
        if (this.width === "auto") {
            this._arrange()
        }
    }, _updateInputSelection: function () {
        if (this.input) {
            if (this.selectedIndex == -1) {
                this.input.val("")
            } else {
                var e = this.getSelectedItem();
                if (e != null) {
                    this.input.val(e.value)
                } else {
                    this.input.val(this.dropdownlistContent.text())
                }
            }
            if (this.checkboxes) {
                var b = this.getCheckedItems();
                var f = "";
                if (b != null) {
                    for (var c = 0; c < b.length; c++) {
                        var d = b[c].value;
                        if (d == undefined) {
                            continue
                        }
                        if (c == b.length - 1) {
                            f += d
                        } else {
                            f += d + ","
                        }
                    }
                }
                this.input.val(f)
            }
        }
    }, setContent: function (b) {
        a.jqx.utilities.html(this.dropdownlistContent, b);
        this._updateInputSelection()
    }, dataBind: function () {
        this.listBoxContainer.jqxListBox({source: this.source});
        this.renderSelection("mouse");
        if (this.source == null) {
            this.clearSelection()
        }
    }, clear: function () {
        this.listBoxContainer.jqxListBox({source: null});
        this.clearSelection()
    }, clearSelection: function (b) {
        this.selectedIndex = -1;
        this._updateInputSelection();
        this.listBox.clearSelection();
        this.renderSelection();
        a.jqx.utilities.html(this.dropdownlistContent, this.placeHolder)
    }, unselectIndex: function (b, c) {
        if (isNaN(b)) {
            return
        }
        this.listBox.unselectIndex(b, c);
        this.renderSelection()
    }, selectIndex: function (b, d, e, c) {
        this.listBox.selectIndex(b, d, e, c, "api")
    }, getSelectedIndex: function () {
        return this.selectedIndex
    }, getSelectedItem: function () {
        return this.getItem(this.selectedIndex)
    }, getCheckedItems: function () {
        return this.listBox.getCheckedItems()
    }, checkIndex: function (b) {
        this.listBox.checkIndex(b)
    }, uncheckIndex: function (b) {
        this.listBox.uncheckIndex(b)
    }, indeterminateIndex: function (b) {
        this.listBox.indeterminateIndex(b)
    }, checkAll: function () {
        this.listBox.checkAll()
    }, uncheckAll: function () {
        this.listBox.uncheckAll()
    }, addItem: function (b) {
        return this.listBox.addItem(b)
    }, insertAt: function (c, b) {
        if (c == null) {
            return false
        }
        return this.listBox.insertAt(c, b)
    }, removeAt: function (c) {
        var b = this.listBox.removeAt(c);
        this.renderSelection("mouse");
        return b
    }, removeItem: function (c) {
        var b = this.listBox.removeItem(c);
        this.renderSelection("mouse");
        return b
    }, updateItem: function (c, d) {
        var b = this.listBox.updateItem(c, d);
        this.renderSelection("mouse");
        return b
    }, updateAt: function (d, c) {
        var b = this.listBox.updateAt(d, c);
        this.renderSelection("mouse");
        return b
    }, ensureVisible: function (b) {
        return this.listBox.ensureVisible(b)
    }, disableAt: function (b) {
        return this.listBox.disableAt(b)
    }, enableAt: function (b) {
        return this.listBox.enableAt(b)
    }, disableItem: function (b) {
        return this.listBox.disableItem(b)
    }, enableItem: function (b) {
        return this.listBox.enableItem(b)
    }, _findPos: function (c) {
        while (c && (c.type == "hidden" || c.nodeType != 1 || a.expr.filters.hidden(c))) {
            c = c.nextSibling
        }
        var b = a(c).coord(true);
        return[b.left, b.top]
    }, testOffset: function (h, f, c) {
        var g = h.outerWidth();
        var j = h.outerHeight();
        var i = a(window).width() + a(window).scrollLeft();
        var e = a(window).height() + a(window).scrollTop();
        if (f.left + g > i) {
            if (g > this.host.width()) {
                var d = this.host.coord().left;
                var b = g - this.host.width();
                f.left = d - b + 2
            }
        }
        if (f.left < 0) {
            f.left = parseInt(this.host.coord().left) + "px"
        }
        f.top -= Math.min(f.top, (f.top + j > e && e > j) ? Math.abs(j + c + 22) : 0);
        return f
    }, open: function () {
        this.showListBox()
    }, close: function () {
        this.hideListBox()
    }, _getBodyOffset: function () {
        var c = 0;
        var b = 0;
        if (a("body").css("border-top-width") != "0px") {
            c = parseInt(a("body").css("border-top-width"));
            if (isNaN(c)) {
                c = 0
            }
        }
        if (a("body").css("border-left-width") != "0px") {
            b = parseInt(a("body").css("border-left-width"));
            if (isNaN(b)) {
                b = 0
            }
        }
        return{left: b, top: c}
    }, showListBox: function () {
        a.jqx.aria(this, "aria-expanded", true);
        if (this.dropDownWidth == "auto" && this.width != null && this.width.indexOf && this.width.indexOf("%") != -1) {
            if (this.listBox.host.width() != this.host.width()) {
                var c = this.host.width();
                this.listBoxContainer.jqxListBox({width: c});
                this.container.width(parseInt(c) + 25)
            }
        }
        var q = this;
        var e = this.listBoxContainer;
        var k = this.listBox;
        var n = a(window).scrollTop();
        var i = a(window).scrollLeft();
        var l = parseInt(this._findPos(this.host[0])[1]) + parseInt(this.host.outerHeight()) - 1 + "px";
        var g, h = parseInt(Math.round(this.host.coord(true).left));
        g = h + "px";
        var p = a.jqx.mobile.isSafariMobileBrowser() || a.jqx.mobile.isWindowsPhone();
        if (this.listBox == null) {
            return
        }
        var d = a.jqx.utilities.hasTransform(this.host);
        this.ishiding = false;
        if (!this.keyboardSelection) {
            this.listBox.selectIndex(this.selectedIndex);
            this.listBox.ensureVisible(this.selectedIndex)
        }
        this.tempSelectedIndex = this.selectedIndex;
        if (this.autoDropDownHeight) {
            this.container.height(this.listBoxContainer.height() + 25)
        }
        if (d || (p != null && p)) {
            g = a.jqx.mobile.getLeftPos(this.element);
            l = a.jqx.mobile.getTopPos(this.element) + parseInt(this.host.outerHeight());
            if (a("body").css("border-top-width") != "0px") {
                l = parseInt(l) - this._getBodyOffset().top + "px"
            }
            if (a("body").css("border-left-width") != "0px") {
                g = parseInt(g) - this._getBodyOffset().left + "px"
            }
        }
        e.stop();
        if (this.renderMode !== "simple") {
            this.host.addClass(this.toThemeProperty("jqx-dropdownlist-state-selected"));
            this.host.addClass(this.toThemeProperty("jqx-fill-state-pressed"));
            this.arrow.addClass(this.toThemeProperty("jqx-icon-arrow-down-selected"))
        }
        this.container.css("left", g);
        this.container.css("top", l);
        k._arrange();
        var f = true;
        var r = false;
        if (this.dropDownHorizontalAlignment == "right" || this.rtl) {
            var m = this.container.outerWidth();
            var b = Math.abs(m - this.host.width());
            if (m > this.host.width()) {
                this.container.css("left", 25 + parseInt(Math.round(h)) - b + "px")
            } else {
                this.container.css("left", 25 + parseInt(Math.round(h)) + b + "px")
            }
        }
        if (this.enableBrowserBoundsDetection) {
            var j = this.testOffset(e, {left: parseInt(this.container.css("left")), top: parseInt(l)}, parseInt(this.host.outerHeight()));
            if (parseInt(this.container.css("top")) != j.top) {
                r = true;
                e.css("top", 23)
            } else {
                e.css("top", 0)
            }
            this.container.css("top", j.top);
            if (parseInt(this.container.css("left")) != j.left) {
                this.container.css("left", j.left)
            }
        }
        if (this.animationType == "none") {
            this.container.css("display", "block");
            a.data(document.body, "openedJQXListBoxParent", q);
            a.data(document.body, "openedJQXListBox" + this.id, e);
            e.css("margin-top", 0);
            e.css("opacity", 1)
        } else {
            this.container.css("display", "block");
            q.isanimating = true;
            if (this.animationType == "fade") {
                e.css("margin-top", 0);
                e.css("opacity", 0);
                e.animate({opacity: 1}, this.openDelay, function () {
                    a.data(document.body, "openedJQXListBoxParent", q);
                    a.data(document.body, "openedJQXListBox" + q.id, e);
                    q.ishiding = false;
                    q.isanimating = false
                })
            } else {
                e.css("opacity", 1);
                var o = e.outerHeight();
                if (r) {
                    e.css("margin-top", o)
                } else {
                    e.css("margin-top", -o)
                }
                e.animate({"margin-top": 0}, this.openDelay, function () {
                    a.data(document.body, "openedJQXListBoxParent", q);
                    a.data(document.body, "openedJQXListBox" + q.id, e);
                    q.ishiding = false;
                    q.isanimating = false
                })
            }
        }
        if (!r) {
            this.host.addClass(this.toThemeProperty("jqx-rc-b-expanded"));
            e.addClass(this.toThemeProperty("jqx-rc-t-expanded"))
        } else {
            this.host.addClass(this.toThemeProperty("jqx-rc-t-expanded"));
            e.addClass(this.toThemeProperty("jqx-rc-b-expanded"))
        }
        if (this.renderMode !== "simple") {
            e.addClass(this.toThemeProperty("jqx-fill-state-focus"));
            this.host.addClass(this.toThemeProperty("jqx-dropdownlist-state-focus"));
            this.host.addClass(this.toThemeProperty("jqx-fill-state-focus"))
        }
        this.host.focus();
        setTimeout(function () {
            q.host.focus()
        });
        k._renderItems();
        this._raiseEvent("0", k)
    }, hideListBox: function () {
        a.jqx.aria(this, "aria-expanded", false);
        var f = this.listBoxContainer;
        var g = this.listBox;
        var c = this.container;
        var d = this;
        a.data(document.body, "openedJQXListBox" + this.id, null);
        if (this.animationType == "none") {
            this.container.css("display", "none")
        } else {
            if (!d.ishiding) {
                f.stop();
                var b = f.outerHeight();
                f.css("margin-top", 0);
                d.isanimating = true;
                var e = -b;
                if (parseInt(this.container.coord().top) < parseInt(this.host.coord().top)) {
                    e = b
                }
                if (this.animationType == "fade") {
                    f.css({opacity: 1});
                    f.animate({opacity: 0}, this.closeDelay, function () {
                        c.css("display", "none");
                        d.isanimating = false;
                        d.ishiding = false
                    })
                } else {
                    f.animate({"margin-top": e}, this.closeDelay, function () {
                        c.css("display", "none");
                        d.isanimating = false;
                        d.ishiding = false
                    })
                }
            }
        }
        this.ishiding = true;
        this.host.removeClass(this.toThemeProperty("jqx-dropdownlist-state-selected"));
        this.host.removeClass(this.toThemeProperty("jqx-fill-state-pressed"));
        this.arrow.removeClass(this.toThemeProperty("jqx-icon-arrow-down-selected"));
        this.host.removeClass(this.toThemeProperty("jqx-rc-b-expanded"));
        f.removeClass(this.toThemeProperty("jqx-rc-t-expanded"));
        this.host.removeClass(this.toThemeProperty("jqx-rc-t-expanded"));
        f.removeClass(this.toThemeProperty("jqx-rc-b-expanded"));
        f.removeClass(this.toThemeProperty("jqx-fill-state-focus"));
        this._raiseEvent("1", g)
    }, closeOpenedListBox: function (e) {
        var d = e.data.me;
        var b = a(e.target);
        var c = e.data.listbox;
        if (c == null) {
            return true
        }
        if (a(e.target).ischildof(e.data.me.host)) {
            return true
        }
        if (!d.isOpened()) {
            return true
        }
        var f = d;
        var g = false;
        a.each(b.parents(), function () {
            if (this.className != "undefined") {
                if (this.className.indexOf) {
                    if (this.className.indexOf("jqx-listbox") != -1) {
                        g = true;
                        return false
                    }
                    if (this.className.indexOf("jqx-dropdownlist") != -1) {
                        if (d.element.id == this.id) {
                            g = true
                        }
                        return false
                    }
                }
            }
        });
        if (c != null && !g && d.isOpened()) {
            d.hideListBox()
        }
        return true
    }, loadFromSelect: function (b) {
        this.listBox.loadFromSelect(b)
    }, refresh: function (b) {
        if (b !== true) {
            this._setSize();
            this._arrange();
            if (this.listBox) {
                this.renderSelection()
            }
        }
    }, _arrange: function () {
        var f = parseInt(this.host.width());
        var b = parseInt(this.host.height());
        var e = this.arrowSize;
        var d = this.arrowSize;
        var g = 3;
        var c = f - d - 2 * g;
        if (c > 0 && this.width !== "auto") {
            this.dropdownlistContent.width(c + "px")
        }
        if (this.width === "auto") {
            f = this.dropdownlistContent.width() + d + 2 * g;
            this.host.width(f)
        }
        this.dropdownlistContent.height(b);
        this.dropdownlistContent.css("left", 0);
        this.dropdownlistContent.css("top", 0);
        this.dropdownlistArrow.width(d);
        this.dropdownlistArrow.height(b);
        if (this.rtl) {
            this.dropdownlistArrow.css("float", "left");
            this.dropdownlistContent.css("float", "right")
        }
    }, destroy: function () {
        a.jqx.utilities.resize(this.host, null, true);
        this.removeHandler(this.listBoxContainer, "select");
        this.removeHandler(this.listBoxContainer, "unselect");
        this.removeHandler(this.listBoxContainer, "change");
        this.removeHandler(this.dropdownlistWrapper, "selectstart");
        this.removeHandler(this.dropdownlistWrapper, "mousedown");
        this.removeHandler(this.host, "keydown");
        this.removeHandler(this.listBoxContainer, "select");
        this.removeHandler(this.listBox.content, "click");
        this.removeHandler(this.listBoxContainer, "bindingComplete");
        if (this.host.parents()) {
            this.removeHandler(this.host.parents(), "scroll.dropdownlist" + this.element.id)
        }
        this.removeHandlers();
        this.listBoxContainer.jqxListBox("destroy");
        this.listBoxContainer.remove();
        this.host.removeClass();
        this.removeHandler(a(document), "mousedown." + this.id, this.closeOpenedListBox);
        if (this.touch) {
            this.removeHandler(a(document), a.jqx.mobile.getTouchEventName("touchstart") + "." + this.id)
        }
        this.dropdownlistArrow.remove();
        delete this.dropdownlistArrow;
        delete this.dropdownlistWrapper;
        delete this.listBoxContainer;
        delete this.input;
        delete this.arrow;
        delete this.dropdownlistContent;
        delete this.listBox;
        delete this._firstDiv;
        this.container.remove();
        delete this.container;
        var b = a.data(this.element, "jqxDropDownList");
        if (b) {
            delete b.instance
        }
        this.host.removeData();
        this.host.remove();
        delete this.comboStructure;
        delete this.host;
        delete this.set;
        delete this.get;
        delete this.call;
        delete this.element
    }, _raiseEvent: function (f, c) {
        if (c == undefined) {
            c = {owner: null}
        }
        var d = this.events[f];
        args = c;
        args.owner = this;
        var e = new jQuery.Event(d);
        e.owner = this;
        if (f == 2 || f == 3 || f == 4 || f == 5) {
            e.args = c
        }
        var b = this.host.trigger(e);
        return b
    }, propertyChangedHandler: function (b, c, f, e) {
        if (b.isInitialized == undefined || b.isInitialized == false) {
            return
        }
        if (c == "autoOpen") {
            b._updateHandlers()
        }
        if (c == "emptyString") {
            b.listBox.emptyString = b.emptyString
        }
        if (c == "renderer") {
            b.listBox.renderer = b.renderer
        }
        if (c == "itemHeight") {
            b.listBox.itemHeight = e
        }
        if (c == "rtl") {
            if (e) {
                b.dropdownlistArrow.css("float", "left");
                b.dropdownlistContent.css("float", "right")
            } else {
                b.dropdownlistArrow.css("float", "right");
                b.dropdownlistContent.css("float", "left")
            }
            b.listBoxContainer.jqxListBox({rtl: b.rtl})
        }
        if (c == "source") {
            b.listBoxContainer.jqxListBox({source: b.source});
            b.listBox.selectedIndex = -1;
            b.listBox.selectIndex(this.selectedIndex);
            b.renderSelection();
            if (e == null) {
                b.clear()
            }
        }
        if (c == "displayMember" || c == "valueMember") {
            b.listBoxContainer.jqxListBox({displayMember: b.displayMember, valueMember: b.valueMember});
            b.renderSelection()
        }
        if (c == "placeHolder") {
            b.renderSelection()
        }
        if (c == "theme" && e != null) {
            b.listBoxContainer.jqxListBox({theme: e});
            b.listBoxContainer.addClass(b.toThemeProperty("jqx-popup"));
            if (a.jqx.browser.msie) {
                b.listBoxContainer.addClass(b.toThemeProperty("jqx-noshadow"))
            }
            b.dropdownlistContent.removeClass();
            b.dropdownlistContent.addClass(b.toThemeProperty("jqx-dropdownlist-content"));
            b.dropdownlistWrapper.removeClass();
            b.dropdownlistWrapper.addClass(b.toThemeProperty("jqx-disableselect"));
            b.host.removeClass();
            b.host.addClass(b.toThemeProperty("jqx-fill-state-normal"));
            b.host.addClass(b.toThemeProperty("jqx-dropdownlist-state-normal"));
            b.host.addClass(b.toThemeProperty("jqx-rc-all"));
            b.host.addClass(b.toThemeProperty("jqx-widget"));
            b.arrow.removeClass();
            b.arrow.addClass(b.toThemeProperty("jqx-icon-arrow-down"));
            b.arrow.addClass(b.toThemeProperty("jqx-icon"))
        }
        if (c == "autoDropDownHeight") {
            b.listBoxContainer.jqxListBox({autoHeight: b.autoDropDownHeight});
            if (b.autoDropDownHeight) {
                b.container.height(b.listBoxContainer.height() + 25)
            } else {
                b.listBoxContainer.jqxListBox({height: b.dropDownHeight});
                b.container.height(parseInt(b.dropDownHeight) + 25)
            }
            b.listBox._arrange();
            b.listBox._updatescrollbars()
        }
        if (c == "searchMode") {
            b.listBoxContainer.jqxListBox({searchMode: b.searchMode})
        }
        if (c == "incrementalSearch") {
            b.listBoxContainer.jqxListBox({incrementalSearch: b.incrementalSearch})
        }
        if (c == "incrementalSearchDelay") {
            b.listBoxContainer.jqxListBox({incrementalSearchDelay: b.incrementalSearchDelay})
        }
        if (c == "dropDownHeight") {
            if (!b.autoDropDownHeight) {
                b.listBoxContainer.jqxListBox({height: b.dropDownHeight});
                b.container.height(parseInt(b.dropDownHeight) + 25)
            }
        }
        if (c == "dropDownWidth" || c == "scrollBarSize") {
            var d = b.width;
            if (b.dropDownWidth != "auto") {
                d = b.dropDownWidth
            }
            b.listBoxContainer.jqxListBox({width: d, scrollBarSize: b.scrollBarSize});
            b.container.width(parseInt(d) + 25)
        }
        if (c == "width" || c == "height") {
            if (e != f) {
                this.refresh();
                if (c == "width") {
                    if (b.dropDownWidth == "auto") {
                        var d = b.host.width();
                        b.listBoxContainer.jqxListBox({width: d});
                        b.container.width(parseInt(d) + 25)
                    }
                }
            }
        }
        if (c == "checkboxes") {
            b.listBoxContainer.jqxListBox({checkboxes: b.checkboxes})
        }
        if (c == "selectedIndex") {
            if (b.listBox != null) {
                b.listBox.selectIndex(parseInt(e));
                b.renderSelection()
            }
        }
    }})
})(jQuery);