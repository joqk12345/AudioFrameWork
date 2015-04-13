/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thinkit.operationsys.sub.controller;

import com.thinkit.operationsys.constant.FileConstant;
import com.thinkit.operationsys.controller.BaseController;
import com.thinkit.operationsys.service.AnService;
import com.thinkit.operationsys.service.ExportDataService;
import com.thinkit.operationsys.util.FileOperateUtil;
import com.thinkit.operationsys.vo.RecTextVo;
import com.thinkit.operationsys.vo.SpeechVo;
import org.springframework.beans.factory.annotation.Autowired;
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
 * * RUN Luck Man
 *
 * @author qiaokai
 * @datetime 2014-1-21 16:03:55
 * @mail to: qianyanqk@163.com
 */
@Controller
public class VoiceManagerController extends BaseController {

    private Logger logger = Logger.getLogger(VoiceManagerController.class.getName());
    @Autowired
    private AnService analysisServcie;
    @Autowired
    //导出文件服务
    private ExportDataService exportDataService;

    public AnService getAnalysisServcie() {
        return analysisServcie;
    }

    public void setAnalysisServcie(AnService analysisServcie) {
        this.analysisServcie = analysisServcie;
    }

    public ExportDataService getExportDataService() {
        return exportDataService;
    }

    public void setExportDataService(ExportDataService exportDataService) {
        this.exportDataService = exportDataService;
    }

    /**
     * 查询语音转文本
     *
     * @return
     */
    @RequestMapping("/analysis/voiceConvertor")
    public String voiceManager() {
        return "analysis/voice";
    }

    @RequestMapping("analysis/voiceExport.do")
    public ModelAndView getExportInfo(String json, HttpServletRequest request, HttpServletResponse response) throws SQLException, IOException {
        System.out.print("json数据:" + json);
        logger.info(json);
        String serverDir = request.getSession().getServletContext().getRealPath("/") + FileOperateUtil.UPLOADDIR;
        //将文件列表写入  服务器的目录下面
        exportDataService.getVoiceText(json, serverDir);
        //查询数据库写入文件
        String storeName = FileConstant.VOICETOTEXT;
        String realName = FileConstant.VOICETOTEXT;
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

    @RequestMapping("analysis/voiceConvertor.do")
    @ResponseBody
    public List<SpeechVo> getResultInfo(String wavPath, String type) throws SQLException {
        return analysisServcie.querySpeechLIst(wavPath, type);
    }

    /**
     * 查询结果文本内容
     *
     * @param wavPath
     * @return
     * @throws SQLException
     */
    @RequestMapping("analysis/recTextVo.do")
    @ResponseBody
    public List<RecTextVo> getSpeechToText(String wavPath) throws SQLException {
        return analysisServcie.listSpeechToTextList(wavPath);
    }

}
