/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thinkit.operationsys.vo;

/**
 * 场景分割
 *
 * @author Administrator
 */
public class RoleSegmentVo {

    private int id;
    private String path;
    private int segmentNo;
    private String content;
    private String timeStart;
    private String timeEnd;
    private String role;
    private String emotion;
    private String speed;

    public RoleSegmentVo() {
    }

    public RoleSegmentVo(int id, String path, int segmentNo, String content, String timeStart, String timeEnd, String role, String emotion, String speed) {
        this.id = id;
        this.path = path;
        this.segmentNo = segmentNo;
        this.content = content;
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
        this.role = role;
        this.emotion = emotion;
        this.speed = speed;
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

    public int getSegmentNo() {
        return segmentNo;
    }

    public void setSegmentNo(int segmentNo) {
        this.segmentNo = segmentNo;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTimeStart() {
        return timeStart;
    }

    public void setTimeStart(String timeStart) {
        this.timeStart = timeStart;
    }

    public String getTimeEnd() {
        return timeEnd;
    }

    public void setTimeEnd(String timeEnd) {
        this.timeEnd = timeEnd;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmotion() {
        return emotion;
    }

    public void setEmotion(String emotion) {
        this.emotion = emotion;
    }

    public String getSpeed() {
        return speed;
    }

    public void setSpeed(String speed) {
        this.speed = speed;
    }

    @Override
    public String toString() {
        return "RoleSegmentVo{"
                + "id=" + id
                + "path=" + path
                + ", segmentNo=" + segmentNo
                + ", content=" + content
                + ", timeStart=" + timeStart
                + ", timeEnd=" + timeEnd
                + ", role=" + role
                + ", emotion=" + emotion
                + ", speed=" + speed
                + "}";
    }

}
