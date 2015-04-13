/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thinkit.operationsys.vo;

import net.sf.json.JSONObject;

/**
 * RUN Luck Man
 *
 * @author qiaokai
 * @date 2014-1-3 14:51:14
 */
public class ChartInfoVo {

    String dayy;
    String total;
    String sucsum;

    public ChartInfoVo() {
    }

    public String getDayy() {
        return dayy;
    }

    public void setDayy(String dayy) {
        this.dayy = dayy;
    }

    public String getTotal() {
        return total;
    }

    public void setTotal(String total) {
        this.total = total;
    }

    public String getSucsum() {
        return sucsum;
    }

    public void setSucsum(String sucsum) {
        this.sucsum = sucsum;
    }

    public ChartInfoVo(String dayy, String total, String sucsum) {
        this.dayy = dayy;
        this.total = total;
        this.sucsum = sucsum;
    }

    public JSONObject toJSONObject() {

        ChartInfoVo bif = new ChartInfoVo(this.dayy, this.total, this.sucsum);
        JSONObject json = JSONObject.fromObject(bif);
        return json;
    }

    @Override
    public String toString() {
        return "chartInfoVo{"
                + "dayy=" + dayy
                + ", total=" + total
                + ", sucsum=" + sucsum
                + "}";
    }
}
