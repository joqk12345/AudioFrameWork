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
 * @date 2014-1-10 14:34:19
 */
public class UserVo extends BaseEntity {

    private Integer userid;
    private String username;
    private String password;
    private String email;
    private String realname;
    private String createtime;
    private Timestamp tmp;

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public String getCreatetime() {
        return createtime;
    }

    public void setCreatetime(String createtime) {
        this.createtime = createtime;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRealname() {
        return realname;
    }

    public void setRealname(String realname) {
        this.realname = realname;
    }

    public Timestamp getTmp() {
        return tmp;
    }

    public void setTmp(Timestamp tmp) {
        this.createtime = tmp.toString();
        this.tmp = tmp;
    }

    public UserVo() {
    }

    public UserVo(Integer uid, String username, String password, String realname, String email, Timestamp tmp) {
        this.userid = uid;
        this.username = username;
        this.password = password;
        this.email = email;
        this.realname = realname;
        this.tmp = tmp;
    }

    @Override
    public String toString() {
        return "UserVo{" + "userid=" + userid + ", username=" + username + ", password=" + password + ", email=" + email + ", realname=" + realname + ", tmp=" + tmp + '}';
    }

}
