package com.thinkit.operationsys.vo;

/**
 * Speech-to-content
 *
 * @author Administrator
 */
public class RecTextVo {

    private int id;
    private String path;
    private int segmentNo;
    private String timeStart;
    private String timeEnd;
    private String content;
    private String speed;

    public RecTextVo() {
    }

    public RecTextVo(int id, String path, int segmentNo, String timeStart, String timeEnd, String content, String speed) {
        this.id = id;
        this.path = path;
        this.segmentNo = segmentNo;
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
        this.content = content;
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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSpeed() {
        return speed;
    }

    public void setSpeed(String speed) {
        this.speed = speed;
    }

    @Override
    public String toString() {
        return "RecTextVo{"
                + "id=" + id
                + ", path=" + path
                + ", segmentNo=" + segmentNo
                + ", timeStart=" + timeStart
                + ", timeEnd=" + timeEnd
                + ", content=" + content
                + ", speed=" + speed
                + "}";
    }

}
