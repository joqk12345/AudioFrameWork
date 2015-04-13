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
@RequestMapping("/task")
public class TaskController extends BaseController {

    /**
     * 任务管理
     *
     * @return
     */
    @RequestMapping("job")
    public String jobManager() {

        return "task/jobact";
    }

    /**
     * 号码集管理
     *
     * @return
     */
    @RequestMapping("numset")
    public String numSetManager() {

        return "task/numset";
    }

}
