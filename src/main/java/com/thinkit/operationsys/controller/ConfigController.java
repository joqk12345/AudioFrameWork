/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thinkit.operationsys.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author lenovo 配置管理的控制器
 */
@Controller
@RequestMapping("/config")
public class ConfigController extends BaseController {

    /**
     * 业务种类管理
     */
    @RequestMapping("bus")
    public String busManager() {

        return "config/bus";
    }

    /**
     * 识别模型管理
     *
     * @return
     */
    @RequestMapping("model")
    public String modelManager() {

        return "config/model";
    }

}
