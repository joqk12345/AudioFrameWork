/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thinkit.operationsys.vo;

/**
 * @author Administrator
 */
public class SilenceDetectionVo {

    private int id;
    private String path;
    private int segmentNo;
    private String content;
    private String timeStart;
    private String timeEnd;
    private int isSilence;

    public SilenceDetectionVo() {
    }

    public SilenceDetectionVo(int id, String path, int segmentNo, String content, String timeStart, String timeEnd, int isSilence) {
        this.id = id;
        this.path = path;
        this.segmentNo = segmentNo;
        this.content = content;
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
        this.isSilence = isSilence;
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

    public int getIsSilence() {
        return isSilence;
    }

    public void setIsSilence(int isSilence) {
        this.isSilence = isSilence;
    }

    @Override
    public String toString() {
        return "SilenceDetectionVo{"
                + "id=" + id
                + ",path=" + path
                + ",segmentNo=" + segmentNo
                + ",content=" + content
                + ",timeStart=" + timeStart
                + ",timeEnd=" + timeEnd
                + ",isSilence=" + isSilence
                + "}";
    }
}
