/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thinkit.operationsys.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * @author lenovo
 */
@Controller
@SessionAttributes("loginOp")
public class LoginController extends BaseController {

    /**
     * 初始页面登陆
     *
     * @param request
     * @param session
     * @return
     */
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ModelAndView initHandler(HttpServletRequest request, HttpSession session) {
        String no = request.getRemoteAddr();
        logger.debug("用户远程登录的ip地址:" + no);
        return new ModelAndView("login");
    }

    @RequestMapping(value = "index.htm", method = RequestMethod.GET)
    public ModelAndView initHandlerIndex(HttpServletRequest request, HttpSession session) {
        return new ModelAndView("index");
    }

    /**
     * 用户退出登陆
     *
     * @param request
     * @param session
     * @return
     */
    @RequestMapping(value = "quit.htm", method = RequestMethod.GET)
    public ModelAndView quitHandler(HttpServletRequest request, HttpSession session) {
//        request.getSession().removeAttribute("");
        session.removeAttribute("uname");
        return new ModelAndView("login");
    }

    /**
     * 用户登陆验证
     *
     * @param request
     * @param uname
     * @param passwd
     * @param session
     * @return
     */
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ModelAndView loginHandler(HttpServletRequest request, String uname, String passwd, HttpSession session) {
        if ("" != uname && "" != passwd) {
            if (uname.equals("thinkit") && passwd.equals("thinkit")) {
//                request.setAttribute("uname", uname);
                session.setAttribute("uname", uname);
//                request.getRequestDispatcher("/index.jsp").forward(request, response);     
//                return new ModelAndView("index");
            } else {
                return new ModelAndView("login");
            }
        }
        return new ModelAndView("index");
    }

}
