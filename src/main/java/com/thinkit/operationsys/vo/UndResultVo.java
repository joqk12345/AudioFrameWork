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
public class UndResultVo {

    //������Id
    int id;

    String hour;
    //ʶ����
    String resultInfo;
    //���Ŷ�
    String confidence;
    //�����
    String underInfo;
    //��ʾ
    String underInfoTips;
    //����ͳ��
    String scores;

    public UndResultVo() {
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

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUnderInfo() {
        return underInfo;
    }

    public void setUnderInfo(String underInfo) {
        this.underInfo = underInfo;
    }

    public String getScores() {
        return scores;
    }

    public void setScores(String scores) {
        this.scores = scores;
    }

    public String getUnderInfoTips() {
        return underInfoTips;
    }

    public void setUnderInfoTips(String underInfoTips) {
        this.underInfoTips = underInfoTips;
    }

    public UndResultVo(int id, String hour, String resultInfo, String confidence, String underInfo, String underInfoTips, String scores) {
        this.id = id;
        this.hour = hour;
        this.resultInfo = resultInfo;
        this.confidence = confidence;
        this.underInfo = underInfo;
        this.underInfoTips = underInfoTips;
        this.scores = scores;
    }

    public JSONObject toJSONObject() {
        UndResultVo aki = new UndResultVo(this.id, this.hour, this.resultInfo, this.confidence, this.underInfo, this.underInfoTips, this.scores);
        JSONObject json = JSONObject.fromObject(aki);
        return json;
    }

    @Override
    public String toString() {
        return "UndResultVo{"
                + "id=" + id
                + ", hour=" + hour
                + ", resultInfo=" + resultInfo
                + ", confidence=" + confidence
                + ", underInfo=" + underInfo
                + ", underInfoTips=" + underInfoTips
                + ", scores=" + scores
                + "}";
    }

}
