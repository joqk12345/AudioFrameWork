/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thinkit.operationsys.service;

import com.thinkit.operationsys.dbutil.DBTools;
import com.thinkit.operationsys.vo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 * RUN Luck Man
 * <p/>
 * <p/>
 * 用来给其返回信息
 *
 * @author qiaokai
 * @date 2014-1-3 10:18:22
 */
@Service
public class AudioKeeperInfoCountService {

    @Autowired
    private DBTools dt;

    /**
     * 获取处理能力信息返回
     *
     * @param startDay
     * @param endDay
     * @return
     * @throws SQLException
     */
    public List<HandlingCapacityVo> getHandlingCapacity(String startDay, String endDay) throws SQLException {
        return dt.QueryHandlingCapacityInfo(startDay, endDay);
    }

    /**
     * 获取理解内容信息
     *
     * @param startDay
     * @param endDay
     * @return
     * @throws SQLException
     */
    public List<UndResultVo> getUndResInfo(String startDay, String endDay) throws SQLException {
        return dt.queryUndResInfo(startDay, endDay);
    }

    public List<BusinessInfoVo> getBusTypeInfo(String startday, String endday) {
        BusinessInfoVo b1 = new BusinessInfoVo("1", "590", "211", "42", "51%", "20", "49");
        BusinessInfoVo b2 = new BusinessInfoVo("2", "326", "211", "42", "51%", "20", "49");
        BusinessInfoVo b3 = new BusinessInfoVo("3", "580", "231", "2", "51%", "20", "49");
        BusinessInfoVo b4 = new BusinessInfoVo("4", "590", "211", "12", "61%", "10", "49");
        BusinessInfoVo b5 = new BusinessInfoVo("5", "150", "891", "42", "51%", "20", "49");
        BusinessInfoVo b6 = new BusinessInfoVo("6", "185", "211", "32", "51%", "29", "49");
        BusinessInfoVo b7 = new BusinessInfoVo("7", "175", "211", "42", "51%", "20", "49");
        BusinessInfoVo b8 = new BusinessInfoVo("8", "96", "169", "48", "21%", "20", "49");
        BusinessInfoVo b9 = new BusinessInfoVo("9", "25", "781", "42", "21%", "29", "49");
        BusinessInfoVo b10 = new BusinessInfoVo("10", "96", "1", "96", "51%", "20", "49");
        BusinessInfoVo b11 = new BusinessInfoVo("11", "75", "211", "12", "51%", "20", "49");
        BusinessInfoVo b12 = new BusinessInfoVo("12", "21", "221", "72", "51%", "23", "49");
        BusinessInfoVo b13 = new BusinessInfoVo("13", "45", "21", "46", "51%", "59", "49");

        List r = new ArrayList<BusinessInfoVo>();

        r.add(b1);
        r.add(b2);
        r.add(b3);
        r.add(b4);
        r.add(b5);
        r.add(b6);
        r.add(b7);
        r.add(b8);
        r.add(b9);
        r.add(b10);
        r.add(b11);
        r.add(b12);
        r.add(b13);
        return r;

    }

    public List<AudioKeeperInfoVo> getAudioKeeperInfo(String startDay, String endDay) throws SQLException {
        return dt.queryAudioKeeperInfo(startDay, endDay);
    }

    /**
     * 分类查询系统运行状态信息
     *
     * @param countType
     * @param startDay
     * @param endDay
     * @return
     * @throws SQLException
     */
    public ArrayList<AudioKeeperInfoVoCount> getAudioKeeperInfoCount(int countType, String startDay, String endDay) throws SQLException {
        return dt.queryAudioKeeperInfoCount(countType, startDay, endDay);
    }

    /**
     * 处理能力统计 获取统计信息用于显示图表
     *
     * @param countType
     * @param startDay
     * @param endDay
     * @return
     * @throws SQLException
     */
    public List<ChartInfoVo> getAudioKeeperChartCount(int countType, String startDay, String endDay) throws SQLException {
        return dt.queryAudioKeeperChartCount(countType, startDay, endDay);
    }

    public DBTools getDt() {
        return dt;
    }

    public void setDt(DBTools dt) {
        this.dt = dt;
    }

}
