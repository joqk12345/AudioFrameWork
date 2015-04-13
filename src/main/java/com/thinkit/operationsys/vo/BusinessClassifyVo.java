/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thinkit.operationsys.vo;

/**
 * @author Administrator
 */
public class BusinessClassifyVo {

    private int id;
    private String path;
    private String classify;

    public BusinessClassifyVo() {
    }

    public BusinessClassifyVo(int id, String path, String classify) {
        this.id = id;
        this.path = path;
        this.classify = classify;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getClassify() {
        return classify;
    }

    public void setClassify(String classify) {
        this.classify = classify;
    }

    @Override
    public String toString() {
        return "BusinessClassifyVo{"
                + "id=" + id
                + "path=" + path
                + ", classify=" + classify
                + "}";
    }
}
