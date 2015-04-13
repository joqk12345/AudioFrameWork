/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thinkit.operationsys.entity;

import java.sql.Timestamp;

/**
 * RUN Luck Man
 *
 * @author qiaokai
 * @date 2014-1-10 14:36:21
 */
public class RoleVo extends BaseEntity {

    private Integer rid;
    private String rolename;
    private String roletype;
    private Timestamp createtime;

    public RoleVo() {
    }

    public Integer getRid() {
        return rid;
    }

    public void setRid(Integer rid) {
        this.rid = rid;
    }

    public String getRolename() {
        return rolename;
    }

    public void setRolename(String rolename) {
        this.rolename = rolename;
    }

    public String getRoletype() {
        return roletype;
    }

    public void setRoletype(String roletype) {
        this.roletype = roletype;
    }

    public Timestamp getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Timestamp createtime) {
        this.createtime = createtime;
    }

    public RoleVo(Integer rid, String rolename, String roletype, Timestamp createtime) {
        this.rid = rid;
        this.rolename = rolename;
        this.roletype = roletype;
        this.createtime = createtime;
    }

    @Override
    public String toString() {
        return "RoleVo{" + "rid=" + rid + ", rolename=" + rolename + ", roletype=" + roletype + ", createtime=" + createtime + '}';
    }

}
