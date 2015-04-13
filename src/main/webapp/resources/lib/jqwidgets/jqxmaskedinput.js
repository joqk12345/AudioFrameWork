/*
 jQWidgets v3.1.0 (2013-Dec-23)
 Copyright (c) 2011-2014 jQWidgets.
 License: http://jqwidgets.com/license/
 */

(function (a) {
    a.jqx.jqxWidget("jqxMaskedInput", "", {});
    a.extend(a.jqx._jqxMaskedInput.prototype, {defineInstance: function () {
        this.value = null;
        this.mask = "99999";
        this.width = null;
        this.height = 25;
        this.textAlign = "left";
        this.readOnly = false, this.cookies = false;
        this.promptChar = "_";
        this.inputMode = "advanced";
        this.rtl = false;
        this.disabled = false;
        this.events = ["valuechanged", "textchanged", "mousedown", "mouseup", "keydown", "keyup", "keypress", "change"];
        this.aria = {"aria-valuenow": {name: "value", type: "string"}, "aria-disabled": {name: "disabled", type: "boolean"}}
    }, createInstance: function (b) {
        this.render()
    }, render: function () {
        this.host.attr({role: "textbox"});
        this.host.attr("data-role", "input");
        var e = this.host.attr("value");
        if (e != undefined && e != "") {
            this.value = e
        }
        a.jqx.aria(this);
        a.jqx.aria(this, "aria-multiline", false);
        a.jqx.aria(this, "aria-readonly", this.readOnly);
        this.host.addClass(this.toThemeProperty("jqx-input"));
        this.host.addClass(this.toThemeProperty("jqx-rc-all"));
        this.host.addClass(this.toThemeProperty("jqx-widget"));
        this.host.addClass(this.toThemeProperty("jqx-widget-content"));
        maskEditor = this;
        if (this.element.nodeName.toLowerCase() == "div") {
            this.element.innerHTML = "";
            this.maskbox = a("<input autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' type='textarea'/>").appendTo(this.host)
        } else {
            this.maskbox = this.host;
            this.maskbox.attr("autocomplete", "off");
            this.maskbox.attr("autocorrect", "off");
            this.maskbox.attr("autocapitalize", "off");
            this.maskbox.attr("spellcheck", false)
        }
        this.maskbox.addClass(this.toThemeProperty("jqx-reset"));
        this.maskbox.addClass(this.toThemeProperty("jqx-input-content"));
        this.maskbox.addClass(this.toThemeProperty("jqx-widget-content"));
        var b = this.host.attr("name");
        if (!b) {
            b = this.element.id
        }
        this.maskbox.attr("name", b);
        if (this.rtl) {
            this.maskbox.addClass(this.toThemeProperty("jqx-rtl"))
        }
        var d = this;
        this.propertyChangeMap.disabled = function (f, h, g, j) {
            if (j) {
                f.maskbox.addClass(d.toThemeProperty("jqx-input-disabled"))
            } else {
                f.maskbox.removeClass(d.toThemeProperty("jqx-input-disabled"))
            }
        };
        if (this.disabled) {
            this.maskbox.addClass(this.toThemeProperty("jqx-input-disabled"));
            this.maskbox.attr("disabled", true);
            this.host.addClass(this.toThemeProperty("jqx-fill-state-disabled"))
        }
        this.selectedText = "";
        this.self = this;
        this.oldValue = this._value();
        this.items = new Array();
        this._initializeLiterals();
        this._render();
        if (this.value != null) {
            this.inputValue(this.value.toString())
        }
        var d = this;
        if (this.host.parents("form").length > 0) {
            this.host.parents("form").on("reset", function () {
                setTimeout(function () {
                    d.clearValue()
                }, 10)
            })
        }
        this.addHandlers();
        if (this.cookies) {
            var c = a.jqx.cookie.cookie("maskedInput." + this.element.id);
            if (c) {
                this.val(c)
            }
        }
    }, addHandlers: function () {
        var d = this;
        if (a.jqx.mobile.isTouchDevice()) {
            this.inputMode = "simple"
        }
        var b = "";
        var c = function (j, f) {
            var h = String.fromCharCode(f);
            var k = parseInt(h);
            var g = true;
            if (!isNaN(k)) {
                g = true;
                var e = this.maskbox.val().toString().length;
                if (e >= this._getEditStringLength() && this._selection().length == 0) {
                    g = false
                }
            }
            if (!j.ctrlKey && !j.shiftKey) {
                if (f >= 65 && f <= 90) {
                    g = false
                }
            }
            return g
        };
        this.addHandler(this.maskbox, "blur", function (e) {
            if (d.inputMode == "simple") {
                d._exitSimpleInputMode(e, d, false, b);
                return false
            }
            if (d.rtl) {
                d.maskbox.css("direction", "ltr")
            }
            d.host.removeClass(d.toThemeProperty("jqx-fill-state-focus"));
            if (d.maskbox.val() != b) {
                d._raiseEvent(7, e);
                if (d.cookies) {
                    a.jqx.cookie.cookie("maskedInput." + d.element.id, d.maskbox.val())
                }
            }
        });
        this.addHandler(this.maskbox, "focus", function (e) {
            b = d.maskbox.val();
            if (d.inputMode == "simple") {
                d.maskbox[0].value = d._getEditValue();
                a.data(d.maskbox, "simpleInputMode", true);
                return false
            }
            if (d.rtl) {
                d.maskbox.css("direction", "rtl")
            }
            d.host.addClass(d.toThemeProperty("jqx-fill-state-focus"))
        });
        this.addHandler(this.host, "keydown", function (g) {
            var h = d.readOnly;
            var f = g.charCode ? g.charCode : g.keyCode ? g.keyCode : 0;
            if (h || d.disabled) {
                return false
            }
            if (d.inputMode != "simple") {
                var e = d._handleKeyDown(g, f);
                if (!e) {
                    if (g.preventDefault) {
                        g.preventDefault()
                    }
                    if (g.stopPropagation) {
                        g.stopPropagation()
                    }
                }
                return e
            } else {
                return c.call(d, g, f)
            }
        });
        this.addHandler(this.host, "keyup", function (f) {
            var g = d.readOnly;
            var e = f.charCode ? f.charCode : f.keyCode ? f.keyCode : 0;
            if (g || d.disabled) {
                return true
            }
            if (d.inputMode == "simple") {
                return c.call(d, f, e)
            } else {
                if (f.preventDefault) {
                    f.preventDefault()
                }
                if (f.stopPropagation) {
                    f.stopPropagation()
                }
                return false
            }
        });
        this.addHandler(this.host, "keypress", function (g) {
            var h = d.readOnly;
            var f = g.charCode ? g.charCode : g.keyCode ? g.keyCode : 0;
            if (h || d.disabled) {
                return true
            }
            if (d.inputMode == "simple") {
                return c.call(d, g, f)
            } else {
                var e = d._handleKeyPress(g, f);
                if (!e) {
                    if (g.preventDefault) {
                        g.preventDefault()
                    }
                    if (g.stopPropagation) {
                        g.stopPropagation()
                    }
                }
                return e
            }
        })
    }, focus: function () {
        try {
            this.maskbox.focus()
        } catch (b) {
        }
    }, _exitSimpleInputMode: function (b, r, n, d) {
        if (r == undefined) {
            r = b.data
        }
        if (r == null) {
            return
        }
        if (n == undefined) {
            if (b.target != null && r.element != null) {
                if ((b.target.id != undefined && b.target.id.toString().length > 0 && r.host.find("#" + b.target.id).length > 0) || b.target == r.element) {
                    return
                }
            }
            var g = r.host.offset();
            var e = g.left;
            var l = g.top;
            var c = r.host.width();
            var q = r.host.height();
            var s = a(b.target).offset();
            if (s.left >= e && s.left <= e + c) {
                if (s.top >= l && s.top <= l + q) {
                    return
                }
            }
        }
        if (r.disabled || r.readOnly) {
            return
        }
        var p = a.data(r.maskbox, "simpleInputMode");
        if (p == null) {
            return
        }
        var o = r.maskbox.val();
        var j = o.toString();
        var f = 0;
        for (var h = 0; h < this.items.length; h++) {
            if (this.items[h].canEdit) {
                if (this._match(j.substring(f, f + 1), this.items[h].regex) || j.substring(f, f + 1) === "") {
                    f++
                } else {
                    r.maskbox[0].value = d;
                    a.data(r.maskbox, "simpleInputMode", null);
                    return false
                }
            }
        }
        r.inputValue(o, true);
        a.data(r.maskbox, "simpleInputMode", null);
        return false
    }, _getString: function () {
        var c = "";
        for (var b = 0; b < this.items.length; b++) {
            var d = this.items[b].character;
            if ((this.items[b].character == this.promptChar) && (this.promptChar != this.items[b].defaultCharacter)) {
                c += this.items[b].defaultCharacter
            } else {
                c += d
            }
        }
        return c
    }, _initializeLiterals: function () {
        if (this.mask == undefined || this.mask == null) {
            this.items = new Array();
            return
        }
        this.mask = this.mask.toString();
        var c = this.mask.length;
        for (var f = 0; f < c; f++) {
            var g = this.mask.substring(f, f + 1);
            var h = "";
            var b = false;
            if (g == "[") {
                for (var d = f; d < c; d++) {
                    var e = this.mask.substring(d, d + 1);
                    if (e == "]") {
                        break
                    }
                }
                h = "(" + this.mask.substring(f, d + 1) + ")";
                f = d;
                b = true
            }
            if (g == "#") {
                h = "(\\d|[+]|[-])";
                b = true
            } else {
                if (g == "9" || g == "0") {
                    h = "\\d";
                    b = true
                } else {
                    if (g == "$") {
                        b = false
                    } else {
                        if (g == "/" || g == ":") {
                            b = false
                        } else {
                            if (g == "A" || g == "a") {
                                h = "\\w";
                                b = true
                            } else {
                                if (g == "c" || g == "C") {
                                    h = ".";
                                    b = true
                                } else {
                                    if (g == "L" || g == "l") {
                                        h = "\\p{L}";
                                        b = true
                                    }
                                }
                            }
                        }
                    }
                }
            }
            var l = this;
            var k = function (o, n, j) {
                k.character = o;
                k.regex = n;
                k.canEdit = j;
                k.defaultCharacter = l.promptChar
            };
            if (b) {
                k(this.promptChar, h, b)
            } else {
                k(g, h, b)
            }
            this.items.push(k)
        }
    }, setRegex: function (d, e, b, c) {
        if ((d == null || d == undefined) || (e == null || e == undefined)) {
            return
        }
        if (d < this.items.length) {
            this.items[d].regex = e;
            if (b != null && b != undefined) {
                this.items[d].canEdit = b
            }
            if (c != null && c != undefined) {
                this.items[d].defaultCharacter = c
            }
        }
    }, _match: function (c, b) {
        var d = new RegExp(b, "i");
        return d.test(c)
    }, _raiseEvent: function (j, c) {
        var d = this.events[j];
        var e = {};
        e.owner = this;
        var f = c.charCode ? c.charCode : c.keyCode ? c.keyCode : 0;
        var b = true;
        var h = this.readOnly;
        var g = new jQuery.Event(d);
        g.owner = this;
        e.value = this.inputValue();
        e.text = this.maskedValue();
        g.args = e;
        if (j < 2 || j > 6) {
            b = this.host.trigger(g)
        }
        return b
    }, _handleKeyPress: function (d, b) {
        var c = this._isSpecialKey(b, d);
        return c
    }, _insertKey: function (c) {
        var d = this._selection();
        var b = this;
        if (d.start >= 0 && d.start < this.items.length) {
            var e = String.fromCharCode(c);
            var f = false;
            a.each(this.items, function (h, l) {
                if (h < d.start) {
                    return
                }
                var k = b.items[h];
                if (!k.canEdit) {
                    return
                }
                if (b._match(e, k.regex)) {
                    if (!f && d.length > 0) {
                        for (var g = d.start; g < d.end; g++) {
                            if (b.items[g].canEdit) {
                                b.items[g].character = b.promptChar
                            }
                        }
                        var n = b._getString();
                        b.maskedValue(n);
                        f = true
                    }
                    k.character = e;
                    var n = b._getString();
                    b.maskedValue(n);
                    if (d.start < b.items.length) {
                        b._setSelectionStart(h + 1)
                    }
                    return false
                } else {
                    return false
                }
            })
        }
    }, _deleteSelectedText: function () {
        var c = this._selection();
        var b = false;
        if (c.start > 0 || c.length > 0) {
            for (i = c.start; i < c.end; i++) {
                if (i < this.items.length && this.items[i].canEdit && this.items[i].character != this.promptChar) {
                    this.items[i].character = this.promptChar;
                    b = true
                }
            }
            var d = this._getString();
            this.maskedValue(d);
            return b
        }
    }, _saveSelectedText: function () {
        var b = this._selection();
        var c = "";
        if (b.start > 0 || b.length > 0) {
            for (i = b.start; i < b.end; i++) {
                if (this.items[i].canEdit) {
                    c += this.items[i].character
                }
            }
        }
        window.clipboardData.setData("Text", c);
        return c
    }, _pasteSelectedText: function () {
        var e = this._selection();
        var f = "";
        var d = 0;
        var b = e.start;
        var c = window.clipboardData.getData("Text");
        if (c != this.selectedText && c.length > 0) {
            this.selectedText = c;
            if (this.selectedText == null || this.selectedText == undefined) {
                return
            }
        }
        if (e.start >= 0 || e.length > 0) {
            for (i = e.start; i < this.items.length; i++) {
                if (this.items[i].canEdit) {
                    if (d < this.selectedText.length) {
                        this.items[i].character = this.selectedText[d];
                        d++;
                        b = 1 + i
                    }
                }
            }
        }
        var f = this._getString();
        this.maskedValue(f);
        if (b < this.items.length) {
            this._setSelectionStart(b)
        } else {
            this._setSelectionStart(this.items.length)
        }
    }, _handleKeyDown: function (j, n) {
        var l = this._selection();
        if (n >= 96 && n <= 105) {
            n = n - 48
        }
        if ((j.ctrlKey && n == 97) || (j.ctrlKey && n == 65)) {
            return true
        }
        if ((j.ctrlKey && n == 120) || (j.ctrlKey && n == 88)) {
            this.selectedText = this._saveSelectedText(j);
            this._deleteSelectedText(j);
            return false
        }
        if ((j.ctrlKey && n == 99) || (j.ctrlKey && n == 67)) {
            this.selectedText = this._saveSelectedText(j);
            return false
        }
        if ((j.ctrlKey && n == 122) || (j.ctrlKey && n == 90)) {
            return false
        }
        if ((j.ctrlKey && n == 118) || (j.ctrlKey && n == 86) || (j.shiftKey && n == 45)) {
            this._pasteSelectedText();
            return false
        }
        if (l.start >= 0 && l.start < this.items.length) {
            var f = String.fromCharCode(n);
            var o = this.items[l.start]
        }
        if (n == 8) {
            if (l.length == 0) {
                for (h = this.items.length - 1; h >= 0; h--) {
                    if (this.items[h].canEdit && h < l.end && this.items[h].character != this.promptChar) {
                        this._setSelection(h, h + 1);
                        break
                    }
                }
            }
            l = this._selection();
            var g = this._deleteSelectedText();
            if (l.start > 0 || l.length > 0) {
                if (l.start <= this.items.length) {
                    if (g) {
                        this._setSelectionStart(l.start)
                    } else {
                        this._setSelectionStart(l.start - 1)
                    }
                }
            }
            return false
        }
        if (n == 190) {
            var c = l.start;
            for (var h = c; h < this.items.length; h++) {
                if (this.items[h].character == ".") {
                    this._setSelectionStart(h + 1);
                    break
                }
            }
        }
        if (n == 191) {
            var c = l.start;
            for (var h = c; h < this.items.length; h++) {
                if (this.items[h].character == "/") {
                    this._setSelectionStart(h + 1);
                    break
                }
            }
        }
        if (n == 189) {
            var c = l.start;
            for (var h = c; h < this.items.length; h++) {
                if (this.items[h].character == "-") {
                    this._setSelectionStart(h + 1);
                    break
                }
            }
        }
        if (n == 46) {
            if (l.length == 0) {
                for (var h = 0; h < this.items.length; h++) {
                    if (this.items[h].canEdit && h >= l.start && this.items[h].character != this.promptChar) {
                        this._setSelection(h, h + 1);
                        break
                    }
                }
            }
            var b = l;
            l = this._selection();
            var d = this._deleteSelectedText();
            if (l.start >= 0 || l.length >= 0) {
                if (l.start < this.items.length) {
                    if (l.length <= 1) {
                        if (b.end != l.end) {
                            this._setSelectionStart(l.end)
                        } else {
                            this._setSelectionStart(l.end + 1)
                        }
                    } else {
                        this._setSelectionStart(l.start)
                    }
                }
            }
            return false
        }
        this._insertKey(n);
        var k = this._isSpecialKey(n, j);
        return k
    }, _isSpecialKey: function (b, c) {
        if (b == 189 || b == 9 || b == 13 || b == 35 || b == 36 || b == 37 || b == 39 || b == 46) {
            return true
        }
        if ((b === 16 && c.shiftKey) || c.ctrlKey) {
            return true
        }
        return false
    }, _selection: function () {
        if ("selectionStart" in this.maskbox[0]) {
            var f = this.maskbox[0];
            var g = f.selectionEnd - f.selectionStart;
            return{start: f.selectionStart, end: f.selectionEnd, length: g, text: f.value}
        } else {
            var c = document.selection.createRange();
            if (c == null) {
                return{start: 0, end: f.value.length, length: 0}
            }
            var b = this.maskbox[0].createTextRange();
            var d = b.duplicate();
            b.moveToBookmark(c.getBookmark());
            d.setEndPoint("EndToStart", b);
            var g = c.text.length;
            return{start: d.text.length, end: d.text.length + c.text.length, length: g, text: c.text}
        }
    }, _setSelection: function (d, b) {
        if ("selectionStart" in this.maskbox[0]) {
            this.maskbox[0].focus();
            this.maskbox[0].setSelectionRange(d, b)
        } else {
            var c = this.maskbox[0].createTextRange();
            c.collapse(true);
            c.moveEnd("character", b);
            c.moveStart("character", d);
            c.select()
        }
    }, _setSelectionStart: function (b) {
        this._setSelection(b, b)
    }, refresh: function (b) {
        if (!b) {
            this._render()
        }
    }, _render: function () {
        var c = parseInt(this.host.css("border-left-width"));
        var g = parseInt(this.host.css("border-left-width"));
        var f = parseInt(this.host.css("border-left-width"));
        var d = parseInt(this.host.css("border-left-width"));
        var j = parseInt(this.host.css("height")) - f - d;
        var e = parseInt(this.host.css("width")) - c - g;
        if (this.width != null && this.width.toString().indexOf("px") != -1) {
            e = this.width
        } else {
            if (this.width != undefined && !isNaN(this.width)) {
                e = this.width
            }
        }
        if (this.height != null && this.height.toString().indexOf("px") != -1) {
            j = this.height
        } else {
            if (this.height != undefined && !isNaN(this.height)) {
                j = this.height
            }
        }
        e = parseInt(e);
        j = parseInt(j);
        if (this.maskbox[0] != this.element) {
            this.maskbox.css({"border-left-width": 0, "border-right-width": 0, "border-bottom-width": 0, "border-top-width": 0})
        }
        this.maskbox.css("text-align", this.textAlign);
        var k = this.maskbox.css("font-size");
        if (!isNaN(j)) {
            this.maskbox.css("height", parseInt(k) + 4 + "px")
        }
        if (!isNaN(e)) {
            this.maskbox.css("width", e - 2)
        }
        var h = parseInt(j) - 2 * parseInt(f) - 2 * parseInt(d) - parseInt(k);
        if (isNaN(h)) {
            h = 0
        }
        if (!isNaN(j)) {
            this.host.height(j)
        }
        if (!isNaN(e)) {
            this.host.width(e)
        }
        if (this.maskbox[0] != this.element) {
            var b = h / 2;
            if (a.jqx.browser.msie && a.jqx.browser.version < 8) {
                b = h / 4
            }
            this.maskbox.css("padding-right", "0px");
            this.maskbox.css("padding-left", "0px");
            this.maskbox.css("padding-top", b);
            this.maskbox.css("padding-bottom", h / 2)
        }
        this.maskbox[0].value = this._getString();
        if (this.width) {
            if (this.width.toString().indexOf("%") >= 0) {
                this.element.style.width = this.width
            }
            if (this.height.toString().indexOf("%") >= 0) {
                this.element.style.height = this.height
            }
        }
    }, destroy: function () {
        this.host.remove()
    }, maskedValue: function (b) {
        if (b === undefined) {
            return this._value()
        }
        this.value = b;
        this._refreshValue();
        if (this.oldValue !== b) {
            this._raiseEvent(1, b);
            this.oldValue = b;
            this._raiseEvent(0, b)
        }
        return this
    }, _value: function () {
        var b = this.maskbox.val();
        return b
    }, propertyChangedHandler: function (c, d, b, e) {
        if (this.isInitialized == undefined || this.isInitialized == false) {
            return
        }
        if (d == "rtl") {
            if (c.rtl) {
                c.maskbox.addClass(c.toThemeProperty("jqx-rtl"))
            } else {
                c.maskbox.removeClass(c.toThemeProperty("jqx-rtl"))
            }
        }
        if (d === "value") {
            if (e == undefined || e == null) {
                e = ""
            }
            if (e === "") {
                this.clear()
            } else {
                e = e.toString();
                this.inputValue(e)
            }
        }
        if (d === "theme") {
            a.jqx.utilities.setTheme(b, e, this.host)
        }
        if (d == "disabled") {
            if (e) {
                c.maskbox.addClass(c.toThemeProperty("jqx-input-disabled"));
                c.host.addClass(c.toThemeProperty("jqx-fill-state-disabled"));
                c.maskbox.attr("disabled", true)
            } else {
                c.host.removeClass(this.toThemeProperty("jqx-fill-state-disabled"));
                c.host.removeClass(this.toThemeProperty("jqx-input-disabled"));
                c.maskbox.attr("disabled", false)
            }
            a.jqx.aria(c, "aria-disabled", e)
        }
        if (d == "readOnly") {
            this.readOnly = e
        }
        if (d == "promptChar") {
            for (i = 0; i < c.items.length; i++) {
                if (c.items[i].character == c.promptChar) {
                    c.items[i].character = e;
                    c.items[i].defaultCharacter = e
                }
            }
            c.promptChar = e
        }
        if (d == "textAlign") {
            c.maskbox.css("text-align", e);
            c.textAlign = e
        }
        if (d == "mask") {
            c.mask = e;
            c.items = new Array();
            c._initializeLiterals();
            c.value = c._getString();
            c._refreshValue()
        }
        if (d == "width") {
            c.width = e;
            c._render()
        } else {
            if (d == "height") {
                c.height = e;
                c._render()
            }
        }
    }, _value: function () {
        var b = this.value;
        return b
    }, _getEditStringLength: function () {
        var b = "";
        for (i = 0; i < this.items.length; i++) {
            if (this.items[i].canEdit) {
                b += this.items[i].character
            }
        }
        return b.length
    }, _getEditValue: function () {
        var b = "";
        for (i = 0; i < this.items.length; i++) {
            if (this.items[i].canEdit && this.items[i].character != this.promptChar) {
                b += this.items[i].character
            }
        }
        return b
    }, parseValue: function (e) {
        if (e == undefined || e == null) {
            return null
        }
        var c = e.toString();
        var f = "";
        var b = 0;
        for (m = 0; m < c.length; m++) {
            var d = c.substring(m, m + 1);
            for (i = b; i < this.items.length; i++) {
                if (this.items[i].canEdit && this._match(d, this.items[i].regex)) {
                    f += d;
                    b = i;
                    break
                }
            }
        }
        return f
    }, clear: function () {
        this.clearValue()
    }, clearValue: function () {
        this.inputValue("", true)
    }, val: function (b) {
        if (b != undefined && typeof b != "object") {
            this.maskedValue(b)
        }
        return this.maskbox[0].value
    }, inputValue: function (g, c) {
        if (g == undefined || g == null) {
            var f = "";
            for (var e = 0; e < this.items.length; e++) {
                if (this.items[e].canEdit) {
                    f += this.items[e].character
                }
            }
            return f
        } else {
            var b = 0;
            g = g.toString();
            for (var e = 0; e < this.items.length; e++) {
                if (this.items[e].canEdit) {
                    if (this._match(g.substring(b, b + 1), this.items[e].regex)) {
                        this.items[e].character = g.substring(b, b + 1);
                        b++
                    } else {
                        if (c) {
                            this.items[e].character = this.promptChar
                        }
                    }
                }
            }
            var d = this._getString();
            this.maskedValue(d);
            return this.inputValue()
        }
    }, _refreshValue: function () {
        var d = this.maskedValue();
        var b = 0;
        for (var c = 0; c < this.items.length; c++) {
            if (d.length > b) {
                if (this.items[c].canEdit && this.items[c].character != d[b]) {
                    if (this._match(d[b], this.items[c].regex) && d[b].length == 1) {
                        this.items[c].character = d[b]
                    }
                }
                b++
            }
        }
        this.value = this._getString();
        d = this.value;
        this.maskbox[0].value = d;
        a.jqx.aria(this, "aria-valuenow", d)
    }})
})(jQuery);