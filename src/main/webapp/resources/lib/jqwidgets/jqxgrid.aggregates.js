/*
 jQWidgets v3.1.0 (2013-Dec-23)
 Copyright (c) 2011-2014 jQWidgets.
 License: http://jqwidgets.com/license/
 */

(function (a) {
    a.extend(a.jqx._jqxGrid.prototype, {_calculateaggregate: function (g, j, h, c) {
        var f = g.aggregates;
        if (!f) {
            f = j
        }
        if (f) {
            var e = new Array();
            for (var d = 0; d < f.length; d++) {
                if (f[d] == "count") {
                    continue
                }
                e[e.length] = g.cellsformat
            }
            if (this.source && this.source.getAggregatedData) {
                if (c == undefined) {
                    c = this.getrows()
                }
                if (this.virtualmode) {
                    var c = new Array();
                    a.each(this.source._source.records, function () {
                        c.push(this)
                    })
                }
                if (h == undefined || h == true) {
                    var b = this.source.getAggregatedData([
                        {name: g.datafield, aggregates: f, formatStrings: e}
                    ], this.gridlocalization, c);
                    return b
                } else {
                    var b = this.source.getAggregatedData([
                        {name: g.datafield, aggregates: f}
                    ], this.gridlocalization, c);
                    return b
                }
            }
        }
        return null
    }, getcolumnaggregateddata: function (c, g, h, d) {
        var e = this.getcolumn(c);
        var j = (h == undefined || h == false) ? false : h;
        if (g == null) {
            return""
        }
        var b = e.aggregates;
        e.aggregates = null;
        var i = this._calculateaggregate(e, g, j, d);
        var f = {};
        if (i) {
            f = i[c]
        }
        e.aggregates = b;
        return f
    }, refreshaggregates: function () {
        this._updatecolumnsaggregates()
    }, renderaggregates: function () {
        this._updateaggregates()
    }, _updatecolumnaggregates: function (d, g, b) {
        var e = this;
        if (!g) {
            b.children().remove();
            b.html("");
            if (d.aggregatesrenderer) {
                var f = {};
                if (d.aggregates) {
                    f = this.getcolumnaggregateddata(d.datafield, d.aggregates)
                }
                var c = d.aggregatesrenderer({}, d, b, null);
                b.html(c)
            }
            return
        }
        b.children().remove();
        b.html("");
        if (d.aggregatesrenderer) {
            if (g) {
                var c = d.aggregatesrenderer(g[d.datafield], d, b, this.getcolumnaggregateddata(d.datafield, g[d.datafield]));
                b.html(c)
            }
        } else {
            a.each(g, function () {
                var i = this;
                for (f in i) {
                    var j = a('<div style="position: relative; margin: 4px; overflow: hidden;"></div>');
                    var h = f;
                    h = e._getaggregatename(h);
                    j.html(h + ":" + i[f]);
                    if (e.rtl) {
                        j.addClass(e.toThemeProperty("jqx-rtl"))
                    }
                    b.append(j)
                }
            })
        }
    }, _getaggregatetype: function (c) {
        switch (c) {
            case"min":
            case"max":
            case"count":
            case"avg":
            case"product":
            case"var":
            case"varp":
            case"stdev":
            case"stdevp":
            case"sum":
                return c
        }
        var b = c;
        for (var d in c) {
            b = d;
            break
        }
        return b
    }, _getaggregatename: function (c) {
        var b = c;
        switch (c) {
            case"min":
                b = "Min";
                break;
            case"max":
                b = "Max";
                break;
            case"count":
                b = "Count";
                break;
            case"avg":
                b = "Avg";
                break;
            case"product":
                b = "Product";
                break;
            case"var":
                b = "Var";
                break;
            case"stdevp":
                b = "StDevP";
                break;
            case"stdev":
                b = "StDev";
                break;
            case"varp":
                b = "VarP";
            case"sum":
                b = "Sum";
                break
        }
        if (c === b && typeof (b) != "string") {
            for (var d in c) {
                b = d;
                break
            }
        }
        return b
    }, _updatecolumnsaggregates: function () {
        var f = this.getrows();
        var b = this.columns.records.length;
        if (undefined != this.statusbar[0].cells) {
            for (var e = 0; e < b; e++) {
                var g = a(this.statusbar[0].cells[e]);
                var d = this.columns.records[e];
                var c = this._calculateaggregate(d, null, true, f);
                this._updatecolumnaggregates(d, c, g)
            }
        }
    }, _updateaggregates: function () {
        var b = a('<div style="position: relative;" id="statusrow' + this.element.id + '"></div>');
        var d = 0;
        var k = this.columns.records.length;
        var i = this.toThemeProperty("jqx-grid-cell");
        if (this.rtl) {
            i += " " + this.toThemeProperty("jqx-grid-cell-rtl");
            d = -1
        }
        i += " " + this.toThemeProperty("jqx-grid-cell-pinned");
        var l = k + 10;
        var m = new Array();
        this.statusbar[0].cells = m;
        for (var f = 0; f < k; f++) {
            var e = this.columns.records[f];
            var g = this._calculateaggregate(e);
            var c = e.width;
            if (c < e.minwidth) {
                c = e.minwidth
            }
            if (c > e.maxwidth) {
                c = e.maxwidth
            }
            var h = a('<div style="overflow: hidden; position: absolute; height: 100%;" class="' + i + '"></div>');
            b.append(h);
            h.css("left", d);
            if (!this.rtl) {
                h.css("z-index", l--)
            } else {
                h.css("z-index", l++)
            }
            h.width(c);
            h[0].left = d;
            if (!(e.hidden && e.hideable)) {
                d += c
            } else {
                h.css("display", "none")
            }
            m[m.length] = h[0];
            this._updatecolumnaggregates(e, g, h)
        }
        if (a.jqx.browser.msie && a.jqx.browser.version < 8) {
            b.css("z-index", l--)
        }
        b.width(parseInt(d) + 2);
        b.height(this.statusbarheight);
        this.statusbar.children().remove();
        this.statusbar.append(b);
        this.statusbar.removeClass(this.toThemeProperty("jqx-widget-header"));
        this.statusbar.addClass(i);
        this.statusbar.css("border-bottom-color", "transparent");
        this.statusbar.css("border-top-width", "1px");
        if (this.rtl && this.hScrollBar.css("visibility") != "hidden") {
            this._renderhorizontalscroll()
        }
    }})
})(jQuery);