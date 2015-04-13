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
 * @date 2013-12-31 10:46:27
 */
public class HandlingCapacityVo {

    //ʱ��
    String time;
    //������
    String callNum;
    //�˹���
    String switchPeople;
    //ת�˹���
    String switchPeopleRate;
    //����ͨ����
    String silentTalkRate;
    //ƽ������
    String avgInteractiveNum;
    //ƽ��ʱ��
    String avgInteractiveRate;

    public HandlingCapacityVo(String time, String callNum, String switchPeople, String switchPeopleRate, String silentTalkRate, String avgInteractiveNum, String avgInteractiveRate) {
        this.time = time;
        this.callNum = callNum;
        this.switchPeople = switchPeople;
        this.switchPeopleRate = switchPeopleRate;
        this.silentTalkRate = silentTalkRate;
        this.avgInteractiveNum = avgInteractiveNum;
        this.avgInteractiveRate = avgInteractiveRate;
    }

    public HandlingCapacityVo() {

    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getCallNum() {
        return callNum;
    }

    public void setCallNum(String callNum) {
        this.callNum = callNum;
    }

    public String getSwitchPeople() {
        return switchPeople;
    }

    public void setSwitchPeople(String switchPeople) {
        this.switchPeople = switchPeople;
    }

    public String getSwitchPeopleRate() {
        return switchPeopleRate;
    }

    public void setSwitchPeopleRate(String switchPeopleRate) {
        this.switchPeopleRate = switchPeopleRate;
    }

    public String getSilentTalkRate() {
        return silentTalkRate;
    }

    public void setSilentTalkRate(String silentTalkRate) {
        this.silentTalkRate = silentTalkRate;
    }

    public String getAvgInteractiveNum() {
        return avgInteractiveNum;
    }

    public void setAvgInteractiveNum(String avgInteractiveNum) {
        this.avgInteractiveNum = avgInteractiveNum;
    }

    public String getAvgInteractiveRate() {
        return avgInteractiveRate;
    }

    public void setAvgInteractiveRate(String avgInteractiveRate) {
        this.avgInteractiveRate = avgInteractiveRate;
    }

    /**
     * �������װ��Ϊjson
     *
     * @return
     */
    public JSONObject toJSONObject() {
        HandlingCapacityVo hcv = new HandlingCapacityVo(this.time, this.callNum,
                this.switchPeople,
                this.switchPeopleRate,
                this.silentTalkRate,
                this.avgInteractiveNum,
                this.avgInteractiveRate);
        JSONObject json = JSONObject.fromObject(hcv);
        return json;
    }

}
