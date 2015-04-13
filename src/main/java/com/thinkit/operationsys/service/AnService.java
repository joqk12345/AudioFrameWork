/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thinkit.operationsys.service;

import com.thinkit.operationsys.dbutil.AnalysisDBUtil;
import com.thinkit.operationsys.vo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

/**
 * * RUN Luck Man
 *
 * @author qiaokai
 * @datetime 2014-1-21 18:15:57
 * @mail to: qianyanqk@163.com
 */
@Service
public class AnService {

    @Autowired
    private AnalysisDBUtil analysisDBUtil;

    public AnalysisDBUtil getAnalysisDBUtil() {
        return analysisDBUtil;
    }

    public void setAnalysisDBUtil(AnalysisDBUtil analysisDBUtil) {
        this.analysisDBUtil = analysisDBUtil;
    }

    /**
     * 查询语音转写列表
     *
     * @return
     * @throws SQLException
     */
    public List<RecTextVo> listSpeechToTextList(String wavPath) throws SQLException {
//        RecTextVo info = new RecTextVo();
        return analysisDBUtil.ListSpeachToText(wavPath);
    }

    /**
     * 查询话单信息
     *
     * @return
     * @throws SQLException
     */
    public List<SpeechVo> querySpeechLIst(String wavPath, String type) throws SQLException {
//        RecTextVo info = new RecTextVo();
        return analysisDBUtil.ListSpeach(wavPath, type);
    }

    /**
     * 查询业务信息
     *
     * @param wavPath
     * @return
     * @throws SQLException
     */
    public List<BusinessClassifyVo> queryBusClassfiyLIst(String wavPath) throws SQLException {
//        RecTextVo info = new RecTextVo();
        return analysisDBUtil.ListBusInfo(wavPath);
    }

    /**
     * 查询业务汇总信息
     *
     * @param busName
     * @return
     * @throws SQLException
     */
    public List<BusCollectVo> querBusCollectInfo(String busName) throws SQLException {
//        RecTextVo info = new RecTextVo();
        return analysisDBUtil.ListBusCollectInfo(busName);
    }

    /**
     * 查询场景分割详细信息
     *
     * @param wavPath
     * @return
     * @throws SQLException
     */
    public List<RoleSegmentVo> querySenceDetail(String wavPath) throws SQLException {
//        RecTextVo info = new RecTextVo();
        return analysisDBUtil.querySenceDivision(wavPath);
    }

    /**
     * 情绪检测识别
     *
     * @param wavPath
     * @return
     * @throws SQLException
     */
    public List<EmotionVo> queryEmotionDetail(String wavPath, String mType) throws SQLException {
//        RecTextVo info = new RecTextVo();
        return analysisDBUtil.ListEmotionInfo(wavPath, mType);
    }

    public List<SilenceDetectionVo> querySilenceDetail(String wavPath) throws SQLException {
//        RecTextVo info = new RecTextVo();
        return analysisDBUtil.ListSilenceInfo(wavPath);
    }

    /**
     * 关键词详情检索
     *
     * @param wavPath
     * @return
     */
    public List<KeywordVo> listKeywordList(String wavPath) throws SQLException {
        return analysisDBUtil.ListkeywordInfo(wavPath);
    }

    public List<SpeechVo> queryKeywordResultLIst(String wavPath, String keyword, String kNum) throws SQLException {
//        RecTextVo info = new RecTextVo();
        return analysisDBUtil.ListKeywordResult(wavPath, keyword, kNum);
    }

    public List<SpeechVo> searchSilenceList(String wavPath, String threshold) throws SQLException {
//        RecTextVo info = new RecTextVo();
        return analysisDBUtil.SearchSilenceList(wavPath, threshold);
    }

}
