/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thinkit.operationsys.service;

import com.thinkit.operationsys.dbutil.DBTools;
import com.thinkit.operationsys.dbutil.InfoDBUtil;
import com.thinkit.operationsys.entity.RoleVo;
import com.thinkit.operationsys.entity.UserVo;
import com.thinkit.operationsys.vo.logInfoVo;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

/**
 * @author lenovo
 */
@Service
public class InfoService {

    @Autowired
    private InfoDBUtil infoDBUtil;

    public InfoDBUtil getInfoDBUtil() {
        return infoDBUtil;
    }

    public void setInfoDBUtil(InfoDBUtil infoDBUtil) {
        this.infoDBUtil = infoDBUtil;
    }

    /**
     * 这个有遗漏
     *
     * @param startDay
     * @param endDay
     * @return
     * @throws SQLException
     */
    public JSONArray getlogInfoJson(String startDay, String endDay) throws SQLException {
        JSONArray array = new JSONArray();
        DBTools dt = new DBTools();
        List<logInfoVo> al = dt.queryLogInfo(startDay, endDay);
        for (logInfoVo a : al) {
            System.out.println(a);
            array.add(a.toJSONObject());
        }
        return array;
    }

    public void savauser(UserVo u) throws SQLException {
//         C3P0Tools c =new C3P0Tools();
        InfoDBUtil info = new InfoDBUtil();
        info.insertUser(u);
    }

    public List<UserVo> queryuser() throws SQLException {
//         C3P0Tools c =new C3P0Tools();
        InfoDBUtil info = new InfoDBUtil();
        return info.listtUser();
    }

    public void savarole(RoleVo u) throws SQLException {
//         C3P0Tools c =new C3P0Tools();
        InfoDBUtil info = new InfoDBUtil();
        info.insertRole(u);
    }

    public List<RoleVo> queryRole() throws SQLException {
//         C3P0Tools c =new C3P0Tools();
        InfoDBUtil info = new InfoDBUtil();
        return info.listtRole();
    }

    /**
     * 查询用户列表
     *
     * @return
     * @throws SQLException
     */
    public List<UserVo> listUser() throws SQLException {
        InfoDBUtil info = new InfoDBUtil();
        return info.listtUser();
    }

}
