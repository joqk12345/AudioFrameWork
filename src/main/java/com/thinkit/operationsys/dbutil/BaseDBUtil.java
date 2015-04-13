/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thinkit.operationsys.dbutil;

import com.thinkit.operationsys.constant.FileConstant;
import com.thinkit.operationsys.util.StringUtil;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.util.logging.Logger;

/**
 * * RUN Luck Man
 *
 * @author qiaokai
 * @datetime 2014-1-21 18:16:38
 * @mail to: qianyanqk@163.com
 */
public class BaseDBUtil {

    protected static Connection con;

    protected static Statement st;

    protected Logger logger = Logger.getLogger(BaseDBUtil.class.getName());

    public static Connection getConnection() {
        try {
            Class.forName("com.mysql.jdbc.Driver");// 
//            conn = (Connection) DriverManager.getConnection("jdbc:mysql://192.168.14.240:3306/audiokeeper2004", "root", "123456");
//            con = (Connection) DriverManager.getConnection("jdbc:mysql://192.168.14.216:3306/bjmobile?zeroDateTimeBehavior=convertToNull", "root", "thinkit");
//            con = (Connection) DriverManager.getConnection("jdbc:mysql://192.168.14.151:3306/bjmobile?characterEncoding=utf8", "root", "thinkit");
//            con = (Connection) DriverManager.getConnection("jdbc:mysql://localhost:3306/bjmobile?characterEncoding=utf8", "root", "123456");
            con = (Connection) DriverManager.getConnection("jdbc:mysql://localhost:3306/bjmobile?characterEncoding=utf8", "root", "123456");
        } catch (Exception e) {
            System.out.println("" + e.getMessage());
        }
        return con;
    }

    protected String getExprotDirctory(String wavPath) {
        StringBuffer result = new StringBuffer();
        result.append("文件名：" + StringUtil.toWindowFileString(wavPath) + FileConstant.SUFFIX + "\r\n");
        return result.toString();
    }

}
