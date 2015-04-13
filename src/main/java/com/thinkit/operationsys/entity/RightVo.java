/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thinkit.operationsys.entity;

import java.sql.Timestamp;

/**
 * RUN Luck Man Ȩ�ޱ�
 *
 * @author qiaokai
 * @date 2014-1-10 14:38:17
 */
public class RightVo extends BaseEntity {

    private Integer rid;
    private Integer frid;
    private Integer subid;
    private String rtype;
    private String rcode;
    private String rname;
    private Timestamp createtime;

    public Integer getRid() {
        return rid;
    }

    public void setRid(Integer rid) {
        this.rid = rid;
    }

    public Integer getFrid() {
        return frid;
    }

    public void setFrid(Integer frid) {
        this.frid = frid;
    }

    public Integer getSubid() {
        return subid;
    }

    public void setSubid(Integer subid) {
        this.subid = subid;
    }

    public String getRtype() {
        return rtype;
    }

    public void setRtype(String rtype) {
        this.rtype = rtype;
    }

    public String getRcode() {
        return rcode;
    }

    public void setRcode(String rcode) {
        this.rcode = rcode;
    }

    public String getRname() {
        return rname;
    }

    public void setRname(String rname) {
        this.rname = rname;
    }

    public Timestamp getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Timestamp createtime) {
        this.createtime = createtime;
    }

}
