/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thinkit.operationsys.controller;

import com.thinkit.operationsys.constant.AudioKeeperConstant;
import com.thinkit.operationsys.service.AudioKeeperInfoCountService;
import com.thinkit.operationsys.vo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.UnsupportedEncodingException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 * 用于信息管理的控制类
 *
 * @author lenovo
 */
@Controller
//@RequestMapping("/statMangage")
public class StatManagerController extends BaseController {

    @Autowired
    private AudioKeeperInfoCountService audioKeeperInfoCountService;

    /**
     * 识别结果查询
     *
     * @param startday
     * @param endday
     * @return
     * @throws SQLException
     */
    @RequestMapping("stat/search.do")
    @ResponseBody
    public List<UndResultVo> getResultInfo(String startday, String endday) throws SQLException {
        return audioKeeperInfoCountService.getUndResInfo(startday, endday);
    }

    /**
     * 查询业务类型
     *
     * @param startday
     * @param endday
     * @return
     * @throws SQLException
     */
    @RequestMapping("stat/bus.do")
    @ResponseBody
    public List<BusinessInfoVo> getBusInfo(String startday, String endday) throws SQLException {
        return audioKeeperInfoCountService.getBusTypeInfo(startday, endday);
    }

    /**
     * 处理能力统计
     *
     * @param startday
     * @param endday
     * @return
     * @throws SQLException
     */
    @RequestMapping("stat/HandlingCapacity.do")
    @ResponseBody
    public List<HandlingCapacityVo> getHandlingCapacityInfo(String startday, String endday) throws SQLException {
        return audioKeeperInfoCountService.getHandlingCapacity(startday, endday);
    }

    /**
     * 系统运行状态查询
     *
     * @param datatype
     * @param startday
     * @param endday
     * @return
     * @throws SQLException
     * @throws UnsupportedEncodingException
     */
    @RequestMapping("stat/runstat.do")
    @ResponseBody
    public List<ChartInfoVo> getRunStatInfo(String datatype, String startday, String endday) throws SQLException, UnsupportedEncodingException {

        ArrayList<ChartInfoVo> res = new ArrayList<ChartInfoVo>();
        switch (AudioKeeperConstant.AudioKeeperCountType.get(datatype)) {
            case 1: // 按天
                res = (ArrayList<ChartInfoVo>) audioKeeperInfoCountService.getAudioKeeperChartCount(1, startday, endday);
                break;
            case 2:  //按月
                res = (ArrayList<ChartInfoVo>) audioKeeperInfoCountService.getAudioKeeperChartCount(2, startday, endday);
                break;
            case 3://按时段
                res = (ArrayList<ChartInfoVo>) audioKeeperInfoCountService.getAudioKeeperChartCount(3, startday, endday);
                break;
        }
        return res;
    }

    @RequestMapping("stat/ rescount.do")
    @ResponseBody
    public ArrayList<AudioKeeperInfoVoCount> getResCountInfo(String countType, String startday, String endday) throws SQLException, UnsupportedEncodingException {

        ArrayList<AudioKeeperInfoVoCount> res = new ArrayList<AudioKeeperInfoVoCount>();
        switch (AudioKeeperConstant.AudioKeeperCountType.get(countType)) {
            case 1: // 按天
                res = audioKeeperInfoCountService.getAudioKeeperInfoCount(1, startday, endday);
                break;
            case 2:  //按月
                res = audioKeeperInfoCountService.getAudioKeeperInfoCount(2, startday, endday);
                break;
            case 3://按时段
                res = audioKeeperInfoCountService.getAudioKeeperInfoCount(3, startday, endday);
                break;
        }
        return res;
    }

    public AudioKeeperInfoCountService getAudioKeeperInfoCountService() {
        return audioKeeperInfoCountService;
    }

    public void setAudioKeeperInfoCountService(AudioKeeperInfoCountService audioKeeperInfoCountService) {
        this.audioKeeperInfoCountService = audioKeeperInfoCountService;
    }

}
