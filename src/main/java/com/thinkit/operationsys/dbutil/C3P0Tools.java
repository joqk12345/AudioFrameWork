/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thinkit.operationsys.dbutil;

/**
 * RUN Luck Man
 *
 * @author qiaokai
 * @date 2013-12-18 14:36:04
 */

import com.mchange.v2.c3p0.ComboPooledDataSource;
import com.mysql.jdbc.Statement;
import com.thinkit.operationsys.constant.FileConstant;
import com.thinkit.operationsys.util.StringUtil;
import org.apache.log4j.Logger;

import java.beans.PropertyVetoException;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;

public class C3P0Tools {

    protected static Connection con;

    protected static java.sql.Statement st;

    protected java.util.logging.Logger logger = java.util.logging.Logger.getLogger(BaseDBUtil.class.getName());

    private static C3P0Tools dbPool;
    private ComboPooledDataSource dataSource;
    private static Logger log = Logger.getLogger(C3P0Tools.class);

    static {
        dbPool = new C3P0Tools() {
        };
    }

    public C3P0Tools() {
        Properties props = new Properties();
        try {
            props.load(this.getClass().getResourceAsStream("/config.properties"));
        } catch (IOException ex) {
            log.error("IO异常", ex);
        }

        try {
            dataSource = new ComboPooledDataSource();
            dataSource.setUser(props.getProperty("db.username"));
            dataSource.setPassword(props.getProperty("db.password"));
            dataSource.setJdbcUrl(props.getProperty("db.url"));
            dataSource.setDriverClass(props.getProperty("db.driver"));
            dataSource.setInitialPoolSize(4);
            dataSource.setMinPoolSize(5);
            dataSource.setMaxPoolSize(20);
            dataSource.setMaxStatements(150);
            dataSource.setMaxIdleTime(1800);
        } catch (PropertyVetoException e) {
            throw new RuntimeException(e);
        }
    }

    public static C3P0Tools getInstance() {
        return dbPool;
    }

    protected final Connection getConnection() {
        try {
            return dataSource.getConnection();
        } catch (SQLException e) {
            System.out.println("�޷���ȡ����");
            throw new RuntimeException("�޷������Դ��ȡ���� ", e);
        }
    }

    protected String getExprotDirctory(String wavPath) {
        StringBuffer result = new StringBuffer();
        result.append("文件名：" + StringUtil.toWindowFileString(wavPath) + FileConstant.SUFFIX + "\r\n");
        return result.toString();
    }

    public static void main(String[] args) throws SQLException {
        Connection con = null;
        try {
            con = C3P0Tools.getInstance().getConnection();

        } catch (Exception e) {
        } finally {
            if (con != null) {
                con.close();
            }
        }
    }
}
