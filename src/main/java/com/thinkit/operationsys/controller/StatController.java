/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thinkit.operationsys.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author lenovo
 */
@Controller
@RequestMapping("/stat")
public class StatController extends BaseController {

    /**
     * 运行状态汇总
     *
     * @return
     */
    @RequestMapping("runstat")
    public String runstatManager() {

        return "stat/chartInfo";
    }

    /**
     * 识别结果查询
     *
     * @return
     */
    @RequestMapping("undResInfo")
    public String undResInfoManager() {

        return "stat/undResInfo";
    }

    /**
     * 处理能力统计
     *
     * @return
     */
    @RequestMapping("dataexport")
    public String dataexportManager() {

        return "stat/dataexport";
    }

    /**
     * 识别结果汇总
     *
     * @return
     */
    @RequestMapping("audiokeeperInfoCount")
    public String audiokeeperInfoCountManager() {

        return "stat/audiokeeperInfoCount";
    }

    /**
     * 按业务统计
     *
     * @return
     */
    @RequestMapping("biInfo")
    public String runstatbiInfoManager() {

        return "stat/biInfo";
    }

}
