/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thinkit.operationsys.service;

import com.thinkit.operationsys.dbutil.DBTools;
import com.thinkit.operationsys.vo.*;
import net.sf.json.JSONArray;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 * RUN Luck Man
 *
 * @author qiaokai
 * @date 2014-1-3 10:18:22
 */
public class AudioKeeperInfoCountJsonService {

    public JSONArray getHandlingCapacityJson(String startDay, String endDay) throws SQLException {
        JSONArray array = new JSONArray();
        DBTools dt = new DBTools();

        List<HandlingCapacityVo> al = dt.QueryHandlingCapacityInfo(startDay, endDay);
        for (HandlingCapacityVo a : al) {
            System.out.println(a);
            array.add(a.toJSONObject());
        }
        return array;
    }

    /**
     * @param startDay
     * @param endDay
     * @return
     * @throws SQLException
     */
    public JSONArray getUndResInfoJson(String startDay, String endDay) throws SQLException {
        JSONArray array = new JSONArray();
        DBTools dt = new DBTools();
        List<UndResultVo> al = dt.queryUndResInfo(startDay, endDay);
        for (UndResultVo a : al) {
            System.out.println(a);
            array.add(a.toJSONObject());
        }
        return array;
    }

    public JSONArray getAudioKeeperInfoJson(String startDay, String endDay) throws SQLException {
        JSONArray array = new JSONArray();
        DBTools dt = new DBTools();
        List<AudioKeeperInfoVo> al = dt.queryAudioKeeperInfo(startDay, endDay);
        for (AudioKeeperInfoVo a : al) {
            System.out.println(a);
            array.add(a.toJSONObject());
        }
        return array;
    }

    public JSONArray getAudioKeeperInfoCountJson(int countType, String startDay, String endDay) throws SQLException {
        JSONArray array = new JSONArray();
        DBTools dt = new DBTools();
        ArrayList<AudioKeeperInfoVoCount> al = dt.queryAudioKeeperInfoCount(countType, startDay, endDay);
        for (AudioKeeperInfoVoCount a : al) {
            System.out.println(a);
            array.add(a.toJSONObject());
        }
        return array;
    }

    public JSONArray getAudioKeeperChartCountJson(int countType, String startDay, String endDay) throws SQLException {
        JSONArray array = new JSONArray();
        DBTools dt = new DBTools();
        ArrayList<ChartInfoVo> al = dt.queryAudioKeeperChartCount(countType, startDay, endDay);
        for (ChartInfoVo a : al) {
            System.out.println(a);
            array.add(a.toJSONObject());
        }
        return array;
    }
}
