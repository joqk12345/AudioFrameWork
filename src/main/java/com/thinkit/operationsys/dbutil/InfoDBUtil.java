/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thinkit.operationsys.dbutil;

import com.thinkit.operationsys.entity.RightVo;
import com.thinkit.operationsys.entity.RoleVo;
import com.thinkit.operationsys.entity.UserVo;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

/**
 * RUN Luck Man
 *
 * @author qiaokai
 * @date 2014-1-10 14:30:30
 */
@Repository
public class InfoDBUtil {

    private static Connection con;

    private static Statement st;

    Logger logger = Logger.getLogger(InfoDBUtil.class.getName());

    public InfoDBUtil() {
    }

    public InfoDBUtil(RoleVo u) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    public static Connection getConnection() {
        try {
            Class.forName("com.mysql.jdbc.Driver");// 
//            conn = (Connection) DriverManager.getConnection("jdbc:mysql://192.168.14.240:3306/audiokeeper2004", "root", "123456");
            con = (Connection) DriverManager.getConnection("jdbc:mysql://192.168.14.211:3306/audiokeeper", "root", "123456");
        } catch (Exception e) {
            System.out.println("" + e.getMessage());
        }
        return con;
    }

    public void insertUser(UserVo u) throws SQLException {
        //
        con = getConnection();
        //
        try {
            String sql = "insert into user (username ,password,email,realname,creattime)  values('" + u.getUsername() + "','" + u.getPassword() + "','" + u.getRealname() + "','" + u.getEmail() + "','" + u.getTmp() + "')";
            st = (Statement) con.createStatement();
            System.out.println("insert user sql" + sql);
            logger.info(sql);
            ResultSet rs = st.executeQuery(sql);
            st.executeUpdate(sql);

        } catch (SQLException e) {
            System.out.println("sql error");
        } finally {
            if (con != null) {
                con.close();
            }
        }
    }

    public void insertRole(RoleVo u) throws SQLException {
        //
        con = getConnection();
        //

        try {
            String sql
                    = "insert into role (rolename,roletype,createtime) values('" + u.getRolename() + "','" + u.getRoletype() + "','" + u.getCreatetime() + "')";
            st = (Statement) con.createStatement();
            System.out.println("insert role sql" + sql);
            logger.info(sql);
//            ResultSet rs = st.executeQuery(sql);
            st.executeUpdate(sql);

        } catch (SQLException e) {
            System.out.println("sql error");
        } finally {
            if (con != null) {
                con.close();
            }
        }
    }

    public List<UserVo> listtUser() throws SQLException {

        List<UserVo> res = null;
        con = getConnection();

        try {
            String sql = "select * from user order by creattime desc limit 5";
            st = (Statement) con.createStatement();
            System.out.println("sql:" + sql);
            logger.info(sql);
//            ResultSet rs = st.executeQuery(sql);
            res = new ArrayList<UserVo>();
            ResultSet rs = st.executeQuery(sql);
            while (rs.next()) {
                UserVo d = new UserVo();
                int id = rs.getInt("uid");
                d.setUserid(id);
                String username = rs.getString("username");
                d.setUsername(username);
                String realname = rs.getString("realname");
                d.setRealname(realname);
                String email = rs.getString("email");
                d.setEmail(email);
                Timestamp timestmp = rs.getTimestamp("creattime");
                d.setTmp(timestmp);
                System.out.println(" " + id + " " + id);
                res.add(d);
            }
            return res;

        } catch (SQLException e) {
            System.out.println("sql error");
        } finally {
            if (con != null) {
                con.close();
            }
        }
        return res;
    }

    public List<RoleVo> listtRole() throws SQLException {

        List<RoleVo> res = null;
        con = getConnection();

        try {
            String sql = "select * from role order by createtime desc limit 5";
            st = (Statement) con.createStatement();
            System.out.println("sql:" + sql);
            logger.info(sql);
//            ResultSet rs = st.executeQuery(sql);
            res = new ArrayList<RoleVo>();
            ResultSet rs = st.executeQuery(sql);
            while (rs.next()) {
                RoleVo d = new RoleVo();
                int id = rs.getInt("rid");
                d.setRid(id);
                String rname = rs.getString("rolename");
                d.setRolename(rname);
                String rtype = rs.getString("roletype");
                d.setRoletype(rname);
                Timestamp timestmp = rs.getTimestamp("createtime");
                d.setCreatetime(timestmp);
                System.out.println(" " + id + " " + id);
                res.add(d);
            }
            return res;
        } catch (SQLException e) {
            System.out.println("sql error");
        } finally {
            if (con != null) {
                con.close();
            }
        }
        return res;
    }

    public void insertRight(RightVo u) throws SQLException {
        con = getConnection();
//        try {
//            String sql = "insert into user (username ,password,email,realname,creattime)  values('"+u.getUsername()+"','"+u.getPassword()+"','"+u.getRealname()+"','"+u.getEmail()+"','"+u.getTmp()+"')";
//            st = (Statement) con.createStatement();
//            System.out.println("insert user sql"+sql);
//            logger.info(sql);
////            ResultSet rs = st.executeQuery(sql);
//             st.executeUpdate(sql);
//        } catch (SQLException e) {
//            System.out.println("sql error");
//        } finally {
//            if (con != null) {
//                con.close();
//            }
//        }
    }

    public static void main(String args[]) throws SQLException {
        Timestamp ts = new Timestamp(System.currentTimeMillis());

        UserVo u = new UserVo(1, "zhangsan", "123345", "zhang@123.com", "����", ts);
        RoleVo r = new RoleVo(1, "admin", "����", ts);

//        C3P0Tools c = new C3P0Tools();
//        InfoDBUtil info = new InfoDBUtil(c);
//        info.insertRole(r);
//        info.insertUser(u);
//        List<UserVo> lu= info.listtUser();
//        for(UserVo uv :lu){
//            System.out.println(uv.toString());
//        }
//        List<RoleVo> lux= info.listtRole();
//        for(RoleVo uv :lux){
//            System.out.println(uv.toString());
//        }
    }

}
