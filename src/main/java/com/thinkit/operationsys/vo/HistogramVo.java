/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thinkit.operationsys.vo;

import java.util.ArrayList;
import java.util.SortedMap;

/**
 * RUN Luck Man
 *
 * @author qiaokai
 * @date 2013-12-24 11:12:29
 */
public class HistogramVo {

    /**
     * ��list �����д��ÿ���·ݶ�Ӧ�������Ϣ ����һ����ݽṹ
     */
    ArrayList<SortedMap<String, String>> HistogramData = new ArrayList<>();

    public ArrayList<SortedMap<String, String>> getHistogramData() {
        return HistogramData;
    }

    public void setHistogramData(ArrayList<SortedMap<String, String>> HistogramData) {
        this.HistogramData = HistogramData;
    }

}
