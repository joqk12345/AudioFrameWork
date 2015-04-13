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
 * @date 2013-12-31 20:27:43
 */
public class AudioKeeperInfoVo {

    String hour;
    String resultInfo;
    String confidence;
    String phoneme;

    public AudioKeeperInfoVo() {
    }

    public String getHour() {
        return hour;
    }

    public void setHour(String hour) {
        this.hour = hour;
    }

    public String getResultInfo() {
        return resultInfo;
    }

    public void setResultInfo(String resultInfo) {
        this.resultInfo = resultInfo;
    }

    public String getConfidence() {
        return confidence;
    }

    public void setConfidence(String confidence) {
        this.confidence = confidence;
    }

    public String getPhoneme() {
        return phoneme;
    }

    public void setPhoneme(String phoneme) {
        this.phoneme = phoneme;
    }

    public AudioKeeperInfoVo(String hour, String resultInfo, String confidence, String phoneme) {
        this.hour = hour;
        this.resultInfo = resultInfo;
        this.confidence = confidence;
        this.phoneme = phoneme;
    }

    public JSONObject toJSONObject() {
        AudioKeeperInfoVo aki = new AudioKeeperInfoVo(this.hour, this.resultInfo, this.confidence, this.phoneme);
        JSONObject json = JSONObject.fromObject(aki);
        return json;
    }

    @Override
    public String toString() {
        return "AudioKeeperInfoVo{" + "hour=" + hour + ", resultInfo=" + resultInfo + ", confidence=" + confidence + ", phoneme=" + phoneme + '}';
    }

}
