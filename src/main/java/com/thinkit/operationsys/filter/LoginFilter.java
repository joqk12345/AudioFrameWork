/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thinkit.operationsys.filter;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * RUN Luck Man
 *
 * @author qiaokai
 * @date 2013-12-25 9:23:22
 */
public class LoginFilter implements Filter {

    // 
    private String[] ignoreTypes;

    @Override
    public void init(FilterConfig fc) throws ServletException {
        System.out.println("开启登陆过滤器");
    }

    @Override
    public void doFilter(ServletRequest sr, ServletResponse sr1, FilterChain chain) throws IOException, ServletException {

        HttpServletRequest servletRequest = (HttpServletRequest) sr;
        HttpServletResponse servletResponse = (HttpServletResponse) sr1;
        //
        servletResponse.setHeader("Cache-Control", "no-cache");

        HttpSession session = servletRequest.getSession();
        // ����û������URI
        String path = servletRequest.getRequestURI();
        System.out.println("path" + path);

        String uname = (String) session.getAttribute("uname");
        /**
         * 一些页面免去过滤
         */
        for (int i = 0; i < Constants.NoFilter_Pages.length; i++) {
            if (path.indexOf(Constants.NoFilter_Pages[i]) > -1) {
                chain.doFilter(servletRequest, servletResponse);
                return;
            }
        }

        // 登陆页面无需过滤
        if (path.indexOf("/login.jsp") > -1) {
            chain.doFilter(servletRequest, servletResponse);
            return;
        }

        // 判断如果没有取到员工信息,就跳转到登陆页面
        if (uname == null || "".equals(uname)) {
            // 跳转到登陆页面
            servletResponse.sendRedirect("/OperationSys/login.jsp");
        } else {
            //已经登陆,继续此次请求
            chain.doFilter(sr, sr1);
        }

    }

    @Override
    public void destroy() {

    }

}
