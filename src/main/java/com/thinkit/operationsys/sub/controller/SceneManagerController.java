/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thinkit.operationsys.sub.controller;

import com.thinkit.operationsys.constant.FileConstant;
import com.thinkit.operationsys.util.FileOperateUtil;
import com.thinkit.operationsys.vo.RoleSegmentVo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * 场景分割控制器
 *
 * @author Administrator
 */
@Controller
public class SceneManagerController extends AnalysisBaseController {

    @RequestMapping("/analysis/sceneDivision")
    public String sceneManager() {
        return "analysis/scene";
    }

    /**
     * 场景分割导出相应格式的文本
     *
     * @param json
     * @param request
     * @param response
     * @return
     * @throws SQLException
     * @throws IOException
     */
    @RequestMapping("analysis/senceExport.do")
    public ModelAndView getExportInfo(String json, HttpServletRequest request, HttpServletResponse response) throws SQLException, IOException {
        System.out.print("json数据:" + json);
        logger.info(json);
        String serverDir = request.getSession().getServletContext().getRealPath("/") + FileOperateUtil.UPLOADDIR;
        //将文件列表写入  服务器的目录下面
        exportDataService.getScenceText(json, serverDir);
        //查询数据库写入文件
        String storeName = FileConstant.SCENCETOTEXT;
        String realName = FileConstant.SCENCETOTEXT;
//        String realName = "aaa.txt";
//        String contentType = "application/octet-stream";
        String contentType = "text/plain";
        try {
            FileOperateUtil.download(request, response, storeName, contentType, realName);
        } catch (Exception ex) {
            Logger.getLogger(VoiceManagerController.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }


    /**
     * 场景分割结果查询
     *
     * @param wavPath
     * @return
     * @throws SQLException
     */
    @RequestMapping("analysis/senceVo.do")
    @ResponseBody
    public List<RoleSegmentVo> getSenceDetail(String wavPath) throws SQLException {
        return analysisServcie.querySenceDetail(wavPath);
    }


}
