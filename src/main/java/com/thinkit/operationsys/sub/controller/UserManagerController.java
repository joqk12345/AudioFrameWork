/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thinkit.operationsys.sub.controller;

import com.thinkit.operationsys.controller.BaseController;
import com.thinkit.operationsys.entity.UserVo;
import com.thinkit.operationsys.service.InfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.sql.SQLException;
import java.util.List;

/**
 * * RUN Luck Man
 *
 * @author qiaokai
 * @datetime 2014-1-16 16:32:20
 * @mail to: qianyanqk@163.com
 */
@Controller
public class UserManagerController extends BaseController {

    @Autowired
    private InfoService InfoService;

    public InfoService getInfoService() {
        return InfoService;
    }

    public void setInfoService(InfoService InfoService) {
        this.InfoService = InfoService;
    }

    @RequestMapping("info/users")
    public String usersManager(ModelMap modelMap) throws SQLException {
        // 得到用户列表信息
        List<UserVo> uv = InfoService.listUser();
        if (uv.size() > 0) {
            modelMap.addAttribute("users", uv);
        }
        System.out.println("users" + uv.toArray());
//        modelMap.addAttribute("users","aaa");
        return "info/users";
    }

    @RequestMapping("info/searchUsers.do")
    @ResponseBody
    public List<UserVo> SearchUsers(ModelMap modelMap) throws SQLException {
        // 得到用户列表信息
        List<UserVo> uv = InfoService.listUser();
        return uv;
//        if(uv.size()>0){
//            modelMap.addAttribute("users",uv);
//        }
        //      System.out.println("users"+uv.toArray());
//        modelMap.addAttribute("users","aaa");
    }

}
