/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thinkit.operationsys.vo;

import net.sf.json.JSONObject;

/**
 * ��Сʱ��ȡʶ������Ϣ RUN Luck Man
 *
 * @author qiaokai
 * @date 2013-12-31 20:27:43
 */
public class AudioKeeperInfoVoCount {

    String hour;
    String sucnum;
    String total;
    String rate;

    public String getHour() {
        return hour;
    }

    public void setHour(String hour) {
        this.hour = hour;
    }

    public String getSucnum() {
        return sucnum;
    }

    public void setSucnum(String sucnum) {
        this.sucnum = sucnum;
    }

    public String getTotal() {
        return total;
    }

    public void setTotal(String total) {
        this.total = total;
    }

    public String getRate() {
        return rate;
    }

    public void setRate(String rate) {
        this.rate = rate;
    }

    public AudioKeeperInfoVoCount(String hour, String sucnum, String total, String rate) {
        this.hour = hour;
        this.sucnum = sucnum;
        this.total = total;
        if (rate.length() > 4) {
            this.rate = rate.substring(0, 4);
        } else {
            this.rate = rate;
        }

    }

    public AudioKeeperInfoVoCount() {
    }

    public JSONObject toJSONObject() {
        AudioKeeperInfoVoCount aki = new AudioKeeperInfoVoCount(this.hour, this.sucnum, this.total, this.rate);
        JSONObject json = JSONObject.fromObject(aki);
        return json;
    }

    @Override
    public String toString() {
        return "AudioKeeperInfoVoCount{" + "hour=" + hour + ", sucnum=" + sucnum + ", total=" + total + ", rate=" + rate + '}';
    }

}
