/*
 jQWidgets v3.1.0 (2013-Dec-23)
 Copyright (c) 2011-2014 jQWidgets.
 License: http://jqwidgets.com/license/
 */

(function (a) {
    a.jqx.jqxWidget("jqxCalendar", "", {});
    a.extend(a.jqx._jqxCalendar.prototype, {defineInstance: function () {
        this.disabled = false;
        this.multipleMonthRows = 1;
        this.multipleMonthColumns = 1;
        if (this.minDate == undefined) {
            this.minDate = a.jqx._jqxDateTimeInput.getDateTime(new Date());
            this.minDate._setYear(1900);
            this.minDate._setMonth(1);
            this.minDate._setDay(1);
            this.minDate._setHours(0);
            this.minDate._setMinutes(0);
            this.minDate._setSeconds(0);
            this.minDate._setMilliseconds(0)
        }
        if (this.maxDate == undefined) {
            this.maxDate = a.jqx._jqxDateTimeInput.getDateTime(new Date());
            this.maxDate._setYear(2100);
            this.maxDate._setMonth(1);
            this.maxDate._setDay(1);
            this.maxDate._setHours(0);
            this.maxDate._setMinutes(0);
            this.maxDate._setSeconds(0);
            this.maxDate._setMilliseconds(0)
        }
        this.min = new Date(1900, 0, 1);
        this.max = new Date(2100, 0, 1);
        this.navigationDelay = 400;
        if (this.stepMonths === undefined) {
            this.stepMonths = 1
        }
        this.width = null;
        this.height = null;
        if (this.value === undefined) {
            this.value = a.jqx._jqxDateTimeInput.getDateTime(new Date());
            this.value._setHours(0);
            this.value._setMinutes(0);
            this.value._setSeconds(0);
            this.value._setMilliseconds(0)
        }
        this.firstDayOfWeek = 0;
        this.showWeekNumbers = false;
        this.showDayNames = true;
        this.enableWeekend = false;
        this.enableOtherMonthDays = true;
        this.showOtherMonthDays = true;
        this.rowHeaderWidth = 25;
        this.columnHeaderHeight = 20;
        this.titleHeight = 25;
        this.dayNameFormat = "firstTwoLetters";
        this.monthNameFormat = "default";
        this.titleFormat = ["MMMM yyyy", "yyyy", "yyyy", "yyyy"];
        this.enableViews = true;
        if (this.readOnly === undefined) {
            this.readOnly = false
        }
        if (this.culture == undefined) {
            this.culture = "default"
        }
        if (this.enableFastNavigation == undefined) {
            this.enableFastNavigation = true
        }
        if (this.enableHover == undefined) {
            this.enableHover = true
        }
        if (this.enableAutoNavigation == undefined) {
            this.enableAutoNavigation = true
        }
        if (this.enableTooltips === undefined) {
            this.enableTooltips = false
        }
        this.backText = "Back";
        this.forwardText = "Forward";
        if (this.specialDates === undefined) {
            this.specialDates = new Array()
        }
        this.keyboardNavigation = true;
        this.selectionMode = "default";
        this.todayString = "Today";
        this.clearString = "Clear";
        this.showFooter = false;
        this.selection = {from: null, to: null};
        this.canRender = true;
        this._checkForHiddenParent = true;
        this.height = null;
        this.rtl = false;
        this.view = "month";
        this.localization = {backString: "Back", forwardString: "Forward", todayString: "Today", clearString: "Clear", calendar: {name: "Gregorian_USEnglish", "/": "/", ":": ":", firstDay: 0, days: {names: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], namesAbbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], namesShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]}, months: {names: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ""], namesAbbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""]}, AM: ["AM", "am", "AM"], PM: ["PM", "pm", "PM"], eras: [
            {name: "A.D.", start: null, offset: 0}
        ], twoDigitYearMax: 2029, patterns: {d: "M/d/yyyy", D: "dddd, MMMM dd, yyyy", t: "h:mm tt", T: "h:mm:ss tt", f: "dddd, MMMM dd, yyyy h:mm tt", F: "dddd, MMMM dd, yyyy h:mm:ss tt", M: "MMMM dd", Y: "yyyy MMMM", S: "yyyy\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss", ISO: "yyyy-MM-dd hh:mm:ss"}}};
        this.events = ["backButtonClick", "nextButtonClick", "valuechanged", "cellMouseDown", "cellMouseUp", "cellSelected", "cellUnselected", "change", "viewChange"]
    }, createInstance: function (e) {
        this.setCalendarSize();
        if (this.element.id === "") {
            this.element.id = a.jqx.utilities.createId()
        }
        this.element.innerHTML = "";
        this.host.attr("data-role", "calendar");
        var i = this.element.id;
        var h = this;
        this.propertyChangeMap.width = function (j, l, k, m) {
            h.setCalendarSize()
        };
        this.propertyChangeMap.height = function (j, l, k, m) {
            h.setCalendarSize()
        };
        if (a.global) {
            a.global.preferCulture(this.culture)
        }
        if (this.culture != "default") {
            if (a.global) {
                a.global.preferCulture(this.culture);
                this.localization.calendar = a.global.culture.calendar
            } else {
                if (Globalize) {
                    var c = Globalize.culture(this.culture);
                    this.localization.calendar = c.calendar
                }
            }
            this.firstDayOfWeek = this.localization.calendar.firstDay
        }
        if (this.localization.backString != "Back") {
            this.backText = this.localization.backString
        }
        if (this.localization.forwardString != "Forward") {
            this.forwardText = this.localization.forwardString
        }
        if (this.localization.todayString != "Today" && this.localization.todayString) {
            this.todayString = this.localization.todayString
        }
        if (this.localization.clearString != "Clear" && this.localization.clearString) {
            this.clearString = this.localization.clearString
        }
        this.setMaxDate(this.max, false);
        this.setMinDate(this.min, false);
        if (!this.host.attr("tabIndex")) {
            this.host.attr("tabIndex", 0)
        }
        this.host.css("outline", "none");
        this.host.addClass(this.toThemeProperty("jqx-calendar"));
        this.host.addClass(this.toThemeProperty("jqx-widget"));
        this.host.addClass(this.toThemeProperty("jqx-widget-content"));
        this.host.addClass(this.toThemeProperty("jqx-rc-all"));
        this._addInput();
        this.addHandler(this.host, "keydown", function (k) {
            var j = true;
            if (h.keyboardNavigation) {
                if (h._handleKey != undefined) {
                    j = h._handleKey(k);
                    if (!j) {
                        if (k.stopPropagation) {
                            k.stopPropagation()
                        }
                        if (k.preventDefault) {
                            k.preventDefault()
                        }
                    }
                }
            }
            return j
        });
        var d = false;
        var g = this;
        var b = false;
        if (h.width != null && h.width.toString().indexOf("%") != -1) {
            b = true
        }
        if (h.height != null && h.height.toString().indexOf("%") != -1) {
            b = true
        }
        a.jqx.utilities.resize(this.host, function () {
            var j = g.host.find("#View" + h.element.id);
            if (!d) {
                d = true;
                g.render()
            } else {
                g.refreshTitle(j)
            }
            if (b) {
                if (h.refreshTimer) {
                    clearTimeout(h.refreshTimer)
                }
                h.refreshTimer = setTimeout(function () {
                    h.refreshControl()
                }, 1)
            }
        });
        var f = "View";
        this.propertyChangeMap.disabled = function (j, l, k, m) {
            if (m) {
                j.host.addClass(h.toThemeProperty("jqx-fill-state-disabled"))
            } else {
                j.host.removeClass(h.toThemeProperty("jqx-fill-state-disabled"))
            }
            h.refreshControl()
        }
    }, _addInput: function () {
        var b = this.host.attr("name");
        if (!b) {
            b = this.element.id
        }
        this.input = a("<input type='hidden'/>");
        this.host.append(this.input);
        this.input.attr("name", b);
        this.input.val(this.getDate().toString())
    }, setCalendarSize: function () {
        if (this.width != null && this.width.toString().indexOf("px") != -1) {
            this.host.width(this.width)
        } else {
            if (this.width != undefined && !isNaN(this.width)) {
                this.host.width(this.width)
            }
        }
        if (this.width != null && this.width.toString().indexOf("%") != -1) {
            this.host.css("width", this.width)
        }
        if (this.height != null && this.height.toString().indexOf("px") != -1) {
            this.host.height(this.height)
        } else {
            if (this.height != undefined && !isNaN(this.height)) {
                this.host.height(this.height)
            }
        }
        if (this.height != null && this.height.toString().indexOf("%") != -1) {
            this.host.css("height", this.height)
        }
    }, _getYearAndMonthPart: function (c) {
        var b = new Date(c.getFullYear(), c.getMonth(), 1);
        return b
    }, _handleKey: function (p) {
        if (this.readOnly) {
            return true
        }
        var z = p.keyCode;
        var x = this;
        var b = this._getSelectedDate();
        if (b == undefined) {
            return true
        }
        if (p.altKey) {
            return true
        }
        if (this._animating) {
            return false
        }
        if (this.view != "month" && z == 13) {
            var d = this._getSelectedCell();
            this._setDateAndSwitchViews(d)
        }
        if (this.view == "year") {
            var v = b.getMonth();
            var j = this._getYearAndMonthPart(this.getMinDate());
            var m = this._getYearAndMonthPart(this.getMaxDate());
            switch (z) {
                case 37:
                    if (v == 0) {
                        var h = new Date(b.getFullYear() - 1, 11, 1);
                        if (h >= j) {
                            this.selectedDate = h;
                            this.navigateBackward()
                        } else {
                            if (this.selectedDate != j) {
                                this.selectedDate = j;
                                this.navigateBackward()
                            }
                        }
                    } else {
                        var h = new Date(b.getFullYear(), v - 1, 1);
                        if (h >= j) {
                            this._selectDate(h, "key")
                        }
                    }
                    return false;
                case 38:
                    var h = new Date(b.getFullYear(), v - 4, 1);
                    if (h < j) {
                        h = j
                    }
                    if (v - 4 < 0) {
                        this.selectedDate = h;
                        this.navigateBackward()
                    } else {
                        this._selectDate(h, "key")
                    }
                    return false;
                case 40:
                    var h = new Date(b.getFullYear(), v + 4, 1);
                    if (h > m) {
                        h = m
                    }
                    if (v + 4 > 11) {
                        this.selectedDate = h;
                        this.navigateForward()
                    } else {
                        this._selectDate(h, "key")
                    }
                    return false;
                case 39:
                    if (v == 11) {
                        var h = new Date(b.getFullYear() + 1, 0, 1);
                        if (h <= m) {
                            this.selectedDate = h;
                            this.navigateForward()
                        } else {
                            if (this.selectedDate != m) {
                                this.selectedDate = m;
                                this.navigateForward()
                            }
                        }
                    } else {
                        var h = new Date(b.getFullYear(), v + 1, 1);
                        if (h <= m) {
                            this._selectDate(h, "key")
                        }
                    }
                    return false
            }
            return true
        }
        if (this.view == "decade") {
            var o = this._renderStartDate.getFullYear();
            var k = this._renderEndDate.getFullYear();
            var n = b.getFullYear();
            var u = this.getMinDate().getFullYear();
            var c = this.getMaxDate().getFullYear();
            switch (z) {
                case 37:
                    if (n - 1 >= u) {
                        if (n <= o) {
                            this.selectedDate = new Date(n - 1, b.getMonth(), 1);
                            this.navigateBackward()
                        } else {
                            this._selectDate(new Date(n - 1, b.getMonth(), 1), "key")
                        }
                    }
                    return false;
                case 38:
                    var w = n - 4;
                    if (n - 4 < u) {
                        w = u
                    }
                    if (w < o) {
                        this.selectedDate = new Date(w, b.getMonth(), 1);
                        this.navigateBackward()
                    } else {
                        this._selectDate(new Date(w, b.getMonth(), 1), "key")
                    }
                    return false;
                case 40:
                    var w = n + 4;
                    if (w > c) {
                        w = c
                    }
                    if (w > k) {
                        this.selectedDate = new Date(w, b.getMonth(), 1);
                        this.navigateForward()
                    } else {
                        this._selectDate(new Date(w, b.getMonth(), 1), "key")
                    }
                    return false;
                case 39:
                    if (n + 1 <= c) {
                        if (n == k) {
                            this.selectedDate = new Date(n + 1, b.getMonth(), 1);
                            this.navigateForward()
                        } else {
                            this._selectDate(new Date(n + 1, b.getMonth(), 1), "key")
                        }
                    }
                    return false
            }
            return true
        }
        var t = new a.jqx._jqxDateTimeInput.getDateTime(b);
        var f = this.getViewStart();
        var e = this.getViewEnd();
        var s = a.data(this.element, "View" + this.element.id);
        if (s == undefined || s == null) {
            return true
        }
        if (z == 36) {
            t._setDay(1);
            this._selectDate(t.dateTime, "key");
            return false
        }
        if (z == 35) {
            var r = this.value._daysInMonth(this.value.year, this.value.month);
            t._setDay(r);
            this._selectDate(t.dateTime, "key");
            return false
        }
        var g = 1;
        if (p.ctrlKey) {
            g = 12
        }
        if (z == 34) {
            var y = this.navigateForward(g);
            if (y) {
                t._addMonths(g);
                this._selectDate(t.dateTime, "key")
            }
            return false
        }
        if (z == 33) {
            var y = this.navigateBackward(g);
            if (y) {
                t._addMonths(-g);
                this._selectDate(t.dateTime, "key")
            }
            return false
        }
        if (z == 38) {
            t._addDays(-7);
            if (t.dateTime < this.getMinDate()) {
                return false
            }
            if (t.dateTime < f) {
                var y = this.navigateBackward();
                if (!y) {
                    return false
                }
            }
            this._selectDate(t.dateTime, "key");
            for (var q = 0; q < s.cells.length; q++) {
                var d = s.cells[q];
                var l = d.getDate();
                if (d.isOtherMonth && d.isSelected && l <= t.dateTime) {
                    this.value.day = l.getDate();
                    this.navigateBackward();
                    this._selectDate(t.dateTime, "key");
                    break
                }
            }
            return false
        } else {
            if (z == 40) {
                t._addDays(7);
                if (t.dateTime > this.getMaxDate()) {
                    return false
                }
                if (t.dateTime > e) {
                    var y = this.navigateForward();
                    if (!y) {
                        return false
                    }
                }
                this._selectDate(t.dateTime, "key");
                for (var q = 0; q < s.cells.length; q++) {
                    var d = s.cells[q];
                    var l = d.getDate();
                    if (d.isOtherMonth && d.isSelected && l >= t.dateTime) {
                        this.value.day = l.getDate();
                        this.navigateForward();
                        this._selectDate(t.dateTime, "key");
                        break
                    }
                }
                return false
            }
        }
        if (z == 37) {
            t._addDays(-1);
            if (t.dateTime < this.getMinDate()) {
                return false
            }
            if (t.dateTime < f) {
                var y = this.navigateBackward();
                if (!y) {
                    return false
                }
            }
            this._selectDate(t.dateTime, "key");
            for (var q = 0; q < s.cells.length; q++) {
                var d = s.cells[q];
                var l = d.getDate();
                if (d.isOtherMonth && d.isSelected && l <= t.dateTime) {
                    if (t.dateTime < this.getMinDate() || t.dateTime > this.getMaxDate()) {
                        return false
                    }
                    this.navigateBackward();
                    this._selectDate(t.dateTime, "key");
                    break
                }
            }
            return false
        } else {
            if (z == 39) {
                t._addDays(1);
                if (t.dateTime > this.getMaxDate()) {
                    return false
                }
                if (t.dateTime > e) {
                    var y = this.navigateForward();
                    if (!y) {
                        return false
                    }
                }
                this._selectDate(t.dateTime, "key");
                for (var q = 0; q < s.cells.length; q++) {
                    var d = s.cells[q];
                    var l = d.getDate();
                    if (d.isOtherMonth && d.isSelected && l >= t.dateTime) {
                        if (t.dateTime < this.getMinDate() || t.dateTime > this.getMaxDate()) {
                            return false
                        }
                        this.navigateForward();
                        this._selectDate(t.dateTime, "key");
                        break
                    }
                }
                return false
            }
        }
        return true
    }, render: function () {
        if (!this.canRender) {
            return
        }
        this.host.children().remove();
        var c = this._renderSingleCalendar("View" + this.element.id);
        var b = this;
        if (this._checkForHiddenParent) {
            if (!this._hiddenParentTimer) {
                if (a.jqx.isHidden(this.host)) {
                    this._hiddenParentTimer = setInterval(function () {
                        if (!a.jqx.isHidden(b.host)) {
                            try {
                                clearInterval(b._hiddenParentTimer);
                                b.updateSize();
                                b._hiddenParentTimer = 0
                            } catch (d) {
                            }
                        }
                    }, 10)
                }
            }
        }
        this.host.append(c)
    }, addSpecialDate: function (b, c, d) {
        if (this.multipleMonthRows == 1 && this.multipleMonthColumns == 1) {
            var e = this.specialDates.length;
            this.specialDates[e] = {Date: b, Class: c, Tooltip: d};
            this.refreshControl()
        }
    }, refresh: function (b) {
        this.render()
    }, invalidate: function () {
        this.refreshControl()
    }, refreshControl: function () {
        if (this.multipleMonthRows == 1 && this.multipleMonthColumns == 1) {
            this.refreshSingleCalendar("View" + this.element.id, null)
        }
    }, getViewStart: function () {
        var c = this.getVisibleDate();
        var b = this.getFirstDayOfWeek(c);
        return b.dateTime
    }, getViewEnd: function () {
        var c = this.getViewStart();
        var b = new a.jqx._jqxDateTimeInput.getDateTime(c);
        b._addDays(41);
        return b.dateTime
    }, refreshSingleCalendar: function (f, e) {
        if (!this.canRender) {
            return
        }
        var h = this.host.find("#" + f);
        var d = this.getVisibleDate();
        var b = this.getFirstDayOfWeek(d);
        this.refreshCalendarCells(h, b, f);
        this.refreshTitle(h);
        this.refreshRowHeader(h, f);
        if (this.selectedDate != undefined) {
            this._selectDate(this.selectedDate)
        }
        var g = this.host.height() - this.titleHeight - this.columnHeaderHeight;
        if (!this.showDayNames) {
            g = this.host.height() - this.titleHeight
        }
        if (this.showFooter) {
            g -= 20
        }
        var c = h.find("#cellsTable" + f);
        var i = h.find("#calendarRowHeader" + f);
        c.height(g);
        i.height(g)
    }, refreshRowHeader: function (l, g) {
        if (!this.showWeekNumbers) {
            return
        }
        var h = this.getVisibleDate();
        var c = this.getFirstDayOfWeek(h);
        var f = c.dayOfWeek;
        var r = this.getWeekOfYear(c);
        var m = this.rowHeader.find("table");
        m.width(this.rowHeaderWidth);
        var d = c;
        var q = new Array();
        for (var j = 0; j < 6; j++) {
            var e = r.toString();
            var p = new a.jqx._jqxCalendar.cell(d.dateTime);
            var k = j + 1 + this.element.id;
            var o = a(m[0].rows[j].cells[0]);
            p.element = o;
            p.row = j;
            p.column = 0;
            var b = o.find("#headerCellContent" + k);
            b.addClass(this.toThemeProperty("jqx-calendar-row-cell"));
            b[0].innerHTML = r;
            q[j] = p;
            d = new a.jqx._jqxDateTimeInput.getDateTime(new Date(d._addWeeks(1)));
            r = this.getWeekOfYear(d)
        }
        var n = a.data(this.element, l[0].id);
        n.rowCells = q;
        this._refreshOtherMonthRows(n, g)
    }, _refreshOtherMonthRows: function (f, e) {
        if (this.showOtherMonthDays) {
            return
        }
        this._displayLastRow(true, e);
        this._displayFirstRow(true, e);
        var d = false;
        var g = false;
        for (var c = 0; c < f.cells.length; c++) {
            var b = f.cells[c];
            if (b.isVisible && c < 7) {
                d = true
            } else {
                if (b.isVisible && c >= f.cells.length - 7) {
                    g = true
                }
            }
        }
        if (!d) {
            this._displayFirstRow(false, e)
        }
        if (!g) {
            this._displayLastRow(false, e)
        }
    }, _displayLastRow: function (b, c) {
        var g = this.host.find("#" + c);
        var f = g.find("#calendarRowHeader" + g[0].id).find("table");
        var d = null;
        if (this.showWeekNumbers) {
            if (f[0].cells) {
                var d = a(f[0].rows[5])
            }
        }
        var e = a(g.find("#cellTable" + g[0].id)[0].rows[5]);
        if (b) {
            if (this.showWeekNumbers && d) {
                d.css("display", "table-row")
            }
            e.css("display", "table-row")
        } else {
            if (this.showWeekNumbers && d) {
                d.css("display", "none")
            }
            e.css("display", "none")
        }
    }, _displayFirstRow: function (b, c) {
        var e = this.host.find("#" + c);
        var d = e.find("#calendarRowHeader" + e[0].id).find("table");
        var f = null;
        if (this.showWeekNumbers) {
            if (d[0].cells) {
                var f = a(d[0].rows[0])
            }
        }
        var g = a(e.find("#cellTable" + e[0].id)[0].rows[0]);
        if (b) {
            if (this.showWeekNumbers && f) {
                f.css("display", "table-row")
            }
            g.css("display", "table-row")
        } else {
            if (this.showWeekNumbers && f) {
                f.css("display", "none")
            }
            g.css("display", "none")
        }
    }, _renderSingleCalendar: function (p, k) {
        if (!this.canRender) {
            return
        }
        var m = this.host.find("#" + p.toString());
        if (m != null) {
            m.remove()
        }
        var s = a("<div id='" + p.toString() + "'></div>");
        var b = this.getVisibleDate();
        var l = this.getFirstDayOfWeek(b);
        var e = new a.jqx._jqxDateTimeInput.getDateTime(l.dateTime);
        e._addMonths(1);
        var r = a.jqx._jqxCalendar.monthView(l, e, null, null, null, s);
        if (k == undefined || k == null) {
            this.host.append(s);
            if (this.height != undefined && !isNaN(this.height)) {
                s.height(this.height)
            } else {
                if (this.height != null && this.height.toString().indexOf("px") != -1) {
                    s.height(this.height)
                }
            }
            if (this.width != undefined && !isNaN(this.width)) {
                s.width(this.width)
            } else {
                if (this.width != null && this.width.toString().indexOf("px") != -1) {
                    s.width(this.width)
                }
            }
            if (this.width != null && this.width.toString().indexOf("%") != -1) {
                s.width("100%")
            }
            if (this.height != null && this.height.toString().indexOf("%") != -1) {
                s.height("100%")
            }
        } else {
            k.append(s)
        }
        a.data(this.element, p, r);
        var q = this.host.height() - this.titleHeight - this.columnHeaderHeight;
        if (!this.showDayNames) {
            q = this.host.height() - this.titleHeight
        }
        if (this.showFooter) {
            q -= 20
        }
        if (this.rowHeaderWidth < 0) {
            this.rowHeaderWidth = 0
        }
        if (this.columnHeaderHeight < 0) {
            this.columnHeaderHeight = 0
        }
        if (this.titleHeight < 0) {
            this.titleHeight = 0
        }
        var g = this.rowHeaderWidth;
        var j = this.columnHeaderHeight;
        if (!this.showWeekNumbers) {
            g = 0
        }
        if (!this.showDayNames) {
            j = 0
        }
        var u = a("<div style='height:" + this.titleHeight + "px;'><table role='grid' style='margin: 0px; width: 100%; height: 100%; border-spacing: 0px;' cellspacing='0' cellpadding='0'><tr role='row' id='calendarTitle' width='100%'><td role='gridcell' NOWRAP id='leftNavigationArrow'></td><td aria-live='assertive' aria-atomic='true' role='gridcell' align='center' NOWRAP id='calendarTitleHeader'></td><td role='gridcell' NOWRAP id='rightNavigationArrow'></td></tr></table></div>");
        u.addClass(this.toThemeProperty("jqx-calendar-title-container"));
        s.append(u);
        var c = a("<table role='grid' style='margin: 0px; border-spacing: 0px;' cellspacing='0' cellpadding='0'><tr role='row' id='calendarHeader' height='" + j + "'><td role='gridcell' id='selectCell' width='" + g + "'></td><td role='gridcell' colspan='2' style='padding-left: 2px; padding-right: 2px' id='calendarColumnHeader'></td></tr><tr role='row' id='calendarContent'><td role='gridcell' id='calendarRowHeader' valign='top' height='" + q + "' width='" + g + "'></td><td role='gridcell' valign='top' colspan='2' style='padding-left: 2px; padding-right: 2px' id='cellsTable' height='" + q + "'></td></tr></table>");
        var d = 20;
        var o = a("<div style='margin: 0px; display: none; height:" + d + "px;'><table style='width: 100%; height: 100%; border-spacing: 0px;' cellspacing='0' cellpadding='0'><tr id='calendarFooter'><td align='right' id='todayButton'></td><td align='left' colspan='2' id=doneButton></td></tr></table></div>");
        if (this.showFooter) {
            o.css("display", "block")
        }
        s.append(c);
        s.append(o);
        c.addClass(this.toThemeProperty("jqx-calendar-month"));
        this._footer = o;
        this.header = s.find("#calendarHeader");
        this.header[0].id = "calendarHeader" + p;
        this.header.addClass(this.toThemeProperty("calendar-header"));
        this.columnHeader = s.find("#calendarColumnHeader");
        this.columnHeader[0].id = "calendarColumnHeader" + p;
        this.table = s.find("#cellsTable");
        this.table[0].id = "cellsTable" + p;
        this.rowHeader = s.find("#calendarRowHeader");
        this.rowHeader[0].id = "calendarRowHeader" + p;
        this.selectCell = s.find("#selectCell");
        this.selectCell[0].id = "selectCell" + p;
        this.title = s.find("#calendarTitle");
        this.title[0].id = "calendarTitle" + p;
        this.leftButton = s.find("#leftNavigationArrow");
        this.leftButton[0].id = "leftNavigationArrow" + p;
        this.titleHeader = s.find("#calendarTitleHeader");
        this.titleHeader[0].id = "calendarTitleHeader" + p;
        this.rightButton = s.find("#rightNavigationArrow");
        this.rightButton[0].id = "rightNavigationArrow" + p;
        this.footer = s.find("#calendarFooter");
        this.footer[0].id = "calendarFooter" + p;
        this.todayButton = s.find("#todayButton");
        this.todayButton[0].id = "todayButton" + p;
        this.doneButton = s.find("#doneButton");
        this.doneButton[0].id = "doneButton" + p;
        s.find("tr").addClass(this.toThemeProperty("jqx-reset"));
        s.addClass(this.toThemeProperty("jqx-widget-content"));
        s.addClass(this.toThemeProperty("jqx-calendar-month-container"));
        this.month = s;
        this.selectCell.addClass(this.toThemeProperty("jqx-reset"));
        this.selectCell.addClass(this.toThemeProperty("jqx-calendar-top-left-header"));
        if (this.showWeekNumbers) {
            this._renderRowHeader(s)
        } else {
            this.table[0].colSpan = 3;
            this.columnHeader[0].colSpan = 3;
            this.rowHeader.css("display", "none");
            this.selectCell.css("display", "none")
        }
        if (this.showFooter) {
            this.footer.height(20);
            var i = a("<a href='javascript:;'>" + this.todayString + "</a>");
            i.appendTo(this.todayButton);
            var h = a("<a href='javascript:;'>" + this.clearString + "</a>");
            h.appendTo(this.doneButton);
            h.addClass(this.toThemeProperty("jqx-calendar-footer"));
            i.addClass(this.toThemeProperty("jqx-calendar-footer"));
            var n = this;
            var f = "mousedown";
            if (a.jqx.mobile.isTouchDevice()) {
                f = a.jqx.mobile.getTouchEventName("touchstart")
            }
            this.addHandler(i, f, function () {
                if (n.today) {
                    n.today()
                } else {
                    n.setDate(new Date(), "mouse")
                }
                return false
            });
            this.addHandler(h, f, function () {
                if (n.clear) {
                    n.clear()
                } else {
                    n.setDate(null, "mouse")
                }
                return false
            })
        }
        if (this.view != "month") {
            this.header.hide()
        }
        if (this.showDayNames && this.view == "month") {
            this.renderColumnHeader(s)
        }
        this.renderCalendarCells(s, l, p);
        if (k == undefined || k == null) {
            this.renderTitle(s)
        }
        this._refreshOtherMonthRows(r, p);
        s.find("tbody").css({border: "none", background: "transparent"});
        if (this.selectedDate != undefined) {
            this._selectDate(this.selectedDate)
        }
        var t = this;
        this.addHandler(this.host, "focus", function () {
            t.focus()
        });
        return s
    }, _getTitleFormat: function () {
        switch (this.view) {
            case"month":
                return this.titleFormat[0];
            case"year":
                return this.titleFormat[1];
            case"decade":
                return this.titleFormat[2];
            case"centuries":
                return this.titleFormat[3]
        }
    }, renderTitle: function (t) {
        var k = a("<div role='button' style='float: left;'></div>");
        var l = a("<div role='button' style='float: right;'></div>");
        var o = this.title;
        o.addClass(this.toThemeProperty("jqx-reset"));
        o.addClass(this.toThemeProperty("jqx-widget-header"));
        o.addClass(this.toThemeProperty("jqx-calendar-title-header"));
        var e = o.find("td");
        if (a.jqx.browser.msie && a.jqx.browser.version < 8) {
            if (e.css("background-color") != "transparent") {
                var g = o.css("background-color");
                e.css("background-color", g)
            }
            if (e.css("background-image") != "transparent") {
                var d = o.css("background-image");
                var p = o.css("background-repeat");
                var c = o.css("background-position");
                e.css("background-image", d);
                e.css("background-repeat", p);
                e.css("background-position", "left center scroll")
            }
        } else {
            e.css("background-color", "transparent")
        }
        if (this.disabled) {
            o.addClass(this.toThemeProperty("jqx-calendar-title-header-disabled"))
        }
        k.addClass(this.toThemeProperty("jqx-calendar-title-navigation"));
        k.addClass(this.toThemeProperty("jqx-icon-arrow-left"));
        k.appendTo(this.leftButton);
        var m = this.leftButton;
        l.addClass(this.toThemeProperty("jqx-calendar-title-navigation"));
        l.addClass(this.toThemeProperty("jqx-icon-arrow-right"));
        l.appendTo(this.rightButton);
        var b = this.rightButton;
        if (this.enableTooltips) {
            if (a(m).jqxTooltip) {
                a(m).jqxTooltip({name: this.element.id, position: "mouse", theme: this.theme, content: this.backText});
                a(b).jqxTooltip({name: this.element.id, position: "mouse", theme: this.theme, content: this.forwardText})
            }
        }
        var n = this.titleHeader;
        var v = this._format(this.value.dateTime, this._getTitleFormat(), this.culture);
        if (this.view == "decade") {
            var q = this._format(this._renderStartDate, this._getTitleFormat(), this.culture);
            var j = this._format(this._renderEndDate, this._getTitleFormat(), this.culture);
            v = q + " - " + j
        } else {
            if (this.view == "centuries") {
                var q = this._format(this._renderCenturyStartDate, this._getTitleFormat(), this.culture);
                var j = this._format(this._renderCenturyEndDate, this._getTitleFormat(), this.culture);
                v = q + " - " + j
            }
        }
        var f = a("<div style='background: transparent; margin: 0; padding: 0; border: none;'>" + v + "</div>");
        n.append(f);
        f.addClass(this.toThemeProperty("jqx-calendar-title-content"));
        var s = parseInt(k.width());
        var i = t.width() - 2 * s;
        var r = n.find(".jqx-calendar-title-content").width(i);
        a.data(k, "navigateLeft", this);
        a.data(l, "navigateRight", this);
        var h = a.jqx.mobile.isTouchDevice();
        if (!this.disabled) {
            var u = this;
            this.addHandler(n, "mousedown", function (A) {
                if (u.enableViews) {
                    if (!u._viewAnimating && !u._animating) {
                        var x = u.view;
                        switch (u.view) {
                            case"month":
                                u.view = "year";
                                break;
                            case"year":
                                u.view = "decade";
                                break
                        }
                        if (x != u.view) {
                            var z = "View" + u.element.id;
                            var B = u.host.find("#" + z);
                            var y = u.getVisibleDate();
                            var w = u.getFirstDayOfWeek(y);
                            u.renderCalendarCells(B, w, z, true);
                            u.refreshTitle(B);
                            u._raiseEvent("8")
                        }
                    }
                    return false
                }
            });
            this.addHandler(k, "mousedown", function (x) {
                if (!u._animating) {
                    a.data(k, "navigateLeftRepeat", true);
                    var w = a.data(k, "navigateLeft");
                    if (w.enableFastNavigation && !h) {
                        w.startRepeat(w, k, true, 500)
                    }
                    w.navigateBackward();
                    return w._raiseEvent(0, x)
                } else {
                    return false
                }
            });
            this.addHandler(k, "mouseup", function (w) {
                a.data(k, "navigateLeftRepeat", false)
            });
            this.addHandler(k, "mouseleave", function (w) {
                a.data(k, "navigateLeftRepeat", false)
            });
            this.addHandler(l, "mousedown", function (x) {
                if (!u._animating) {
                    a.data(l, "navigateRightRepeat", true);
                    var w = a.data(l, "navigateRight");
                    if (w.enableFastNavigation && !h) {
                        w.startRepeat(w, l, false, 500)
                    }
                    w.navigateForward();
                    return w._raiseEvent(1, x)
                } else {
                    return false
                }
            });
            this.addHandler(l, "mouseup", function (w) {
                a.data(l, "navigateRightRepeat", false)
            });
            this.addHandler(l, "mouseleave", function (w) {
                a.data(l, "navigateRightRepeat", false)
            })
        }
    }, refreshTitle: function (f) {
        var g = this._format(this.value.dateTime, this._getTitleFormat(), this.culture);
        if (this.view == "decade") {
            var d = this._format(this._renderStartDate, this._getTitleFormat(), this.culture);
            var b = this._format(this._renderEndDate, this._getTitleFormat(), this.culture);
            g = d + " - " + b
        } else {
            if (this.view == "centuries") {
                var d = this._format(this._renderCenturyStartDate, this._getTitleFormat(), this.culture);
                var b = this._format(this._renderCenturyEndDate, this._getTitleFormat(), this.culture);
                g = d + " - " + b
            }
        }
        var e = this.titleHeader;
        if (this.titleHeader) {
            var c = e.find(".jqx-calendar-title-content");
            var h = a("<div style='background: transparent; margin: 0; padding: 0; border: none;'>" + g + "</div>");
            e.append(h);
            h.addClass(this.toThemeProperty("jqx-calendar-title-content"));
            if (c != null) {
                c.remove()
            }
        }
    }, startRepeat: function (d, b, f, e) {
        var c = window.setTimeout(function () {
            var g = a.data(b, "navigateLeftRepeat");
            if (!f) {
                g = a.data(b, "navigateRightRepeat")
            }
            if (g) {
                if (e < 25) {
                    e = 25
                }
                if (f) {
                    d.navigateBackward();
                    d.startRepeat(d, b, true, e)
                } else {
                    d.navigateForward();
                    c = d.startRepeat(d, b, false, e)
                }
            } else {
                window.clearTimeout(c);
                return
            }
        }, e)
    }, navigateForward: function (g) {
        if (g == undefined || g == null) {
            g = this.stepMonths
        }
        var f = this.value.year;
        if (this.view == "decade") {
            f = this._renderStartDate.getFullYear() + 12;
            if (this._renderEndDate.getFullYear() >= this.getMaxDate().getFullYear()) {
                return
            }
        } else {
            if (this.view == "year") {
                f = this.value.year + 1
            } else {
                if (this.view == "centuries") {
                    f = this.value.year + 100
                }
            }
        }
        if (this.view != "month") {
            var b = this.getMaxDate().getFullYear();
            if (b < f || f > b) {
                f = b
            }
            if (this.value.year == f) {
                return
            }
            this.value.year = f;
            this.value.month = 1;
            this.value.day = 1
        }
        var c = this.value.day;
        var h = this.value.month;
        if (h + g <= 12) {
            var e = this.value._daysInMonth(this.value.year, this.value.month + g);
            if (c > e) {
                c = e
            }
        }
        if (this.view == "month") {
            var d = new Date(this.value.year, this.value.month - 1 + g, c)
        } else {
            var d = new Date(this.value.year, this.value.month - 1, c)
        }
        return this.navigateTo(d)
    }, navigateBackward: function (f) {
        if (f == undefined || f == null) {
            f = this.stepMonths
        }
        var e = this.value.year;
        if (this.view == "decade") {
            e = this._renderStartDate.getFullYear() - 12
        } else {
            if (this.view == "year") {
                e = this.value.year - 1
            } else {
                if (this.view == "centuries") {
                    e = this.value.year - 100
                }
            }
        }
        if (this.view != "month") {
            var h = this.getMinDate().getFullYear();
            if (e < h) {
                e = h
            }
            if (this.view == "decade") {
                if (this._renderStartDate) {
                    if (this._renderStartDate.getFullYear() == e) {
                        return
                    }
                }
            }
            this.value.year = e;
            this.value.month = 1;
            this.value.day = 1
        }
        var b = this.value.day;
        var g = this.value.month;
        if (g - f >= 1) {
            var d = this.value._daysInMonth(this.value.year, this.value.month - f);
            if (b > d) {
                b = d
            }
        }
        if (this.view == "month") {
            var c = new Date(this.value.year, this.value.month - 1 - f, b)
        } else {
            var c = new Date(this.value.year, this.value.month - 1, b)
        }
        return this.navigateTo(c)
    }, refreshCalendarCells: function (x, f, m) {
        if (this.view == "year" || this.view == "decade" || this.view == "centuries") {
            this.refreshViews(x, f, m);
            return
        }
        var s = this.table;
        var q = s.find("#cellTable" + m.toString());
        var e = f;
        var c = new Array();
        var n = 0;
        var u = new a.jqx._jqxDateTimeInput.getDateTime(new Date());
        for (var p = 0; p < 6; p++) {
            for (var o = 0; o < 7; o++) {
                var d = p + 1;
                var h = o;
                if (this.rtl) {
                    h = 6 - h
                }
                var t = h + 1;
                var l = "#cell" + d + t + this.element.id;
                var w = new Date(e.dateTime.getFullYear(), e.dateTime.getMonth(), e.dateTime.getDate());
                var b = new a.jqx._jqxCalendar.cell(w);
                var g = a(q[0].rows[p].cells[t - 1]);
                g[0].id = l.substring(1);
                b.element = g;
                b.row = p;
                b.column = o;
                b.isVisible = true;
                b.isOtherMonth = false;
                b.isToday = false;
                b.isWeekend = false;
                b.isHighlighted = false;
                b.isSelected = false;
                if (e.month != this.value.month) {
                    b.isOtherMonth = true;
                    b.isVisible = this.showOtherMonthDays
                }
                if (w < this.getMinDate() || w > this.getMaxDate()) {
                    b.isDisabled = true
                }
                if (e.month == u.month && e.day == u.day && e.year == u.year) {
                    b.isToday = true
                }
                if (e.isWeekend()) {
                    b.isWeekend = true
                }
                a.data(this.element, "cellContent" + l.substring(1), b);
                a.data(this.element, l.substring(1), b);
                c[n] = b;
                n++;
                a.jqx.utilities.html(g, e.day);
                this._applyCellStyle(b, g, g);
                e = new a.jqx._jqxDateTimeInput.getDateTime(new Date(e._addDays(1)))
            }
        }
        var v = a.data(this.element, x[0].id);
        if (v != undefined && v != null) {
            v.cells = c
        }
        this.renderedCells = c;
        this._refreshOtherMonthRows(v, m)
    }, _getDecadeAndCenturiesData: function () {
        var k = new Array();
        var p = new Array();
        var c = this.getMaxDate().getFullYear() - this.getMinDate().getFullYear();
        if (c < 12) {
            c = 12
        }
        var f = this.getMinDate();
        var b = this.getMaxDate();
        var l = this.value.dateTime.getFullYear();
        if (this.view == "decade") {
            if (l + 12 > b.getFullYear()) {
                l = b.getFullYear() - 11
            }
            if (l < f.getFullYear()) {
                l = f.getFullYear()
            }
            for (var h = 0; h < c; h++) {
                var d = new Date(f.getFullYear() + h, 0, 1);
                if (f.getFullYear() <= l && l <= d.getFullYear()) {
                    var g = new Date(d.getFullYear(), d.getMonth(), 1);
                    for (var e = 0; e < 12; e++) {
                        var o = new Date(g.getFullYear() + e, this.value.dateTime.getMonth(), this.value.dateTime.getDate());
                        var m = o.getFullYear();
                        if (f.getFullYear() <= m && m <= b.getFullYear()) {
                            k.push(m);
                            p.push(o);
                            if (e == 0) {
                                this._renderStartDate = o
                            }
                            this._renderEndDate = o
                        } else {
                            k.push(m);
                            p.push(o)
                        }
                    }
                    break
                }
            }
        } else {
            if (this.view == "centuries") {
                for (var h = 0; h < c; h += 120) {
                    var d = new Date(f.getFullYear() + h + 120, 0, 1);
                    if (f.getFullYear() <= l && l <= d.getFullYear()) {
                        var g = new Date(d.getFullYear() - 130, d.getMonth(), 1);
                        if (g < f) {
                            g = f
                        }
                        for (var e = 0; e < 12; e++) {
                            var n = new Date(g.getFullYear() + e * 10, g.getMonth(), 1);
                            if (g.getFullYear() >= f.getFullYear() && n.getFullYear() <= b.getFullYear()) {
                                k.push("<span style='visibility: hidden;'>-</span>" + n.getFullYear() + "-" + (n.getFullYear() + 9));
                                p.push(n);
                                if (e == 0) {
                                    this._renderCenturyStartDate = n
                                }
                                this._renderCenturyEndDate = new Date(n.getFullYear() + 9, 0, 1)
                            }
                        }
                        break
                    }
                }
            }
        }
        return{years: k, dates: p}
    }, refreshViews: function (A, m, s) {
        var B = this;
        var c = new Array();
        var w = A.find("#cellTable" + s.toString());
        var D = this._getDecadeAndCenturiesData();
        var l = D.years;
        var C = D.dates;
        var t = 0;
        var f = this.getMinDate();
        var n = this.getMaxDate();
        for (var v = 0; v < 3; v++) {
            for (var u = 0; u < 4; u++) {
                var d = v + 1;
                var q = u;
                if (this.rtl) {
                    q = 3 - q
                }
                var x = q + 1;
                var z = new Date(this.value.dateTime);
                z.setMonth(v * 4 + q);
                var b = new a.jqx._jqxCalendar.cell(z);
                var e = w[0].rows["row" + (1 + v) + this.element.id];
                var o = a(e.cells[u]);
                b.isVisible = true;
                b.element = o;
                b.row = v;
                b.column = u;
                b.index = c.length;
                var p = "";
                if (this.view == "year") {
                    var h = this.localization.calendar.months.names;
                    var g = h[v * 4 + q];
                    switch (this.monthNameFormat) {
                        case"default":
                            g = this.localization.calendar.months.namesAbbr[v * 4 + q];
                            break;
                        case"shortest":
                            g = this.localization.calendar.months.namesShort[v * 4 + q];
                            break;
                        case"firstTwoLetters":
                            g = g.substring(0, 2);
                            break;
                        case"firstLetter":
                            g = g.substring(0, 1);
                            break
                    }
                    p = g
                } else {
                    if (this.view == "decade" || this.view == "centuries") {
                        p = l[v * 4 + q];
                        if (undefined == p) {
                            p = "<span style='cursor: default; visibility: hidden;'>2013</span>"
                        }
                        b.setDate(C[v * 4 + q])
                    }
                }
                var z = b.getDate();
                if (this.view == "year") {
                    if (this._getYearAndMonthPart(z) < this._getYearAndMonthPart(f)) {
                        b.isDisabled = true
                    }
                    if (this._getYearAndMonthPart(z) > this._getYearAndMonthPart(n)) {
                        b.isDisabled = true
                    }
                } else {
                    if (z.getFullYear() < f.getFullYear()) {
                        b.isDisabled = true
                    }
                    if (z.getFullYear() > n.getFullYear()) {
                        b.isDisabled = true
                    }
                }
                a.jqx.utilities.html(o, p);
                c[t] = b;
                t++
            }
        }
        var y = a.data(this.element, A[0].id);
        if (y != undefined && y != null) {
            y.cells = c
        }
        this.renderedCells = c;
        this._applyCellStyles()
    }, _createViewClone: function () {
        var b = this.host.find(".jqx-calendar-month");
        var c = b.clone();
        c.css("position", "absolute");
        c.css("top", b.position().top);
        return c
    }, _addCellsTable: function (h, g) {
        var e = this;
        var c = this.showFooter ? 20 : 0;
        if (this.view != "month") {
            g.height(this.host.height() - this.titleHeight)
        } else {
            g.height(this.host.height() - this.titleHeight - this.columnHeaderHeight - c)
        }
        this._viewAnimating = true;
        var b = this.host.find(".jqx-calendar-month-container");
        b.css("position", "relative");
        var d = this.host.find(".jqx-calendar-month");
        var f = this._createViewClone();
        b.append(f);
        if (this.view != "month") {
            this.header.fadeOut(0);
            if (this.showWeekNumbers) {
                this.rowHeader.fadeOut(0)
            }
            if (this.showFooter) {
                this._footer.fadeOut(0)
            }
        } else {
            this.header.fadeIn(this.navigationDelay + 200);
            if (this.showWeekNumbers) {
                this.rowHeader.fadeIn(this.navigationDelay + 200)
            }
            if (this.showFooter) {
                this._footer.fadeIn(this.navigationDelay + 200)
            }
        }
        h.children().remove();
        h.append(g);
        this._animateViews(f, g, function () {
            if (!e.selectedDate) {
                e.selectedDate = e.renderedCells[0].getDate()
            }
            try {
                e.renderedCells[0].element.focus();
                setTimeout(function () {
                    e.renderedCells[0].element.focus()
                }, 10)
            } catch (i) {
            }
            e._viewAnimating = false
        });
        g.addClass(this.toThemeProperty("jqx-calendar-view"))
    }, _animateViews: function (c, b, e) {
        var d = this;
        d._viewAnimating = true;
        c.fadeOut(this.navigationDelay + 100, function () {
            c.remove()
        });
        b.fadeOut(0);
        b.fadeIn(this.navigationDelay + 200, function () {
            e()
        })
    }, focus: function () {
        try {
            if (this.renderedCells && this.renderedCells.length > 0) {
                var d = this;
                var c = false;
                if (!d.selectedDate && d.selectionMode != "range") {
                    this.setDate(new Date(), "mouse")
                }
                this.element.focus()
            }
        } catch (b) {
        }
    }, renderViews: function (D, m, u) {
        var E = this;
        var d = new Array();
        var y = a("<table role='grid' style='width: 100%; height: 100%;' cellspacing='2' cellpadding='0' id=cellTable" + u.toString() + "><tr role='row' id='row1" + this.element.id + "'><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td></tr><tr role='row' id='row2" + this.element.id + "'><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td></tr><tr role='row' id='row3" + this.element.id + "'><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td></tr></table>");
        var p = this.host.find(".jqx-calendar-month-container");
        p.css("position", "relative");
        var z = D.find("#cellsTable" + D[0].id);
        var G = this._getDecadeAndCenturiesData();
        var l = G.years;
        var F = G.dates;
        var v = 0;
        var f = this.getMinDate();
        var n = this.getMaxDate();
        var s = new Date(this.value.dateTime);
        s.setDate(1);
        for (var x = 0; x < 3; x++) {
            for (var w = 0; w < 4; w++) {
                var c = x + 1;
                var t = w;
                if (this.rtl) {
                    t = 3 - t
                }
                var A = t + 1;
                var e = y[0].rows["row" + (1 + x) + this.element.id];
                var C = new Date(s);
                C.setMonth(x * 4 + t);
                var b = new a.jqx._jqxCalendar.cell(C);
                var o = a(e.cells[w]);
                b.isVisible = true;
                b.element = o;
                b.row = x;
                b.column = w;
                b.index = d.length;
                var q = "";
                if (this.view == "year") {
                    if (C.getMonth() == this.getDate().getMonth()) {
                        b.isSelected = true
                    }
                    var h = this.localization.calendar.months.names;
                    var g = h[x * 4 + t];
                    switch (this.monthNameFormat) {
                        case"default":
                            g = this.localization.calendar.months.namesAbbr[x * 4 + t];
                            break;
                        case"shortest":
                            g = this.localization.calendar.months.namesShort[x * 4 + t];
                            break;
                        case"firstTwoLetters":
                            g = g.substring(0, 2);
                            break;
                        case"firstLetter":
                            g = g.substring(0, 1);
                            break
                    }
                    q = g
                } else {
                    if (this.view == "decade" || this.view == "centuries") {
                        q = l[x * 4 + t];
                        b.setDate(F[x * 4 + t]);
                        if (b.getDate().getFullYear() == this.getDate().getFullYear()) {
                            b.isSelected = true
                        }
                        if (undefined == q) {
                            q = "<span style='cursor: default; visibility: hidden;'>2013</span>"
                        }
                    }
                }
                var C = b.getDate();
                if (this.view == "year") {
                    if (this._getYearAndMonthPart(C) < this._getYearAndMonthPart(f)) {
                        b.isDisabled = true
                    }
                    if (this._getYearAndMonthPart(C) > this._getYearAndMonthPart(n)) {
                        b.isDisabled = true
                    }
                } else {
                    if (C.getFullYear() < f.getFullYear()) {
                        b.isDisabled = true
                    }
                    if (C.getFullYear() > n.getFullYear()) {
                        b.isDisabled = true
                    }
                }
                a.jqx.utilities.html(o, q);
                d[v] = b;
                v++
            }
        }
        a.each(d, function () {
            var j = this.element;
            var i = this;
            if (!E.disabled) {
                E.addHandler(j, "mousedown", function (k) {
                    E._setDateAndSwitchViews(i)
                });
                E.addHandler(j, "mouseover", function (r) {
                    var k = E.renderedCells[i.index];
                    if (E.view != "centuries" && k.element.html().toLowerCase().indexOf("span") != -1) {
                        return
                    }
                    k.isHighlighted = true;
                    E._applyCellStyle(k, k.element, k.element)
                });
                E.addHandler(j, "mouseout", function (r) {
                    var k = E.renderedCells[i.index];
                    if (E.view != "centuries" && k.element.html().toLowerCase().indexOf("span") != -1) {
                        return
                    }
                    k.isHighlighted = false;
                    E._applyCellStyle(k, k.element, k.element)
                })
            }
        });
        var B = a.data(this.element, D[0].id);
        if (B != undefined && B != null) {
            B.cells = d
        }
        this.renderedCells = d;
        this._addCellsTable(z, y);
        this._applyCellStyles()
    }, _setDateAndSwitchViews: function (k) {
        if (!this._viewAnimating && !this._animating) {
            var f = this.getDate();
            var d = this.renderedCells[k.index].getDate();
            var i = this.value.dateTime.getDate();
            var j = new Date(d);
            j.setDate(i);
            if (j.getMonth() == d.getMonth()) {
                d = j
            }
            var g = this.getMinDate();
            var c = this.getMaxDate();
            if (this.view == "year") {
                if (this._getYearAndMonthPart(d) < this._getYearAndMonthPart(g)) {
                    return
                }
                if (this._getYearAndMonthPart(d) > this._getYearAndMonthPart(c)) {
                    return
                }
            } else {
                if (d.getFullYear() < g.getFullYear()) {
                    return
                }
                if (d.getFullYear() > c.getFullYear()) {
                    return
                }
            }
            this._selectDate(d);
            switch (this.view) {
                case"year":
                    this.view = "month";
                    break;
                case"decade":
                    this.view = "year";
                    break
            }
            if (this.view == "year") {
                if (this._getYearAndMonthPart(d) < this._getYearAndMonthPart(g)) {
                    d = g
                }
                if (this._getYearAndMonthPart(d) > this._getYearAndMonthPart(c)) {
                    d = c
                }
            } else {
                if (d.getFullYear() < g.getFullYear()) {
                    d = g
                }
                if (d.getFullYear() > c.getFullYear()) {
                    d = c
                }
            }
            this.value._setYear(d.getFullYear());
            this.value._setDay(d.getDate());
            this.value._setMonth(d.getMonth() + 1);
            var h = this.getVisibleDate();
            var b = this.getFirstDayOfWeek(h);
            var e = "View" + this.element.id;
            this.renderCalendarCells(this.month, b, e, true);
            this.refreshTitle(this.month);
            this._selectDate(f, "view");
            this._raiseEvent("8")
        }
    }, renderCalendarCells: function (D, m, s, q) {
        if (this.view == "year" || this.view == "decade" || this.view == "centuries") {
            this.renderViews(D, m, s);
            return
        }
        var x = a("<table role='grid' style='width: 100%; height: 100%;' cellspacing='2' cellpadding='1' id=cellTable" + s.toString() + "><tr role='row'><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td></tr><tr role='row'><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td></tr><tr role='row'><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td></tr><tr role='row'><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td></tr><tr role='row'><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td></tr><tr role='row'><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td></tr></table>");
        var y = this.table;
        if (q == undefined) {
            var g = y.find("#cellTable" + s.toString());
            if (g != null) {
                g.remove()
            }
            y.append(x)
        }
        var l = m;
        var b = this.showDayNames ? 1 : 0;
        var f = this.showWeekNumbers ? 1 : 0;
        var d = new Array();
        var t = 0;
        var v = (D.width() - this.rowHeaderWidth - 2) / 7;
        if (!this.showWeekNumbers) {
            v = (D.width() - 2) / 7
        }
        v = parseInt(v);
        var A = new a.jqx._jqxDateTimeInput.getDateTime(new Date());
        for (var w = 0; w < 6; w++) {
            for (var u = 0; u < 7; u++) {
                var e = w + 1;
                var o = u;
                if (this.rtl) {
                    o = 6 - o
                }
                var z = o + 1;
                var p = "#cell" + e + z + this.element.id;
                var C = new Date(l.dateTime.getFullYear(), l.dateTime.getMonth(), l.dateTime.getDate());
                var c = new a.jqx._jqxCalendar.cell(C);
                var n = a(x[0].rows[w].cells[z - 1]);
                n[0].id = p.substring(1);
                c.isVisible = true;
                c.isDisabled = false;
                if (l.month != this.value.month) {
                    c.isOtherMonth = true;
                    c.isVisible = this.showOtherMonthDays
                }
                if (C < this.getMinDate() || C > this.getMaxDate()) {
                    c.isDisabled = true
                }
                if (l.month == A.month && l.day == A.day && l.year == A.year) {
                    c.isToday = true
                }
                if (l.isWeekend()) {
                    c.isWeekend = true
                }
                c.element = n;
                c.row = b;
                c.column = f;
                a.jqx.utilities.html(n, l.day);
                l = new a.jqx._jqxDateTimeInput.getDateTime(new Date(l._addDays(1)));
                a.data(this.element, "cellContent" + p.substring(1), c);
                a.data(this.element, "" + p.substring(1), c);
                var E = this;
                this.addHandler(n, "mousedown", function (I) {
                    if (!E.readOnly && !E.disabled) {
                        var H = a(I.target);
                        var j = a.data(E.element, H[0].id);
                        var i = E._raiseEvent(3, I);
                        if (j != null && j != undefined) {
                            var r = j.getDate();
                            if (E.getMinDate() <= r && r <= E.getMaxDate()) {
                                if (!j.isDisabled) {
                                    if (j.isOtherMonth && E.enableAutoNavigation) {
                                        if (j.row < 2) {
                                            E.navigateBackward()
                                        } else {
                                            E.navigateForward()
                                        }
                                        E._selectDate(j.getDate(), "mouse", I.shiftKey)
                                    } else {
                                        var F = new Date(E.getDate());
                                        E._selectDate(j.getDate(), "mouse", I.shiftKey);
                                        E.value._setYear(r.getFullYear());
                                        E.value._setDay(1);
                                        E.value._setMonth(r.getMonth() + 1);
                                        E.value._setDay(r.getDate());
                                        var G = E.host.find(".jqx-calendar-month");
                                        G.stop();
                                        G.css("margin-left", "0px");
                                        var k = E.getDate();
                                        E._raiseEvent("2");
                                        if (j.isOtherMonth) {
                                            E._raiseEvent("5", {selectionType: "mouse"})
                                        }
                                    }
                                }
                            }
                        }
                        return false
                    }
                });
                if (!E.disabled) {
                    var h = function (F, j) {
                        if (!E.readOnly) {
                            var r = a(F.target);
                            var i = a.data(E.element, r[0].id);
                            if (i != null && i != undefined) {
                                var k = i.getDate();
                                if (E.getMinDate() <= k && k <= E.getMaxDate()) {
                                    i.isHighlighted = j;
                                    E._applyCellStyle(i, i.element, r)
                                }
                            }
                        }
                    };
                    this.addHandler(n, "mouseenter", function (i) {
                        h(i, true);
                        return false
                    });
                    this.addHandler(n, "mouseleave", function (i) {
                        h(i, false);
                        return false
                    })
                }
                f++;
                d[t] = c;
                t++
            }
            f = 0;
            b++
        }
        var B = a.data(this.element, D[0].id);
        if (B != undefined && B != null) {
            B.cells = d
        }
        this.renderedCells = d;
        if (q != undefined) {
            this._addCellsTable(y, x)
        }
        this._applyCellStyles();
        this._refreshOtherMonthRows(B, s)
    }, setMaxDate: function (b) {
        if (b != null && typeof (b) == "string") {
            b = new Date(b);
            if (b == "Invalid Date") {
                return
            }
        }
        this.maxDate = a.jqx._jqxDateTimeInput.getDateTime(b);
        this.render()
    }, getMaxDate: function () {
        if (this.maxDate != null && this.maxDate != undefined) {
            return this.maxDate.dateTime
        }
        return null
    }, setMinDate: function (b) {
        if (b != null && typeof (b) == "string") {
            b = new Date(b);
            if (b == "Invalid Date") {
                return
            }
        }
        this.minDate = a.jqx._jqxDateTimeInput.getDateTime(b);
        this.render()
    }, getMinDate: function () {
        if (this.minDate != null && this.minDate != undefined) {
            return this.minDate.dateTime
        }
        return null
    }, navigateTo: function (f, h) {
        if (this.view == "month") {
            var g = this.getMinDate();
            var c = new Date(this.getMaxDate().getFullYear(), this.getMaxDate().getMonth() + 1, this.getMaxDate().getDate());
            if ((f < this._getYearAndMonthPart(g)) || (f > this._getYearAndMonthPart(c))) {
                return false
            }
        } else {
            if (f.getFullYear() < this.getMinDate().getFullYear() || f.getFullYear() > this.getMaxDate().getFullYear()) {
                return false
            }
        }
        if (f == null) {
            return false
        }
        if (h == undefined) {
            var i = this;
            if (this._animating) {
                return
            }
            this._animating = true;
            var d = this.host.find(".jqx-calendar-month-container");
            if (this._viewClone) {
                this._viewClone.stop();
                this._viewClone.remove()
            }
            if (this._newViewClone) {
                this._newViewClone.stop();
                this._newViewClone.remove()
            }
            var k = this.host.find(".jqx-calendar-month");
            k.stop();
            k.css("margin-left", "0px");
            var b = k.clone();
            this._viewClone = b;
            var j = new Date(this.value.dateTime);
            this.value._setYear(f.getFullYear());
            this.value._setDay(f.getDate());
            this.value._setMonth(f.getMonth() + 1);
            i.refreshControl();
            d.css("position", "relative");
            b.css("position", "absolute");
            b.css("top", k.position().top);
            d.append(b);
            if (a.jqx.browser.msie && a.jqx.browser.version < 8) {
                this.month.css("position", "relative");
                this.month.css("overflow", "hidden");
                this.table.css("position", "relative");
                this.table.css("overflow", "hidden")
            }
            var e = -this.host.width();
            if (f < j) {
                if (this.view == "month" && f.getMonth() != j.getMonth()) {
                    e = this.host.width()
                } else {
                    if (f.getFullYear() != j.getFullYear()) {
                        e = this.host.width()
                    }
                }
            }
            b.animate({marginLeft: parseInt(e) + "px"}, this.navigationDelay, function () {
                b.remove()
            });
            var l = k.clone();
            this._newViewClone = l;
            l.css("position", "absolute");
            l.css("top", k.position().top);
            d.append(l);
            l.css("margin-left", -e);
            k.css("visibility", "hidden");
            l.animate({marginLeft: "0px"}, this.navigationDelay, function () {
                l.remove();
                k.css("visibility", "visible");
                i._animating = false
            })
        } else {
            this.value._setYear(f.getFullYear());
            this.value._setDay(f.getDate());
            this.value._setMonth(f.getMonth() + 1);
            var k = this.host.find(".jqx-calendar-month");
            k.stop();
            k.css("margin-left", "0px");
            this.refreshControl()
        }
        this._raiseEvent("2");
        this._raiseEvent("8");
        return true
    }, setDate: function (b) {
        if (b != null && typeof (b) == "string") {
            b = new Date(b)
        }
        if (this.canRender == false) {
            this.canRender = true;
            this.render()
        }
        this.navigateTo(b, "api");
        this._selectDate(b);
        if (this.selectionMode == "range") {
            this._selectDate(b, "mouse")
        }
        return true
    }, val: function (b) {
        if (arguments.length != 0) {
            if (b == null) {
                this.setDate(null)
            }
            if (b instanceof Date) {
                this.setDate(b)
            }
            if (typeof (b) == "string") {
                this.setDate(b)
            }
        }
        return this.getDate()
    }, getDate: function () {
        if (this.selectedDate == undefined) {
            return new Date()
        }
        return this.selectedDate
    }, getValue: function () {
        if (this.value == undefined) {
            return new Date()
        }
        return this.value.dateTime
    }, setRange: function (c, b) {
        if (this.canRender == false) {
            this.canRender = true;
            this.render()
        }
        this.navigateTo(c, "api");
        this._selectDate(c, "mouse");
        this._selectDate(b, "mouse")
    }, getRange: function () {
        return this.selection
    }, _selectDate: function (e, h, b) {
        if (this.selectionMode == "none") {
            return
        }
        if (h == null || h == undefined) {
            h = "none"
        }
        if (b == null || b == undefined) {
            b = false
        }
        var i = a.data(this.element, "View" + this.element.id);
        if (i == undefined || i == null) {
            return
        }
        var d = this;
        if (this.input) {
            if (e != null) {
                this.input.val(e.toString())
            } else {
                this.input.val("")
            }
        }
        var g = this.selectedDate;
        this.selectedDate = e;
        if (this.view != "month") {
            if (g != e) {
                this._raiseEvent(7)
            }
            a.each(this.renderedCells, function (n) {
                var j = this;
                var o = j.getDate();
                var k = a(j.element);
                var m = k.find("#cellContent" + k[0].id);
                if (e == null) {
                    j.isSelected = false;
                    j.isDisabled = false
                } else {
                    j.isSelected = false;
                    if (o) {
                        if ((o.getMonth() == e.getMonth() && d.view == "year") || (d.view == "decade" && o.getFullYear() == e.getFullYear())) {
                            j.isSelected = true;
                            try {
                                j.element.focus()
                            } catch (l) {
                            }
                        }
                    }
                }
                d._applyCellStyle(j, k, k)
            });
            return
        }
        if (this.view == "month") {
            if (this.selectionMode == "range" && h == "key") {
                var f = this.getVisibleDate();
                var c = this.getFirstDayOfWeek(f);
                this.refreshCalendarCells(this.month, c, "View" + this.element.id)
            }
        }
        a.each(this.renderedCells, function (p) {
            var u = this;
            var m = u.getDate();
            var t = a(u.element);
            var j = t;
            if (t.length == 0) {
                return false
            }
            if (e == null) {
                u.isSelected = false;
                u.isDisabled = false;
                if (p == 0) {
                    d.selection = {from: null, to: null};
                    d._raiseEvent("2");
                    d._raiseEvent("5", {selectionType: h})
                }
            } else {
                if (d.selectionMode != "range" || h == "key") {
                    if (m.getDate() == e.getDate() && m.getMonth() == e.getMonth() && m.getFullYear() == e.getFullYear() && u.isSelected) {
                        d._applyCellStyle(u, t, j);
                        d._raiseEvent("5", {selectionType: h});
                        return
                    }
                    if (u.isSelected) {
                        d._raiseEvent("6", {selectionType: h})
                    }
                    u.isSelected = false;
                    if (m.getDate() == e.getDate() && m.getMonth() == e.getMonth() && m.getFullYear() == e.getFullYear()) {
                        u.isSelected = true;
                        if (p == 0) {
                            d.selection = {date: e}
                        }
                        try {
                            u.element.focus()
                        } catch (q) {
                        }
                        if (!u.isOtherMonth) {
                            d.value._setMonth(e.getMonth() + 1);
                            d.value._setDay(e.getDate());
                            d.value._setYear(e.getFullYear());
                            d._raiseEvent("2");
                            d._raiseEvent("5", {selectionType: h})
                        }
                    }
                    if (d.selectionMode == "range") {
                        d._clicks = 0;
                        d.selection = {from: e, to: e}
                    }
                } else {
                    if (d.selectionMode == "range") {
                        if (h == "view") {
                            u.isSelected = false;
                            u.isDisabled = false;
                            if (d.getMaxDate() < m) {
                                u.isDisabled = true
                            }
                            if (d.getMinDate() > m) {
                                u.isDisabled = true
                            }
                            d._applyCellStyle(u, t, j);
                            return true
                        }
                        if (p == 0) {
                            if (h != "none") {
                                if (d._clicks == undefined) {
                                    d._clicks = 0
                                }
                                d._clicks++;
                                if (b) {
                                    d._clicks++
                                }
                                if (d._clicks == 1) {
                                    d.selection = {from: e, to: e}
                                } else {
                                    var s = d.selection.from;
                                    var o = s <= e ? s : e;
                                    var r = s <= e ? e : s;
                                    if (o) {
                                        var k = new Date(o.getFullYear(), o.getMonth(), o.getDate())
                                    }
                                    if (r) {
                                        var l = new Date(r.getFullYear(), r.getMonth(), r.getDate(), 23, 59, 59)
                                    }
                                    d.selection = {from: k, to: l};
                                    d._clicks = 0
                                }
                            } else {
                                if (d.selection == null || d.selection.from == null) {
                                    d.selection = {from: e, to: e};
                                    if (d._clicks == undefined) {
                                        d._clicks = 0
                                    }
                                    d._clicks++;
                                    if (d._clicks == 2) {
                                        d._clicks = 0
                                    }
                                }
                            }
                        }
                        var n = function (w) {
                            if (w == null) {
                                return new Date()
                            }
                            var v = new Date();
                            v.setHours(0, 0, 0, 0);
                            v.setFullYear(w.getFullYear(), w.getMonth(), w.getDate());
                            return v
                        };
                        if (!u.isOtherMonth && n(m).toString() == n(e).toString()) {
                            d.value._setMonth(e.getMonth() + 1);
                            d.value._setDay(e.getDate());
                            d.value._setYear(e.getFullYear());
                            d._raiseEvent("2");
                            d._raiseEvent("5", {selectionType: h})
                        }
                        u.isSelected = false;
                        u.isDisabled = false;
                        if (n(m) < n(d.selection.from) && d._clicks == 1) {
                            u.isDisabled = true
                        }
                        if (d.getMaxDate() < m) {
                            u.isDisabled = true
                        }
                        if (d.getMinDate() > m) {
                            u.isDisabled = true
                        }
                        if (n(m) >= n(d.selection.from) && n(m) <= n(d.selection.to)) {
                            u.isSelected = true
                        }
                    }
                }
            }
            d._applyCellStyle(u, t, j)
        });
        if (d.selectionMode == "range" && d._clicks == 0) {
            d._raiseEvent(7);
            return
        } else {
            if (d.selectionMode == "range") {
                return
            }
        }
        if (g != e) {
            d._raiseEvent(7)
        }
    }, _getSelectedDate: function () {
        var d = a.data(this.element, "View" + this.element.id);
        if (d == undefined || d == null) {
            return
        }
        if (this.view != "month") {
            return this.selectedDate
        }
        for (var c = 0; c < d.cells.length; c++) {
            var b = d.cells[c];
            var e = b.getDate();
            if (b.isSelected) {
                return e
            }
        }
        if (this.selectedDate) {
            return this.selectedDate
        }
    }, _getSelectedCell: function () {
        var d = a.data(this.element, "View" + this.element.id);
        if (d == undefined || d == null) {
            return
        }
        for (var c = 0; c < d.cells.length; c++) {
            var b = d.cells[c];
            var e = b.getDate();
            if (b.isSelected) {
                return b
            }
        }
    }, _applyCellStyle: function (b, c, e) {
        var d = this;
        if (e == null || (e != null && e.length == 0)) {
            e = c
        }
        e.removeClass();
        e[0].className = "";
        e.addClass(this.toThemeProperty("jqx-rc-all"));
        if (this.disabled || b.isDisabled) {
            e.addClass(this.toThemeProperty("jqx-calendar-cell-disabled"));
            e.addClass(this.toThemeProperty("jqx-fill-state-disabled"))
        }
        if (b.isOtherMonth && this.enableOtherMonthDays && b.isVisible) {
            e.addClass(this.toThemeProperty("jqx-calendar-cell-othermonth"))
        }
        if (b.isWeekend && this.enableWeekend && b.isVisible && b.isVisible) {
            e.addClass(this.toThemeProperty("jqx-calendar-cell-weekend"))
        }
        if (!b.isVisible) {
            e.addClass(this.toThemeProperty("jqx-calendar-cell-hidden"))
        } else {
            e.addClass(this.toThemeProperty("jqx-calendar-cell"));
            if (this.view != "month") {
                if (e.length > 0 && e.html().toLowerCase().indexOf("span") != -1) {
                    e.css("cursor", "default")
                }
            }
        }
        e.removeAttr("aria-selected");
        if (b.isSelected && b.isVisible) {
            e.addClass(this.toThemeProperty("jqx-calendar-cell-selected"));
            e.addClass(this.toThemeProperty("jqx-fill-state-pressed"));
            e.attr("aria-selected", true);
            this.host.removeAttr("aria-activedescendant").attr("aria-activedescendant", e[0].id)
        }
        if (b.isHighlighted && b.isVisible && this.enableHover) {
            if (!b.isDisabled) {
                e.addClass(this.toThemeProperty("jqx-calendar-cell-hover"));
                e.addClass(this.toThemeProperty("jqx-fill-state-hover"))
            }
        }
        e.addClass(this.toThemeProperty("jqx-calendar-cell-" + this.view));
        if (b.isToday && b.isVisible) {
            e.addClass(this.toThemeProperty("jqx-calendar-cell-today"))
        }
        if (this.specialDates.length > 0) {
            var f = this;
            a.each(this.specialDates, function () {
                if (this.Class != undefined && this.Class != null && this.Class != "") {
                    e.removeClass(this.Class)
                } else {
                    e.removeClass(d.toThemeProperty("jqx-calendar-cell-specialDate"))
                }
                var g = b.getDate();
                if (g.getFullYear() == this.Date.getFullYear() && g.getMonth() == this.Date.getMonth() && g.getDate() == this.Date.getDate()) {
                    if (b.tooltip == null && this.Tooltip != null) {
                        b.tooltip = this.Tooltip;
                        if (a(e).jqxTooltip) {
                            var h = this.Class;
                            a(e).jqxTooltip({value: {cell: b, specialDate: this.Date}, name: f.element.id, content: this.Tooltip, position: "mouse", theme: f.theme, opening: function (i) {
                                if (e.hasClass(d.toThemeProperty("jqx-calendar-cell-specialDate"))) {
                                    return true
                                }
                                if (e.hasClass(h)) {
                                    return true
                                }
                                return false
                            }})
                        }
                    }
                    e.removeClass(d.toThemeProperty("jqx-calendar-cell-othermonth"));
                    e.removeClass(d.toThemeProperty("jqx-calendar-cell-weekend"));
                    if (this.Class == undefined || this.Class == "") {
                        e.addClass(d.toThemeProperty("jqx-calendar-cell-specialDate"));
                        return false
                    } else {
                        e.addClass(this.Class);
                        return false
                    }
                }
            })
        }
    }, _applyCellStyles: function () {
        var f = a.data(this.element, "View" + this.element.id);
        if (f == undefined || f == null) {
            return
        }
        for (var e = 0; e < f.cells.length; e++) {
            var b = f.cells[e];
            var c = a(b.element);
            var d = c.find("#cellContent" + c[0].id);
            if (d.length == 0) {
                d = c
            }
            this._applyCellStyle(b, c, d)
        }
    }, getWeekOfYear: function (c) {
        var b = c.dayOfYear(c.dateTime) - 1;
        var d = c.dayOfWeek - (b % 7);
        var e = ((d - this.firstDayOfWeek) + 14) % 7;
        return Math.ceil((((b + e) / 7) + 1))
    }, renderColumnHeader: function (w) {
        if (!this.showDayNames) {
            return
        }
        var t = a("<table role='grid' style='border-spacing: 0px; border-collapse: collapse; width: 100%; height: 100%;' cellspacing='0' cellpadding='1'><tr role='row'><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td><td role='gridcell'></td></tr></table>");
        t.find("table").addClass(this.toThemeProperty("jqx-reset"));
        t.find("tr").addClass(this.toThemeProperty("jqx-reset"));
        t.find("td").css({background: "transparent", padding: 1, margin: 0, border: "none"});
        t.addClass(this.toThemeProperty("jqx-reset"));
        t.addClass(this.toThemeProperty("jqx-calendar-column-header"));
        this.columnHeader.append(t);
        var d = this.getVisibleDate();
        var h = this.getFirstDayOfWeek(d);
        var m = h.dayOfWeek;
        var x = this.getWeekOfYear(h);
        var q = this.firstDayOfWeek;
        var v = this.localization.calendar.days.names;
        var n = new Array();
        var g = h;
        var o = (w.width() - this.rowHeaderWidth - 2) / 7;
        if (!this.showWeekNumbers) {
            o = (w.width() - 2) / 7
        }
        for (var s = 0; s < 7; s++) {
            var f = v[q];
            if (this.rtl) {
                f = v[6 - q]
            }
            switch (this.dayNameFormat) {
                case"default":
                    f = this.localization.calendar.days.namesAbbr[q];
                    break;
                case"shortest":
                    f = this.localization.calendar.days.namesShort[q];
                    break;
                case"firstTwoLetters":
                    f = f.substring(0, 2);
                    break;
                case"firstLetter":
                    f = f.substring(0, 1);
                    break
            }
            var b = new a.jqx._jqxCalendar.cell(g.dateTime);
            var k = s + 1;
            var l = k + this.element.id;
            var j = a(t[0].rows[0].cells[s]);
            var p = s;
            if (this.enableTooltips) {
                if (a(j).jqxTooltip) {
                    a(j).jqxTooltip({name: this.element.id, content: v[q], theme: this.theme, position: "mouse"})
                }
            }
            if (q >= 6) {
                q = 0
            } else {
                q++
            }
            s = p;
            b.element = j;
            b.row = 0;
            b.column = s + 1;
            var e = this._textwidth(f);
            var c = "<div style='padding: 0; margin: 0; border: none; background: transparent;' id='columnCell" + l + "'>" + f + "</div>";
            j.append(c);
            j.find("#columnCell" + l).addClass(this.toThemeProperty("jqx-calendar-column-cell"));
            j.width(o);
            if (this.disabled) {
                j.find("#columnCell" + l).addClass(this.toThemeProperty("jqx-calendar-column-cell-disabled"))
            }
            if (e > 0 && o > 0) {
                while (e > j.width()) {
                    if (f.length == 0) {
                        break
                    }
                    f = f.substring(0, f.length - 1);
                    a.jqx.utilities.html(j.find("#columnCell" + l), f);
                    e = this._textwidth(f)
                }
            }
            n[s] = b;
            g = new a.jqx._jqxDateTimeInput.getDateTime(new Date(g._addDays(1)))
        }
        if (parseInt(this.columnHeader.width()) > parseInt(this.host.width())) {
            this.columnHeader.width(this.host.width())
        }
        var u = a.data(this.element, w[0].id);
        u.columnCells = n
    }, _format: function (d, e, b) {
        var f = false;
        try {
            if (Globalize != undefined) {
                f = true
            }
        } catch (c) {
        }
        if (a.global) {
            a.global.culture.calendar = this.localization.calendar;
            return a.global.format(d, e, this.culture)
        } else {
            if (f) {
                try {
                    if (Globalize.cultures[this.culture]) {
                        Globalize.cultures[this.culture].calendar = this.localization.calendar;
                        return Globalize.format(d, e, this.culture)
                    } else {
                        return Globalize.format(d, e, this.culture)
                    }
                } catch (c) {
                    return Globalize.format(d, e)
                }
            } else {
                if (a.jqx.dataFormat) {
                    return a.jqx.dataFormat.formatdate(d, e, this.localization.calendar)
                }
            }
        }
    }, _textwidth: function (d) {
        var c = a("<span>" + d + "</span>");
        c.addClass(this.toThemeProperty("jqx-calendar-column-cell"));
        a(this.host).append(c);
        var b = c.width();
        c.remove();
        return b
    }, _textheight: function (d) {
        var c = a("<span>" + d + "</span>");
        a(this.host).append(c);
        var b = c.height();
        c.remove();
        return b
    }, _renderRowHeader: function (k) {
        var g = this.getVisibleDate();
        var c = this.getFirstDayOfWeek(g);
        var f = c.dayOfWeek;
        var q = this.getWeekOfYear(c);
        var l = a("<table style='overflow: hidden; width: 100%; height: 100%;' cellspacing='0' cellpadding='1'><tr><td></td></tr><tr><td/></tr><tr><td/></tr><tr><td/></tr><tr><td/></tr><tr><td/></tr></table>");
        l.find("table").addClass(this.toThemeProperty("jqx-reset"));
        l.find("td").addClass(this.toThemeProperty("jqx-reset"));
        l.find("tr").addClass(this.toThemeProperty("jqx-reset"));
        l.addClass(this.toThemeProperty("jqx-calendar-row-header"));
        l.width(this.rowHeaderWidth);
        this.rowHeader.append(l);
        var d = c;
        var p = new Array();
        for (var h = 0; h < 6; h++) {
            var e = q.toString();
            var o = new a.jqx._jqxCalendar.cell(d.dateTime);
            var j = h + 1 + this.element.id;
            var n = a(l[0].rows[h].cells[0]);
            o.element = n;
            o.row = h;
            o.column = 0;
            var b = "<div style='background: transparent; border: none; padding: 0; margin: 0;' id ='headerCellContent" + j + "'>" + e + "</div>";
            n.append(b);
            n.find("#headerCellContent" + j).addClass(this.toThemeProperty("jqx-calendar-row-cell"));
            p[h] = o;
            d = new a.jqx._jqxDateTimeInput.getDateTime(new Date(d._addWeeks(1)));
            q = this.getWeekOfYear(d)
        }
        var m = a.data(this.element, k[0].id);
        m.rowCells = p
    }, getFirstDayOfWeek: function (e) {
        var d = e;
        if (this.firstDayOfWeek < 0 || this.firstDayOfWeek > 6) {
            this.firstDayOfWeek = 6
        }
        var c = d.dayOfWeek - this.firstDayOfWeek;
        if (c <= 0) {
            c += 7
        }
        var b = a.jqx._jqxDateTimeInput.getDateTime(d._addDays(-c));
        return b
    }, getVisibleDate: function () {
        var c = new a.jqx._jqxDateTimeInput.getDateTime(new Date(this.value.dateTime));
        if (c < this.minDate) {
            c = this.minDate
        }
        if (c > this.maxDate) {
            this.visibleDate = this.maxDate
        }
        c.dateTime.setHours(0);
        var d = c.day;
        var b = a.jqx._jqxDateTimeInput.getDateTime(c._addDays(-d + 1));
        c = b;
        return c
    }, destroy: function (b) {
        this.host.removeClass();
        if (b != false) {
            this.host.remove()
        }
    }, _raiseEvent: function (i, c) {
        if (c == undefined) {
            c = {owner: null}
        }
        var e = this.events[i];
        var f = c ? c : {};
        f.owner = this;
        var g = new jQuery.Event(e);
        g.owner = this;
        g.args = f;
        if (i == 0 || i == 1 || i == 2 || i == 3 || i == 4 || i == 5 || i == 6 || i == 7 || i == 8) {
            g.args.date = g.args.selectedDate = this.getDate();
            g.args.range = this.getRange();
            var h = this.getViewStart();
            var d = this.getViewEnd();
            g.args.view = {from: h, to: d}
        }
        var b = this.host.trigger(g);
        if (i == 0 || i == 1) {
            b = false
        }
        return b
    }, propertyMap: function (b) {
        if (b == "value") {
            if (this.selectionMode != "range") {
                return this.getDate()
            } else {
                return this.getRange()
            }
        }
        return null
    }, updateSize: function () {
        var d = this.host.find("#View" + this.element.id);
        if (d.length > 0) {
            this.setCalendarSize();
            if (this.height != undefined && !isNaN(this.height)) {
                d.height(this.height)
            } else {
                if (this.height != null && this.height.toString().indexOf("px") != -1) {
                    d.height(this.height)
                }
            }
            if (this.width != undefined && !isNaN(this.width)) {
                d.width(this.width)
            } else {
                if (this.width != null && this.width.toString().indexOf("px") != -1) {
                    d.width(this.width)
                }
            }
            var c = this.host.height() - this.titleHeight - this.columnHeaderHeight;
            var b = "View" + this.element.id;
            d.find("#cellsTable" + b).height(c);
            d.find("#calendarRowHeader" + b).height(c);
            this.refreshControl()
        }
    }, clear: function () {
        if (this.selectionMode == "range") {
            this._clicks = 1;
            this.setRange(null, null);
            this._raiseEvent(7)
        } else {
            this.setDate(null, "mouse")
        }
        this._clicks = 0;
        this.selection = {from: null, to: null}
    }, today: function () {
        if (this.selectionMode == "range") {
            this.setRange(new Date(), new Date())
        } else {
            this.setDate(new Date(), "mouse")
        }
    }, propertyChangedHandler: function (d, e, g, f) {
        if (this.isInitialized == undefined || this.isInitialized == false) {
            return
        }
        if (e == "enableHover") {
            return
        }
        if (e == "keyboardNavigation") {
            return
        }
        if (e == "localization") {
            if (this.localization) {
                if (this.localization.backString) {
                    this.backText = this.localization.backString
                }
                if (this.localization.forwardString) {
                    this.forwardText = this.localization.forwardString
                }
                if (this.localization.todayString) {
                    this.todayString = this.localization.todayString
                }
                if (this.localization.clearString) {
                    this.clearString = this.localization.clearString
                }
                this.firstDayOfWeek = this.localization.calendar.firstDay
            }
        }
        if (e == "culture") {
            try {
                if (a.global) {
                    a.global.preferCulture(d.culture);
                    d.localization.calendar = a.global.culture.calendar
                } else {
                    if (Globalize) {
                        var b = Globalize.culture(d.culture);
                        d.localization.calendar = b.calendar
                    }
                }
            } catch (c) {
            }
        }
        if (e == "showFooter") {
            this.render()
        }
        if (e == "width" || e == "height") {
            d.updateSize();
            return
        } else {
            if (e == "theme") {
                a.jqx.utilities.setTheme(g, f, this.host)
            } else {
                this.view = "month";
                this.render()
            }
        }
    }})
})(jQuery);
(function (a) {
    a.jqx._jqxCalendar.cell = function (c) {
        var b = {dateTime: new a.jqx._jqxDateTimeInput.getDateTime(c), _date: c, getDate: function () {
            return this._date
        }, setDate: function (d) {
            this.dateTime = new a.jqx._jqxDateTimeInput.getDateTime(d);
            this._date = d
        }, isToday: false, isWeekend: false, isOtherMonth: false, isVisible: true, isSelected: false, isHighlighted: false, element: null, row: -1, column: -1, tooltip: null};
        return b
    };
    a.jqx._jqxCalendar.monthView = function (c, h, d, b, f, e) {
        var g = {start: c, end: h, cells: d, rowCells: b, columnCells: f, element: e};
        return g
    }
})(jQuery);