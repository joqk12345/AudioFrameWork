/*
 jQWidgets v3.1.0 (2013-Dec-23)
 Copyright (c) 2011-2014 jQWidgets.
 License: http://jqwidgets.com/license/
 */

(function (a) {
    a.jqx.jqxWidget("jqxComboBox", "", {});
    a.extend(a.jqx._jqxComboBox.prototype, {defineInstance: function () {
        this.disabled = false;
        this.width = 200;
        this.height = 25;
        this.items = new Array();
        this.selectedIndex = -1;
        this.selectedItems = new Array();
        this._selectedItems = new Array();
        this.source = null;
        this.scrollBarSize = a.jqx.utilities.scrollBarSize;
        this.arrowSize = 18;
        this.enableHover = true;
        this.enableSelection = true;
        this.visualItems = new Array();
        this.groups = new Array();
        this.equalItemsWidth = true;
        this.itemHeight = -1;
        this.visibleItems = new Array();
        this.emptyGroupText = "Group";
        this.emptyString = "";
        if (this.openDelay == undefined) {
            this.openDelay = 250
        }
        if (this.closeDelay == undefined) {
            this.closeDelay = 300
        }
        this.animationType = "default";
        this.dropDownWidth = "auto";
        this.dropDownHeight = "200px";
        this.autoDropDownHeight = false;
        this.enableBrowserBoundsDetection = false;
        this.dropDownHorizontalAlignment = "left";
        this.searchMode = "startswithignorecase";
        this.autoComplete = false;
        this.remoteAutoComplete = false;
        this.remoteAutoCompleteDelay = 500;
        this.selectionMode = "default";
        this.minLength = 2;
        this.displayMember = "";
        this.valueMember = "";
        this.keyboardSelection = true;
        this.renderer = null;
        this.autoOpen = false;
        this.checkboxes = false;
        this.promptText = "";
        this.placeHolder = "";
        this.rtl = false;
        this.listBox = null;
        this.renderSelectedItem = null;
        this.search = null;
        this.popupZIndex = 100000;
        this.searchString = null;
        this.multiSelect = false;
        this.showArrow = true;
        this.touchMode = "auto";
        this.aria = {"aria-disabled": {name: "disabled", type: "boolean"}};
        this.events = ["open", "close", "select", "unselect", "change", "checkChange", "bindingComplete"]
    }, createInstance: function (b) {
        var c = this;
        this.host.attr("role", "combobox");
        a.jqx.aria(this, "aria-autocomplete", "both");
        if (a.jqx._jqxListBox == null || a.jqx._jqxListBox == undefined) {
            throw new Error("jqxComboBox: Missing reference to jqxlistbox.js.")
        }
        a.jqx.aria(this);
        if (this.promptText != "") {
            this.placeHolder = this.promptText
        }
        this.render()
    }, render: function () {
        this.removeHandlers();
        this.isanimating = false;
        this.id = a.jqx.utilities.createId();
        this.element.innerHTML = "";
        var d = a("<div style='background-color: transparent; -webkit-appearance: none; outline: none; width:100%; height: 100%; padding: 0px; margin: 0px; border: 0px; position: relative;'><div id='dropdownlistWrapper' style='padding: 0; margin: 0; border: none; background-color: transparent; float: left; width:100%; height: 100%; position: relative;'><div id='dropdownlistContent' style='padding: 0; margin: 0; border-top: none; border-bottom: none; float: left; position: absolute;'/><div id='dropdownlistArrow' style='padding: 0; margin: 0; border-left-width: 1px; border-bottom-width: 0px; border-top-width: 0px; border-right-width: 0px; float: right; position: absolute;'/></div></div>");
        this.comboStructure = d;
        if (a.jqx._jqxListBox == null || a.jqx._jqxListBox == undefined) {
            throw"jqxComboBox: Missing reference to jqxlistbox.js."
        }
        this.touch = a.jqx.mobile.isTouchDevice();
        if (this.touchMode === true) {
            this.touch = true
        }
        this.host.append(d);
        this.dropdownlistWrapper = this.host.find("#dropdownlistWrapper");
        this.dropdownlistArrow = this.host.find("#dropdownlistArrow");
        this.dropdownlistContent = this.host.find("#dropdownlistContent");
        this.dropdownlistContent.addClass(this.toThemeProperty("jqx-combobox-content"));
        this.dropdownlistContent.addClass(this.toThemeProperty("jqx-widget-content"));
        this.dropdownlistWrapper[0].id = "dropdownlistWrapper" + this.element.id;
        this.dropdownlistArrow[0].id = "dropdownlistArrow" + this.element.id;
        this.dropdownlistContent[0].id = "dropdownlistContent" + this.element.id;
        this.dropdownlistContent.append(a('<input autocomplete="off" style="margin: 0; padding: 0; border: 0;" type="textarea"/>'));
        this.input = this.dropdownlistContent.find("input");
        this.input.addClass(this.toThemeProperty("jqx-combobox-input"));
        this.input.addClass(this.toThemeProperty("jqx-widget-content"));
        this._addInput();
        if (this.rtl) {
            this.input.css({direction: "rtl"});
            this.dropdownlistContent.addClass(this.toThemeProperty("jqx-combobox-content-rtl"))
        }
        try {
            var l = "listBox" + this.id;
            var g = a(a.find("#" + l));
            if (g.length > 0) {
                g.remove()
            }
            a.jqx.aria(this, "aria-owns", l);
            a.jqx.aria(this, "aria-haspopup", true);
            a.jqx.aria(this, "aria-multiline", false);
            var b = a("<div style='overflow: hidden; border: none; background-color: transparent; position: absolute;' id='listBox" + this.id + "'><div id='innerListBox" + this.id + "'></div></div>");
            b.hide();
            b.appendTo(document.body);
            this.container = b;
            this.listBoxContainer = a(a.find("#innerListBox" + this.id));
            var c = this.width;
            if (this.dropDownWidth != "auto") {
                c = this.dropDownWidth
            }
            if (this.dropDownHeight == null) {
                this.dropDownHeight = 200
            }
            var j = this;
            this.container.width(parseInt(c) + 25);
            this.container.height(parseInt(this.dropDownHeight) + 25);
            this.addHandler(this.listBoxContainer, "bindingComplete", function (e) {
                j._raiseEvent("6")
            });
            var h = true;
            this.listBoxContainer.jqxListBox({_checkForHiddenParent: false, checkboxes: this.checkboxes, emptyString: this.emptyString, renderer: this.renderer, rtl: this.rtl, itemHeight: this.itemHeight, selectedIndex: this.selectedIndex, incrementalSearch: false, width: c, scrollBarSize: this.scrollBarSize, autoHeight: this.autoDropDownHeight, height: this.dropDownHeight, displayMember: this.displayMember, valueMember: this.valueMember, source: this.source, theme: this.theme, rendered: function () {
                j.listBox = a.data(j.listBoxContainer[0], "jqxListBox").instance;
                if (j.remoteAutoComplete) {
                    if (j.autoDropDownHeight) {
                        j.container.height(j.listBox.virtualSize.height + 25);
                        j.listBoxContainer.height(j.listBox.virtualSize.height);
                        j.listBox._arrange()
                    } else {
                        j.listBox._arrange();
                        j.listBox.ensureVisible(0);
                        j.listBox._renderItems();
                        j.container.height(j.listBoxContainer.height() + 25)
                    }
                    if (j.searchString != undefined && j.searchString.length >= j.minLength) {
                        var e = j.listBoxContainer.jqxListBox("items");
                        if (e) {
                            if (e.length > 0) {
                                if (!j.isOpened()) {
                                    j.open()
                                }
                            } else {
                                j.close()
                            }
                        } else {
                            j.close()
                        }
                    } else {
                        j.close()
                    }
                } else {
                    j.renderSelection("mouse");
                    if (j.multiSelect) {
                        j.doMultiSelect(false)
                    }
                }
                if (j.rendered) {
                    j.rendered()
                }
            }});
            this.listBoxContainer.css({position: "absolute", zIndex: this.popupZIndex, top: 0, left: 0});
            this.listBoxContainer.css("border-top-width", "1px");
            this.listBoxContainer.addClass(this.toThemeProperty("jqx-popup"));
            if (a.jqx.browser.msie) {
                this.listBoxContainer.addClass(this.toThemeProperty("jqx-noshadow"))
            }
            this.listBox = a.data(this.listBoxContainer[0], "jqxListBox").instance;
            this.listBox.enableSelection = this.enableSelection;
            this.listBox.enableHover = this.enableHover;
            this.listBox.equalItemsWidth = this.equalItemsWidth;
            this.listBox._arrange();
            this.addHandler(this.listBoxContainer, "unselect", function (e) {
                if (!j.multiSelect) {
                    j._raiseEvent("3", {index: e.args.index, type: e.args.type, item: e.args.item})
                }
            });
            this.addHandler(this.listBoxContainer, "change", function (e) {
                if (!j.multiSelect) {
                    j._raiseEvent("4", {index: e.args.index, type: e.args.type, item: e.args.item})
                }
            });
            if (this.animationType == "none") {
                this.container.css("display", "none")
            } else {
                this.container.hide()
            }
            h = false
        } catch (i) {
        }
        var m = this;
        m.input.attr("disabled", m.disabled);
        var f = a.jqx.browser.msie && a.jqx.browser.version < 8;
        if (!f) {
            m.input.attr("placeholder", m.placeHolder)
        }
        this.propertyChangeMap.disabled = function (e, o, n, p) {
            if (p) {
                e.host.addClass(m.toThemeProperty("jqx-combobox-state-disabled"));
                e.host.addClass(m.toThemeProperty("jqx-fill-state-disabled"));
                e.dropdownlistContent.addClass(m.toThemeProperty("jqx-combobox-content-disabled"))
            } else {
                e.host.removeClass(m.toThemeProperty("jqx-combobox-state-disabled"));
                e.host.removeClass(m.toThemeProperty("jqx-fill-state-disabled"));
                e.dropdownlistContent.removeClass(m.toThemeProperty("jqx-combobox-content-disabled"))
            }
            e.input.attr("disabled", e.disabled);
            a.jqx.aria(e, "aria-disabled", e.disabled);
            e.input.attr("disabled", e.disabled)
        };
        if (this.disabled) {
            this.host.addClass(this.toThemeProperty("jqx-combobox-state-disabled"));
            this.host.addClass(this.toThemeProperty("jqx-fill-state-disabled"));
            this.dropdownlistContent.addClass(this.toThemeProperty("jqx-combobox-content-disabled"))
        }
        this.host.addClass(this.toThemeProperty("jqx-combobox-state-normal"));
        this.host.addClass(this.toThemeProperty("jqx-combobox"));
        this.host.addClass(this.toThemeProperty("jqx-rc-all"));
        this.host.addClass(this.toThemeProperty("jqx-widget"));
        this.host.addClass(this.toThemeProperty("jqx-widget-content"));
        this.dropdownlistArrowIcon = a("<div></div>");
        this.dropdownlistArrowIcon.addClass(this.toThemeProperty("jqx-icon-arrow-down"));
        this.dropdownlistArrowIcon.addClass(this.toThemeProperty("jqx-icon"));
        this.dropdownlistArrow.append(this.dropdownlistArrowIcon);
        this.dropdownlistArrow.addClass(this.toThemeProperty("jqx-combobox-arrow-normal"));
        this.dropdownlistArrow.addClass(this.toThemeProperty("jqx-fill-state-normal"));
        if (!this.rtl) {
            this.dropdownlistArrow.addClass(this.toThemeProperty("jqx-rc-r"))
        } else {
            this.dropdownlistArrow.addClass(this.toThemeProperty("jqx-rc-l"))
        }
        this._setSize();
        this._updateHandlers();
        this.addHandler(this.input, "keyup.textchange", function (e) {
            var n = j._search(e);
            if (j.cinput && j.input) {
                j.cinput[0].value = j.input[0].value
            }
        });
        if (a.jqx.browser.msie && a.jqx.browser.version < 8) {
            if (this.host.parents(".jqx-window").length > 0) {
                var k = this.host.parents(".jqx-window").css("z-index");
                b.css("z-index", k + 10);
                this.listBoxContainer.css("z-index", k + 10)
            }
        }
        if (this.checkboxes) {
            this.input.attr("readonly", true);
            a.jqx.aria(this, "aria-readonly", true)
        } else {
            a.jqx.aria(this, "aria-readonly", false)
        }
        if (!this.remoteAutoComplete) {
            this.searchString = ""
        }
    }, _addInput: function () {
        var b = this.host.attr("name");
        if (!b) {
            b = this.element.id
        }
        this.cinput = a("<input type='hidden'/>");
        this.host.append(this.cinput);
        this.cinput.attr("name", b)
    }, _updateInputSelection: function () {
        if (this.cinput) {
            if (this.selectedIndex == -1) {
                this.cinput.val("")
            } else {
                var d = this.getSelectedItem();
                if (d != null) {
                    this.cinput.val(d.value)
                } else {
                    this.cinput.val(this.dropdownlistContent.text())
                }
            }
            if (this.checkboxes || this.multiSelect) {
                if (!this.multiSelect) {
                    var b = this.getCheckedItems()
                } else {
                    var b = this.getSelectedItems()
                }
                var e = "";
                if (b != null) {
                    for (var c = 0; c < b.length; c++) {
                        if (c == b.length - 1) {
                            e += b[c].value
                        } else {
                            e += b[c].value + ","
                        }
                    }
                }
                this.cinput.val(e)
            }
        }
    }, _search: function (m) {
        if (m.keyCode == 9) {
            return
        }
        if (this.searchMode == "none" || this.searchMode == null || this.searchMode == "undefined") {
            return
        }
        if (m.keyCode == 16 || m.keyCode == 17 || m.keyCode == 20) {
            return false
        }
        if (this.checkboxes) {
            return false
        }
        if (this.multiSelect) {
            var n = a("<span style='visibility: hidden; white-space: nowrap;'>" + this.input.val() + "</span>");
            n.addClass(this.toThemeProperty("jqx-widget"));
            a(document.body).append(n);
            var j = n.width() + 15;
            n.remove();
            if (j > this.host.width()) {
                j = this.host.width()
            }
            if (j < 25) {
                j = 25
            }
            this.input.css("width", j + "px");
            var f = parseInt(this._findPos(this.host[0])[1]) + parseInt(this.host.outerHeight()) - 1 + "px";
            var o = a.jqx.mobile.isSafariMobileBrowser() || a.jqx.mobile.isWindowsPhone();
            var c = a.jqx.utilities.hasTransform(this.host);
            if (c || (o != null && o)) {
                f = a.jqx.mobile.getTopPos(this.element) + parseInt(this.host.outerHeight());
                if (a("body").css("border-top-width") != "0px") {
                    f = parseInt(f) - this._getBodyOffset().top + "px"
                }
            }
            this.container.css("top", f);
            var i = parseInt(this.host.height());
            this.dropdownlistArrow.height(i)
        }
        if (!this.isanimating) {
            if (m.altKey && m.keyCode == 38) {
                this.hideListBox("altKey");
                return false
            }
            if (m.altKey && m.keyCode == 40) {
                if (!this.isOpened()) {
                    this.showListBox("altKey")
                }
                return false
            }
        }
        if (m.keyCode == 37 || m.keyCode == 39) {
            return false
        }
        if (m.altKey || m.keyCode == 18) {
            return
        }
        if (m.keyCode >= 33 && m.keyCode <= 40) {
            return
        }
        if (m.ctrlKey || this.ctrlKey) {
            return
        }
        var l = this.input.val();
        if (l.length == 0 && !this.autoComplete) {
            this.listBox.searchString = this.input.val();
            this.hideListBox("search");
            this.searchString = this.input.val();
            return
        }
        if (this.remoteAutoComplete) {
            var s = this;
            var p = function () {
                s.listBox.vScrollInstance.value = 0
            };
            if (l.length >= s.minLength) {
                if (!m.ctrlKey && !m.altKey) {
                    if (s.searchString != l) {
                        var k = s.listBoxContainer.jqxListBox("source");
                        if (k == null) {
                            s.listBoxContainer.jqxListBox({source: s.source})
                        }
                        if (this._searchTimer) {
                            clearTimeout(this._searchTimer)
                        }
                        if (m.keyCode != 13 && m.keyCode != 27) {
                            this._searchTimer = setTimeout(function () {
                                p();
                                if (s.autoDropDownHeight) {
                                    s.listBox.autoHeight = true
                                }
                                s.searchString = s.input.val();
                                if (s.search != null) {
                                    s.search(s.input.val())
                                } else {
                                    throw"'search' function is not defined"
                                }
                            }, this.remoteAutoCompleteDelay)
                        }
                    }
                    s.searchString = l
                }
            } else {
                if (this._searchTimer) {
                    clearTimeout(this._searchTimer)
                }
                p();
                s.searchString = "";
                s.listBoxContainer.jqxListBox({source: null})
            }
            return
        }
        var s = this;
        if (l === s.searchString) {
            return
        }
        if (!(m.keyCode == "27" || m.keyCode == "13")) {
            var b = this._updateItemsVisibility(l);
            var e = b.matchItems;
            var d = b.index;
            if (!this.autoComplete && !this.removeAutoComplete) {
                if (!this.multiSelect || (this.multiSelect && d >= 0)) {
                    this.listBox.selectIndex(d);
                    var r = this.listBox.isIndexInView(d);
                    if (!r) {
                        this.listBox.ensureVisible(d)
                    } else {
                        this.listBox._renderItems()
                    }
                }
            }
            if (this.autoComplete && e.length === 0) {
                this.hideListBox("search")
            }
        }
        if (m.keyCode == "13") {
            var g = this.container.css("display") == "block";
            if (g && !this.isanimating) {
                this.hideListBox("keyboard");
                this._oldvalue = this.listBox.selectedValue;
                return
            }
        } else {
            if (m.keyCode == "27") {
                var g = this.container.css("display") == "block";
                if (g && !this.isanimating) {
                    if (!h.multiSelect) {
                        var q = this.listBox.getVisibleItem(this._oldvalue);
                        if (q) {
                            var h = this;
                            setTimeout(function () {
                                if (h.autoComplete) {
                                    h._updateItemsVisibility("")
                                }
                                h.listBox.selectIndex(q.index);
                                h.renderSelection("api")
                            }, h.closeDelay)
                        } else {
                            this.clearSelection()
                        }
                    } else {
                        h.input.val("");
                        h.listBox.selectedValue = null
                    }
                    this.hideListBox("keyboard");
                    this.renderSelection("api");
                    m.preventDefault();
                    return false
                }
            } else {
                if (!this.isOpened() && !this.opening && !m.ctrlKey) {
                    if (this.listBox.visibleItems && this.listBox.visibleItems.length > 0) {
                        if (this.input.val() != this.searchString && this.searchString != undefined && d != -1) {
                            this.showListBox("search")
                        }
                    }
                }
                this.searchString = this.input.val();
                if (this.searchString == "") {
                    d = -1
                }
                var q = this.listBox.getVisibleItem(d);
                if (q != undefined) {
                    this._updateInputSelection()
                }
            }
        }
    }, val: function (c) {
        if (!this.input) {
            return""
        }
        if (typeof c === "object" || arguments.length == 0) {
            var b = this.getSelectedItem();
            if (b) {
                return b.value
            }
            return this.input.val()
        } else {
            var b = this.getItemByValue(c);
            if (b != null) {
                this.selectItem(b)
            } else {
                this.input.val(c)
            }
            return this.input.val()
        }
    }, focus: function () {
        var c = this;
        var b = function () {
            c.input.focus();
            var d = c.input.val();
            c._setSelection(0, d.length)
        };
        b();
        setTimeout(function () {
            b()
        }, 10)
    }, _setSelection: function (e, b) {
        try {
            if ("selectionStart" in this.input[0]) {
                this.input[0].focus();
                this.input[0].setSelectionRange(e, b)
            } else {
                var c = this.input[0].createTextRange();
                c.collapse(true);
                c.moveEnd("character", b);
                c.moveStart("character", e);
                c.select()
            }
        } catch (d) {
        }
    }, setContent: function (b) {
        this.input.val(b)
    }, _updateItemsVisibility: function (l) {
        var i = this.getItems();
        if (i == undefined) {
            return{index: -1, matchItem: new Array()}
        }
        var j = this;
        var g = -1;
        var m = new Array();
        var k = 0;
        a.each(i, function (p) {
            var r = "";
            if (!this.isGroup) {
                if (this.label) {
                    r = this.label
                } else {
                    if (this.value) {
                        r = this.value
                    } else {
                        if (this.title) {
                            r = this.title
                        } else {
                            r = "jqxItem"
                        }
                    }
                }
                var q = false;
                switch (j.searchMode) {
                    case"containsignorecase":
                        q = a.jqx.string.containsIgnoreCase(r, l);
                        break;
                    case"contains":
                        q = a.jqx.string.contains(r, l);
                        break;
                    case"equals":
                        q = a.jqx.string.equals(r, l);
                        break;
                    case"equalsignorecase":
                        q = a.jqx.string.equalsIgnoreCase(r, l);
                        break;
                    case"startswith":
                        q = a.jqx.string.startsWith(r, l);
                        break;
                    case"startswithignorecase":
                        q = a.jqx.string.startsWithIgnoreCase(r, l);
                        break;
                    case"endswith":
                        q = a.jqx.string.endsWith(r, l);
                        break;
                    case"endswithignorecase":
                        q = a.jqx.string.endsWithIgnoreCase(r, l);
                        break
                }
                if (j.autoComplete && !q) {
                    this.visible = false
                }
                if (q && j.autoComplete) {
                    m[k++] = this;
                    this.visible = true;
                    g = this.visibleIndex
                }
                if (l == "" && j.autoComplete) {
                    this.visible = true;
                    q = false
                }
                if (j.multiSelect) {
                    this.disabled = false;
                    if (j.selectedItems.indexOf(this.value) >= 0) {
                        this.disabled = true;
                        q = false
                    }
                }
                if (!j.multiSelect) {
                    if (q && !j.autoComplete) {
                        g = this.visibleIndex;
                        return false
                    }
                } else {
                    if (q && !j.autoComplete) {
                        if (g === -1) {
                            g = this.visibleIndex
                        }
                        return true
                    }
                }
            }
        });
        this.listBox.searchString = l;
        var f = this;
        var h = function () {
            if (!f.multiSelect) {
                return
            }
            var p = 0;
            var s = false;
            var r = null;
            for (var q = 0; q < f.listBox.items.length; q++) {
                f.listBox.selectedIndexes[q] = -1;
                if (!f.listBox.items[q].disabled) {
                    if (s == false) {
                        r = f.listBox.items[q];
                        p = r.visibleIndex;
                        s = true
                    }
                }
            }
            f.listBox.selectedIndex = -1;
            f.listBox.selectedIndex = p;
            f.listBox.selectedIndexes[p] = p;
            if (f.listBox.visibleItems.length > 0) {
                if (r) {
                    f.listBox.selectedValue = r.value
                } else {
                    f.listBox.selectedValue = null
                }
            } else {
                f.listBox.selectedValue = null
            }
            f.listBox.ensureVisible(0)
        };
        if (!this.autoComplete) {
            h();
            return{index: g, matchItems: m}
        }
        this.listBox.renderedVisibleItems = new Array();
        var b = this.listBox.vScrollInstance.value;
        this.listBox.vScrollInstance.value = 0;
        this.listBox.visibleItems = new Array();
        this.listBox._renderItems();
        var e = this.listBox.selectedValue;
        var o = this.listBox.getItemByValue(e);
        if (!this.multiSelect) {
            if (o) {
                if (o.visible) {
                    this.listBox.selectedIndex = o.visibleIndex;
                    for (var d = 0; d < this.listBox.items.length; d++) {
                        this.listBox.selectedIndexes[d] = -1
                    }
                    this.listBox.selectedIndexes[o.visibleIndex] = o.visibleIndex
                } else {
                    for (var d = 0; d < this.listBox.items.length; d++) {
                        this.listBox.selectedIndexes[d] = -1
                    }
                    this.listBox.selectedIndex = -1
                }
            }
        } else {
            h()
        }
        this.listBox._renderItems();
        var n = this.listBox._calculateVirtualSize().height;
        if (n < b) {
            b = 0;
            this.listBox.vScrollInstance.refresh()
        }
        if (this.autoDropDownHeight) {
            this._disableSelection = true;
            if (this.listBox.autoHeight != this.autoDropDownHeight) {
                this.listBoxContainer.jqxListBox({autoHeight: this.autoDropDownHeight})
            }
            this.container.height(n + 25);
            this.listBox.invalidate();
            this._disableSelection = false
        } else {
            if (n < parseInt(this.dropDownHeight)) {
                var c = this.listBox.hScrollBar[0].style.visibility == "hidden" ? 0 : 20;
                this.listBox.height = c + n;
                this.container.height(n + 25 + c);
                this.listBox.invalidate()
            } else {
                this.listBox.height = parseInt(this.dropDownHeight);
                this.container.height(parseInt(this.dropDownHeight) + 25);
                this.listBox.invalidate()
            }
        }
        this.listBox.vScrollInstance.setPosition(b);
        return{index: g, matchItems: m}
    }, findItems: function (e) {
        var b = this.getItems();
        var d = this;
        var c = 0;
        var f = new Array();
        a.each(b, function (g) {
            var j = "";
            if (!this.isGroup) {
                if (this.label) {
                    j = this.label
                } else {
                    if (this.value) {
                        j = this.value
                    } else {
                        if (this.title) {
                            j = this.title
                        } else {
                            j = "jqxItem"
                        }
                    }
                }
                var h = false;
                switch (d.searchMode) {
                    case"containsignorecase":
                        h = a.jqx.string.containsIgnoreCase(j, e);
                        break;
                    case"contains":
                        h = a.jqx.string.contains(j, e);
                        break;
                    case"equals":
                        h = a.jqx.string.equals(j, e);
                        break;
                    case"equalsignorecase":
                        h = a.jqx.string.equalsIgnoreCase(j, e);
                        break;
                    case"startswith":
                        h = a.jqx.string.startsWith(j, e);
                        break;
                    case"startswithignorecase":
                        h = a.jqx.string.startsWithIgnoreCase(j, e);
                        break;
                    case"endswith":
                        h = a.jqx.string.endsWith(j, e);
                        break;
                    case"endswithignorecase":
                        h = a.jqx.string.endsWithIgnoreCase(j, e);
                        break
                }
                if (h) {
                    f[c++] = this
                }
            }
        });
        return f
    }, _resetautocomplete: function () {
        a.each(this.listBox.items, function (b) {
            this.visible = true
        });
        this.listBox.vScrollInstance.value = 0;
        this.listBox._addItems();
        this.listBox.autoHeight = false;
        this.listBox.height = this.dropDownHeight;
        this.container.height(parseInt(this.dropDownHeight) + 25);
        this.listBoxContainer.height(parseInt(this.dropDownHeight));
        this.listBox._arrange();
        this.listBox._addItems();
        this.listBox._renderItems()
    }, getItems: function () {
        var b = this.listBox.items;
        return b
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
        if (e) {
            var c = this;
            var b = this.host.width();
            if (this.dropDownWidth != "auto") {
                b = this.dropDownWidth
            }
            this.listBoxContainer.jqxListBox({width: b});
            this.container.width(parseInt(b) + 25);
            this._arrange()
        }
        var c = this;
        var d = function () {
            if (c.multiSelect) {
                c.host.height(c.height)
            }
            c._arrange();
            if (c.multiSelect) {
                c.host.height("auto")
            }
            if (c.dropDownWidth == "auto") {
                var f = c.host.width();
                c.listBoxContainer.jqxListBox({width: f});
                c.container.width(parseInt(f) + 25)
            }
        };
        a.jqx.utilities.resize(this.host, function () {
            d()
        })
    }, isOpened: function () {
        var c = this;
        var b = a.data(document.body, "openedComboJQXListBox" + this.element.id);
        if (this.container.css("display") != "block") {
            return false
        }
        if (b != null && b == c.listBoxContainer) {
            return true
        }
        return false
    }, _updateHandlers: function () {
        var d = this;
        var e = false;
        this.removeHandlers();
        if (this.multiSelect) {
            this.addHandler(this.dropdownlistContent, "click", function (f) {
                if (f.target.href) {
                    return false
                }
                d.input.focus();
                setTimeout(function () {
                    d.input.focus()
                }, 10)
            });
            this.addHandler(this.dropdownlistContent, "focus", function (f) {
                if (f.target.href) {
                    return false
                }
                d.input.focus();
                setTimeout(function () {
                    d.input.focus()
                }, 10)
            })
        }
        if (!this.touch) {
            if (this.host.parents()) {
                this.addHandler(this.host.parents(), "scroll.combobox" + this.element.id, function (f) {
                    var g = d.isOpened();
                    if (g) {
                        d.close()
                    }
                })
            }
            this.addHandler(this.host, "mouseenter", function () {
                if (!d.disabled && d.enableHover) {
                    e = true;
                    d.host.addClass(d.toThemeProperty("jqx-combobox-state-hover"));
                    d.dropdownlistArrowIcon.addClass(d.toThemeProperty("jqx-icon-arrow-down-hover"));
                    d.dropdownlistArrow.addClass(d.toThemeProperty("jqx-combobox-arrow-hover"));
                    d.dropdownlistArrow.addClass(d.toThemeProperty("jqx-fill-state-hover"))
                }
            });
            this.addHandler(this.host, "mouseleave", function () {
                if (!d.disabled && d.enableHover) {
                    d.host.removeClass(d.toThemeProperty("jqx-combobox-state-hover"));
                    d.dropdownlistArrowIcon.removeClass(d.toThemeProperty("jqx-icon-arrow-down-hover"));
                    d.dropdownlistArrow.removeClass(d.toThemeProperty("jqx-combobox-arrow-hover"));
                    d.dropdownlistArrow.removeClass(d.toThemeProperty("jqx-fill-state-hover"));
                    e = false
                }
            })
        }
        if (d.autoOpen) {
            this.addHandler(this.host, "mouseenter", function () {
                var f = d.isOpened();
                if (!f && d.autoOpen) {
                    d.open();
                    d.host.focus()
                }
            });
            this.addHandler(a(document), "mousemove." + d.id, function (i) {
                var h = d.isOpened();
                if (h && d.autoOpen) {
                    var m = d.host.coord();
                    var l = m.top;
                    var k = m.left;
                    var j = d.container.coord();
                    var f = j.left;
                    var g = j.top;
                    canClose = true;
                    if (i.pageY >= l && i.pageY <= l + d.host.height() + 2) {
                        if (i.pageX >= k && i.pageX < k + d.host.width()) {
                            canClose = false
                        }
                    }
                    if (i.pageY >= g && i.pageY <= g + d.container.height() - 20) {
                        if (i.pageX >= f && i.pageX < f + d.container.width()) {
                            canClose = false
                        }
                    }
                    if (canClose) {
                        d.close()
                    }
                }
            })
        }
        var c = "mousedown";
        if (this.touch) {
            c = a.jqx.mobile.getTouchEventName("touchstart")
        }
        var b = function (h) {
            if (!d.disabled) {
                var f = d.container.css("display") == "block";
                if (!d.isanimating) {
                    if (f) {
                        d.hideListBox("api");
                        if (!a.jqx.mobile.isTouchDevice()) {
                            d.input.focus();
                            setTimeout(function () {
                                d.input.focus()
                            }, 10)
                        }
                        return false
                    } else {
                        if (d.autoDropDownHeight) {
                            d.container.height(d.listBoxContainer.height() + 25);
                            var g = d.listBoxContainer.jqxListBox("autoHeight");
                            if (!g) {
                                d.listBoxContainer.jqxListBox({autoHeight: d.autoDropDownHeight});
                                d.listBox._arrange();
                                d.listBox.ensureVisible(0);
                                d.listBox._renderItems();
                                d.container.height(d.listBoxContainer.height() + 25)
                            }
                        }
                        d.showListBox("api");
                        if (!a.jqx.mobile.isTouchDevice()) {
                            d.focus()
                        } else {
                            return false
                        }
                    }
                }
            }
        };
        this.addHandler(this.dropdownlistArrow, c, function (f) {
            b(f)
        });
        this.addHandler(this.dropdownlistArrowIcon, c, function (f) {
            b(f);
            return false
        });
        this.addHandler(this.host, "focus", function () {
            d.focus()
        });
        this.addHandler(this.input, "focus", function (f) {
            d.focused = true;
            d.host.addClass(d.toThemeProperty("jqx-combobox-state-focus"));
            d.host.addClass(d.toThemeProperty("jqx-fill-state-focus"));
            d.dropdownlistContent.addClass(d.toThemeProperty("jqx-combobox-content-focus"));
            if (f.stopPropagation) {
                f.stopPropagation()
            }
            if (f.preventDefault) {
                f.preventDefault()
            }
            return false
        });
        this.addHandler(this.input, "blur", function () {
            d.focused = false;
            if (!d.isOpened() && !d.opening) {
                if (d.selectionMode == "dropDownList") {
                    d._selectOldValue()
                }
                d.host.removeClass(d.toThemeProperty("jqx-combobox-state-focus"));
                d.host.removeClass(d.toThemeProperty("jqx-fill-state-focus"));
                d.dropdownlistContent.removeClass(d.toThemeProperty("jqx-combobox-content-focus"))
            }
            if (d._searchTimer) {
                clearTimeout(d._searchTimer)
            }
        });
        this.addHandler(a(document), "mousedown." + this.id, d.closeOpenedListBox, {me: this, listbox: this.listBox, id: this.id});
        if (this.touch) {
            this.addHandler(a(document), a.jqx.mobile.getTouchEventName("touchstart") + "." + this.id, d.closeOpenedListBox, {me: this, listbox: this.listBox, id: this.id})
        }
        this.addHandler(this.host, "keydown", function (k) {
            var h = d.container.css("display") == "block";
            d.ctrlKey = k.ctrlKey;
            if (d.host.css("display") == "none") {
                return true
            }
            if (k.keyCode == "13" || k.keyCode == "9") {
                if (h && !d.isanimating) {
                    if (d.listBox.selectedIndex != -1) {
                        d.renderSelection("mouse");
                        var f = d.listBox.selectedIndex;
                        var j = d.listBox.getVisibleItem(f);
                        if (j) {
                            d.listBox.selectedValue = j.value
                        }
                        d._setSelection(d.input.val().length, d.input.val().length);
                        d.hideListBox("keyboard")
                    }
                    if (k.keyCode == "13") {
                        d._oldvalue = d.listBox.selectedValue
                    }
                    if (!d.keyboardSelection) {
                        d._raiseEvent("2", {index: d.selectedIndex, type: "keyboard", item: d.getItem(d.selectedIndex)})
                    }
                    if (k.keyCode == "9") {
                        return true
                    }
                    return false
                }
            }
            if (k.keyCode == 115) {
                if (!d.isanimating) {
                    if (!d.isOpened()) {
                        d.showListBox("keyboard")
                    } else {
                        if (d.isOpened()) {
                            d.hideListBox("keyboard")
                        }
                    }
                }
                return false
            }
            if (k.altKey) {
                if (d.host.css("display") == "block") {
                    if (!d.isanimating) {
                        if (k.keyCode == 38) {
                            if (d.isOpened()) {
                                d.hideListBox("altKey")
                            }
                        } else {
                            if (k.keyCode == 40) {
                                if (!d.isOpened()) {
                                    d.showListBox("altKey")
                                }
                            }
                        }
                    }
                }
            }
            if (k.keyCode == "27" || k.keyCode == "9") {
                if (d.isOpened() && !d.isanimating) {
                    if (k.keyCode == "27") {
                        if (!d.multiSelect) {
                            var j = d.listBox.getVisibleItem(d._oldvalue);
                            if (j) {
                                setTimeout(function () {
                                    if (d.autoComplete) {
                                        d._updateItemsVisibility("")
                                    }
                                    d.listBox.selectIndex(j.index);
                                    d.renderSelection("api")
                                }, d.closeDelay)
                            } else {
                                d.clearSelection()
                            }
                        } else {
                            d.listBox.selectedValue = null;
                            d.input.val("")
                        }
                    }
                    d.hideListBox("keyboard");
                    if (k.keyCode == "9") {
                        return true
                    }
                    d.renderSelection("api");
                    k.preventDefault();
                    return false
                }
            }
            var g = k.keyCode;
            if (h && !d.disabled && g != 8) {
                return d.listBox._handleKeyDown(k)
            } else {
                if (!d.disabled && !h) {
                    var g = k.keyCode;
                    if (g == 33 || g == 34 || g == 35 || g == 36 || g == 38 || g == 40) {
                        return d.listBox._handleKeyDown(k)
                    }
                }
            }
            if (g === 8 && d.multiSelect) {
                if (d.input.val().length === 0) {
                    var i = d.selectedItems[d.selectedItems.length - 1];
                    d.selectedItems.pop();
                    d._selectedItems.pop();
                    if (i) {
                        d._raiseEvent("3", {index: i.index, type: "keyboard", item: i});
                        d._raiseEvent("4", {index: i.index, type: "keyboard", item: i})
                    }
                    d.listBox.selectedValue = null;
                    d.doMultiSelect();
                    return false
                }
            }
        });
        this.addHandler(this.listBoxContainer, "checkChange", function (f) {
            d.renderSelection("mouse");
            d._updateInputSelection();
            d._raiseEvent(5, {label: f.args.label, value: f.args.value, checked: f.args.checked, item: f.args.item})
        });
        this.addHandler(this.listBoxContainer, "select", function (f) {
            if (!d.disabled) {
                if (f.args.type != "keyboard" || d.keyboardSelection) {
                    d.renderSelection(f.args.type);
                    if (!d.multiSelect) {
                        d._raiseEvent("2", {index: f.args.index, type: f.args.type, item: f.args.item})
                    }
                    if (f.args.type == "mouse") {
                        d._oldvalue = d.listBox.selectedValue;
                        if (!d.checkboxes) {
                            d.hideListBox("mouse");
                            if (!d.touch) {
                                d.input.focus()
                            } else {
                                return false
                            }
                        }
                    }
                }
            }
        });
        if (this.listBox != null && this.listBox.content != null) {
            this.addHandler(this.listBox.content, "click", function (f) {
                if (!d.disabled) {
                    if (d.listBox.itemswrapper) {
                        if (f.target === d.listBox.itemswrapper[0]) {
                            return true
                        }
                    }
                    if (f.target && f.target.className) {
                        if (f.target.className.indexOf("jqx-fill-state-disabled") >= 0) {
                            return true
                        }
                    }
                    d.renderSelection("mouse");
                    d._oldvalue = d.listBox.selectedValue;
                    if (!d.touch && !d.ishiding) {
                        if (!d.checkboxes) {
                            d.hideListBox("mouse");
                            d.input.focus()
                        }
                    }
                    if (d.touch === true) {
                        if (!d.checkboxes) {
                            d.hideListBox("mouse")
                        }
                    }
                }
            })
        }
    }, _selectOldValue: function () {
        var b = this;
        if (b.listBox.selectedIndex == -1) {
            if (!b.multiSelect) {
                var c = b.listBox.getVisibleItem(b._oldvalue);
                if (c) {
                    setTimeout(function () {
                        if (b.autoComplete) {
                            b._updateItemsVisibility("")
                        }
                        b.listBox.selectIndex(c.index);
                        b.renderSelection("api")
                    }, b.closeDelay)
                } else {
                    b.clearSelection();
                    b.listBox.selectIndex(0);
                    b.renderSelection("api")
                }
            } else {
                b.listBox.selectedValue = null;
                b.input.val("")
            }
        } else {
            b.renderSelection("api")
        }
    }, removeHandlers: function () {
        var c = this;
        if (this.dropdownlistWrapper != null) {
            this.removeHandler(this.dropdownlistWrapper, "mousedown")
        }
        if (this.dropdownlistContent) {
            this.removeHandler(this.dropdownlistContent, "click");
            this.removeHandler(this.dropdownlistContent, "focus")
        }
        this.removeHandler(this.host, "keydown");
        this.removeHandler(this.host, "focus");
        if (this.input != null) {
            this.removeHandler(this.input, "focus");
            this.removeHandler(this.input, "blur")
        }
        this.removeHandler(this.host, "mouseenter");
        this.removeHandler(this.host, "mouseleave");
        this.removeHandler(a(document), "mousemove." + c.id);
        if (this.listBoxContainer) {
            this.removeHandler(this.listBoxContainer, "checkChange");
            this.removeHandler(this.listBoxContainer, "select")
        }
        if (this.host.parents()) {
            this.removeHandler(this.host.parents(), "scroll.combobox" + this.element.id)
        }
        if (this.dropdownlistArrowIcon && this.dropdownlistArrow) {
            var b = "mousedown";
            if (this.touch) {
                b = a.jqx.mobile.getTouchEventName("touchstart")
            }
            this.removeHandler(this.dropdownlistArrowIcon, b);
            this.removeHandler(this.dropdownlistArrow, b)
        }
    }, getItem: function (b) {
        var c = this.listBox.getItem(b);
        return c
    }, getItemByValue: function (c) {
        var b = this.listBox.getItemByValue(c);
        return b
    }, getVisibleItem: function (b) {
        var c = this.listBox.getVisibleItem(b);
        return c
    }, renderSelection: function (j) {
        if (j == undefined || j == "none") {
            return
        }
        if (this._disableSelection === true) {
            return
        }
        if (this.listBox == null) {
            return
        }
        if (this.multiSelect) {
            return
        }
        var k = this.listBox.visibleItems[this.listBox.selectedIndex];
        if (this.autoComplete && !this.checkboxes) {
            if (this.listBox.selectedValue !== undefined) {
                var k = this.getItemByValue(this.listBox.selectedValue)
            }
        }
        if (this.checkboxes) {
            var f = this.getCheckedItems();
            if (f != null && f.length > 0) {
                k = f[0]
            } else {
                k = null
            }
        }
        if (k == null) {
            var d = a.jqx.browser.msie && a.jqx.browser.version < 8;
            this.input.val("");
            if (!d) {
                this.input.attr("placeholder", this.placeHolder)
            }
            this._updateInputSelection();
            return
        }
        this.selectedIndex = this.listBox.selectedIndex;
        var c = a("<span></span>");
        if (k.label != undefined && k.label != null && k.label.toString().length > 0) {
            a.jqx.utilities.html(c, k.label)
        } else {
            if (k.value != undefined && k.value != null && k.value.toString().length > 0) {
                a.jqx.utilities.html(c, k.value)
            } else {
                if (k.title != undefined && k.title != null && k.title.toString().length > 0) {
                    a.jqx.utilities.html(c, k.title)
                } else {
                    a.jqx.utilities.html(c, this.emptyString)
                }
            }
        }
        var b = c.outerHeight();
        if (this.checkboxes) {
            var g = this.getCheckedItems();
            var h = "";
            for (var e = 0; e < g.length; e++) {
                if (e == g.length - 1) {
                    h += g[e].label
                } else {
                    h += g[e].label + ", "
                }
            }
            this.input.val(h)
        } else {
            this.input.val(c.text())
        }
        c.remove();
        if (this.renderSelectedItem) {
            var l = this.renderSelectedItem(this.listBox.selectedIndex, k);
            if (l != undefined) {
                this.input.val(l)
            }
        }
        this._updateInputSelection();
        if (this.listBox && this.listBox._activeElement) {
            a.jqx.aria(this, "aria-activedescendant", this.listBox._activeElement.id)
        }
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
        this.listBox.clearSelection();
        this.input.val("");
        if (this.multiSelect) {
            this.listBox.selectedValue = "";
            this.selectedItems = new Array();
            this._selectedItems = new Array();
            this.doMultiSelect(false)
        }
    }, unselectIndex: function (c, d) {
        if (isNaN(c)) {
            return
        }
        if (this.autoComplete) {
            this._updateItemsVisibility("")
        }
        this.listBox.unselectIndex(c, d);
        this.renderSelection("mouse");
        if (this.multiSelect) {
            if (c >= 0) {
                var b = this.getItem(c);
                var e = this.selectedItems.indexOf(b.value);
                if (e >= 0) {
                    if (b.value === this.listBox.selectedValue) {
                        this.listBox.selectedValue = null
                    }
                    this.selectedItems.splice(e, 1);
                    this._selectedItems.splice(e, 1)
                }
            }
            this.doMultiSelect(false)
        }
    }, selectIndex: function (b, d, e, c) {
        if (this.autoComplete) {
            this._updateItemsVisibility("")
        }
        this.listBox.selectIndex(b, d, e, c);
        this.renderSelection("mouse");
        this.selectedIndex = b;
        if (this.multiSelect) {
            this.doMultiSelect()
        }
    }, selectItem: function (b) {
        if (this.autoComplete) {
            this._updateItemsVisibility("")
        }
        if (this.listBox != undefined) {
            this.listBox.selectItem(b);
            this.selectedIndex = this.listBox.selectedIndex;
            this.renderSelection("mouse");
            if (this.multiSelect) {
                this.doMultiSelect(false)
            }
        }
    }, unselectItem: function (d) {
        if (this.autoComplete) {
            this._updateItemsVisibility("")
        }
        if (this.listBox != undefined) {
            this.listBox.unselectItem(d);
            this.renderSelection("mouse");
            if (this.multiSelect) {
                var b = this.getItemByValue(d);
                if (b) {
                    var c = this.selectedItems.indexOf(b.value);
                    if (c >= 0) {
                        if (b.value === this.listBox.selectedValue) {
                            this.listBox.selectedValue = null
                        }
                        this.selectedItems.splice(c, 1);
                        this._selectedItems.splice(c, 1)
                    }
                }
                this.doMultiSelect(false)
            }
        }
    }, checkItem: function (b) {
        if (this.autoComplete) {
            this._updateItemsVisibility("")
        }
        if (this.listBox != undefined) {
            this.listBox.checkItem(b)
        }
    }, uncheckItem: function (b) {
        if (this.autoComplete) {
            this._updateItemsVisibility("")
        }
        if (this.listBox != undefined) {
            this.listBox.uncheckItem(b)
        }
    }, indeterminateItem: function (b) {
        if (this.autoComplete) {
            this._updateItemsVisibility("")
        }
        if (this.listBox != undefined) {
            this.listBox.indeterminateItem(b)
        }
    }, getSelectedValue: function () {
        return this.listBox.selectedValue
    }, getSelectedIndex: function () {
        return this.listBox.selectedIndex
    }, getSelectedItem: function () {
        return this.getVisibleItem(this.listBox.selectedIndex)
    }, getSelectedItems: function () {
        var c = new Array();
        var b = this;
        a.each(this.selectedItems, function () {
            var d = b.getItemByValue(this);
            if (d) {
                c.push(d)
            } else {
                var d = b._selectedItems[this];
                if (d) {
                    c.push(d)
                }
            }
        });
        return c
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
    }, insertAt: function (c, b) {
        if (c == null) {
            return false
        }
        return this.listBox.insertAt(c, b)
    }, addItem: function (b) {
        return this.listBox.addItem(b)
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
        if (c) {
            var b = a(c).coord(true);
            return[b.left, b.top]
        }
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
        f.top -= Math.min(f.top, (f.top + j > e && e > j) ? Math.abs(j + c + 23) : 0);
        return f
    }, open: function () {
        if (!this.isOpened() && !this.opening) {
            this.showListBox("api")
        }
    }, close: function () {
        if (this.isOpened()) {
            this.hideListBox("api")
        }
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
    }, showListBox: function (k) {
        if (this.listBox.items && this.listBox.items.length == 0) {
            return
        }
        if (this.autoComplete || this.multiSelect && !this.remoteAutoComplete) {
            if (k != "search") {
                this._updateItemsVisibility("")
            }
        }
        if (this.remoteAutoComplete) {
            this.listBox.clearSelection()
        }
        if (k != "search") {
            this._oldvalue = this.listBox.selectedValue
        }
        a.jqx.aria(this, "aria-expanded", true);
        if (this.dropDownWidth == "auto" && this.width != null && this.width.indexOf && this.width.indexOf("%") != -1) {
            if (this.listBox.host.width() != this.host.width()) {
                var p = this.host.width();
                this.listBoxContainer.jqxListBox({width: p});
                this.container.width(parseInt(p) + 25)
            }
        }
        var n = this;
        var h = this.listBoxContainer;
        var s = this.listBox;
        var e = a(window).scrollTop();
        var f = a(window).scrollLeft();
        var l = parseInt(this._findPos(this.host[0])[1]) + parseInt(this.host.outerHeight()) - 1 + "px";
        var d, o = parseInt(Math.round(this.host.coord(true).left));
        d = o + "px";
        var r = a.jqx.mobile.isSafariMobileBrowser() || a.jqx.mobile.isWindowsPhone();
        this.ishiding = false;
        var g = a.jqx.utilities.hasTransform(this.host);
        if (g || (r != null && r)) {
            d = a.jqx.mobile.getLeftPos(this.element);
            l = a.jqx.mobile.getTopPos(this.element) + parseInt(this.host.outerHeight());
            if (a("body").css("border-top-width") != "0px") {
                l = parseInt(l) - this._getBodyOffset().top + "px"
            }
            if (a("body").css("border-left-width") != "0px") {
                d = parseInt(d) - this._getBodyOffset().left + "px"
            }
        }
        this.host.addClass(this.toThemeProperty("jqx-combobox-state-selected"));
        this.dropdownlistArrowIcon.addClass(this.toThemeProperty("jqx-icon-arrow-down-selected"));
        this.dropdownlistArrow.addClass(this.toThemeProperty("jqx-combobox-arrow-selected"));
        this.dropdownlistArrow.addClass(this.toThemeProperty("jqx-fill-state-pressed"));
        this.host.addClass(this.toThemeProperty("jqx-combobox-state-focus"));
        this.host.addClass(this.toThemeProperty("jqx-fill-state-focus"));
        this.dropdownlistContent.addClass(this.toThemeProperty("jqx-combobox-content-focus"));
        this.container.css("left", d);
        this.container.css("top", l);
        s._arrange();
        var c = true;
        var b = false;
        if (this.dropDownHorizontalAlignment == "right" || this.rtl) {
            var j = this.container.outerWidth();
            var q = Math.abs(j - this.host.width());
            if (j > this.host.width()) {
                this.container.css("left", 25 + parseInt(Math.round(o)) - q + "px")
            } else {
                this.container.css("left", 25 + parseInt(Math.round(o)) + q + "px")
            }
        }
        if (this.enableBrowserBoundsDetection) {
            var i = this.testOffset(h, {left: parseInt(this.container.css("left")), top: parseInt(l)}, parseInt(this.host.outerHeight()));
            if (parseInt(this.container.css("top")) != i.top) {
                b = true;
                h.css("top", 23)
            } else {
                h.css("top", 0)
            }
            this.container.css("top", i.top);
            this.container.css("top", i.top);
            if (parseInt(this.container.css("left")) != i.left) {
                this.container.css("left", i.left)
            }
        }
        if (this.animationType == "none") {
            this.container.css("display", "block");
            a.data(document.body, "openedComboJQXListBoxParent", n);
            a.data(document.body, "openedComboJQXListBox" + n.element.id, h);
            h.css("margin-top", 0);
            h.css("opacity", 1)
        } else {
            this.container.css("display", "block");
            var m = h.outerHeight();
            h.stop();
            if (this.animationType == "fade") {
                h.css("margin-top", 0);
                h.css("opacity", 0);
                h.animate({opacity: 1}, this.openDelay, function () {
                    n.isanimating = false;
                    n.opening = false;
                    a.data(document.body, "openedComboJQXListBoxParent", n);
                    a.data(document.body, "openedComboJQXListBox" + n.element.id, h)
                })
            } else {
                h.css("opacity", 1);
                if (b) {
                    h.css("margin-top", m)
                } else {
                    h.css("margin-top", -m)
                }
                this.isanimating = true;
                this.opening = true;
                h.animate({"margin-top": 0}, this.openDelay, function () {
                    n.isanimating = false;
                    n.opening = false;
                    a.data(document.body, "openedComboJQXListBoxParent", n);
                    a.data(document.body, "openedComboJQXListBox" + n.element.id, h)
                })
            }
        }
        s._renderItems();
        if (!b) {
            this.host.addClass(this.toThemeProperty("jqx-rc-b-expanded"));
            h.addClass(this.toThemeProperty("jqx-rc-t-expanded"));
            this.dropdownlistArrow.addClass(this.toThemeProperty("jqx-rc-b-expanded"))
        } else {
            this.host.addClass(this.toThemeProperty("jqx-rc-t-expanded"));
            h.addClass(this.toThemeProperty("jqx-rc-b-expanded"));
            this.dropdownlistArrow.addClass(this.toThemeProperty("jqx-rc-t-expanded"))
        }
        h.addClass(this.toThemeProperty("jqx-fill-state-focus"));
        this._raiseEvent("0", s)
    }, doMultiSelect: function (c) {
        if (this.checkboxes) {
            this.multiSelect = false
        }
        var e = this;
        if (!this.multiSelect) {
            var g = e.dropdownlistContent.find(".jqx-button");
            var d = "mousedown";
            if (this.touch) {
                d = a.jqx.mobile.getTouchEventName("touchstart")
            }
            this.removeHandler(g, d);
            this.removeHandler(g.find(".jqx-icon-close"), d);
            g.remove();
            this.selectedItems = new Array();
            this._selectedItems = new Array();
            return
        }
        if (this.validateSelection) {
            var k = this.validateSelection(this.listBox.selectedValue);
            if (!k) {
                return
            }
        }
        var h = this.selectedItems;
        if (this.listBox.selectedValue) {
            if (this.selectedItems.indexOf(this.listBox.selectedValue) === -1) {
                this.selectedItems.push(this.listBox.selectedValue);
                var j = this.getItemByValue(this.listBox.selectedValue);
                if (j) {
                    this._selectedItems.push(j);
                    this._raiseEvent("2", {index: j.index, item: j});
                    this._raiseEvent("4", {index: j.index, item: j})
                }
            }
            this.listBox.selectedIndex = 0
        }
        var f = this.listBox.items;
        for (var b = 0; b < f.length; b++) {
            f[b].disabled = false;
            if (this.selectedItems.indexOf(f[b].value) >= 0) {
                f[b].disabled = true
            }
        }
        this.listBox._renderItems();
        this.searchString = "";
        this.input.val("");
        var f = "";
        var d = "mousedown";
        var g = e.dropdownlistContent.find(".jqx-button");
        if (this.touch) {
            d = a.jqx.mobile.getTouchEventName("touchstart")
        }
        this.removeHandler(g, d);
        this.removeHandler(g.find(".jqx-icon-close"), d);
        g.remove();
        e.input.detach();
        e.input.css("width", "25px");
        a.each(this.selectedItems, function (i) {
            var m = e.getItemByValue(this);
            if (!m || e.remoteAutoComplete) {
                m = e._selectedItems[i]
            }
            var o = a('<div style="overflow: hidden; float: left;"></div>');
            o.addClass(e.toThemeProperty("jqx-button"));
            o.addClass(e.toThemeProperty("jqx-combobox-multi-item"));
            o.addClass(e.toThemeProperty("jqx-fill-state-normal"));
            o.addClass(e.toThemeProperty("jqx-rc-all"));
            if (m) {
                var p = m.label;
                if (o[0].innerHTML == "") {
                    o[0].innerHTML = '<a data-value="' + m.value + '" style="float: left;" href="#">' + p + "</a>"
                }
                if (e.rtl) {
                    o[0].innerHTML = '<a data-value="' + m.value + '" style="float: right;" href="#">' + p + "</a>"
                }
                var n = !e.rtl ? "right" : "left";
                var l = '<div style="position: relative; overflow: hidden; float: ' + n + '; min-height: 16px; min-width: 18px;"><div style="position: absolute; left: 100%; top: 50%; margin-left: -18px; margin-top: -7px; float: none; width: 16px; height: 16px;" class="' + e.toThemeProperty("jqx-icon-close") + '"></div></div>';
                if (a.jqx.browser.msie && a.jqx.browser.version < 8) {
                    l = '<div style="position: relative; overflow: hidden; float: left; min-height: 16px; min-width: 18px;"><div style="position: absolute; left: 100%; top: 50%; margin-left: -18px; margin-top: -7px; float: none; width: 16px; height: 16px;" class="' + e.toThemeProperty("jqx-icon-close") + '"></div></div>'
                }
                if (e.rtl) {
                    var l = '<div style="position: relative; overflow: hidden; float: ' + n + '; min-height: 16px; min-width: 18px;"><div style="position: absolute; left: 0px; top: 50%; margin-top: -7px; float: none; width: 16px; height: 16px;" class="' + e.toThemeProperty("jqx-icon-close") + '"></div></div>';
                    if (a.jqx.browser.msie && a.jqx.browser.version < 8) {
                        l = '<div style="position: relative; overflow: hidden; float: left; min-height: 16px; min-width: 18px;"><div style="position: absolute; left: 0px; top: 50%; margin-top: -7px; float: none; width: 16px; height: 16px;" class="' + e.toThemeProperty("jqx-icon-close") + '"></div></div>'
                    }
                }
                o[0].innerHTML += l
            } else {
                if (o[0].innerHTML == "") {
                    o[0].innerHTML = '<a href="#"></a>'
                }
            }
            e.dropdownlistContent.append(o)
        });
        e.dropdownlistContent.append(e.input);
        e.input.val("");
        if (c !== false) {
            e.input.focus();
            setTimeout(function () {
                e.input.focus()
            }, 10)
        }
        var g = e.dropdownlistContent.find(".jqx-button");
        if (this.touchMode === true) {
            d = "mousedown"
        }
        this.addHandler(g, d, function (l) {
            if (l.target.className.indexOf("jqx-icon-close") >= 0) {
                return true
            }
            var m = a(l.target).attr("data-value");
            var i = e.getItemByValue(m);
            if (i) {
                e.listBox.selectedValue = null;
                e.listBox.clearSelection()
            }
            e.listBox.scrollTo(0, 0);
            e.open();
            if (l.preventDefault) {
                l.preventDefault()
            }
            if (l.stopPropagation) {
                l.stopPropagation()
            }
            return false
        });
        this.addHandler(g.find(".jqx-icon-close"), d, function (o) {
            if (e.disabled) {
                return
            }
            var q = a(o.target).parent().parent().find("a").attr("data-value");
            var n = e.getItemByValue(q);
            if (n) {
                e.listBox.selectedValue = null;
                var l = e.selectedItems.indexOf(q);
                if (l >= 0) {
                    e.selectedItems.splice(l, 1);
                    e._selectedItems.splice(l, 1);
                    e._raiseEvent("3", {index: n.index, type: "mouse", item: n});
                    e._raiseEvent("4", {index: n.index, type: "mouse", item: n});
                    e.doMultiSelect()
                } else {
                    for (var m = 0; m < e.selectedItems.length; m++) {
                        var p = e.selectedItems[m];
                        if (p == q) {
                            e.selectedItems.splice(m, 1);
                            e._selectedItems.splice(m, 1);
                            e._raiseEvent("3", {index: n.index, type: "mouse", item: n});
                            e._raiseEvent("4", {index: n.index, type: "mouse", item: n});
                            e.doMultiSelect();
                            break
                        }
                    }
                }
            }
        });
        e.dropdownlistArrow.height(this.host.height());
        e._updateInputSelection()
    }, hideListBox: function (h) {
        var f = this.listBoxContainer;
        var g = this.listBox;
        var c = this.container;
        if (this.container.css("display") == "none") {
            return
        }
        a.jqx.aria(this, "aria-expanded", false);
        if (h == "keyboard" || h == "mouse") {
            this.listBox.searchString = ""
        }
        if (h == "keyboard" || h == "mouse" && this.multiSelect) {
            this.doMultiSelect()
        }
        var d = this;
        a.data(document.body, "openedComboJQXListBox" + this.element.id, null);
        if (this.animationType == "none") {
            this.opening = false;
            this.container.css("display", "none")
        } else {
            if (!this.ishiding) {
                var b = f.outerHeight();
                f.css("margin-top", 0);
                f.stop();
                this.opening = false;
                this.isanimating = true;
                var e = -b;
                if (parseInt(this.container.coord().top) < parseInt(this.host.coord().top)) {
                    e = b
                }
                if (this.animationType == "fade") {
                    f.css({opacity: 1});
                    f.animate({opacity: 0}, this.closeDelay, function () {
                        d.isanimating = false;
                        c.css("display", "none");
                        d.ishiding = false
                    })
                } else {
                    f.animate({"margin-top": e}, this.closeDelay, function () {
                        d.isanimating = false;
                        c.css("display", "none");
                        d.ishiding = false
                    })
                }
            }
        }
        this.ishiding = true;
        this.host.removeClass(this.toThemeProperty("jqx-combobox-state-selected"));
        this.dropdownlistArrowIcon.removeClass(this.toThemeProperty("jqx-icon-arrow-down-selected"));
        this.dropdownlistArrow.removeClass(this.toThemeProperty("jqx-combobox-arrow-selected"));
        this.dropdownlistArrow.removeClass(this.toThemeProperty("jqx-fill-state-pressed"));
        if (!this.focused) {
            this.host.removeClass(this.toThemeProperty("jqx-combobox-state-focus"));
            this.host.removeClass(this.toThemeProperty("jqx-fill-state-focus"));
            this.dropdownlistContent.removeClass(this.toThemeProperty("jqx-combobox-content-focus"))
        }
        this.host.removeClass(this.toThemeProperty("jqx-rc-b-expanded"));
        f.removeClass(this.toThemeProperty("jqx-rc-t-expanded"));
        this.host.removeClass(this.toThemeProperty("jqx-rc-t-expanded"));
        f.removeClass(this.toThemeProperty("jqx-rc-b-expanded"));
        f.removeClass(this.toThemeProperty("jqx-fill-state-focus"));
        this.dropdownlistArrow.removeClass(this.toThemeProperty("jqx-rc-t-expanded"));
        this.dropdownlistArrow.removeClass(this.toThemeProperty("jqx-rc-b-expanded"));
        this._raiseEvent("1", g)
    }, closeOpenedListBox: function (e) {
        var d = e.data.me;
        var b = a(e.target);
        var c = e.data.listbox;
        if (c == null) {
            return true
        }
        if (a(e.target).ischildof(e.data.me.host)) {
            return
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
                    if (this.className.indexOf("jqx-combobox") != -1) {
                        if (d.element.id == this.id) {
                            g = true
                        }
                        return false
                    }
                }
            }
        });
        if (c != null && !g) {
            if (d.isOpened()) {
                d.hideListBox("api");
                d.input.blur()
            }
        }
        return true
    }, loadFromSelect: function (b) {
        this.listBox.loadFromSelect(b)
    }, refresh: function (b) {
        this._setSize();
        this._arrange();
        if (this.listBox) {
            this.renderSelection()
        }
    }, _arrange: function () {
        var d = parseInt(this.host.width());
        var j = parseInt(this.host.height());
        var e = this.arrowSize;
        var f = this.arrowSize;
        var h = 1;
        if (!this.showArrow) {
            f = 0;
            e = 0;
            this.dropdownlistArrow.hide();
            h = 0;
            this.host.css("cursor", "arrow")
        }
        var b = d - f - 1 * h;
        if (b > 0) {
            this.dropdownlistContent.width(b + "px")
        }
        if (this.rtl) {
            this.dropdownlistContent.width(-1 + b + "px")
        }
        this.dropdownlistContent.height(j);
        this.dropdownlistContent.css("left", 0);
        this.dropdownlistContent.css("top", 0);
        this.dropdownlistArrow.width(f + 1);
        this.dropdownlistArrow.height(j);
        this.dropdownlistArrow.css("left", 1 + b + "px");
        this.input.css("width", "100%");
        var c = this.input.height();
        if (c == 0) {
            c = parseInt(this.input.css("font-size")) + 3
        }
        this.input.addClass(this.toThemeProperty("jqx-rc-all"));
        var i = parseInt(j) / 2 - parseInt(c) / 2;
        if (i > 0) {
            this.input.css("margin-top", i)
        }
        if (this.rtl) {
            this.dropdownlistArrow.css("left", "0px");
            this.dropdownlistContent.css("left", this.dropdownlistArrow.width());
            if (a.jqx.browser.msie && a.jqx.browser.version <= 8) {
                this.dropdownlistContent.css("left", 1 + this.dropdownlistArrow.width())
            }
        }
        if (this.multiSelect) {
            this.input.css("float", "left");
            this.input.width(25);
            this.dropdownlistWrapper.parent().css("height", "auto");
            this.dropdownlistContent.css("height", "auto");
            this.dropdownlistWrapper.css("height", "auto");
            this.dropdownlistContent.css("position", "relative");
            this.dropdownlistContent.css("cursor", "text");
            this.host.css("height", "auto");
            this.host.css("min-height", this.height);
            this.dropdownlistContent.css("min-height", this.height);
            var j = parseInt(this.host.height());
            this.dropdownlistArrow.height(j);
            var g = parseInt(this.host.css("min-height"));
            var i = parseInt(g) / 2 - parseInt(c) / 2;
            if (i > 0) {
                this.input.css("margin-top", i)
            }
        }
    }, destroy: function () {
        if (this.source && this.source.unbindBindingUpdate) {
            this.source.unbindBindingUpdate(this.element.id);
            this.source.unbindBindingUpdate(this.listBoxContainer[0].id);
            this.source.unbindDownloadComplete(this.element.id);
            this.source.unbindDownloadComplete(this.listBoxContainer[0].id)
        }
        a.jqx.utilities.resize(this.host, null, true);
        this.removeHandler(this.listBoxContainer, "select");
        this.removeHandler(this.listBoxContainer, "unselect");
        this.removeHandler(this.listBoxContainer, "change");
        this.removeHandler(this.listBoxContainer, "bindingComplete");
        this.removeHandler(this.dropdownlistWrapper, "selectstart");
        this.removeHandler(this.dropdownlistWrapper, "mousedown");
        this.removeHandler(this.host, "keydown");
        this.removeHandler(this.listBoxContainer, "select");
        this.removeHandler(this.listBox.content, "click");
        this.removeHandlers();
        this.removeHandler(this.input, "keyup.textchange");
        this.listBoxContainer.jqxListBox("destroy");
        this.listBoxContainer.remove();
        this.host.removeClass();
        this.removeHandler(a(document), "mousedown." + this.id, this.closeOpenedListBox);
        if (this.touch) {
            this.removeHandler(a(document), a.jqx.mobile.getTouchEventName("touchstart") + "." + this.id)
        }
        this.cinput.remove();
        delete this.cinput;
        this.dropdownlistArrow.remove();
        delete this.dropdownlistArrow;
        this.dropdownlistArrowIcon.remove();
        delete this.dropdownlistArrowIcon;
        delete this.dropdownlistWrapper;
        delete this.listBoxContainer;
        delete this.input;
        delete this.dropdownlistContent;
        delete this.comboStructure;
        this.container.remove();
        delete this.listBox;
        delete this.container;
        var b = a.data(this.element, "jqxComboBox");
        if (b) {
            delete b.instance
        }
        this.host.removeData();
        this.host.remove();
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
        if (c === "touchMode") {
            b.listBoxContainer.jqxListBox({touchMode: e});
            b.touch = a.jqx.mobile.isTouchDevice();
            if (b.touchMode === true) {
                b.touch = true
            }
            b._updateHandlers()
        }
        if (c == "multiSelect") {
            if (e) {
                b.doMultiSelect(false)
            } else {
                b.doMultiSelect(false);
                b.dropdownlistWrapper.parent().css("height", "100%");
                b.dropdownlistContent.css("height", "100");
                b.dropdownlistWrapper.css("height", "100");
                b.dropdownlistContent.css("position", "relative");
                b.host.css("min-height", null);
                b._setSize();
                b._arrange()
            }
        }
        if (c == "showArrow") {
            b._arrange();
            if (b.multiSelect) {
                b.doMultiSelect(false)
            }
        }
        if (c == "popupZIndex") {
            b.listBoxContainer.css({zIndex: b.popupZIndex})
        }
        if (c == "promptText") {
            b.placeHolder = e
        }
        if (c == "autoOpen") {
            b._updateHandlers()
        }
        if (c == "renderer") {
            b.listBox.renderer = b.renderer
        }
        if (c == "itemHeight") {
            b.listBox.itemHeight = e
        }
        if (c == "source") {
            b.input.val("");
            b.listBoxContainer.jqxListBox({source: b.source});
            b.renderSelection("mouse");
            if (b.source == null) {
                b.clearSelection()
            }
            if (b.multiSelect) {
                b.selectedItems = new Array();
                b._selectedItems = new Array();
                b.doMultiSelect(false)
            }
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
        if (c == "displayMember" || c == "valueMember") {
            b.listBoxContainer.jqxListBox({displayMember: b.displayMember, valueMember: b.valueMember});
            b.renderSelection("mouse")
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
        if (c == "autoComplete") {
            b._resetautocomplete()
        }
        if (c == "checkboxes") {
            b.listBoxContainer.jqxListBox({checkboxes: b.checkboxes});
            if (b.checkboxes) {
                b.input.attr("readonly", true);
                a.jqx.aria(b, "aria-readonly", true)
            } else {
                a.jqx.aria(b, "aria-readonly", false)
            }
        }
        if (c == "theme" && e != null) {
            b.listBoxContainer.jqxListBox({theme: e});
            b.listBoxContainer.addClass(b.toThemeProperty("jqx-popup"));
            if (a.jqx.browser.msie) {
                b.listBoxContainer.addClass(b.toThemeProperty("jqx-noshadow"))
            }
            b.dropdownlistContent.removeClass();
            b.dropdownlistContent.addClass(b.toThemeProperty("jqx-combobox-content"));
            b.dropdownlistContent.addClass(b.toThemeProperty("jqx-widget-content"));
            b.input.removeClass();
            b.input.addClass(b.toThemeProperty("jqx-combobox-input"));
            b.input.addClass(this.toThemeProperty("jqx-widget-content"));
            b.host.removeClass();
            b.host.addClass(b.toThemeProperty("jqx-combobox-state-normal"));
            b.host.addClass(b.toThemeProperty("jqx-rc-all"));
            b.host.addClass(b.toThemeProperty("jqx-widget"));
            b.host.addClass(b.toThemeProperty("jqx-widget-content"));
            b.dropdownlistArrow.removeClass();
            b.dropdownlistArrowIcon.addClass(b.toThemeProperty("jqx-icon-arrow-down"));
            b.dropdownlistArrow.addClass(b.toThemeProperty("jqx-combobox-arrow-normal"));
            b.dropdownlistArrow.addClass(b.toThemeProperty("jqx-fill-state-normal"))
        }
        if (c == "width" || c == "height") {
            b._setSize();
            if (c == "width") {
                if (b.dropDownWidth == "auto") {
                    var d = b.host.width();
                    b.listBoxContainer.jqxListBox({width: d});
                    b.container.width(parseInt(d) + 25)
                }
            }
            b._arrange()
        }
        if (c == "selectedIndex") {
            b.listBox.selectIndex(e);
            b.renderSelection("mouse")
        }
    }})
})(jQuery);