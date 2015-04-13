/*
 jQWidgets v3.1.0 (2013-Dec-23)
 Copyright (c) 2011-2014 jQWidgets.
 License: http://jqwidgets.com/license/
 */

(function (a) {
    a.jqx.jqxWidget("jqxListBox", "", {});
    a.extend(a.jqx._jqxListBox.prototype, {defineInstance: function () {
        this.disabled = false;
        this.width = null;
        this.height = null;
        this.items = new Array();
        this.multiple = false;
        this.selectedIndex = -1;
        this.selectedIndexes = new Array();
        this.source = null;
        this.scrollBarSize = a.jqx.utilities.scrollBarSize;
        this.enableHover = true;
        this.enableSelection = true;
        this.visualItems = new Array();
        this.groups = new Array();
        this.equalItemsWidth = true;
        this.itemHeight = -1;
        this.visibleItems = new Array();
        this.emptyGroupText = "Group";
        this.checkboxes = false;
        this.hasThreeStates = false;
        this.autoHeight = false;
        this.autoItemsHeight = false;
        this.roundedcorners = true;
        this.touchMode = "auto";
        this.displayMember = "";
        this.valueMember = "";
        this.searchMode = "startswithignorecase";
        this.incrementalSearch = true;
        this.incrementalSearchDelay = 1000;
        this.incrementalSearchKeyDownDelay = 300;
        this.allowDrag = false;
        this.allowDrop = true;
        this.dropAction = "default";
        this.touchModeStyle = "auto";
        this.keyboardNavigation = true;
        this.enableMouseWheel = true;
        this.multipleextended = false;
        this.emptyString = "null";
        this.rtl = false;
        this.rendered = null;
        this.renderer = null;
        this.dragStart = null;
        this.dragEnd = null;
        this.ready = null;
        this._checkForHiddenParent = true;
        this.aria = {"aria-disabled": {name: "disabled", type: "boolean"}};
        this.events = ["select", "unselect", "change", "checkChange", "dragStart", "dragEnd", "bindingComplete"]
    }, createInstance: function (b) {
        if (this.width == null) {
            this.width = 200
        }
        if (this.height == null) {
            this.height = 200
        }
        this.render();
        var c = this;
        a.jqx.utilities.resize(this.host, function () {
            c._updateSize()
        }, false, this._checkForHiddenParent)
    }, render: function () {
        this.element.innerHTML = "";
        var b = this;
        var d = this.element.className;
        d += " " + this.toThemeProperty("jqx-listbox");
        d += " " + this.toThemeProperty("jqx-reset");
        d += " " + this.toThemeProperty("jqx-rc-all");
        d += " " + this.toThemeProperty("jqx-widget");
        d += " " + this.toThemeProperty("jqx-widget-content");
        this.element.className = d;
        var h = false;
        if (this.width != null && this.width.toString().indexOf("%") != -1) {
            this.host.width(this.width);
            h = true
        }
        if (this.height != null && this.height.toString().indexOf("%") != -1) {
            this.host.height(this.height);
            if (this.host.height() == 0) {
                this.host.height(200)
            }
            h = true
        }
        if (this.width != null && this.width.toString().indexOf("px") != -1) {
            this.host.width(this.width)
        } else {
            if (this.width != undefined && !isNaN(this.width)) {
                this.element.style.width = parseInt(this.width) + "px"
            }
        }
        if (this.height != null && this.height.toString().indexOf("px") != -1) {
            this.host.height(this.height)
        } else {
            if (this.height != undefined && !isNaN(this.height)) {
                this.element.style.height = parseInt(this.height) + "px"
            }
        }
        if (this.multiple || this.multipleextended || this.checkboxes) {
            a.jqx.aria(this, "aria-multiselectable", true)
        } else {
            a.jqx.aria(this, "aria-multiselectable", false)
        }
        var c = a("<div style='-webkit-appearance: none; background: transparent; outline: none; width:100%; height: 100%; align:left; border: 0px; padding: 0px; margin: 0px; left: 0px; top: 0px; valign:top; position: relative;'><div style='-webkit-appearance: none; border: none; background: transparent; outline: none; width:100%; height: 100%; padding: 0px; margin: 0px; align:left; left: 0px; top: 0px; valign:top; position: relative;'><div id='listBoxContent' style='-webkit-appearance: none; border: none; background: transparent; outline: none; border: none; padding: 0px; overflow: hidden; margin: 0px; align:left; valign:top; left: 0px; top: 0px; position: absolute;'/><div id='verticalScrollBar" + this.element.id + "' style='visibility: inherit; align:left; valign:top; left: 0px; top: 0px; position: absolute;'/><div id='horizontalScrollBar" + this.element.id + "' style='visibility: inherit; align:left; valign:top; left: 0px; top: 0px; position: absolute;'/><div id='bottomRight' style='align:left; valign:top; left: 0px; top: 0px; border: none; position: absolute;'/></div></div>");
        if (this._checkForHiddenParent) {
            this._addInput();
            if (!this.host.attr("tabIndex")) {
                this.host.attr("tabIndex", 1)
            }
        }
        this.host.attr("role", "listbox");
        if (this.checkboxes && !this.host.jqxCheckBox) {
            throw new Error("jqxListBox: Missing reference to jqxcheckbox.js.")
        }
        this.host.append(c);
        var f = this.host.find("#verticalScrollBar" + this.element.id);
        if (!this.host.jqxButton) {
            throw new Error("jqxListBox: Missing reference to jqxbuttons.js.");
            return
        }
        if (!f.jqxScrollBar) {
            throw new Error("jqxListBox: Missing reference to jqxscrollbar.js.");
            return
        }
        var g = parseInt(this.host.height()) / 2;
        if (g == 0) {
            g = 10
        }
        this.vScrollBar = f.jqxScrollBar({_initialLayout: true, vertical: true, rtl: this.rtl, theme: this.theme, touchMode: this.touchMode, largestep: g});
        var e = this.host.find("#horizontalScrollBar" + this.element.id);
        this.hScrollBar = e.jqxScrollBar({_initialLayout: true, vertical: false, rtl: this.rtl, touchMode: this.touchMode, theme: this.theme});
        this.content = this.host.find("#listBoxContent");
        this.content[0].id = "listBoxContent" + this.element.id;
        this.bottomRight = this.host.find("#bottomRight").addClass(this.toThemeProperty("jqx-listbox-bottomright"));
        this.bottomRight[0].id = "bottomRight" + this.element.id;
        this.vScrollInstance = a.data(this.vScrollBar[0], "jqxScrollBar").instance;
        this.hScrollInstance = a.data(this.hScrollBar[0], "jqxScrollBar").instance;
        if (this.isTouchDevice()) {
            if (!(a.jqx.browser.msie && a.jqx.browser.version < 9)) {
                var i = a("<div class='overlay' style='z-index: 99; -webkit-appearance: none; border: none; background: black; opacity: 0.01; outline: none; border: none; padding: 0px; overflow: hidden; margin: 0px; align:left; valign:top; left: 0px; top: 0px; position: absolute;'></div>");
                this.content.parent().append(i);
                this.overlayContent = this.host.find(".overlay")
            }
        }
        this._updateTouchScrolling();
        this.host.addClass("jqx-disableselect");
        if (this.host.jqxDragDrop) {
            jqxListBoxDragDrop()
        }
    }, _highlight: function (b, c) {
        var d = c.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
        return b.replace(new RegExp("(" + d + ")", "ig"), function (e, f) {
            return"<b>" + f + "</b>"
        })
    }, _addInput: function () {
        var b = this.host.attr("name");
        if (!b) {
            b = this.element.id
        } else {
            this.host.attr("name", "")
        }
        this.input = a("<input type='hidden'/>");
        this.host.append(this.input);
        this.input.attr("name", b)
    }, _updateTouchScrolling: function () {
        var b = this;
        if (this.isTouchDevice()) {
            b.enableHover = false;
            var c = this.overlayContent ? this.overlayContent : this.content;
            this.removeHandler(a(c), a.jqx.mobile.getTouchEventName("touchstart") + ".touchScroll");
            this.removeHandler(a(c), a.jqx.mobile.getTouchEventName("touchmove") + ".touchScroll");
            this.removeHandler(a(c), a.jqx.mobile.getTouchEventName("touchend") + ".touchScroll");
            this.removeHandler(a(c), "touchcancel.touchScroll");
            a.jqx.mobile.touchScroll(c, b.vScrollInstance.max, function (f, e) {
                if (b.vScrollBar.css("visibility") != "hidden") {
                    var d = b.vScrollInstance.value;
                    b.vScrollInstance.setPosition(d + e);
                    b._lastScroll = new Date()
                }
                if (b.hScrollBar.css("visibility") != "hidden") {
                    var d = b.hScrollInstance.value;
                    b.hScrollInstance.setPosition(d + f);
                    b._lastScroll = new Date()
                }
            }, this.element.id, this.hScrollBar, this.vScrollBar);
            if (b.vScrollBar.css("visibility") != "visible" && b.hScrollBar.css("visibility") != "visible") {
                a.jqx.mobile.setTouchScroll(false, this.element.id)
            } else {
                a.jqx.mobile.setTouchScroll(true, this.element.id)
            }
            this._arrange()
        }
    }, isTouchDevice: function () {
        var b = a.jqx.mobile.isTouchDevice();
        if (this.touchMode == true) {
            if (this.touchDevice) {
                return true
            }
            if (a.jqx.browser.msie && a.jqx.browser.version < 9) {
                return false
            }
            this.touchDevice = true;
            b = true;
            a.jqx.mobile.setMobileSimulator(this.element)
        } else {
            if (this.touchMode == false) {
                b = false
            }
        }
        if (b && this.touchModeStyle != false) {
            this.scrollBarSize = a.jqx.utilities.touchScrollBarSize
        }
        if (b) {
            this.host.addClass(this.toThemeProperty("jqx-touch"))
        }
        return b
    }, beginUpdate: function () {
        this.updatingListBox = true
    }, endUpdate: function () {
        this.updatingListBox = false;
        this._addItems();
        this._renderItems()
    }, beginUpdateLayout: function () {
        this.updating = true
    }, resumeUpdateLayout: function () {
        this.updating = false;
        this.vScrollInstance.value = 0;
        this._render(false)
    }, propertyChangedHandler: function (b, c, e, d) {
        if (this.isInitialized == undefined || this.isInitialized == false) {
            return
        }
        if (c == "itemHeight") {
            b.refresh()
        }
        if (c == "source" || c == "checkboxes") {
            if (d == null && e && e.unbindBindingUpdate) {
                e.unbindBindingUpdate(b.element.id);
                e.unbindDownloadComplete(b.element.id)
            }
            b.clearSelection();
            b.refresh()
        }
        if (c == "scrollBarSize" || c == "equalItemsWidth") {
            if (d != e) {
                b._updatescrollbars()
            }
        }
        if (c == "disabled") {
            b._renderItems();
            b.vScrollBar.jqxScrollBar({disabled: d});
            b.hScrollBar.jqxScrollBar({disabled: d})
        }
        if (c == "touchMode" || c == "rtl") {
            b._removeHandlers();
            b.vScrollBar.jqxScrollBar({touchMode: d});
            b.hScrollBar.jqxScrollBar({touchMode: d});
            if (c == "touchMode") {
                if (!(a.jqx.browser.msie && a.jqx.browser.version < 9)) {
                    var g = a("<div class='overlay' style='z-index: 99; -webkit-appearance: none; border: none; background: black; opacity: 0.01; outline: none; border: none; padding: 0px; overflow: hidden; margin: 0px; align:left; valign:top; left: 0px; top: 0px; position: absolute;'></div>");
                    b.content.parent().append(g);
                    b.overlayContent = b.host.find(".overlay")
                }
            }
            b._updateTouchScrolling();
            b._addHandlers();
            b._render(false)
        }
        if (!this.updating) {
            if (c == "width" || c == "height") {
                b._updateSize()
            }
        }
        if (c == "theme") {
            if (e != d) {
                b.hScrollBar.jqxScrollBar({theme: b.theme});
                b.vScrollBar.jqxScrollBar({theme: b.theme});
                b.host.removeClass();
                b.host.addClass(b.toThemeProperty("jqx-listbox"));
                b.host.addClass(b.toThemeProperty("jqx-widget"));
                b.host.addClass(b.toThemeProperty("jqx-widget-content"));
                b.host.addClass(b.toThemeProperty("jqx-reset"));
                b.host.addClass(b.toThemeProperty("jqx-rc-all"));
                b.refresh()
            }
        }
        if (c == "selectedIndex") {
            b.clearSelection();
            b.selectIndex(d, true)
        }
        if (c == "displayMember" || c == "valueMember") {
            if (e != d) {
                var f = b.selectedIndex;
                b.refresh();
                b.selectedIndex = f;
                b.selectedIndexes[f] = f
            }
            b._renderItems()
        }
        if (c == "autoHeight") {
            if (e != d) {
                b._render(false)
            } else {
                b._updatescrollbars();
                b._renderItems()
            }
        }
    }, loadFromSelect: function (i) {
        if (i == null) {
            return
        }
        var c = "#" + i;
        var f = a(c);
        if (f.length > 0) {
            var e = f.find("option");
            var b = f.find("optgroup");
            var d = 0;
            var h = -1;
            var g = new Array();
            a.each(e, function () {
                var k = b.find(this).length > 0;
                var m = null;
                if (this.text != this.value && (this.label == null || this.label == "")) {
                    this.label = this.text
                }
                var l = {disabled: this.disabled, value: this.value, label: this.label, title: this.title, originalItem: this};
                var j = a.jqx.browser.msie && a.jqx.browser.version < 8;
                if (j) {
                    if (l.value == "" && this.text != null && this.text.length > 0) {
                        l.value = this.text
                    }
                }
                if (k) {
                    m = b.find(this).parent()[0].label;
                    l.group = m
                }
                if (this.selected) {
                    h = d
                }
                g[d] = l;
                d++
            });
            this.source = g;
            this.fromSelect = true;
            this.clearSelection();
            this.selectedIndex = h;
            this.selectedIndexes[this.selectedIndex] = this.selectedIndex;
            this.refresh()
        }
    }, invalidate: function () {
        this._cachedItemHtml = [];
        this._renderItems();
        this.virtualSize = null;
        this._updateSize()
    }, refresh: function (c) {
        var b = this;
        if (this.vScrollBar == undefined) {
            return
        }
        this._cachedItemHtml = [];
        this.visibleItems = new Array();
        var d = function (e) {
            if (e == true) {
                if (b.selectedIndex != -1) {
                    var f = b.selectedIndex;
                    b.selectedIndex = -1;
                    b._stopEvents = true;
                    b.selectIndex(f, false, true);
                    if (b.selectedIndex == -1) {
                        b.selectedIndex = f
                    }
                    b._stopEvents = false
                }
            }
        };
        if (this.itemswrapper != null) {
            this.itemswrapper.remove();
            this.itemswrapper = null
        }
        if (a.jqx.dataAdapter && this.source != null && this.source._source) {
            this.databind(this.source);
            d(c);
            return
        }
        this.items = this.loadItems(this.source);
        this._raiseEvent("6");
        this._render(false, c == true);
        d(c)
    }, _render: function (c, b) {
        this._addItems();
        this._renderItems();
        this.vScrollInstance.setPosition(0);
        this._cachedItemHtml = new Array();
        if (c == undefined || c) {
            if (this.items != undefined && this.items != null) {
                if (this.selectedIndex >= 0 && this.selectedIndex < this.items.length) {
                    this.selectIndex(this.selectedIndex, true, true, true)
                }
            }
        }
        if (this.allowDrag && this._enableDragDrop) {
            this._enableDragDrop();
            if (this.isTouchDevice()) {
                this._removeHandlers();
                if (this.overlayContent) {
                    this.overlayContent.remove();
                    this.overlayContent = null
                }
                this._updateTouchScrolling();
                this._addHandlers();
                return
            }
        }
        this._updateTouchScrolling();
        if (this.rendered) {
            this.rendered()
        }
        if (this.ready) {
            this.ready()
        }
    }, _hitTest: function (c, f) {
        var e = parseInt(this.vScrollInstance.value);
        var b = this._searchFirstVisibleIndex(f + e, this.renderedVisibleItems);
        if (this.renderedVisibleItems[b] != undefined && this.renderedVisibleItems[b].isGroup) {
            return null
        }
        if (this.renderedVisibleItems.length > 0) {
            var d = this.renderedVisibleItems[this.renderedVisibleItems.length - 1];
            if (d.height + d.top < f + e) {
                return null
            }
        }
        b = this._searchFirstVisibleIndex(f + e);
        return this.visibleItems[b];
        return null
    }, _searchFirstVisibleIndex: function (e, f) {
        if (e == undefined) {
            e = parseInt(this.vScrollInstance.value)
        }
        var c = 0;
        if (f == undefined || f == null) {
            f = this.visibleItems
        }
        var b = f.length;
        while (c <= b) {
            mid = parseInt((c + b) / 2);
            var d = f[mid];
            if (d == undefined) {
                break
            }
            if (d.initialTop > e && d.initialTop + d.height > e) {
                b = mid - 1
            } else {
                if (d.initialTop < e && d.initialTop + d.height <= e) {
                    c = mid + 1
                } else {
                    return mid;
                    break
                }
            }
        }
        return 0
    }, _renderItems: function () {
        if (this.items == undefined || this.items.length == 0) {
            this.visibleItems = new Array();
            return
        }
        if (this.updatingListBox == true) {
            return
        }
        var N = this.isTouchDevice();
        var G = this.vScrollInstance;
        var h = this.hScrollInstance;
        var g = parseInt(G.value);
        var f = parseInt(h.value);
        if (this.rtl) {
            if (this.hScrollBar[0].style.visibility != "hidden") {
                f = h.max - f
            }
        }
        var A = this.items.length;
        var M = this.host.width();
        var K = parseInt(this.content[0].style.width);
        var b = K + parseInt(h.max);
        var p = parseInt(this.vScrollBar[0].style.width) + 2;
        if (this.vScrollBar[0].style.visibility == "hidden") {
            p = 0
        }
        if (this.hScrollBar[0].style.visibility != "visible") {
            b = K
        }
        var k = this._getVirtualItemsCount();
        var L = new Array();
        var E = 0;
        var D = parseInt(this.element.style.height) + 2;
        if (this.element.style.height.indexOf("%") != -1) {
            D = this.host.outerHeight()
        }
        if (isNaN(D)) {
            D = 0
        }
        var s = 0;
        var r = 0;
        var Q = 0;
        if (G.value == 0 || this.visibleItems.length == 0) {
            for (var q = 0; q < this.items.length; q++) {
                var w = this.items[q];
                if (w.visible) {
                    w.top = -g;
                    w.initialTop = -g;
                    if (!w.isGroup && w.visible) {
                        this.visibleItems[r++] = w;
                        w.visibleIndex = r - 1
                    }
                    this.renderedVisibleItems[Q++] = w;
                    w.left = -f;
                    var c = w.top + w.height;
                    if (c >= 0 && w.top - w.height <= D) {
                        L[E++] = {index: q, item: w}
                    }
                    g -= w.height
                }
            }
        }
        var l = g > 0 ? this._searchFirstVisibleIndex(this.vScrollInstance.value, this.renderedVisibleItems) : 0;
        var O = 0;
        E = 0;
        var x = this.vScrollInstance.value;
        var J = 0;
        while (O < 100 + D) {
            var w = this.renderedVisibleItems[l];
            if (w == undefined) {
                break
            }
            if (w.visible) {
                w.left = -f;
                var c = w.top + w.height - x;
                if (c >= 0 && w.initialTop - x - w.height <= 2 * D) {
                    L[E++] = {index: l, item: w}
                }
            }
            l++;
            if (w.visible) {
                O += w.initialTop - x + w.height - O
            }
            J++;
            if (J > this.items.length - 1) {
                break
            }
        }
        var n = this.toThemeProperty("jqx-listitem-state-normal") + " " + this.toThemeProperty("jqx-item");
        var i = this.toThemeProperty("jqx-listitem-state-group");
        var P = this.toThemeProperty("jqx-listitem-state-disabled") + " " + this.toThemeProperty("jqx-fill-state-disabled");
        var B = 0;
        var m = this;
        for (var q = 0; q < this.visualItems.length; q++) {
            var C = this.visualItems[q];
            var I = function () {
                var y = C[0].firstChild;
                if (m.checkboxes) {
                    y = C[0].lastChild
                }
                if (y != null) {
                    y.style.visibility = "hidden";
                    y.className = ""
                }
                if (m.checkboxes && m.host.jqxCheckBox) {
                    var R = C.find(".chkbox");
                    R.css({visibility: "hidden"})
                }
            };
            if (q < L.length) {
                var w = L[q].item;
                if (w.initialTop - x >= D) {
                    I();
                    continue
                }
                var z = a(C[0].firstChild);
                if (this.checkboxes) {
                    z = a(C[0].lastChild)
                }
                if (z.length == 0) {
                    continue
                }
                if (z[0] == null) {
                    continue
                }
                z[0].className = "";
                z[0].style.display = "block";
                z[0].style.visibility = "inherit";
                var o = "";
                if (!w.isGroup && !this.selectedIndexes[w.index] >= 0) {
                    o = n
                } else {
                    o = i
                }
                if (w.disabled || this.disabled) {
                    o += " " + P
                }
                if (this.roundedcorners) {
                    o += " " + this.toThemeProperty("jqx-rc-all")
                }
                if (N) {
                    o += " " + this.toThemeProperty("jqx-listitem-state-normal-touch")
                }
                z[0].className = o;
                if (this.renderer) {
                    if (!w.key) {
                        w.key = this.generatekey()
                    }
                    if (!this._cachedItemHtml) {
                        this._cachedItemHtml = new Array()
                    }
                    if (this._cachedItemHtml[w.key]) {
                        if (z[0].innerHTML != this._cachedItemHtml[w.key]) {
                            z[0].innerHTML = this._cachedItemHtml[w.key]
                        }
                    } else {
                        var v = this.renderer(w.index, w.label, w.value);
                        z[0].innerHTML = v;
                        this._cachedItemHtml[w.key] = z[0].innerHTML
                    }
                } else {
                    if (this.itemHeight !== -1) {
                        var j = 2 + 2 * parseInt(z.css("padding-top"));
                        z[0].style.lineHeight = (w.height - j) + "px";
                        z.css("vertical-align", "middle")
                    }
                    if (w.html != null && w.html.toString().length > 0) {
                        z[0].innerHTML = w.html
                    } else {
                        if (w.label != null || w.value != null) {
                            if (w.label != null) {
                                if (z[0].innerHTML !== w.label) {
                                    z[0].innerHTML = w.label
                                }
                                if (a.trim(w.label) == "") {
                                    z[0].innerHTML = this.emptyString;
                                    if (this.emptyString == "") {
                                        z[0].style.height = (w.height - 8) + "px"
                                    }
                                }
                                if (!this.incrementalSearch && !w.disabled) {
                                    if (this.searchString != undefined && this.searchString != "") {
                                        z[0].innerHTML = this._highlight(w.label, this.searchString)
                                    }
                                }
                            } else {
                                if (w.label === null) {
                                    z[0].innerHTML = this.emptyString;
                                    if (this.emptyString == "") {
                                        z[0].style.height = (w.height - 8) + "px"
                                    }
                                } else {
                                    if (z[0].innerHTML !== w.value) {
                                        z[0].innerHTML = w.value
                                    } else {
                                        if (w.label == "") {
                                            z[0].innerHTML = " "
                                        }
                                    }
                                }
                            }
                        } else {
                            if (w.label == "" || w.label == null) {
                                z[0].innerHTML = "";
                                z[0].style.height = (w.height - 8) + "px"
                            }
                        }
                    }
                }
                C[0].style.left = w.left + "px";
                C[0].style.top = w.initialTop - x + "px";
                w.element = z[0];
                if (w.title) {
                    z[0].title = w.title
                }
                if (this.equalItemsWidth && !w.isGroup) {
                    if (s == 0) {
                        var d = parseInt(b);
                        var u = parseInt(z.outerWidth()) - parseInt(z.width());
                        d -= u;
                        var H = 1;
                        if (H != null) {
                            H = parseInt(H)
                        } else {
                            H = 0
                        }
                        d -= 2 * H;
                        s = d;
                        if (this.checkboxes && this.host.jqxCheckBox && this.hScrollBar[0].style.visibility == "hidden") {
                            s -= 18
                        }
                    }
                    if (K > this.virtualSize.width) {
                        z[0].style.width = s + "px";
                        w.width = s
                    } else {
                        z[0].style.width = -4 + this.virtualSize.width + "px";
                        w.width = this.virtualSize.width - 4
                    }
                } else {
                    if (z.width() < this.host.width()) {
                        z.width(this.host.width() - 2)
                    }
                }
                if (this.rtl) {
                    z[0].style.textAlign = "right"
                }
                if (this.autoItemsHeight) {
                    z[0].style.whiteSpace = "normal";
                    z.width(s);
                    w.width = s
                }
                B = 0;
                if (this.checkboxes && this.host.jqxCheckBox && !w.isGroup) {
                    if (B == 0) {
                        B = (w.height - 16) / 2;
                        B++
                    }
                    var e = a(C.children()[0]);
                    e[0].item = w;
                    if (!this.rtl) {
                        if (z[0].style.left != "18px") {
                            z[0].style.left = "18px"
                        }
                    } else {
                        if (z[0].style.left != "0px") {
                            z[0].style.left = "0px"
                        }
                    }
                    if (this.rtl) {
                        e.css("left", 8 + w.width + "px")
                    }
                    e.css("top", B + "px");
                    e.css({display: "block", visibility: "inherit"});
                    var t = false;
                    if (e.data().jqxCheckBox) {
                        var F = e.data().jqxCheckBox.instance;
                        var t = F.checked
                    }
                    if (a.jqx.ariaEnabled) {
                        if (t) {
                            C[0].setAttribute("aria-selected", true)
                        } else {
                            C[0].removeAttribute("aria-selected")
                        }
                    }
                    if (F) {
                        if (t != w.checked) {
                            F._setState(w.checked);
                            if (w.disabled != F.disabled) {
                                e.jqxCheckBox({disabled: w.disabled})
                            }
                        } else {
                            if (w.disabled != F.disabled) {
                                e.jqxCheckBox({disabled: w.disabled})
                            }
                        }
                        if ((this.disabled || w.disabled) != F.disabled) {
                            e.jqxCheckBox({disabled: this.disabled || w.disabled})
                        }
                    }
                } else {
                    if (this.checkboxes && this.host.jqxCheckBox) {
                        var e = a(C.children()[0]);
                        e.css({display: "none", visibility: "inherit"})
                    }
                }
                if (this.selectedIndexes[w.visibleIndex] >= 0 && !w.disabled) {
                    z.addClass(this.toThemeProperty("jqx-listitem-state-selected"));
                    z.addClass(this.toThemeProperty("jqx-fill-state-pressed"));
                    if (a.jqx.ariaEnabled) {
                        C[0].setAttribute("aria-selected", true);
                        this._activeElement = C[0]
                    }
                } else {
                    if (!this.checkboxes) {
                        if (a.jqx.ariaEnabled) {
                            C[0].removeAttribute("aria-selected")
                        }
                    }
                }
            } else {
                I()
            }
        }
    }, generatekey: function () {
        var b = function () {
            return(((1 + Math.random()) * 65536) | 0).toString(16).substring(1)
        };
        return(b() + b() + "-" + b() + "-" + b() + "-" + b() + "-" + b() + b() + b())
    }, _calculateVirtualSize: function () {
        var o = 0;
        var m = 2;
        var g = 0;
        var n = a("<span></span>");
        if (this.equalItemsWidth) {
            n.css("float", "left")
        }
        var h = 0;
        var i = this.host.outerHeight();
        a(document.body).append(n);
        var e = this.items.length;
        var j = this.host.width();
        if (this.autoItemsHeight) {
            j -= 10;
            if (this.vScrollBar.css("visibility") != "hidden") {
                j -= 20
            }
        }
        if (this.autoItemsHeight || this.renderer || this.groups.length > 1 || (e > 0 && this.items[0].html != null && this.items[0].html != "")) {
            for (var g = 0; g < e; g++) {
                var r = this.items[g];
                if (r.isGroup && (r.label == "" && r.html == "")) {
                    continue
                }
                if (!r.visible) {
                    continue
                }
                var d = "";
                if (!r.isGroup) {
                    d += this.toThemeProperty("jqx-listitem-state-normal jqx-rc-all")
                } else {
                    d += this.toThemeProperty("jqx-listitem-state-group jqx-rc-all")
                }
                d += " " + this.toThemeProperty("jqx-fill-state-normal");
                if (this.isTouchDevice()) {
                    d += " " + this.toThemeProperty("jqx-touch")
                }
                n[0].className = d;
                if (this.autoItemsHeight) {
                    n[0].style.whiteSpace = "normal";
                    var b = this.checkboxes ? -20 : 0;
                    n[0].style.width = (b + j) + "px"
                }
                if (this.renderer) {
                    var k = this.renderer(r.index, r.label, r.value);
                    n[0].innerHTML = k
                } else {
                    if (r.html != null && r.html.toString().length > 0) {
                        n[0].innerHTML = r.html
                    } else {
                        if (r.label != null || r.value != null) {
                            if (r.label != null) {
                                n[0].innerHTML = r.label;
                                if (r.label == "") {
                                    n[0].innerHTML = "Empty"
                                }
                            } else {
                                n[0].innerHTML = r.value
                            }
                        }
                    }
                }
                var q = n.outerHeight();
                var s = n.outerWidth();
                if (this.itemHeight > -1) {
                    q = this.itemHeight
                }
                r.height = q;
                r.width = s;
                m += q;
                o = Math.max(o, s);
                if (m <= i) {
                    h++
                }
            }
        } else {
            var m = 0;
            var l = 0;
            var c = "";
            var t = 0;
            var f = 0;
            var p = -1;
            for (var g = 0; g < e; g++) {
                var r = this.items[g];
                if (r.isGroup && (r.label == "" && r.html == "")) {
                    continue
                }
                if (!r.visible) {
                    continue
                }
                p++;
                var d = "";
                if (p == 0) {
                    d += this.toThemeProperty("jqx-listitem-state-normal jqx-rc-all");
                    d += " " + this.toThemeProperty("jqx-fill-state-normal");
                    d += " " + this.toThemeProperty("jqx-widget");
                    d += " " + this.toThemeProperty("jqx-listbox");
                    d += " " + this.toThemeProperty("jqx-widget-content");
                    if (this.isTouchDevice()) {
                        d += " " + this.toThemeProperty("jqx-touch");
                        d += " " + this.toThemeProperty("jqx-listitem-state-normal-touch")
                    }
                    n[0].className = d;
                    if (this.autoItemsHeight) {
                        n[0].style.whiteSpace = "normal";
                        var b = this.checkboxes ? -20 : 0;
                        n[0].style.width = (b + j) + "px"
                    }
                    if (r.html == null || (r.label == "" || r.label == null)) {
                        n[0].innerHTML = "Item"
                    } else {
                        if (r.html != null && r.html.toString().length > 0) {
                            n[0].innerHTML = r.html
                        } else {
                            if (r.label != null || r.value != null) {
                                if (r.label != null) {
                                    if (r.label.match(new RegExp("\\w")) != null || r.label.match(new RegExp("\\d")) != null) {
                                        n[0].innerHTML = r.label
                                    } else {
                                        n[0].innerHTML = "Item"
                                    }
                                } else {
                                    n[0].innerHTML = r.value
                                }
                            }
                        }
                    }
                    var q = 1 + n.outerHeight();
                    if (this.itemHeight > -1) {
                        q = this.itemHeight
                    }
                    l = q
                }
                if (t != undefined) {
                    f = t
                }
                if (r.html != null && r.html.toString().length > 0) {
                    t = Math.max(t, r.html.toString().length);
                    if (f != t) {
                        c = r.html
                    }
                } else {
                    if (r.label != null) {
                        t = Math.max(t, r.label.length);
                        if (f != t) {
                            c = r.label
                        }
                    } else {
                        if (r.value != null) {
                            t = Math.max(t, r.value.length);
                            if (f != t) {
                                c = r.value
                            }
                        }
                    }
                }
                r.height = l;
                m += l;
                if (m <= i) {
                    h++
                }
            }
            n[0].innerHTML = c;
            o = n.outerWidth()
        }
        m += 2;
        if (h < 10) {
            h = 10
        }
        n.remove();
        return{width: o, height: m, itemsPerPage: h}
    }, _getVirtualItemsCount: function () {
        if (this.virtualItemsCount == 0) {
            var b = parseInt(this.host.height()) / 5;
            if (b > this.items.length) {
                b = this.items.length
            }
            return b
        } else {
            return this.virtualItemsCount
        }
    }, _addItems: function (l) {
        if (this.updatingListBox == true) {
            return
        }
        if (this.items == undefined || this.items.length == 0) {
            this.virtualSize = {width: 0, height: 0, itemsPerPage: 0};
            this._updatescrollbars();
            this.renderedVisibleItems = new Array();
            if (this.itemswrapper) {
                this.itemswrapper.children().remove()
            }
            return
        }
        if (l == false) {
            var o = this._calculateVirtualSize();
            var p = o.itemsPerPage * 2;
            if (this.autoHeight) {
                p = this.items.length
            }
            this.virtualItemsCount = Math.min(p, this.items.length);
            var j = this;
            var i = o.width;
            this.virtualSize = o;
            this._updatescrollbars();
            return
        }
        var r = this;
        var k = 0;
        this.visibleItems = new Array();
        this.renderedVisibleItems = new Array();
        this._removeHandlers();
        if (this.allowDrag && this._enableDragDrop) {
            this.itemswrapper = null
        }
        if (this.itemswrapper == null) {
            this.content[0].innerHTML = "";
            this.itemswrapper = a('<div style="outline: 0 none; overflow:hidden; width:100%; position: relative;"></div>');
            this.itemswrapper.height(2 * this.host.height());
            this.content.append(this.itemswrapper)
        }
        var o = this._calculateVirtualSize();
        var p = o.itemsPerPage * 2;
        if (this.autoHeight) {
            p = this.items.length
        }
        this.virtualItemsCount = Math.min(p, this.items.length);
        var j = this;
        var i = o.width;
        this.virtualSize = o;
        this.itemswrapper.width(Math.max(this.host.width(), 17 + o.width));
        var m = 0;
        var g = "";
        for (var n = m; n < this.virtualItemsCount; n++) {
            var q = this.items[n];
            var b = "listitem" + n + this.element.id;
            g += "<div role='option' id='" + b + "' class='jqx-listitem-element'>";
            if (this.checkboxes && this.host.jqxCheckBox) {
                g += '<div style="background-color: transparent; padding: 0; margin: 0; position: absolute; float: left; width: 16px; height: 16px;" class="chkbox"></div>'
            }
            g += "<span style='-ms-touch-action: none;'></span></div>"
        }
        if (r.WinJS) {
            MSApp.execUnsafeLocalFunction(function () {
                WinJS.Utilities.setInnerHTMLUnsafe(this.itemswrapper[0], g)
            })
        } else {
            this.itemswrapper[0].innerHTML = g
        }
        var d = this.itemswrapper.children();
        for (var n = m; n < this.virtualItemsCount; n++) {
            var q = this.items[n];
            var c = a(d[n]);
            if (this.allowDrag && this._enableDragDrop) {
                c.addClass("draggable")
            }
            if (this.checkboxes && this.host.jqxCheckBox) {
                var h = a(c.children()[0]);
                c.css("float", "left");
                var e = a(c[0].firstChild);
                e.css("float", "left");
                h.jqxCheckBox({locked: true, disabledContainer: true, hasInput: false, checked: q.checked, animationShowDelay: 0, animationHideDelay: 0, disabled: q.disabled, enableContainerClick: false, keyboardCheck: false, hasThreeStates: this.hasThreeStates, theme: this.theme});
                q.checkBoxElement = h[0];
                q.checkBoxInstance = h.data().jqxCheckBox.instance;
                var f = function (v, u) {
                    var s = v.owner.element.item;
                    if (s != null) {
                        var t = v.args;
                        if (u) {
                            j.checkIndex(s.index, true)
                        } else {
                            if (s.checked == false) {
                                j.uncheckIndex(s.index, true)
                            } else {
                                if (s.hasThreeStates && j.hasThreeStates) {
                                    if (u == false) {
                                        j.uncheckIndex(s.index, true)
                                    } else {
                                        j.indeterminateIndex(s.index, true)
                                    }
                                } else {
                                    j.uncheckIndex(s.index, true)
                                }
                            }
                        }
                    }
                    j.focused = true
                };
                q.checkBoxInstance.updated = f
            }
            c[0].style.height = q.height + "px";
            c[0].style.top = k + "px";
            k += q.height;
            this.visualItems[n] = c
        }
        this._addHandlers();
        this._updatescrollbars();
        if (this.autoItemsHeight) {
            var o = this._calculateVirtualSize();
            var p = o.itemsPerPage * 2;
            if (this.autoHeight) {
                p = this.items.length
            }
            this.virtualItemsCount = Math.min(p, this.items.length);
            var j = this;
            var i = o.width;
            this.virtualSize = o;
            this._updatescrollbars()
        }
        if (a.jqx.browser.msie && a.jqx.browser.version < 8) {
            this.host.attr("hideFocus", true);
            this.host.find("div").attr("hideFocus", true)
        }
    }, _updatescrollbars: function () {
        if (!this.virtualSize) {
            return
        }
        var l = this.virtualSize.height;
        var j = this.virtualSize.width;
        var f = this.vScrollInstance;
        var e = this.hScrollInstance;
        this._arrange(false);
        var k = false;
        var m = this.host.outerWidth();
        if (l > this.host.outerHeight()) {
            var b = 0;
            if (j > m) {
                b = this.hScrollBar.outerHeight() + 2
            }
            var d = f.max;
            f.max = 2 + parseInt(l) + b - parseInt(this.host.height());
            if (this.vScrollBar[0].style.visibility != "inherit") {
                this.vScrollBar[0].style.visibility = "inherit";
                k = true
            }
            if (d != f.max) {
                f._arrange()
            }
        } else {
            if (this.vScrollBar[0].style.visibility != "hidden") {
                this.vScrollBar[0].style.visibility = "hidden";
                k = true;
                f.setPosition(0)
            }
        }
        var h = 0;
        if (this.vScrollBar[0].style.visibility != "hidden") {
            h = this.scrollBarSize + 6
        }
        var g = this.checkboxes ? 20 : 0;
        if (this.autoItemsHeight) {
            this.hScrollBar[0].style.visibility = "hidden"
        } else {
            if (j >= m - h - g) {
                var i = e.max;
                if (this.vScrollBar[0].style.visibility == "inherit") {
                    e.max = g + h + parseInt(j) - this.host.width() + 4
                } else {
                    e.max = g + parseInt(j) - this.host.width() + 6
                }
                if (this.hScrollBar[0].style.visibility != "inherit") {
                    this.hScrollBar[0].style.visibility = "inherit";
                    k = true
                }
                if (i != e.max) {
                    e._arrange()
                }
                if (this.vScrollBar[0].style.visibility == "inherit") {
                    f.max = 2 + parseInt(l) + this.hScrollBar.outerHeight() + 2 - parseInt(this.host.height())
                }
            } else {
                if (this.hScrollBar[0].style.visibility != "hidden") {
                    this.hScrollBar[0].style.visibility = "hidden";
                    k = true
                }
            }
        }
        e.setPosition(0);
        if (k) {
            this._arrange()
        }
        if (this.itemswrapper) {
            this.itemswrapper.width(Math.max(this.host.width(), 17 + j));
            this.itemswrapper.height(2 * this.host.height())
        }
        var c = this.isTouchDevice();
        if (c) {
            if (this.vScrollBar.css("visibility") != "visible" && this.hScrollBar.css("visibility") != "visible") {
                a.jqx.mobile.setTouchScroll(false, this.element.id)
            } else {
                a.jqx.mobile.setTouchScroll(true, this.element.id)
            }
        }
    }, clear: function () {
        this.source = null;
        this.clearSelection();
        this.refresh()
    }, clearSelection: function (b) {
        for (var c = 0; c < this.selectedIndexes.length; c++) {
            if (this.selectedIndexes[c] && this.selectedIndexes[c] != -1) {
                this._raiseEvent("1", {index: c, type: "api", item: this.getVisibleItem(c), originalEvent: null})
            }
            this.selectedIndexes[c] = -1
        }
        this.selectedIndex = -1;
        if (b != false) {
            this._renderItems()
        }
    }, unselectIndex: function (b, c) {
        if (isNaN(b)) {
            return
        }
        this.selectedIndexes[b] = -1;
        var e = false;
        for (var d = 0; d < this.selectedIndexes.length; d++) {
            var b = this.selectedIndexes[d];
            if (b != -1 && b != undefined) {
                e = true
            }
        }
        if (!e) {
            this.selectedValue = null;
            this.selectedIndex = -1
        }
        if (c == undefined || c == true) {
            this._renderItems();
            this._raiseEvent("1", {index: b, type: "api", item: this.getVisibleItem(b), originalEvent: null})
        }
        this._updateInputSelection();
        this._raiseEvent("2", {index: b, type: "api", item: this.getItem(b)})
    }, getItem: function (c) {
        if (c == -1 || isNaN(c) || typeof (c) === "string") {
            if (c === -1) {
                return null
            }
            return this.getItemByValue(c)
        }
        var b = null;
        var d = a.each(this.items, function () {
            if (this.index == c) {
                b = this;
                return false
            }
        });
        return b
    }, getVisibleItem: function (b) {
        if (b == -1 || isNaN(b) || typeof (b) === "string") {
            if (b === -1) {
                return null
            }
            return this.getItemByValue(b)
        }
        return this.visibleItems[b]
    }, getVisibleItems: function () {
        return this.visibleItems
    }, checkIndex: function (b, c, e) {
        if (!this.checkboxes || !this.host.jqxCheckBox) {
            return
        }
        if (isNaN(b)) {
            return
        }
        if (b < 0 || b >= this.visibleItems.length) {
            return
        }
        if (this.visibleItems[b] != null && this.visibleItems[b].disabled) {
            return
        }
        if (this.disabled) {
            return
        }
        var d = this.getItem(b);
        if (this.groups.length > 0) {
            var d = this.getVisibleItem(b)
        }
        if (d != null) {
            var f = a(d.checkBoxElement);
            d.checked = true;
            if (c == undefined || c == true) {
                this._updateCheckedItems()
            }
        }
        if (e == undefined || e == true) {
            this._raiseEvent(3, {label: d.label, value: d.value, checked: true, item: d})
        }
    }, getCheckedItems: function () {
        if (!this.checkboxes || !this.host.jqxCheckBox) {
            return null
        }
        var b = new Array();
        if (this.items == undefined) {
            return
        }
        a.each(this.items, function () {
            if (this.checked) {
                b[b.length] = this
            }
        });
        return b
    }, checkAll: function (b) {
        if (!this.checkboxes || !this.host.jqxCheckBox) {
            return
        }
        if (this.disabled) {
            return
        }
        var c = this;
        a.each(this.items, function () {
            var d = this;
            if (b !== false && d.checked !== true) {
                c._raiseEvent(3, {label: d.label, value: d.value, checked: true, item: d})
            }
            this.checked = true
        });
        this._updateCheckedItems()
    }, uncheckAll: function (b) {
        if (!this.checkboxes || !this.host.jqxCheckBox) {
            return
        }
        if (this.disabled) {
            return
        }
        var c = this;
        a.each(this.items, function () {
            var d = this;
            if (b !== false && d.checked !== false) {
                this.checked = false;
                c._raiseEvent(3, {label: d.label, value: d.value, checked: false, item: d})
            }
            this.checked = false
        });
        this._updateCheckedItems()
    }, uncheckIndex: function (b, c, e) {
        if (!this.checkboxes || !this.host.jqxCheckBox) {
            return
        }
        if (isNaN(b)) {
            return
        }
        if (b < 0 || b >= this.visibleItems.length) {
            return
        }
        if (this.visibleItems[b] != null && this.visibleItems[b].disabled) {
            return
        }
        if (this.disabled) {
            return
        }
        var d = this.getItem(b);
        if (this.groups.length > 0) {
            var d = this.getVisibleItem(b)
        }
        if (d != null) {
            var f = a(d.checkBoxElement);
            d.checked = false;
            if (c == undefined || c == true) {
                this._updateCheckedItems()
            }
        }
        if (e == undefined || e == true) {
            this._raiseEvent(3, {label: d.label, value: d.value, checked: false, item: d})
        }
    }, indeterminateIndex: function (b, c, e) {
        if (!this.checkboxes || !this.host.jqxCheckBox) {
            return
        }
        if (isNaN(b)) {
            return
        }
        if (b < 0 || b >= this.visibleItems.length) {
            return
        }
        if (this.visibleItems[b] != null && this.visibleItems[b].disabled) {
            return
        }
        if (this.disabled) {
            return
        }
        var d = this.getItem(b);
        if (this.groups.length > 0) {
            var d = this.getVisibleItem(b)
        }
        if (d != null) {
            var f = a(d.checkBoxElement);
            d.checked = null;
            if (c == undefined || c == true) {
                this._updateCheckedItems()
            }
        }
        if (e == undefined || e == true) {
            this._raiseEvent(3, {checked: null})
        }
    }, getSelectedIndex: function () {
        return this.selectedIndex
    }, getSelectedItems: function () {
        var b = this.getVisibleItems();
        var e = this.selectedIndexes;
        var d = [];
        for (var c in e) {
            if (e[c] != -1) {
                d[d.length] = b[c]
            }
        }
        return d
    }, getSelectedItem: function () {
        return this.getItem(this.selectedIndex)
    }, _updateCheckedItems: function () {
        var b = this.selectedIndex;
        this.clearSelection(false);
        var c = this.getCheckedItems();
        this.selectedIndex = b;
        this._renderItems();
        var d = a.data(this.element, "hoveredItem");
        if (d != null) {
            a(d).addClass(this.toThemeProperty("jqx-listitem-state-hover"));
            a(d).addClass(this.toThemeProperty("jqx-fill-state-hover"))
        }
        this._updateInputSelection()
    }, getItemByValue: function (d) {
        if (this.visibleItems == null) {
            return
        }
        if (this.itemsByValue) {
            return this.itemsByValue[a.trim(d).split(" ").join("")]
        }
        var b = this.visibleItems;
        for (var c = 0; c < b.length; c++) {
            if (b[c].value == d) {
                return b[c];
                break
            }
        }
    }, checkItem: function (c) {
        if (c != null) {
            var b = this._getItemByParam(c);
            return this.checkIndex(b.index, true)
        }
        return false
    }, uncheckItem: function (c) {
        if (c != null) {
            var b = this._getItemByParam(c);
            return this.uncheckIndex(b.index, true)
        }
        return false
    }, indeterminateItem: function (c) {
        if (c != null) {
            var b = this._getItemByParam(c);
            return this.indeterminateIndex(b.index, true)
        }
        return false
    }, val: function (c) {
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
    }, selectItem: function (c) {
        if (c != null) {
            if (c.index == undefined) {
                var b = this.getItemByValue(c);
                if (b) {
                    c = b
                }
            }
            return this.selectIndex(c.visibleIndex, true)
        }
        return false
    }, unselectItem: function (c) {
        if (c != null) {
            if (c.index == undefined) {
                var b = this.getItemByValue(c);
                if (b) {
                    c = b
                }
            }
            return this.unselectIndex(c.visibleIndex, true)
        }
        return false
    }, selectIndex: function (j, q, c, d, m, b) {
        if (isNaN(j)) {
            return
        }
        if (j < -1 || j >= this.visibleItems.length) {
            return
        }
        if (this.visibleItems[j] != null && this.visibleItems[j].disabled) {
            return
        }
        if (this.disabled) {
            return
        }
        if (!this.multiple && !this.multipleextended && this.selectedIndex == j && !d) {
            if (this.visibleItems && this.items && this.visibleItems.length != this.items.length) {
                h = this.getVisibleItem(j);
                if (h) {
                    this.selectedValue = h.value
                }
            }
            return
        }
        if (this.checkboxes) {
            this._updateCheckedItems();
            return
        }
        this.focused = true;
        var p = false;
        if (this.selectedIndex != j) {
            p = true
        }
        var o = this.selectedIndex;
        if (this.selectedIndex == j && !this.multiple) {
            o = -1
        }
        if (m == undefined) {
            m = "none"
        }
        var h = this.getItem(j);
        var r = this.getItem(o);
        if (this.visibleItems && this.items && this.visibleItems.length != this.items.length) {
            h = this.getVisibleItem(j);
            r = this.getVisibleItem(o)
        }
        if (d != undefined && d) {
            this._raiseEvent("1", {index: o, type: m, item: r, originalEvent: b});
            this.selectedIndex = j;
            this.selectedIndexes[o] = -1;
            this.selectedIndexes[j] = j;
            if (h) {
                this.selectedValue = h.value
            }
            this._raiseEvent("0", {index: j, type: m, item: h, originalEvent: b})
        } else {
            var l = this;
            var e = function (s, w, u, v, t, i) {
                l._raiseEvent("1", {index: w, type: u, item: v, originalEvent: i});
                l.selectedIndex = s;
                l.selectedIndexes[w] = -1;
                w = s;
                l.selectedIndexes[s] = s;
                l._raiseEvent("0", {index: s, type: u, item: t, originalEvent: i})
            };
            var k = function (s, w, u, v, t, i) {
                if (l.selectedIndexes[s] == undefined || l.selectedIndexes[s] == -1) {
                    l.selectedIndexes[s] = s;
                    l.selectedIndex = s;
                    l._raiseEvent("0", {index: s, type: u, item: t, originalEvent: i})
                } else {
                    w = l.selectedIndexes[s];
                    v = l.getVisibleItem(w);
                    l.selectedIndexes[s] = -1;
                    l.selectedIndex = -1;
                    l._raiseEvent("1", {index: w, type: u, item: v, originalEvent: i})
                }
            };
            if (this.multipleextended) {
                if (!this._shiftKey && !this._ctrlKey) {
                    if (m != "keyboard" && m != "mouse") {
                        k(j, o, m, r, h, b);
                        l._clickedIndex = j
                    } else {
                        this.clearSelection(false);
                        l._clickedIndex = j;
                        e(j, o, m, r, h, b)
                    }
                } else {
                    if (this._ctrlKey) {
                        if (m == "keyboard") {
                            this.clearSelection(false);
                            l._clickedIndex = j
                        }
                        k(j, o, m, r, h, b)
                    } else {
                        if (this._shiftKey) {
                            if (l._clickedIndex == undefined) {
                                l._clickedIndex = o
                            }
                            var f = Math.min(l._clickedIndex, j);
                            var n = Math.max(l._clickedIndex, j);
                            this.clearSelection(false);
                            for (var g = f; g <= n; g++) {
                                l.selectedIndexes[g] = g;
                                l._raiseEvent("0", {index: g, type: m, item: this.getVisibleItem(g), originalEvent: b})
                            }
                            if (m != "keyboard") {
                                l.selectedIndex = l._clickedIndex
                            } else {
                                l.selectedIndex = j
                            }
                        }
                    }
                }
            } else {
                if (this.multiple) {
                    k(j, o, m, r, h, b)
                } else {
                    if (h) {
                        this.selectedValue = h.value
                    }
                    e(j, o, m, r, h, b)
                }
            }
        }
        if (c == undefined || c == true) {
            this._renderItems()
        }
        if (q != undefined && q != null && q == true) {
            this.ensureVisible(j)
        }
        this._raiseEvent("2", {index: j, item: h, oldItem: r, type: m});
        this._updateInputSelection();
        return p
    }, _updateInputSelection: function () {
        if (this.input) {
            if (this.selectedIndex == -1) {
                this.input.val("")
            } else {
                if (this.items) {
                    if (this.items[this.selectedIndex] != undefined) {
                        this.input.val(this.items[this.selectedIndex].value)
                    }
                }
            }
            if (this.multiple || this.multipleextended || this.checkboxes) {
                var b = !this.checkboxes ? this.getSelectedItems() : this.getCheckedItems();
                var d = "";
                if (b) {
                    for (var c = 0; c < b.length; c++) {
                        if (undefined != b[c]) {
                            if (c == b.length - 1) {
                                d += b[c].value
                            } else {
                                d += b[c].value + ","
                            }
                        }
                    }
                    this.input.val(d)
                }
            }
        }
    }, isIndexInView: function (c) {
        if (isNaN(c)) {
            return false
        }
        if (!this.items) {
            return false
        }
        if (c < 0 || c >= this.items.length) {
            return false
        }
        var d = this.vScrollInstance.value;
        var e = this.visibleItems[c];
        if (e == undefined) {
            return true
        }
        var b = e.initialTop;
        var f = e.height;
        if (b - d < 0 || b - d + f >= this.host.outerHeight()) {
            return false
        }
        return true
    }, _itemsInPage: function () {
        var b = 0;
        var c = this;
        if (this.items) {
            a.each(this.items, function () {
                if ((this.initialTop + this.height) >= c.content.height()) {
                    return false
                }
                b++
            })
        }
        return b
    }, _firstItemIndex: function () {
        if (this.visibleItems != null) {
            if (this.visibleItems[0]) {
                if (this.visibleItems[0].isGroup) {
                    return this._nextItemIndex(0)
                } else {
                    return 0
                }
            } else {
                return 0
            }
        }
        return -1
    }, _lastItemIndex: function () {
        if (this.visibleItems != null) {
            if (this.visibleItems[this.visibleItems.length - 1]) {
                if (this.visibleItems[this.visibleItems.length - 1].isGroup) {
                    return this._prevItemIndex(this.visibleItems.length - 1)
                } else {
                    return this.visibleItems.length - 1
                }
            } else {
                return this.visibleItems.length - 1
            }
        }
        return -1
    }, _nextItemIndex: function (b) {
        for (indx = b + 1; indx < this.visibleItems.length; indx++) {
            if (this.visibleItems[indx]) {
                if (!this.visibleItems[indx].disabled && !this.visibleItems[indx].isGroup) {
                    return indx
                }
            }
        }
        return -1
    }, _prevItemIndex: function (b) {
        for (indx = b - 1; indx >= 0; indx--) {
            if (this.visibleItems[indx]) {
                if (!this.visibleItems[indx].disabled && !this.visibleItems[indx].isGroup) {
                    return indx
                }
            }
        }
        return -1
    }, _getMatches: function (g, d) {
        if (g == undefined || g.length == 0) {
            return -1
        }
        if (d == undefined) {
            d = 0
        }
        var b = this.getItems();
        var f = this;
        var c = -1;
        var e = 0;
        a.each(b, function (h) {
            var k = "";
            if (!this.isGroup) {
                if (this.label) {
                    k = this.label.toString()
                } else {
                    if (this.value) {
                        k = this.value.toString()
                    } else {
                        if (this.title) {
                            k = this.title.toString()
                        } else {
                            k = "jqxItem"
                        }
                    }
                }
                var j = false;
                switch (f.searchMode) {
                    case"containsignorecase":
                        j = a.jqx.string.containsIgnoreCase(k, g);
                        break;
                    case"contains":
                        j = a.jqx.string.contains(k, g);
                        break;
                    case"equals":
                        j = a.jqx.string.equals(k, g);
                        break;
                    case"equalsignorecase":
                        j = a.jqx.string.equalsIgnoreCase(k, g);
                        break;
                    case"startswith":
                        j = a.jqx.string.startsWith(k, g);
                        break;
                    case"startswithignorecase":
                        j = a.jqx.string.startsWithIgnoreCase(k, g);
                        break;
                    case"endswith":
                        j = a.jqx.string.endsWith(k, g);
                        break;
                    case"endswithignorecase":
                        j = a.jqx.string.endsWithIgnoreCase(k, g);
                        break
                }
                if (j && this.visibleIndex >= d) {
                    c = this.visibleIndex;
                    return false
                }
            }
        });
        return c
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
    }, _handleKeyDown: function (n) {
        var s = n.keyCode;
        var k = this;
        var g = k.selectedIndex;
        var d = k.selectedIndex;
        var l = false;
        if (!this.keyboardNavigation || !this.enableSelection) {
            return
        }
        var j = function () {
            if (k.multiple) {
                k.clearSelection(false)
            }
        };
        if (n.altKey) {
            s = -1
        }
        if (k.incrementalSearch) {
            var o = -1;
            if (!k._searchString) {
                k._searchString = ""
            }
            if ((s == 8 || s == 46) && k._searchString.length >= 1) {
                k._searchString = k._searchString.substr(0, k._searchString.length - 1)
            }
            var r = String.fromCharCode(s);
            var m = (!isNaN(parseInt(r)));
            var i = false;
            if ((s >= 65 && s <= 97) || m || s == 8 || s == 32 || s == 46) {
                if (!n.shiftKey) {
                    r = r.toLocaleLowerCase()
                }
                var e = 1 + k.selectedIndex;
                if (s != 8 && s != 32 && s != 46) {
                    if (k._searchString.length > 0 && k._searchString.substr(0, 1) == r) {
                        e = 1 + k.selectedIndex
                    } else {
                        k._searchString += r
                    }
                }
                if (s == 32) {
                    k._searchString += " "
                }
                var b = this._getMatches(k._searchString, e);
                o = b;
                if (o == k._lastMatchIndex || o == -1) {
                    var b = this._getMatches(k._searchString, 0);
                    o = b
                }
                k._lastMatchIndex = o;
                if (o >= 0) {
                    var h = function () {
                        j();
                        k.selectIndex(o, false, false, false, "keyboard", n);
                        var t = k.isIndexInView(o);
                        if (!t) {
                            k.ensureVisible(o)
                        } else {
                            k._renderItems()
                        }
                    };
                    if (k._toSelectTimer) {
                        clearTimeout(k._toSelectTimer)
                    }
                    k._toSelectTimer = setTimeout(function () {
                        h()
                    }, k.incrementalSearchKeyDownDelay)
                }
                i = true
            }
            if (k._searchTimer != undefined) {
                clearTimeout(k._searchTimer)
            }
            if (s == 27 || s == 13) {
                k._searchString = ""
            }
            k._searchTimer = setTimeout(function () {
                k._searchString = "";
                k._renderItems()
            }, k.incrementalSearchDelay);
            if (o >= 0) {
                return
            }
            if (i) {
                return false
            }
        }
        if (this.checkboxes) {
            return true
        }
        if (s == 33) {
            var p = k._itemsInPage();
            if (k.selectedIndex - p >= 0) {
                j();
                k.selectIndex(d - p, false, false, false, "keyboard", n)
            } else {
                j();
                k.selectIndex(k._firstItemIndex(), false, false, false, "keyboard", n)
            }
            k._searchString = ""
        }
        if (s == 32 && this.checkboxes) {
            var f = this.getItem(g);
            if (f != null) {
                k._updateItemCheck(f, g);
                n.preventDefault()
            }
            k._searchString = ""
        }
        if (s == 36) {
            j();
            k.selectIndex(k._firstItemIndex(), false, false, false, "keyboard", n);
            k._searchString = ""
        }
        if (s == 35) {
            j();
            k.selectIndex(k._lastItemIndex(), false, false, false, "keyboard", n);
            k._searchString = ""
        }
        if (s == 34) {
            var p = k._itemsInPage();
            if (k.selectedIndex + p < k.visibleItems.length) {
                j();
                k.selectIndex(d + p, false, false, false, "keyboard", n)
            } else {
                j();
                k.selectIndex(k._lastItemIndex(), false, false, false, "keyboard", n)
            }
            k._searchString = ""
        }
        if (s == 38) {
            k._searchString = "";
            if (k.selectedIndex > 0) {
                var c = k._prevItemIndex(k.selectedIndex);
                if (c != k.selectedIndex && c != -1) {
                    j();
                    k.selectIndex(c, false, false, false, "keyboard", n)
                } else {
                    return true
                }
            } else {
                return false
            }
        } else {
            if (s == 40) {
                k._searchString = "";
                if (k.selectedIndex + 1 < k.visibleItems.length) {
                    var c = k._nextItemIndex(k.selectedIndex);
                    if (c != k.selectedIndex && c != -1) {
                        j();
                        k.selectIndex(c, false, false, false, "keyboard", n)
                    } else {
                        return true
                    }
                } else {
                    return false
                }
            }
        }
        if (s == 35 || s == 36 || s == 38 || s == 40 || s == 34 || s == 33) {
            var q = k.isIndexInView(k.selectedIndex);
            if (!q) {
                k.ensureVisible(k.selectedIndex)
            } else {
                k._renderItems()
            }
            return false
        }
        return true
    }, _updateItemCheck: function (b, c) {
        if (b.checked == true) {
            b.checked = (b.hasThreeStates && this.hasThreeStates) ? null : false
        } else {
            b.checked = b.checked != null
        }
        switch (b.checked) {
            case true:
                this.checkIndex(c);
                break;
            case false:
                this.uncheckIndex(c);
                break;
            default:
                this.indeterminateIndex(c);
                break
        }
    }, wheel: function (d, c) {
        if (c.autoHeight || !c.enableMouseWheel) {
            d.returnValue = true;
            return true
        }
        if (c.disabled) {
            return true
        }
        var e = 0;
        if (!d) {
            d = window.event
        }
        if (d.originalEvent && d.originalEvent.wheelDelta) {
            d.wheelDelta = d.originalEvent.wheelDelta
        }
        if (d.wheelDelta) {
            e = d.wheelDelta / 120
        } else {
            if (d.detail) {
                e = -d.detail / 3
            }
        }
        if (e) {
            var b = c._handleDelta(e);
            if (b) {
                if (d.preventDefault) {
                    d.preventDefault()
                }
                if (d.originalEvent != null) {
                    d.originalEvent.mouseHandled = true
                }
                if (d.stopPropagation != undefined) {
                    d.stopPropagation()
                }
            }
            if (b) {
                b = false;
                d.returnValue = b;
                return b
            } else {
                return false
            }
        }
        if (d.preventDefault) {
            d.preventDefault()
        }
        d.returnValue = false
    }, _handleDelta: function (d) {
        var c = this.vScrollInstance.value;
        if (d < 0) {
            this.scrollDown()
        } else {
            this.scrollUp()
        }
        var b = this.vScrollInstance.value;
        if (c != b) {
            return true
        }
        return false
    }, focus: function () {
        try {
            this.focused = true;
            this.host.focus();
            var c = this;
            setTimeout(function () {
                c.host.focus()
            }, 10)
        } catch (b) {
        }
    }, _removeHandlers: function () {
        var b = this;
        this.removeHandler(a(document), "keydown.listbox" + this.element.id);
        this.removeHandler(a(document), "keyup.listbox" + this.element.id);
        this.removeHandler(this.vScrollBar, "valuechanged");
        this.removeHandler(this.hScrollBar, "valuechanged");
        if (this._mousewheelfunc) {
            this.removeHandler(this.host, "mousewheel", this._mousewheelfunc)
        } else {
            this.removeHandler(this.host, "mousewheel")
        }
        this.removeHandler(this.host, "keydown");
        this.removeHandler(this.content, "mouseleave");
        this.removeHandler(this.content, "focus");
        this.removeHandler(this.content, "blur");
        this.removeHandler(this.host, "focus");
        this.removeHandler(this.host, "blur");
        this.removeHandler(this.content, "mouseenter");
        this.removeHandler(this.content, "mouseup");
        this.removeHandler(this.content, "mousedown");
        this.removeHandler(this.content, "touchend");
        if (this._mousemovefunc) {
            this.removeHandler(this.content, "mousemove", this._mousemovefunc)
        } else {
            this.removeHandler(this.content, "mousemove")
        }
        this.removeHandler(this.content, "selectstart");
        if (this.overlayContent) {
            this.removeHandler(this.overlayContent, a.jqx.mobile.getTouchEventName("touchend"))
        }
    }, _updateSize: function () {
        if (!this.virtualSize) {
            this._oldheight = null;
            this.virtualSize = this._calculateVirtualSize()
        }
        var b = this;
        b._arrange();
        if (b.host.height() != b._oldheight || b.host.width() != b._oldwidth) {
            var c = b.host.width() != b._oldwidth;
            if (b.autoItemsHeight) {
                b._render(false)
            } else {
                if (b.items) {
                    if (b.items.length > 0 && b.virtualItemsCount * b.items[0].height < b._oldheight) {
                        b._render(false)
                    } else {
                        var d = b.vScrollInstance.value;
                        b._updatescrollbars();
                        b._renderItems();
                        if (d < b.vScrollInstance.max) {
                            b.vScrollInstance.setPosition(d)
                        } else {
                            b.vScrollInstance.setPosition(b.vScrollInstance.max)
                        }
                    }
                }
            }
            b._oldwidth = b.host.width();
            b._oldheight = b.host.height()
        }
    }, _addHandlers: function () {
        var j = this;
        this.focused = false;
        var k = false;
        var i = 0;
        var f = null;
        var i = 0;
        var b = 0;
        var g = new Date();
        var d = this.isTouchDevice();
        this.addHandler(this.vScrollBar, "valuechanged", function (l) {
            if (a.jqx.browser.msie && a.jqx.browser.version > 9) {
                setTimeout(function () {
                    j._renderItems()
                }, 1)
            } else {
                j._renderItems()
            }
        });
        this.addHandler(this.hScrollBar, "valuechanged", function () {
            j._renderItems()
        });
        if (this._mousewheelfunc) {
            this.removeHandler(this.host, "mousewheel", this._mousewheelfunc)
        }
        this._mousewheelfunc = function (l) {
            j.wheel(l, j)
        };
        this.addHandler(this.host, "mousewheel", this._mousewheelfunc);
        this.addHandler(a(document), "keydown.listbox" + this.element.id, function (l) {
            j._ctrlKey = l.ctrlKey;
            j._shiftKey = l.shiftKey
        });
        this.addHandler(a(document), "keyup.listbox" + this.element.id, function (l) {
            j._ctrlKey = l.ctrlKey;
            j._shiftKey = l.shiftKey
        });
        this.addHandler(this.host, "keydown", function (l) {
            return j._handleKeyDown(l)
        });
        this.addHandler(this.content, "mouseleave", function (l) {
            j.focused = false;
            var m = a.data(j.element, "hoveredItem");
            if (m != null) {
                a(m).removeClass(j.toThemeProperty("jqx-listitem-state-hover"));
                a(m).removeClass(j.toThemeProperty("jqx-fill-state-hover"));
                a.data(j.element, "hoveredItem", null)
            }
        });
        this.addHandler(this.content, "focus", function (l) {
            if (!j.disabled) {
                j.host.addClass(j.toThemeProperty("jqx-fill-state-focus"));
                j.focused = true
            }
        });
        this.addHandler(this.content, "blur", function (l) {
            j.focused = false;
            j.host.removeClass(j.toThemeProperty("jqx-fill-state-focus"))
        });
        this.addHandler(this.host, "focus", function (l) {
            if (!j.disabled) {
                j.host.addClass(j.toThemeProperty("jqx-fill-state-focus"));
                j.focused = true
            }
        });
        this.addHandler(this.host, "blur", function (l) {
            if (a.jqx.browser.msie && a.jqx.browser.version < 9 && j.focused) {
                return
            }
            j.host.removeClass(j.toThemeProperty("jqx-fill-state-focus"));
            j.focused = false
        });
        this.addHandler(this.content, "mouseenter", function (l) {
            j.focused = true
        });
        var c = a.jqx.utilities.hasTransform(this.host);
        if (this.enableSelection) {
            var e = j.isTouchDevice() && this.touchMode !== true;
            var h = !e ? "mousedown" : "touchend";
            if (this.overlayContent) {
                this.addHandler(this.overlayContent, a.jqx.mobile.getTouchEventName("touchend"), function (n) {
                    if (!j.enableSelection) {
                        return true
                    }
                    if (e) {
                        j._newScroll = new Date();
                        if (j._newScroll - j._lastScroll < 500) {
                            return true
                        }
                    }
                    var q = a.jqx.mobile.getTouches(n);
                    var r = q[0];
                    if (r != undefined) {
                        var l = j.host.offset();
                        var p = parseInt(r.pageX);
                        var o = parseInt(r.pageY);
                        if (j.touchMode == true) {
                            p = parseInt(r._pageX);
                            o = parseInt(r._pageY)
                        }
                        p = p - l.left;
                        o = o - l.top;
                        var m = j._hitTest(p, o);
                        if (m != null && !m.isGroup) {
                            j._newScroll = new Date();
                            if (j._newScroll - j._lastScroll < 500) {
                                return false
                            }
                            if (j.checkboxes) {
                                j._updateItemCheck(m, m.visibleIndex);
                                return
                            }
                            if (m.html.indexOf("href") != -1) {
                                setTimeout(function () {
                                    j.selectIndex(m.visibleIndex, false, true, false, "mouse", n);
                                    j.content.trigger("click")
                                }, 100)
                            } else {
                                j.selectIndex(m.visibleIndex, false, true, false, "mouse", n);
                                j.content.trigger("click")
                            }
                        }
                    }
                })
            } else {
                this.addHandler(this.content, h, function (l) {
                    if (!j.enableSelection) {
                        return true
                    }
                    if (e) {
                        j._newScroll = new Date();
                        if (j._newScroll - j._lastScroll < 500) {
                            return false
                        }
                    }
                    j.focused = true;
                    if (!j.isTouchDevice()) {
                        j.host.focus()
                    }
                    if (l.target.id != ("listBoxContent" + j.element.id) && j.itemswrapper[0] != l.target) {
                        var p = l.target;
                        var v = a(p).offset();
                        var o = j.host.offset();
                        if (c) {
                            var m = a.jqx.mobile.getLeftPos(p);
                            var r = a.jqx.mobile.getTopPos(p);
                            v.left = m;
                            v.top = r;
                            m = a.jqx.mobile.getLeftPos(j.element);
                            r = a.jqx.mobile.getTopPos(j.element);
                            o.left = m;
                            o.top = r
                        }
                        var q = parseInt(v.top) - parseInt(o.top);
                        var t = parseInt(v.left) - parseInt(o.left);
                        var u = j._hitTest(t, q);
                        if (u != null && !u.isGroup) {
                            var n = function (x, w) {
                                if (!j._shiftKey) {
                                    j._clickedIndex = x.visibleIndex
                                }
                                if (!j.checkboxes) {
                                    j.selectIndex(x.visibleIndex, false, true, false, "mouse", w)
                                } else {
                                    j.selectedIndex = x.visibleIndex;
                                    t = 20 + w.pageX - v.left;
                                    if (j.rtl) {
                                        var y = j.hScrollBar.css("visibility") != "hidden" ? j.hScrollInstance.max : j.host.width();
                                        if (t <= j.host.width() - 20) {
                                            j._updateItemCheck(x, x.visibleIndex)
                                        }
                                    } else {
                                        if (t + j.hScrollInstance.value >= 20) {
                                            j._updateItemCheck(x, x.visibleIndex)
                                        }
                                    }
                                }
                            };
                            if (!u.disabled) {
                                if (u.html.indexOf("href") != -1) {
                                    setTimeout(function () {
                                        n(u, l)
                                    }, 100)
                                } else {
                                    n(u, l)
                                }
                            }
                        }
                        if (h == "mousedown") {
                            var s = false;
                            if (l.which) {
                                s = (l.which == 3)
                            } else {
                                if (l.button) {
                                    s = (l.button == 2)
                                }
                            }
                            if (s) {
                                return true
                            }
                            return false
                        }
                    }
                    return true
                })
            }
            this.addHandler(this.content, "mouseup", function (l) {
                j.vScrollInstance.handlemouseup(j, l)
            });
            if (a.jqx.browser.msie) {
                this.addHandler(this.content, "selectstart", function (l) {
                    return false
                })
            }
        }
        var d = this.isTouchDevice();
        if (this.enableHover && !d) {
            this._mousemovefunc = function (l) {
                if (d) {
                    return true
                }
                if (!j.enableHover) {
                    return true
                }
                var n = a.jqx.browser.msie == true && a.jqx.browser.version < 9 ? 0 : 1;
                if (l.target == null) {
                    return true
                }
                if (j.disabled) {
                    return true
                }
                j.focused = true;
                var p = j.vScrollInstance.isScrolling();
                if (!p && l.target.id != ("listBoxContent" + j.element.id)) {
                    if (j.itemswrapper[0] != l.target) {
                        var r = l.target;
                        var z = a(r).offset();
                        var q = j.host.offset();
                        if (c) {
                            var m = a.jqx.mobile.getLeftPos(r);
                            var t = a.jqx.mobile.getTopPos(r);
                            z.left = m;
                            z.top = t;
                            m = a.jqx.mobile.getLeftPos(j.element);
                            t = a.jqx.mobile.getTopPos(j.element);
                            q.left = m;
                            q.top = t
                        }
                        var s = parseInt(z.top) - parseInt(q.top);
                        var u = parseInt(z.left) - parseInt(q.left);
                        var w = j._hitTest(u, s);
                        if (w != null && !w.isGroup && !w.disabled) {
                            var o = a.data(j.element, "hoveredItem");
                            if (o != null) {
                                a(o).removeClass(j.toThemeProperty("jqx-listitem-state-hover"));
                                a(o).removeClass(j.toThemeProperty("jqx-fill-state-hover"))
                            }
                            a.data(j.element, "hoveredItem", w.element);
                            var v = a(w.element);
                            v.addClass(j.toThemeProperty("jqx-listitem-state-hover"));
                            v.addClass(j.toThemeProperty("jqx-fill-state-hover"))
                        }
                    }
                }
            };
            this.addHandler(this.content, "mousemove", this._mousemovefunc)
        }
    }, _arrange: function (n) {
        if (n == undefined) {
            n = true
        }
        var c = null;
        var p = null;
        var k = this;
        var i = function (h) {
            h = k.host.height();
            if (h == 0) {
                h = 200;
                k.host.height(h)
            }
            return h
        };
        if (this.width != null && this.width.toString().indexOf("px") != -1) {
            c = this.width
        } else {
            if (this.width != undefined && !isNaN(this.width)) {
                c = this.width
            }
        }
        if (this.height != null && this.height.toString().indexOf("px") != -1) {
            p = this.height
        } else {
            if (this.height != undefined && !isNaN(this.height)) {
                p = this.height
            }
        }
        if (this.width != null && this.width.toString().indexOf("%") != -1) {
            this.host.css("width", this.width);
            c = this.host.width()
        }
        if (this.height != null && this.height.toString().indexOf("%") != -1) {
            this.host.css("height", this.height);
            p = i(p)
        }
        if (c != null) {
            c = parseInt(c);
            if (parseInt(this.element.style.width) != parseInt(this.width)) {
                this.host.width(this.width)
            }
        }
        if (!this.autoHeight) {
            if (p != null) {
                p = parseInt(p);
                if (parseInt(this.element.style.height) != parseInt(this.height)) {
                    this.host.height(this.height);
                    i(p)
                }
            }
        } else {
            if (this.virtualSize) {
                if (this.hScrollBar.css("visibility") != "hidden") {
                    this.host.height(this.virtualSize.height + parseInt(this.scrollBarSize) + 3);
                    this.height = this.virtualSize.height + parseInt(this.scrollBarSize) + 3;
                    p = this.height
                } else {
                    this.host.height(this.virtualSize.height);
                    this.height = this.virtualSize.height;
                    p = this.virtualSize.height
                }
            }
        }
        var b = this.scrollBarSize;
        if (isNaN(b)) {
            b = parseInt(b);
            if (isNaN(b)) {
                b = "17px"
            } else {
                b = b + "px"
            }
        }
        b = parseInt(b);
        var j = 4;
        var s = 2;
        var l = 0;
        if (this.vScrollBar) {
            if (this.vScrollBar[0].style.visibility != "hidden") {
                l = b + j
            } else {
                this.vScrollInstance.setPosition(0)
            }
        } else {
            return
        }
        if (this.hScrollBar) {
            if (this.hScrollBar[0].style.visibility != "hidden") {
                s = b + j
            } else {
                this.hScrollInstance.setPosition(0)
            }
        } else {
            return
        }
        if (this.autoItemsHeight) {
            this.hScrollBar[0].style.visibility = "hidden";
            s = 0
        }
        if (p == null) {
            p = 0
        }
        var r = parseInt(p) - j - b;
        if (r < 0) {
            r = 0
        }
        if (parseInt(this.hScrollBar[0].style.height) != b) {
            if (parseInt(b) < 0) {
                b = 0
            }
            this.hScrollBar[0].style.height = parseInt(b) + "px"
        }
        if (this.hScrollBar[0].style.top != r + "px") {
            this.hScrollBar[0].style.top = r + "px";
            this.hScrollBar[0].style.left = "0px"
        }
        var q = c - b - j;
        if (q < 0) {
            q = 0
        }
        var o = q + "px";
        if (this.hScrollBar[0].style.width != o) {
            this.hScrollBar[0].style.width = o
        }
        if (l == 0) {
            this.hScrollBar.width(c - 2)
        }
        if (b != parseInt(this.vScrollBar[0].style.width)) {
            this.vScrollBar.width(b)
        }
        if ((parseInt(p) - s) != parseInt(this.vScrollBar[0].style.height)) {
            this.vScrollBar.height(parseInt(p) - s + "px")
        }
        if (c == null) {
            c = 0
        }
        var d = parseInt(c) - parseInt(b) - j + "px";
        if (d != this.vScrollBar[0].style.left) {
            if (parseInt(d) >= 0) {
                this.vScrollBar[0].style.left = d
            }
            this.vScrollBar[0].style.top = "0px"
        }
        var f = this.vScrollInstance;
        f.disabled = this.disabled;
        if (n) {
            f._arrange()
        }
        var e = this.hScrollInstance;
        e.disabled = this.disabled;
        if (n) {
            e._arrange()
        }
        if ((this.vScrollBar[0].style.visibility != "hidden") && (this.hScrollBar[0].style.visibility != "hidden")) {
            this.bottomRight[0].style.visibility = "inherit";
            this.bottomRight.css({left: 1 + parseInt(this.vScrollBar[0].style.left), top: 1 + parseInt(this.hScrollBar[0].style.top)});
            if (this.rtl) {
                this.bottomRight.css({left: 0})
            }
            this.bottomRight.width(parseInt(b) + 3);
            this.bottomRight.height(parseInt(b) + 3)
        } else {
            this.bottomRight[0].style.visibility = "hidden"
        }
        if (parseInt(this.content[0].style.width) != (parseInt(c) - l)) {
            var m = parseInt(c) - l;
            if (m < 0) {
                m = 0
            }
            this.content[0].style.width = m + "px"
        }
        if (this.rtl) {
            this.vScrollBar.css({left: 0 + "px", top: "0px"});
            this.hScrollBar.css({left: this.vScrollBar.width() + 2 + "px"});
            if (this.vScrollBar[0].style.visibility != "hidden") {
                this.content.css("margin-left", 4 + this.vScrollBar.width())
            } else {
                this.content.css("margin-left", 0);
                this.hScrollBar.css({left: "0px"})
            }
        }
        if (parseInt(this.content[0].style.height) != (parseInt(p) - s)) {
            var g = parseInt(p) - s;
            if (g < 0) {
                g = 0
            }
            this.content[0].style.height = g + "px"
        }
        if (this.overlayContent) {
            this.overlayContent.width(parseInt(c) - l);
            this.overlayContent.height(parseInt(p) - s)
        }
    }, ensureVisible: function (e) {
        if (isNaN(e)) {
            var f = this.getItemByValue(e);
            if (f) {
                e = f.index
            }
        }
        var c = this.isIndexInView(e);
        if (!c) {
            if (e < 0) {
                return
            }
            if (this.autoHeight) {
                var b = a.data(this.vScrollBar[0], "jqxScrollBar").instance;
                b.setPosition(0)
            } else {
                for (indx = 0; indx < this.visibleItems.length; indx++) {
                    var f = this.visibleItems[indx];
                    if (f.visibleIndex == e && !f.isGroup) {
                        var b = a.data(this.vScrollBar[0], "jqxScrollBar").instance;
                        var g = b.value;
                        var d = this.hScrollBar.css("visibility") === "hidden";
                        var h = d ? 0 : this.scrollBarSize + 4;
                        if (f.initialTop < g) {
                            b.setPosition(f.initialTop)
                        } else {
                            if (f.initialTop + f.height > g + this.host.height()) {
                                b.setPosition(f.initialTop + f.height + 2 - this.host.height() + h)
                            }
                        }
                        break
                    }
                }
            }
        }
        this._renderItems()
    }, scrollTo: function (c, b) {
        if (this.vScrollBar.css("visibility") != "hidden") {
            this.vScrollInstance.setPosition(b)
        }
        if (this.hScrollBar.css("visibility") != "hidden") {
            this.hScrollInstance.setPosition(c)
        }
    }, scrollDown: function () {
        if (this.vScrollBar.css("visibility") == "hidden") {
            return false
        }
        var b = this.vScrollInstance;
        if (b.value + b.largestep <= b.max) {
            b.setPosition(b.value + b.largestep);
            return true
        } else {
            b.setPosition(b.max);
            return true
        }
        return false
    }, scrollUp: function () {
        if (this.vScrollBar.css("visibility") == "hidden") {
            return false
        }
        var b = this.vScrollInstance;
        if (b.value - b.largestep >= b.min) {
            b.setPosition(b.value - b.largestep);
            return true
        } else {
            if (b.value != b.min) {
                b.setPosition(b.min);
                return true
            }
        }
        return false
    }, databind: function (h) {
        this.records = new Array();
        var d = h._source ? true : false;
        var i = new a.jqx.dataAdapter(h, {autoBind: false});
        if (d) {
            i = h;
            h = h._source
        }
        var g = function (j) {
            if (h.type != undefined) {
                i._options.type = h.type
            }
            if (h.formatdata != undefined) {
                i._options.formatData = h.formatdata
            }
            if (h.contenttype != undefined) {
                i._options.contentType = h.contenttype
            }
            if (h.async != undefined) {
                i._options.async = h.async
            }
        };
        var c = function (o, p) {
            var r = function (s) {
                if (typeof s === "string") {
                    var u = s;
                    var v = s
                } else {
                    var v = s[o.valueMember];
                    var u = s[o.displayMember]
                }
                var t = new a.jqx._jqxListBox.item();
                t.label = u;
                t.value = v;
                t.html = "";
                t.visible = true;
                t.originalItem = s;
                t.group = "";
                t.groupHtml = "";
                t.disabled = false;
                t.hasThreeStates = true;
                return t
            };
            if (p != undefined) {
                var j = i._changedrecords[0];
                if (j) {
                    a.each(i._changedrecords, function () {
                        var s = this.index;
                        var t = this.record;
                        if (p != "remove") {
                            var u = r(t)
                        }
                        switch (p) {
                            case"update":
                                o.updateAt(u, s);
                                break;
                            case"add":
                                o.insertAt(u, s);
                                break;
                            case"remove":
                                o.removeAt(s);
                                break
                        }
                    });
                    return
                }
            }
            o.records = i.records;
            var l = o.records.length;
            o.items = new Array();
            o.itemsByValue = new Array();
            for (var k = 0; k < l; k++) {
                var m = o.records[k];
                var n = r(m);
                n.index = k;
                o.items[k] = n;
                var q = n.value;
                if (n.value == "" || n.value == null) {
                    q = k
                }
                o.itemsByValue[a.trim(q).split(" ").join("")] = n
            }
            o._render();
            o._raiseEvent("6")
        };
        g(this);
        var f = this;
        switch (h.datatype) {
            case"local":
            case"array":
            default:
                if (h.localdata != null) {
                    i.unbindBindingUpdate(this.element.id);
                    i.dataBind();
                    c(this);
                    i.bindBindingUpdate(this.element.id, function (j) {
                        c(f, j)
                    })
                }
                break;
            case"json":
            case"jsonp":
            case"xml":
            case"xhtml":
            case"script":
            case"text":
            case"csv":
            case"tab":
                if (h.localdata != null) {
                    i.unbindBindingUpdate(this.element.id);
                    i.dataBind();
                    c(this);
                    i.bindBindingUpdate(this.element.id, function () {
                        c(f)
                    });
                    return
                }
                var e = {};
                if (i._options.data) {
                    a.extend(i._options.data, e)
                } else {
                    if (h.data) {
                        a.extend(e, h.data)
                    }
                    i._options.data = e
                }
                var b = function () {
                    c(f)
                };
                i.unbindDownloadComplete(f.element.id);
                i.bindDownloadComplete(f.element.id, b);
                i.dataBind()
        }
    }, loadItems: function (m) {
        if (m == null) {
            this.groups = new Array();
            this.items = new Array();
            this.visualItems = new Array();
            return
        }
        var s = this;
        var k = 0;
        var d = 0;
        var b = 0;
        this.groups = new Array();
        this.items = new Array();
        this.visualItems = new Array();
        var e = new Array();
        this.itemsByValue = new Array();
        a.map(m, function (v) {
            if (v == undefined) {
                return null
            }
            var j = new a.jqx._jqxListBox.item();
            var w = v.group;
            var i = v.groupHtml;
            var x = v.title;
            if (x == null || x == undefined) {
                x = ""
            }
            if (w == null || w == undefined) {
                w = ""
            }
            if (i == null || i == undefined) {
                i = ""
            }
            if (!s.groups[w]) {
                s.groups[w] = {items: new Array(), index: -1, caption: w, captionHtml: i};
                k++;
                var t = k + "jqxGroup";
                s.groups[t] = s.groups[w];
                d++;
                s.groups.length = d
            }
            var u = s.groups[w];
            u.index++;
            u.items[u.index] = j;
            if (typeof v === "string") {
                j.label = v;
                j.value = v
            } else {
                if (v.label == null && v.value == null && v.html == null && v.group == null && v.groupHtml == null) {
                    j.label = v.toString();
                    j.value = v.toString()
                } else {
                    j.label = v.label || v.value;
                    j.value = v.value || v.label
                }
            }
            if (typeof v != "string") {
                if (s.displayMember != "") {
                    if (v[s.displayMember]) {
                        j.label = v[s.displayMember]
                    }
                }
                if (s.valueMember != "") {
                    j.value = v[s.valueMember]
                }
            }
            j.hasThreeStates = v.hasThreeStates != undefined ? v.hasThreeStates : true;
            j.originalItem = v;
            j.title = x;
            j.html = v.html || "";
            if (v.html && v.html != "") {
                if (x && x != "") {
                }
            }
            j.group = w;
            j.checked = v.checked || false;
            j.groupHtml = v.groupHtml || "";
            j.disabled = v.disabled || false;
            j.visible = v.visible != undefined ? v.visible : true;
            j.index = b;
            e[b] = j;
            b++;
            return j
        });
        var c = new Array();
        var o = 0;
        if (this.fromSelect == undefined || this.fromSelect == false) {
            for (var h = 0; h < d; h++) {
                var k = h + 1;
                var n = k + "jqxGroup";
                var q = this.groups[n];
                if (q == undefined || q == null) {
                    break
                }
                if (h == 0 && q.caption == "" && q.captionHtml == "" && d <= 1) {
                    for (var g = 0; g < q.items.length; g++) {
                        var p = q.items[g].value;
                        if (q.items[g].value == "" || q.items[g].value == null) {
                            p = g
                        }
                        this.itemsByValue[a.trim(p).split(" ").join("")] = q.items[g]
                    }
                    return q.items
                } else {
                    var l = new a.jqx._jqxListBox.item();
                    l.isGroup = true;
                    l.label = q.caption;
                    if (q.caption == "" && q.captionHtml == "") {
                        q.caption = this.emptyGroupText;
                        l.label = q.caption
                    }
                    l.html = q.captionHtml;
                    c[o] = l;
                    o++
                }
                for (var f = 0; f < q.items.length; f++) {
                    c[o] = q.items[f];
                    var p = q.items[f].value;
                    if (q.items[f].value == "" || q.items[f].value == null) {
                        p = o
                    }
                    s.itemsByValue[a.trim(p).split(" ").join("")] = q.items[f];
                    o++
                }
            }
        } else {
            var o = 0;
            var r = new Array();
            a.each(e, function () {
                if (!r[this.group]) {
                    if (this.group != "") {
                        var i = new a.jqx._jqxListBox.item();
                        i.isGroup = true;
                        i.label = this.group;
                        c[o] = i;
                        o++;
                        r[this.group] = true
                    }
                }
                c[o] = this;
                var j = this.value;
                if (this.value == "" || this.value == null) {
                    j = o - 1
                }
                s.itemsByValue[a.trim(j).split(" ").join("")] = this;
                o++
            })
        }
        return c
    }, _mapItem: function (c) {
        var b = new a.jqx._jqxListBox.item();
        if (this.displayMember) {
            if (c.label == undefined) {
                c.label = c[this.displayMember]
            }
            if (c.value == undefined) {
                c.value = c[this.valueMember]
            }
        }
        if (typeof c === "string") {
            b.label = c;
            b.value = c
        } else {
            if (typeof c === "number") {
                b.label = c.toString();
                b.value = c.toString()
            } else {
                b.label = c.label || c.value;
                b.value = c.value || c.label
            }
        }
        if (b.label == undefined && b.value == undefined && b.html == undefined) {
            b.label = b.value = c
        }
        b.html = c.html || "";
        b.group = c.group || "";
        b.title = c.title || "";
        b.groupHtml = c.groupHtml || "";
        b.disabled = c.disabled || false;
        b.visible = c.visible || true;
        return b
    }, addItem: function (c) {
        var b = this._getItemByParam(c);
        return this.insertAt(b, this.items ? this.items.length : 0)
    }, _getItemByParam: function (c) {
        if (c != null) {
            if (c.index == undefined) {
                var b = this.getItemByValue(c);
                if (b) {
                    c = b
                }
            }
        }
        return c
    }, insertItem: function (d, b) {
        var c = this._getItemByParam(d);
        return this.insertAt(c, b)
    }, updateItem: function (c, d) {
        var b = this._getItemByParam(d);
        if (b && b.index != undefined) {
            return this.updateAt(c, b.index)
        }
        return false
    }, updateAt: function (d, c) {
        if (d != null) {
            var b = this._mapItem(d);
            this.itemsByValue[a.trim(b.value).split(" ").join("")] = this.items[c];
            this.items[c].value = b.value;
            this.items[c].label = b.label;
            this.items[c].html = b.html;
            this.items[c].disabled = b.disabled
        }
        this._cachedItemHtml = [];
        this._renderItems();
        if (this.rendered) {
            this.rendered()
        }
    }, insertAt: function (l, f) {
        if (l == null) {
            return false
        }
        this._cachedItemHtml = [];
        if (this.items == undefined || this.items.length == 0) {
            this.source = new Array();
            this.refresh();
            var g = this._mapItem(l);
            g.index = 0;
            this.items[this.items.length] = g;
            this._addItems(true);
            this._renderItems();
            if (this.rendered) {
                this.rendered()
            }
            if (this.allowDrag && this._enableDragDrop) {
                this._enableDragDrop()
            }
            var k = g.value;
            if (g.value == "" || g.value == null) {
                k = f
            }
            this.itemsByValue[a.trim(k).split(" ").join("")] = g;
            return false
        }
        var g = this._mapItem(l);
        if (f == -1 || f == undefined || f == null || f >= this.items.length) {
            g.index = this.items.length;
            this.items[this.items.length] = g
        } else {
            var c = new Array();
            var j = 0;
            var e = false;
            var h = 0;
            for (var b = 0; b < this.items.length; b++) {
                if (this.items[b].isGroup == false) {
                    if (h >= f && !e) {
                        c[j++] = g;
                        g.index = f;
                        h++;
                        e = true
                    }
                }
                c[j] = this.items[b];
                if (!this.items[b].isGroup) {
                    c[j].index = h;
                    h++
                }
                j++
            }
            this.items = c
        }
        var k = g.value;
        if (g.value == "" || g.value == null) {
            k = f
        }
        this.itemsByValue[a.trim(k).split(" ").join("")] = g;
        this.visibleItems = new Array();
        this.renderedVisibleItems = new Array();
        var d = a.data(this.vScrollBar[0], "jqxScrollBar").instance;
        var i = d.value;
        d.setPosition(0);
        if ((this.allowDrag && this._enableDragDrop) || (this.virtualSize && this.virtualSize.height < 10 + this.host.height())) {
            this._addItems(true)
        } else {
            this._addItems(false)
        }
        this._renderItems();
        if (this.allowDrag && this._enableDragDrop) {
            this._enableDragDrop()
        }
        d.setPosition(i);
        if (this.rendered) {
            this.rendered()
        }
        return true
    }, removeAt: function (g) {
        if (g < 0 || g > this.items.length - 1) {
            return false
        }
        var d = this.items[g].height;
        var k = this.items[g].value;
        if (k == "" || k == null) {
            k = g
        }
        this.itemsByValue[a.trim(k).split(" ").join("")] = null;
        this.items.splice(g, 1);
        var c = new Array();
        var j = 0;
        var f = false;
        var h = 0;
        for (var b = 0; b < this.items.length; b++) {
            c[j] = this.items[b];
            if (!this.items[b].isGroup) {
                c[j].index = h;
                h++
            }
            j++
        }
        this.items = c;
        var e = a.data(this.vScrollBar[0], "jqxScrollBar").instance;
        var e = a.data(this.vScrollBar[0], "jqxScrollBar").instance;
        var i = e.value;
        e.setPosition(0);
        this.visibleItems = new Array();
        this.renderedVisibleItems = new Array();
        if (this.items.length > 0) {
            if (this.virtualSize) {
                this.virtualSize.height -= d;
                var l = this.virtualSize.itemsPerPage * 2;
                if (this.autoHeight) {
                    l = this.items.length
                }
                this.virtualItemsCount = Math.min(l, this.items.length)
            }
            this._updatescrollbars()
        } else {
            this._addItems()
        }
        this._renderItems();
        if (this.allowDrag && this._enableDragDrop) {
            this._enableDragDrop()
        }
        if (this.vScrollBar.css("visibility") != "hidden") {
            e.setPosition(i)
        } else {
            e.setPosition(0)
        }
        if (this.rendered) {
            this.rendered()
        }
        return true
    }, removeItem: function (c) {
        var b = this._getItemByParam(c);
        this.removeAt(b.index)
    }, getItems: function () {
        return this.items
    }, disableItem: function (c) {
        var b = this._getItemByParam(c);
        this.disableAt(b.index)
    }, enableItem: function (c) {
        var b = this._getItemByParam(c);
        this.enableAt(b.index)
    }, disableAt: function (b) {
        if (!this.items) {
            return false
        }
        if (b < 0 || b > this.items.length - 1) {
            return false
        }
        this.items[b].disabled = true;
        this._renderItems();
        return true
    }, enableAt: function (b) {
        if (!this.items) {
            return false
        }
        if (b < 0 || b > this.items.length - 1) {
            return false
        }
        this.items[b].disabled = false;
        this._renderItems();
        return true
    }, destroy: function () {
        if (this.source && this.source.unbindBindingUpdate) {
            this.source.unbindBindingUpdate(this.element.id)
        }
        this._removeHandlers();
        this.vScrollBar.jqxScrollBar("destroy");
        this.hScrollBar.jqxScrollBar("destroy");
        this.vScrollBar.remove();
        this.hScrollBar.remove();
        this.content.remove();
        a.jqx.utilities.resize(this.host, null, true);
        var b = a.data(this.element, "jqxListBox");
        delete this.hScrollInstance;
        delete this.vScrollInstance;
        delete this.vScrollBar;
        delete this.hScrollBar;
        delete this.content;
        delete this.bottomRight;
        delete this.itemswrapper;
        delete this.visualItems;
        delete this.visibleItems;
        delete this.items;
        delete this.groups;
        delete this.renderedVisibleItems;
        delete this._mousewheelfunc;
        delete this._mousemovefunc;
        delete this._cachedItemHtml;
        delete this.itemsByValue;
        delete this._activeElement;
        delete this.source;
        delete this.events;
        if (this.input) {
            this.input.remove();
            delete this.input
        }
        if (b) {
            delete b.instance
        }
        this.host.removeData();
        this.host.removeClass();
        this.host.remove();
        this.element = null;
        delete this.element;
        this.host = null;
        delete this.set;
        delete this.get;
        delete this.call;
        delete this.host
    }, _raiseEvent: function (f, c) {
        if (this._stopEvents == true) {
            return true
        }
        if (c == undefined) {
            c = {owner: null}
        }
        var d = this.events[f];
        args = c;
        args.owner = this;
        this._updateInputSelection();
        var e = new jQuery.Event(d);
        e.owner = this;
        e.args = args;
        if (this.host != null) {
            var b = this.host.trigger(e)
        }
        return b
    }})
})(jQuery);
(function (a) {
    a.jqx._jqxListBox.item = function () {
        var b = {group: "", groupHtml: "", selected: false, isGroup: false, highlighted: false, value: null, label: "", html: null, visible: true, disabled: false, element: null, width: null, height: null, initialTop: null, top: null, left: null, title: "", index: -1, checkBoxElement: null, originalItem: null, checked: false, visibleIndex: -1};
        return b
    }
})(jQuery);