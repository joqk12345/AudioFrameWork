/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thinkit.operationsys.sub.controller;

import com.thinkit.operationsys.constant.FileConstant;
import com.thinkit.operationsys.service.KeywordRetrieveService;
import com.thinkit.operationsys.util.FileOperateUtil;
import com.thinkit.operationsys.vo.KeywordVo;
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
 * @author Administrator
 */
@Controller
public class KeywordManagerController extends AnalysisBaseController {

    @Autowired
    protected KeywordRetrieveService keywordRetrieveService;

    public KeywordRetrieveService getKeywordRetrieveService() {
        return keywordRetrieveService;
    }

    public void setKeywordRetrieveService(KeywordRetrieveService keywordRetrieveService) {
        this.keywordRetrieveService = keywordRetrieveService;
    }

    @RequestMapping("/analysis/keywordDetection")
    public String keywordManager() {
        return "analysis/keyword";
    }

    /**
     * 关键词查询
     *
     * @param wavPath
     * @return
     * @throws SQLException
     */
    @RequestMapping("analysis/KeywordVo.do")
    @ResponseBody
    public List<KeywordVo> getKeyword(String wavPath) throws SQLException {
        return analysisServcie.listKeywordList(wavPath);
    }

    /**
     * 查询关键词结果信息
     *
     * @param wavPath
     * @param keyword
     * @param kNum
     * @return
     * @throws SQLException
     */
    @RequestMapping("analysis/KeywordSearch.do")
    @ResponseBody
    public List<SpeechVo> getKeywordResultInfo(String wavPath, String keyword, String kNum) throws SQLException {
        return analysisServcie.queryKeywordResultLIst(wavPath, keyword, kNum);
    }

    /**
     * 用于关键词检索页面
     *
     * @param json
     * @param request
     * @param response
     * @return
     * @throws SQLException
     * @throws IOException
     */
    @RequestMapping("analysis/keywordRetrieve.do")
    public ModelAndView getExportInfo(String json, HttpServletRequest request, HttpServletResponse response) throws SQLException, IOException {
        System.out.print("json数据:" + json);
        logger.info(json);
        String serverDir = request.getSession().getServletContext().getRealPath("/") + FileOperateUtil.UPLOADDIR;
        //将文件列表写入  服务器的目录下面
        String keywordBaseDir = FileConstant.KEYWORDDIRECTORY;
        //调用批处理脚本问题
        if (keywordRetrieveService.RetrieveKeyword(json, keywordBaseDir, serverDir)) {
            //如果检索成功，表示可以下载
            //查询数据库写入文件
            String storeName = FileConstant.KEYWORDTOTEXT;
            String realName = FileConstant.KEYWORDTOTEXT;
//        String realName = "aaa.txt";
//        String contentType = "application/octet-stream";
            String contentType = "text/plain";
            try {
                FileOperateUtil.download(request, response, storeName, contentType, realName);
            } catch (Exception ex) {
                Logger.getLogger(VoiceManagerController.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        return new ModelAndView("error");
    }

}
