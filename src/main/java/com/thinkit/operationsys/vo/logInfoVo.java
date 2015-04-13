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
 * @date 2014-1-9 9:51:00
 */
public class logInfoVo {

    private int id;
    private String uname;
    private String time;
    private String hostIp;
    private String op;
    private String opcontent;

    public logInfoVo() {
    }

    public logInfoVo(String uname, String time, String hostIp, String op, String opcontent) {
        this.uname = uname;
        this.time = time;
        this.hostIp = hostIp;
        this.op = op;
        this.opcontent = opcontent;
    }

    public String getUname() {
        return uname;
    }

    public void setUname(String uname) {
        this.uname = uname;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getHostIp() {
        return hostIp;
    }

    public void setHostIp(String hostIp) {
        this.hostIp = hostIp;
    }

    public String getOp() {
        return op;
    }

    public void setOp(String op) {
        this.op = op;
    }

    public String getOpcontent() {
        return opcontent;
    }

    public void setOpcontent(String opcontent) {
        this.opcontent = opcontent;
    }

    public JSONObject toJSONObject() {

        logInfoVo aki = new logInfoVo(this.uname, this.time, this.hostIp, this.op, this.opcontent);

        JSONObject json = JSONObject.fromObject(aki);
        return json;
    }

    @Override
    public String toString() {
        return "logInfoVo{"
                + "uname=" + uname
                + ", time=" + time
                + ", hostIp=" + hostIp
                + ", op=" + op
                + ", opcontent=" + opcontent
                + "}";
    }

}
