/*
 jQWidgets v3.1.0 (2013-Dec-23)
 Copyright (c) 2011-2014 jQWidgets.
 License: http://jqwidgets.com/license/
 */

(function (a) {
    a.extend(a.jqx._jqxGrid.prototype, {savestate: function (b) {
        var c = this.getstate();
        if (b !== undefined && !a.isEmptyObject(b)) {
            if (b.indexOf("sort") == -1) {
                delete c.sortcolumn;
                delete c.sortdirection
            }
            if (b.indexOf("pager") == -1) {
                delete c.pagenum;
                delete c.pagesizeoptions;
                delete c.pagesize
            }
            if (b.indexOf("selection") == -1) {
                delete c.selectedcells;
                delete c.selectedrowindexes;
                delete c.selectedrowindex
            }
            if (b.indexOf("grouping") == -1) {
                delete c.groups
            }
            if (b.indexOf("filter") == -1) {
                delete c.filters
            }
            a.each(this.columns.records, function (e) {
                var d = c.columns[this.datafield];
                if (b.indexOf("hidden_columns") == -1) {
                    delete d.hidden
                }
                if (b.indexOf("reorder") == -1) {
                    delete d.index
                }
                if (b.indexOf("columns_width") == -1) {
                    delete d.width
                }
                if (b.indexOf("columns_text") == -1) {
                    delete d.text
                }
                if (b.indexOf("alignment") == -1) {
                    delete d.align;
                    delete d.cellsalign
                }
            })
        }
        if (window.localStorage) {
            window.localStorage["jqxGrid" + this.element.id] = this._stringify(c)
        }
        this._savedstate = c;
        return c
    }, loadstate: function (d, j) {
        var g = "";
        if (d != undefined && d.width != undefined) {
            g = d
        } else {
            if (window.localStorage) {
                var c = window.localStorage["jqxGrid" + this.element.id];
                if (c) {
                    var g = a.parseJSON(window.localStorage["jqxGrid" + this.element.id])
                }
            } else {
                if (this._savedstate) {
                    var g = this._savedstate
                }
            }
        }
        if (g != null && g !== "") {
            if (this.virtualmode || (this.source._source.url && this.source._source.url != "")) {
                this.source.beginUpdate()
            }
            var f = g;
            if (f.width !== undefined) {
                this.width = f.width
            }
            if (f.height !== undefined) {
                this.height = f.height
            }
            if (this.pageable) {
                if (f.pagesize != undefined) {
                    this.pagesize = f.pagesize;
                    this.dataview.pagesize = f.pagesize
                }
                if (f.pagenum != undefined) {
                    this.dataview.pagenum = f.pagenum
                }
                if (f.pagesizeoptions != undefined) {
                    this.pagesizeoptions = f.pagesizeoptions
                }
                if (this.pagesizeoptions) {
                    var e = 0;
                    for (var b = 0; b < this.pagesizeoptions.length; b++) {
                        if (this.pagesize >= this.pagesizeoptions[b]) {
                            e = b
                        }
                    }
                    if (this.pagershowrowscombo) {
                        this.pagershowrowscombo.jqxDropDownList({selectedIndex: e})
                    }
                }
            }
            if (this.sortable) {
                if (f.sortdirection) {
                    if (f.sortdirection.ascending || f.sortdirection.descending) {
                        this.dataview.sortfield = f.sortcolumn;
                        var h = f.sortdirection.ascending ? "asc" : "desc";
                        this.dataview.sortfielddirection = h;
                        this.source.sortcolumn = f.sortcolumn;
                        this.source.sortdirection = h;
                        this.sortby(f.sortcolumn, h)
                    }
                } else {
                    if (this.dataview.sortfield != null && (this.dataview.sortfielddirection == "asc" || this.dataview.sortfielddirection == "desc")) {
                        this.sortby(this.dataview.sortfield, null)
                    }
                }
            }
            if (this.groupable && f.groups) {
                this.dataview.groups = f.groups;
                this.groups = f.groups
            }
            this.loadingstate = true;
            if (this.virtualsizeinfo) {
                this._loadselectionandcolumnwidths(f)
            }
            this.loadingstate = false;
            if (this.virtualmode || (this.source._source.url && this.source._source.url != "")) {
                if (j == true) {
                    this.source.endUpdate(false)
                } else {
                    this.source.endUpdate(false);
                    if (this.virtualmode || this.source._source.filter || this.source._source.sort) {
                        this.updatebounddata("state")
                    }
                }
            }
        }
    }, _loadselectionandcolumnwidths: function (h) {
        this.loadingstate = true;
        var l = "";
        if (h != undefined && h.width != undefined) {
            l = h
        } else {
            if (window.localStorage) {
                if (window.localStorage["jqxGrid" + this.element.id]) {
                    var l = a.parseJSON(window.localStorage["jqxGrid" + this.element.id])
                }
            } else {
                if (this._savedstate) {
                    var l = this._savedstate
                }
            }
        }
        if (l != null && l != "") {
            var C = this._loading;
            this._loading = false;
            var E = l;
            var D = this;
            var f = false;
            var d = [];
            d.length = 0;
            var B = [];
            a.each(this.columns.records, function (G) {
                var i = E.columns[this.datafield];
                if (i != undefined) {
                    if (this.text != i.text) {
                        f = true
                    }
                    if (this.hidden != i.hidden) {
                        f = true
                    }
                    if (i.width !== undefined) {
                        this.width = i.width;
                        if (this._width) {
                            this._width = null
                        }
                        if (this._percentagewidth) {
                            this._percentagewidth = null
                        }
                    }
                    if (i.hidden !== undefined) {
                        this.hidden = i.hidden
                    }
                    if (i.pinned !== undefined) {
                        this.pinned = i.pinned
                    }
                    if (i.groupable !== undefined) {
                        this.groupable = i.groupable
                    }
                    if (i.resizable !== undefined) {
                        this.resizable = i.resizable
                    }
                    this.draggable = i.draggable;
                    if (i.text !== undefined) {
                        this.text = i.text
                    }
                    if (i.align !== undefined) {
                        this.align = i.align
                    }
                    if (i.cellsalign !== undefined) {
                        this.cellsalign = i.cellsalign
                    }
                    if (D._columns) {
                        for (var F = 0; F < D._columns.length; F++) {
                            if (D._columns[F].datafield == this.datafield) {
                                if (i.hidden !== undefined) {
                                    if (D._columns[F]["hidden"] != undefined) {
                                        D._columns[F]["hidden"] = i.hidden
                                    }
                                }
                                if (i.width !== undefined) {
                                    if (D._columns[F]["width"] != undefined) {
                                        D._columns[F]["width"] = i.width
                                    }
                                }
                            }
                        }
                    }
                    if (i.index !== undefined) {
                        d[this.datafield] = i.index;
                        d.length++
                    }
                }
            });
            if (d.length > 0) {
                if (this.setcolumnindex) {
                    var v = this.rowdetails ? 1 : 0;
                    v += this.groupable ? this.groups.length : 0;
                    var t = new Array();
                    for (var z = 0; z < this.columns.records.length; z++) {
                        t.push(this.columns.records[z])
                    }
                    var y = 0;
                    for (var z = 0; z < t.length; z++) {
                        var j = t[z];
                        var m = d[j.datafield];
                        if (this.groupable && j.grouped) {
                            y++;
                            continue
                        }
                        if (z == 0 && this.rowdetails) {
                            y++;
                            continue
                        }
                        if (z !== m || this.groupable || this.rowdetails) {
                            D.setcolumnindex(j.datafield, y + m, false)
                        }
                    }
                }
                this.prerenderrequired = true;
                if (this.groupable) {
                    this._refreshdataview()
                }
                this.rendergridcontent(true);
                if (this._updatefilterrowui && this.filterable && this.showfilterrow) {
                    this._updatefilterrowui()
                }
                this._renderrows(this.virtualsizeinfo)
            }
            if (this.filterable && E.filters !== undefined) {
                if (this.clearfilters) {
                    this._loading = false;
                    this.clearfilters(false)
                }
                var c = "";
                var o = new a.jqx.filter();
                for (var z = 0; z < E.filters.filterscount; z++) {
                    var A = E.filters["filtercondition" + z];
                    var s = E.filters["filterdatafield" + z];
                    var j = this.getcolumn(s);
                    if (s != c) {
                        o = new a.jqx.filter()
                    }
                    c = s;
                    if (j && j.filterable) {
                        var w = E.filters["filtervalue" + z];
                        var p = E.filters["filteroperator" + z];
                        var b = E.filters["filtertype" + z];
                        if (b == "datefilter") {
                            var q = o.createfilter(b, w, A, null, j.cellsformat, this.gridlocalization)
                        } else {
                            var q = o.createfilter(b, w, A)
                        }
                        o.addfilter(p, q);
                        if (this.showfilterrow) {
                            var k = j._filterwidget;
                            var e = j._filterwidget.parent();
                            if (k != null) {
                                switch (j.filtertype) {
                                    case"number":
                                        e.find("input").val(w);
                                        if (this.host.jqxDropDownList) {
                                            var n = o.getoperatorsbyfiltertype("numericfilter");
                                            k.find(".filter").jqxDropDownList("selectIndex", n.indexOf(A))
                                        }
                                        break;
                                    case"date":
                                        if (this.host.jqxDateTimeInput) {
                                            var r = E.filters["filtervalue" + (z + 1)];
                                            var b = E.filters["filtertype" + z];
                                            var q = o.createfilter(b, r, "LESS_THAN_OR_EQUAL");
                                            o.addfilter(p, q);
                                            var x = new Date(w);
                                            var g = new Date(r);
                                            if (isNaN(x)) {
                                                x = a.jqx.dataFormat.tryparsedate(w)
                                            }
                                            if (isNaN(g)) {
                                                g = a.jqx.dataFormat.tryparsedate(w)
                                            }
                                            a(e.children()[0]).jqxDateTimeInput("setRange", x, g);
                                            z++
                                        } else {
                                            k.val(w)
                                        }
                                        break;
                                    case"textbox":
                                    case"default":
                                        k.val(w);
                                        D["_oldWriteText" + k[0].id] = w;
                                        break;
                                    case"list":
                                        if (this.host.jqxDropDownList) {
                                            var u = a(e.children()[0]).jqxDropDownList("getItems");
                                            var m = -1;
                                            a.each(u, function (F) {
                                                if (this.value == w) {
                                                    m = F;
                                                    return false
                                                }
                                            });
                                            a(e.children()[0]).jqxDropDownList("selectIndex", m)
                                        } else {
                                            k.val(w)
                                        }
                                        break;
                                    case"checkedlist":
                                        if (!this.host.jqxDropDownList) {
                                            k.val(w)
                                        }
                                        break;
                                    case"bool":
                                    case"boolean":
                                        if (!this.host.jqxCheckBox) {
                                            k.val(w)
                                        } else {
                                            a(e.children()[0]).jqxCheckBox({checked: w})
                                        }
                                        break
                                }
                            }
                        }
                        this.addfilter(s, o)
                    }
                }
                if (E.filters && E.filters.filterscount > 0) {
                    this.applyfilters();
                    if (this.showfilterrow) {
                        a.each(this.columns.records, function () {
                            if (this.filtertype == "checkedlist" && this.filterable) {
                                if (D.host.jqxDropDownList) {
                                    var J = this;
                                    var H = J._filterwidget;
                                    var M = H.jqxDropDownList("getItems");
                                    var F = H.jqxDropDownList("listBox");
                                    F.checkAll(false);
                                    if (J.filter) {
                                        F.uncheckAll(false);
                                        var L = J.filter.getfilters();
                                        for (var I = 0; I < F.items.length; I++) {
                                            var G = F.items[I].label;
                                            a.each(L, function () {
                                                if (this.condition == "NOT_EQUAL") {
                                                    return true
                                                }
                                                if (G == this.value) {
                                                    F.checkIndex(I, false, false)
                                                }
                                            })
                                        }
                                        F._updateCheckedItems();
                                        var K = F.getCheckedItems().length;
                                        if (F.items.length != K && K > 0) {
                                            F.host.jqxListBox("indeterminateIndex", 0, true, false)
                                        }
                                    }
                                }
                            }
                        })
                    }
                }
                if (this.pageable && E.pagenum !== undefined) {
                    if (this.gotopage && !this.virtualmode) {
                        this.dataview.pagenum = -1;
                        this.gotopage(E.pagenum)
                    } else {
                        if (this.gotopage && this.virtualmode) {
                            this.gotopage(E.pagenum)
                        }
                    }
                }
            }
            if (E.selectedrowindexes && E.selectedrowindexes && E.selectedrowindexes.length > 0) {
                this.selectedrowindexes = E.selectedrowindexes;
                this.selectedrowindex = E.selectedrowindex;
                if (this.selectionmode === "checkbox") {
                    this._updatecheckboxselection()
                }
            }
            if (E.selectedcells) {
                if (this._applycellselection) {
                    a.each(E.selectedcells, function () {
                        D._applycellselection(this.rowindex, this.datafield, true, false)
                    })
                }
            }
            if (this.groupable && E.groups !== undefined) {
                this._refreshdataview();
                this.render();
                this._loading = C;
                this.loadingstate = false;
                return
            }
            if (f) {
                this.prerenderrequired = true;
                this.rendergridcontent(true);
                this._loading = C;
                this.loadingstate = false;
                if (this.updating()) {
                    return false
                }
            } else {
                this._loading = C;
                this._updatecolumnwidths();
                this._updatecellwidths();
                this.loadingstate = false
            }
            this.loadingstate = false;
            this._loading = C;
            this._renderrows(this.virtualsizeinfo)
        }
        this.loadingstate = false
    }, getstate: function () {
        var p = this.getdatainformation();
        var h = {};
        h.width = this.width;
        h.height = this.height;
        h.pagenum = p.paginginformation.pagenum;
        h.pagesize = p.paginginformation.pagesize;
        h.pagesizeoptions = this.pagesizeoptions;
        h.sortcolumn = p.sortinformation.sortcolumn;
        h.sortdirection = p.sortinformation.sortdirection;
        if (this.selectionmode != null) {
            if (this.getselectedcells) {
                if (this.selectionmode.toString().indexOf("cell") != -1) {
                    var o = this.getselectedcells();
                    var q = new Array();
                    a.each(o, function () {
                        q.push({datafield: this.datafield, rowindex: this.rowindex})
                    });
                    h.selectedcells = q
                } else {
                    var n = this.getselectedrowindexes();
                    h.selectedrowindexes = n;
                    h.selectedrowindex = this.selectedrowindex
                }
            }
        }
        var i = {};
        var d = 0;
        if (this.dataview.filters) {
            for (var j = 0; j < this.dataview.filters.length; j++) {
                var e = this.dataview.filters[j].datafield;
                var b = this.dataview.filters[j].filter;
                var c = b.getfilters();
                i[e + "operator"] = b.operator;
                for (var f = 0; f < c.length; f++) {
                    c[f].datafield = e;
                    if (c[f].type == "datefilter") {
                        if (c[f].value && c[f].value.toLocaleString) {
                            var g = this.getcolumn(c[f].datafield);
                            if (g.cellsformat) {
                                var l = this.source.formatDate(c[f].value, g.cellsformat, this.gridlocalization);
                                if (l) {
                                    i["filtervalue" + d] = l
                                } else {
                                    i["filtervalue" + d] = c[f].value.toLocaleString()
                                }
                            } else {
                                i["filtervalue" + d] = c[f].value.toLocaleString()
                            }
                        } else {
                            i["filtervalue" + d] = c[f].value
                        }
                    } else {
                        i["filtervalue" + d] = c[f].value
                    }
                    i["filtercondition" + d] = c[f].condition;
                    i["filteroperator" + d] = c[f].operator;
                    i["filterdatafield" + d] = e;
                    i["filtertype" + d] = c[f].type;
                    d++
                }
            }
        }
        i.filterscount = d;
        h.filters = i;
        h.groups = this.groups;
        h.columns = {};
        var k = 0;
        a.each(this.columns.records, function (m, r) {
            if (!this.datafield) {
                return true
            }
            var s = {};
            s.width = this.width;
            s.hidden = this.hidden;
            s.pinned = this.pinned;
            s.groupable = this.groupable;
            s.resizable = this.resizable;
            s.draggable = this.draggable;
            s.text = this.text;
            s.align = this.align;
            s.cellsalign = this.cellsalign;
            s.index = k++;
            h.columns[this.datafield] = s
        });
        return h
    }, _stringify: function (e) {
        if (window.JSON && typeof window.JSON.stringify === "function") {
            var d = this;
            var c = "";
            try {
                c = window.JSON.stringify(e)
            } catch (b) {
                return d._str("", {"": e})
            }
            return c
        }
        var c = this._str("", {"": e});
        return c
    }, _quote: function (b) {
        var d = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, c = {"\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\"};
        return'"' + b.replace(d, function (e) {
            var f = c[e];
            return typeof f === "string" ? f : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
        }) + '"'
    }, _stringifyArray: function (e) {
        var b = e.length, c = [], d;
        for (var d = 0; d < b; d++) {
            c.push(this._str(d, e) || "null")
        }
        return"[" + c.join(",") + "]"
    }, _stringifyObject: function (f) {
        var c = [], d, b;
        var e = this;
        for (d in f) {
            if (Object.prototype.hasOwnProperty.call(f, d)) {
                b = e._str(d, f);
                if (b) {
                    c.push(e._quote(d) + ":" + b)
                }
            }
        }
        return"{" + c.join(",") + "}"
    }, _stringifyReference: function (b) {
        switch (Object.prototype.toString.call(b)) {
            case"[object Array]":
                return this._stringifyArray(b)
        }
        return this._stringifyObject(b)
    }, _stringifyPrimitive: function (c, b) {
        switch (b) {
            case"string":
                return this._quote(c);
            case"number":
                return isFinite(c) ? c : "null";
            case"boolean":
                return c
        }
        return"null"
    }, _str: function (c, b) {
        var e = b[c], d = typeof e;
        if (e && typeof e === "object" && typeof e.toJSON === "function") {
            e = e.toJSON(c);
            d = typeof e
        }
        if (/(number|string|boolean)/.test(d) || (!e && d === "object")) {
            return this._stringifyPrimitive(e, d)
        } else {
            return this._stringifyReference(e)
        }
    }})
})(jQuery);