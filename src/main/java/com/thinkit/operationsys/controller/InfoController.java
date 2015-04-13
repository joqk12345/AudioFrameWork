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
@RequestMapping("/info")
public class InfoController extends BaseController {

    //    @RequestMapping("users")
//    public String usersManager() {
//
//        return "info/users";
//    }
    @RequestMapping("roles")
    public String rolesManager() {

        return "info/roles";
    }

    @RequestMapping("op")
    public String opManager() {

        return "info/op";
    }

    @RequestMapping("server")
    public String serverManager() {

        return "info/server";
    }

    @RequestMapping("log")
    public String logManager() {

        return "info/log";
    }

    /**
     * 单用户管理
     *
     * @return
     */
    @RequestMapping("user")
    public String userManager() {

        return "info/user";
    }

}
