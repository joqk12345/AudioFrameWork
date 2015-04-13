/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thinkit.operationsys.vo;

/**
 * @author Administrator
 */
public class KeywordVo {

    private int id;
    private String path;
    private int segmentNo;
    private String content;
    private String timeStart;
    private String timeEnd;
    private String keyword;
    private String confidence;

    public KeywordVo() {
    }

    public KeywordVo(int id, String path, int segmentNo, String content, String timeStart, String timeEnd, String keyword, String confidence) {
        this.id = id;
        this.path = path;
        this.segmentNo = segmentNo;
        this.content = content;
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
        this.keyword = keyword;
        this.confidence = confidence;
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

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public String getConfidence() {
        return confidence;
    }

    public void setConfidence(String confidence) {
        this.confidence = confidence;
    }

    @Override
    public String toString() {
        return "KeywordVo{"
                + "id=" + id
                + ", path=" + path
                + ", segmentNo=" + segmentNo
                + ", timeStart=" + timeStart
                + ", timeEnd=" + timeEnd
                + ", keyword=" + keyword
                + ", confidence=" + confidence
                + "}";
    }
}
