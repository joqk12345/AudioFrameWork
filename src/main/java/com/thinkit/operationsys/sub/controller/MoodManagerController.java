/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thinkit.operationsys.sub.controller;

import com.thinkit.operationsys.constant.AudioKeeperConstant;
import com.thinkit.operationsys.constant.FileConstant;
import com.thinkit.operationsys.util.FileOperateUtil;
import com.thinkit.operationsys.vo.EmotionVo;
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
public class MoodManagerController extends AnalysisBaseController {

    @RequestMapping("/analysis/moodRecognize")
    public String moodManager() {
        return "analysis/mood";
    }

    @RequestMapping("analysis/moodExport.do")
    public ModelAndView getExportInfo(String json, HttpServletRequest request, HttpServletResponse response) throws SQLException, IOException {
        System.out.print("json数据:" + json);
        logger.info(json);
        String serverDir = request.getSession().getServletContext().getRealPath("/") + FileOperateUtil.UPLOADDIR;
        //将文件列表写入  服务器的目录下面
        exportDataService.getMoodText(json, serverDir);
        //查询数据库写入文件
        String storeName = FileConstant.MOODTOTEXT;
        String realName = FileConstant.MOODTOTEXT;
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


    @RequestMapping("analysis/busEmotion.do")
    @ResponseBody
    public List<EmotionVo> getEmotionInfo(String busName, String mType) throws SQLException {
        String moodType = "";
        if ("" != AudioKeeperConstant.EmotionString.get(mType) && null != AudioKeeperConstant.EmotionString.get(mType)) {
            moodType = AudioKeeperConstant.EmotionString.get(mType);
        }
        return analysisServcie.queryEmotionDetail(busName, moodType);
    }

}
