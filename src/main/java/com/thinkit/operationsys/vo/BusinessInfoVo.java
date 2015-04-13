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
 * @date 2013-12-31 20:46:11
 */
public class BusinessInfoVo {

    String hour;
    String accountNum;
    String smsNum;
    String financialSerNum;
    String fundSerNum;
    String openingBankNum;
    String passwdSerNum;

    public String getHour() {
        return hour;
    }

    public void setHour(String hour) {
        this.hour = hour;
    }

    public String getAccountNum() {
        return accountNum;
    }

    public void setAccountNum(String accountNum) {
        this.accountNum = accountNum;
    }

    public String getSmsNum() {
        return smsNum;
    }

    public void setSmsNum(String smsNum) {
        this.smsNum = smsNum;
    }

    public String getFinancialSerNum() {
        return financialSerNum;
    }

    public void setFinancialSerNum(String financialSerNum) {
        this.financialSerNum = financialSerNum;
    }

    public String getFundSerNum() {
        return fundSerNum;
    }

    public void setFundSerNum(String fundSerNum) {
        this.fundSerNum = fundSerNum;
    }

    public String getOpeningBankNum() {
        return openingBankNum;
    }

    public void setOpeningBankNum(String openingBankNum) {
        this.openingBankNum = openingBankNum;
    }

    public String getPasswdSerNum() {
        return passwdSerNum;
    }

    public void setPasswdSerNum(String passwdSerNum) {
        this.passwdSerNum = passwdSerNum;
    }

    public BusinessInfoVo(String hour, String accountNum, String smsNum, String financialSerNum, String fundSerNum, String openingBankNum, String passwdSerNum) {
        this.hour = hour;
        this.accountNum = accountNum;
        this.smsNum = smsNum;
        this.financialSerNum = financialSerNum;
        this.fundSerNum = fundSerNum;
        this.openingBankNum = openingBankNum;
        this.passwdSerNum = passwdSerNum;
    }

    public JSONObject toJSONObject() {

        BusinessInfoVo bif = new BusinessInfoVo(this.hour, this.accountNum, this.smsNum, this.financialSerNum, this.fundSerNum, this.openingBankNum, this.passwdSerNum);
        JSONObject json = JSONObject.fromObject(bif);
        return json;
    }

    @Override
    public String toString() {
        return "BusinessInfoVo{"
                + "hour=" + hour
                + "accountNum=" + accountNum
                + ", smsNum=" + smsNum
                + ", financialSerNum=" + financialSerNum
                + ", fundSerNum=" + fundSerNum
                + ", openingBankNum=" + openingBankNum
                + ", passwdSerNum=" + passwdSerNum
                + "}";
    }
}
