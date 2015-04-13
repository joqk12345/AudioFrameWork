/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thinkit.operationsys.sub.controller;

import com.thinkit.operationsys.vo.BusCollectVo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.sql.SQLException;
import java.util.List;

@Controller
public class BusCollectManagerController extends AnalysisBaseController {

    @RequestMapping("/analysis/busCollect")
    public String busCollectManager() {
        return "analysis/buscollect";
    }

    @RequestMapping("analysis/busCollect.do")
    @ResponseBody
    public List<BusCollectVo> getBusCollectInfo(String busName) throws SQLException {
        return analysisServcie.querBusCollectInfo(busName);
    }

}
