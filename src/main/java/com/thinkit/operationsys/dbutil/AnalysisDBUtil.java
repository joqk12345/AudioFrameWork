/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thinkit.operationsys.dbutil;

import com.thinkit.operationsys.constant.AudioKeeperConstant;
import com.thinkit.operationsys.constant.FileConstant;
import com.thinkit.operationsys.util.StringUtil;
import com.thinkit.operationsys.vo.*;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

/**
 * * RUN Luck Man
 *
 * @author qiaokai
 * @datetime 2014-1-21 18:17:50
 * @mail to: qianyanqk@163.com
 */
@Repository
public class AnalysisDBUtil {

    private static Connection con;

    private static Statement st;

    private java.util.logging.Logger logger = java.util.logging.Logger.getLogger(BaseDBUtil.class.getName());

    public static Connection getConnection() {
        try {
            Class.forName("com.mysql.jdbc.Driver");// 
//            conn = (Connection) DriverManager.getConnection("jdbc:mysql://192.168.14.240:3306/audiokeeper2004", "root", "123456");

//            con = (Connection) DriverManager.getConnection("jdbc:mysql://192.168.14.216:3306/bjmobile?zeroDateTimeBehavior=convertToNull", "root", "thinkit");
            con = (Connection) DriverManager.getConnection("jdbc:mysql://192.168.14.151:3306/bjmobile?characterEncoding=utf8", "root", "thinkit");
//            con = (Connection) DriverManager.getConnection("jdbc:mysql://localhost:3306/bjmobile?characterEncoding=utf8", "root", "123456");
//             con = (Connection) DriverManager.getConnection("jdbc:mysql://localhost:3306/bjmobile?characterEncoding=utf8", "root", "123456");
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

    /**
     * 转换结果查询结果
     *
     * @return
     * @throws SQLException
     */
    public List<RecTextVo> ListSpeachToText(String wavPath) throws SQLException {

        List<RecTextVo> res = null;
        con = getConnection();

        try {

//                sql= "select * from info_total   where path like '"+"%"+wavPath+"%"+"'  limit 1000";
//                sql = "select * from rec_result  where path ='"+wavPath.trim()+"' limit 500";
            String sql = "";
            if ("" != wavPath.trim()) {
                sql = "select * from rec_result  where path ='" + toSqlString(wavPath.trim()) + "' limit 500";
            } else {
                sql = "select * from rec_result ";
            }
            st = (Statement) con.createStatement();
            System.out.println("sql:" + sql);
            logger.info(sql);
//            ResultSet rs = st.executeQuery(sql);
            res = new ArrayList<RecTextVo>();
            ResultSet rs = st.executeQuery(sql);
            while (rs.next()) {

                String path = rs.getString("path");
//                if (path.trim().equals(wavPath.trim())) {
                RecTextVo d = new RecTextVo();
                int id = rs.getInt("id");
                d.setId(id);
                d.setPath(rs.getString("path"));
                d.setSegmentNo(rs.getInt("segmentNo"));
                d.setTimeStart(rs.getString("time_start"));
                d.setTimeEnd(rs.getString("time_end"));
                d.setContent(rs.getString("content"));
                d.setSpeed(rs.getString("speed"));
                System.out.println(" " + id + " " + id);
                res.add(d);
//                }
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

    /**
     * 场景分割
     *
     * @param wavPath
     * @return
     * @throws SQLException
     */
    public List<RoleSegmentVo> querySenceDivision(String wavPath) throws SQLException {

        List<RoleSegmentVo> res = null;
        con = getConnection();

        try {

//                sql= "select * from info_total   where path like '"+"%"+wavPath+"%"+"'  limit 1000";
//                sql = "select * from rec_result  where path ='"+wavPath.trim()+"' limit 500";
            String sql = "";
            if ("" != wavPath.trim()) {
                sql = "select * from role_segment  where path ='" + toSqlString(wavPath.trim()) + "'";
            } else {
                sql = "select * from rec_result ";
            }

            st = (Statement) con.createStatement();
            System.out.println("sql:" + sql);
            logger.info(sql);
//            ResultSet rs = st.executeQuery(sql);
            res = new ArrayList<RoleSegmentVo>();
            ResultSet rs = st.executeQuery(sql);
            while (rs.next()) {

                String path = rs.getString("path");
//                if (path.trim().equals(wavPath.trim())) {
                RoleSegmentVo d = new RoleSegmentVo();
                int id = rs.getInt("id");
                d.setId(id);
                d.setPath(rs.getString("path"));
                d.setSegmentNo(rs.getInt("segmentNo"));
                d.setTimeStart(rs.getString("time_start"));
                d.setTimeEnd(rs.getString("time_end"));
                d.setContent(rs.getString("content"));
                d.setSpeed(rs.getString("speed"));
                d.setRole(rs.getString("role"));
                System.out.println(" " + id + " " + id);
                res.add(d);
//                }
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

    /**
     * 查询关键词话单信息
     *
     * @return
     * @throws SQLException
     */
    public List<SpeechVo> ListKeywordResult(String wavPath, String keyword, String kNum) throws SQLException {

        StringBuilder whereSentence = new StringBuilder("where 1=1 ");
        List<SpeechVo> res = null;
        String sql = "";
        try {

            if ("" != wavPath && null != wavPath && "" != keyword && null != keyword && "" != kNum && null != kNum) {
                //关键词  和  次数  和文件名
                Integer num = Integer.parseInt(kNum);
                sql = "select i.id,i.path,i.length from info_total as i ,(select path ,total from 	(select count(keyword)as total ,path  from keyword WHERE keyword LIKE '" + "%" + keyword + "%" + "' and path like '" + "%" + wavPath + "%" + "' group by path) as b where b.total =" + num + ") AS c WHERE c.path=i.path and i.isKeyword=1";
            } else if ("" != keyword && null != keyword && "" != kNum && null != kNum) {
                //关键词  和  次数
                Integer num = Integer.parseInt(kNum);
                sql = "select i.id,i.path,i.length from info_total as i ,(select path ,total from 	(select count(keyword)as total ,path  from keyword WHERE keyword LIKE '" + "%" + keyword + "%" + "' group by path) as b where b.total =" + num + ") AS c "
                        + "WHERE c.path=i.path and i.isKeyword=1";
            } else if ("" != wavPath && null != wavPath) {
                //只传wavpath
                whereSentence.append(" and path like '" + "%" + wavPath + "%" + "' and isKeyword=1 ");
                sql = "select * from info_total  " + whereSentence.toString();
            } else if ("" != keyword && null != keyword) {
                //只有关键词不为空
//                whereSentence.append(" and keyword like '" + "%" + keyword + "%" + "'  ");
                sql = "select i.id,i.path,i.length from info_total as i,	(select DISTINCT path from keyword  where 1=1  and keyword like '" + "%" + keyword + "%" + "' )as b where i.path =b.path and i.isKeyword=1";
//                sql = "select * from info_total  " + whereSentence.toString();
            } else {
                sql = "select * from info_total  where id =0";
            }

            con = getConnection();
            st = (Statement) con.createStatement();
            //输出日志信息
            logger.info("sql:" + sql);
            System.out.println("sql:" + sql);
            logger.info(sql);
//            ResultSet rs = st.executeQuery(sql);
            res = new ArrayList<SpeechVo>();
            ResultSet rs = st.executeQuery(sql);
            while (rs.next()) {
                SpeechVo d = new SpeechVo();
                int id = rs.getInt("id");
                d.setId(id);
                d.setPath(rs.getString("path"));
                d.setPath(rs.getString("path"));
                int length = rs.getInt("length");
                d.setTotal(length);
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

    /**
     * 查询话单信息，添加对多个话单的查询
     *
     * @return
     * @throws SQLException
     */
    public List<SpeechVo> ListSpeach(String wavPath, String type) throws SQLException {
        List<SpeechVo> res = null;
        try {
            String sql = "";
            StringBuilder whereSentence = new StringBuilder("where 1=1 ");
            if ("" != type) {
                whereSentence.append("and " + type + "=1");
            }
            //开关是否进行模糊搜索匹配
            Boolean islike = true;
            if ("" != wavPath) {
                //如果是多个文件的话，进行in的条件判断搜索
                if (wavPath.contains(",") && !islike) {
//                    String tpath=wavPath.replace("\\", "\\\\");
                    StringBuilder newPath = new StringBuilder("(");
                    String[] s = wavPath.split(",");
                    for (int i = 0; i < s.length; i++) {
                        //添加双引号
                        newPath.append(StringUtil.toDotString(s[i]));
                        if (i != s.length - 1) {
                            newPath.append(",");
                        }
                    }
                    newPath.append(")");
                    String whereCause = newPath.toString().replace("\\", "\\\\");
                    System.out.println(whereCause);
                    whereSentence.append(" and path in " + whereCause + " ");
                } else if (wavPath.contains(",") && islike) {
                    //如果是多文件的话  进行or 子句判断
                    //select * from info_total where path like '%0906%' or path like '%0907%' or path like '%09074%' and isRecognized = 1 limit 10;
                    String[] s = wavPath.split(",");
                    for (int i = 0; i < s.length; i++) {
                        //添加双引号
//                        newPath.append(StringUtil.toDotString(s[i]));
                        if (s[i] != null && s[i] != "") {
                            if (i == 0) {
                                whereSentence.append(" and path like '" + "%" + s[i] + "%" + "' ");
                            } else {
                                whereSentence.append(" or path like '" + "%" + s[i] + "%" + "' ");
                            }
                        }
                    }
                } else {
                    //如果是单个文件的话，直接进行模糊搜索
                    whereSentence.append(" and path like '" + "%" + wavPath + "%" + "' ");
                }
            }

            con = getConnection();

//            if ("" != wavPath) {
            sql = "select * from info_total  " + whereSentence.toString();
//            } else {
//                sql = "select * from info_total limit 1000";
//            }
            st = (Statement) con.createStatement();
            System.out.println("sql:" + sql);
            logger.info(sql);
//            ResultSet rs = st.executeQuery(sql);
            res = new ArrayList<SpeechVo>();
            ResultSet rs = st.executeQuery(sql);
            while (rs.next()) {
                SpeechVo d = new SpeechVo();
                int id = rs.getInt("id");
                d.setId(id);
                d.setPath(rs.getString("path"));
                d.setPath(rs.getString("path"));
                int length = rs.getInt("length");
                d.setTotal(length);
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

    /**
     * 查询业务信息
     *
     * @return
     * @throws SQLException
     */
    public List<BusinessClassifyVo> ListBusInfo(String busName) throws SQLException {

        StringBuilder whereSentence = new StringBuilder("where 1=1 ");

        List<BusinessClassifyVo> res = null;
        con = getConnection();

        try {
            String sql = "";
            if ("" != busName) {
//                whereSentence.append("and classify like '" + "%" + busName + "%" + "'  limit 1000");
//                  sql = "select * from role_segment  where path ='" + toSqlString(wavPath.trim()) + "' limit 500";
                whereSentence.append("and classify = '" + busName + "'   order by score DESC ");
//                whereSentence.append("and classify = '" + busName + "'     limit 1000");
                sql = "select * from business_classify  " + whereSentence.toString();
            } else {
                sql = "select * from business_classify  order by score DESC limit 1000";
//                  sql = "select * from business_classify   limit 1000";
            }
            st = (Statement) con.createStatement();
            System.out.println("sql:" + sql);
            logger.info(sql);
//            ResultSet rs = st.executeQuery(sql);
            res = new ArrayList<BusinessClassifyVo>();
            ResultSet rs = st.executeQuery(sql);
            while (rs.next()) {
                BusinessClassifyVo d = new BusinessClassifyVo();
                int id = rs.getInt("id");
                d.setId(id);
                d.setPath(rs.getString("path"));
                d.setClassify(rs.getString("classify"));
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

    /**
     * 查询业务汇总信息
     *
     * @param busName
     * @return
     * @throws SQLException
     */
    public List<BusCollectVo> ListBusCollectInfo(String busName) throws SQLException {

        StringBuilder whereSentence = new StringBuilder("where 1=1 ");

        List<BusCollectVo> res = null;
        con = getConnection();

        try {
            String sql = "";
            if ("" != busName) {
                whereSentence.append("  and classify like '" + "%" + busName + "%" + "'  group by classify order by total desc");
                sql = "select id,classify,count(classify) as total  from business_classify " + whereSentence.toString();
            } else {
                sql = "select id,classify,count(classify) as total  from business_classify group by classify order by total desc";
            }
            st = (Statement) con.createStatement();
            System.out.println("sql:" + sql);
            logger.info(sql);
//            ResultSet rs = st.executeQuery(sql);
            res = new ArrayList<BusCollectVo>();
            ResultSet rs = st.executeQuery(sql);
            while (rs.next()) {
                BusCollectVo d = new BusCollectVo();
                int id = rs.getInt("id");
                d.setId(id);
                d.setBusName(rs.getString("classify"));
                d.setConut(rs.getInt("total"));
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

    /**
     * 情绪检测
     *
     * @param wavPath
     * @return
     * @throws SQLException
     */
    public List<EmotionVo> ListEmotionInfo(String wavPath, String moodType) throws SQLException {

        StringBuilder whereSentence = new StringBuilder("where 1=1 ");

        List<EmotionVo> res = null;
        con = getConnection();
//select id, path, emotion from role_segment order by emotion desc limit 20
        try {
            String sql = "";
            if ("" != wavPath && null != wavPath && "" != moodType && null != moodType) {
                Integer mType = Integer.parseInt(moodType);
                if (mType == 2) {
                    whereSentence.append(" GROUP BY path");
                } else {
                    whereSentence.append(" and emotion =" + mType + "");
                }
//                whereSentence.append(" and emotion =" + mType + " ");
//                      whereSentence.append("  and classify like '" + "%" + busName + "%" + "'  group by classify order by total desc");
                whereSentence.append(" and path like '" + "%" + toSqlString(wavPath.trim()) + "%" + "' GROUP BY path  limit 1000");
                sql = "select  id, path, emotion from role_segment  " + whereSentence.toString();
            } else if ("" != wavPath && null != wavPath) {
                whereSentence.append(" and path ='" + toSqlString(wavPath.trim()) + "' GROUP BY path  limit 1000");
//                whereSentence.append("and classify like '" + "%" + busName + "%" + "'  limit 1000");
                sql = "select  id, path, emotion from role_segment  " + whereSentence.toString();
            } else if ("" != moodType && null != moodType) {
                Integer mType = Integer.parseInt(moodType);
                if (mType == 2) {
                    whereSentence.append(" GROUP BY path");
                } else {
                    whereSentence.append(" and emotion =" + mType + " GROUP BY path  limit 1000");
                }

                sql = "select  id, path, emotion from role_segment  " + whereSentence.toString();
            } else {
                sql = "select id, path, emotion from role_segment GROUP BY path";
            }
            st = (Statement) con.createStatement();
            System.out.println("sql:" + sql);
            logger.info(sql);
//            ResultSet rs = st.executeQuery(sql);
            res = new ArrayList<EmotionVo>();
            //添加去重方法
//            Set<String> s = new HashSet<String>();
            ResultSet rs = st.executeQuery(sql);
            while (rs.next()) {
                String path = rs.getString("path");
//                s.add(path);
//                if (!s.contains(path)) {
                EmotionVo d = new EmotionVo();
                int id = rs.getInt("id");
                d.setId(id);
                d.setPath(rs.getString("path"));
                d.setEmotion(AudioKeeperConstant.Emotion.get(rs.getInt("emotion")));
//                d.setClassify(rs.getString("classify"));
                System.out.println(" " + id + " " + id);
                res.add(d);
//                }

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

    /**
     * 静音检测
     *
     * @param wavPath
     * @return
     * @throws SQLException
     */
    public List<SilenceDetectionVo> ListSilenceInfo(String wavPath) throws SQLException {

        StringBuilder whereSentence = new StringBuilder("where 1=1 ");

        List<SilenceDetectionVo> res = null;
        con = getConnection();
//select id, path, emotion from role_segment order by emotion desc limit 20
        try {
            String sql = "";
            if ("" != wavPath && null != wavPath) {
                whereSentence.append(" and path ='" + toSqlString(wavPath.trim()) + "' order by score  limit 1000");
//                whereSentence.append("and classify like '" + "%" + busName + "%" + "'  limit 1000");
                sql = "select  * from silence_detection  " + whereSentence.toString();
            } else {
                sql = "select * from silence_detection order by score desc  limit 2000";
            }
            st = (Statement) con.createStatement();
            System.out.println("sql:" + sql);
            logger.info(sql);
//            ResultSet rs = st.executeQuery(sql);
            res = new ArrayList<SilenceDetectionVo>();
            ResultSet rs = st.executeQuery(sql);
            while (rs.next()) {
                SilenceDetectionVo d = new SilenceDetectionVo();
                d.setSegmentNo(rs.getInt("segmentNo"));
                d.setTimeStart(rs.getString("time_start"));
                d.setTimeEnd(rs.getString("time_end"));
//                d.setKeyword(rs.getString("keyword"));
//                d.setConfidence(rs.getString("confidence"));
//                d.setClassify(rs.getString("classify"));
//                System.out.println(" " + id + " " + id);
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

    /**
     * 根据条件查询静音
     *
     * @param wavPath
     * @return
     * @throws SQLException
     */
    public List<SpeechVo> SearchSilenceList(String wavPath, String threshold) throws SQLException {

        StringBuilder whereSentence = new StringBuilder("where 1=1 ");

        List<SpeechVo> res = null;
        con = getConnection();
//select id, path, emotion from role_segment order by emotion desc limit 20
        try {
            String sql = "";
            if ("" != wavPath && null != wavPath && "" != threshold && null != threshold) {
//                whereSentence.append(" and path ='" + toSqlString(wavPath.trim()) + "'  limit 1000");
//                whereSentence.append("and classify like '" + "%" + busName + "%" + "'  limit 1000");
//                sql = "select  * from silence_detection  " + whereSentence.toString();
                Integer i = Integer.parseInt(threshold);
                sql = "select i.id,i.path,i.length from info_total as i,(select * from silence_detection where  (time_end-time_start)>" + i + " and path like '" + "%" + wavPath + "%" + "')   as b where i.path= b.path and i.isSilence=1 order by score desc;";
            } else if ("" != wavPath && null != wavPath) {
//                whereSentence.append(" and path like '" + "%" + wavPath + "%" + "'"");
//                whereSentence.append(" and isSilence=1");
//                sql = "select  * from silence_detection  " + whereSentence.toString();
                sql = "select i.id,i.path,i.length from info_total as i,(select * from silence_detection where   path like '" + "%" + wavPath + "%" + "')   as b where i.path= b.path and i.isSilence=1 order by score desc;";
            } else if ("" != threshold && null != threshold) {
                Integer i = Integer.parseInt(threshold);
                sql = "select i.id,i.path,i.length from info_total as i,(select * from silence_detection where  (time_end-time_start)>" + i + ")    as b where i.path= b.path and i.isSilence=1 order by score desc ;";
            } else {
                sql = "select * from silence_detection where isSilence=1 order by score desc ";
            }
            st = (Statement) con.createStatement();
            System.out.println("sql:" + sql);
            logger.info(sql);
//            ResultSet rs = st.executeQuery(sql);
            res = new ArrayList<SpeechVo>();
            ResultSet rs = st.executeQuery(sql);
            while (rs.next()) {
                SpeechVo d = new SpeechVo();
                int id = rs.getInt("id");
                d.setId(id);
                d.setPath(rs.getString("path"));
                int length = rs.getInt("length");
                d.setTotal(length);

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

    /**
     * 获取关键词详情
     *
     * @param wavPath
     * @return
     * @throws SQLException
     */
    public List<KeywordVo> ListkeywordInfo(String wavPath) throws SQLException {

        StringBuilder whereSentence = new StringBuilder("where 1=1 ");

        List<KeywordVo> res = null;
        con = getConnection();
//select id, path, emotion from role_segment order by emotion desc limit 20
        try {
            String sql = "";
            if ("" != wavPath && null != wavPath) {
                whereSentence.append(" and path ='" + toSqlString(wavPath.trim()) + "'  limit 1000");
//                whereSentence.append("and classify like '" + "%" + busName + "%" + "'  limit 1000");
                sql = "select  * from keyword  " + whereSentence.toString();
            } else {
                sql = "select * from keyword  limit 2000";
            }
            st = (Statement) con.createStatement();
            System.out.println("sql:" + sql);
            logger.info(sql);
//            ResultSet rs = st.executeQuery(sql);
            res = new ArrayList<KeywordVo>();
            ResultSet rs = st.executeQuery(sql);
            while (rs.next()) {
                KeywordVo d = new KeywordVo();
                d.setSegmentNo(rs.getInt("segmentNo"));
                d.setTimeStart(rs.getString("time_start"));
                d.setTimeEnd(rs.getString("time_end"));
                d.setKeyword(rs.getString("keyword"));
                d.setConfidence(rs.getString("confidence"));
//                d.setClassify(rs.getString("classify"));
//                System.out.println(" " + id + " " + id);
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

    private String toSqlString(String s) {
        String r = s.replace("\\", "\\\\");
        return r;
    }

    public static void main(String args[]) throws SQLException {

        AnalysisDBUtil info = new AnalysisDBUtil();

//        System.out.println(info.toSqlString("D:\\\\beijing_mobile\\\\dfhgsdfhghj\\\\gjkfgh\\\\0943243.wav"));
//        List<RecTextVo> lux = info.ListSpeachToText(info.toSqlString("SL\\1553121"));
//        for (RecTextVo uv : lux) {
//            System.out.println(uv.toString());
//        }
//        List<SpeechVo> lux = info.ListSpeach("0906,0907,09074", "isRecognized");
//        for (SpeechVo uv : lux) {
//            System.out.println(uv.toString());
//        }
//        System.out.println(info.toSqlString("D:\\\\beijing_mobile\\\\dfhgsdfhghj\\\\gjkfgh\\\\0943243.wav"));
//        List<RoleSegmentVo> lux = info.querySenceDivision(info.toSqlString("D:\\beijing_mobile\\dfhgsdfhghj\\gjkfgh\\0943243.wav"));
//        for (RoleSegmentVo uv : lux) {
//            System.out.println(uv.toString());
//        }
//        List<BusinessClassifyVo> lux = info.ListBusInfo("话");
//        for (BusinessClassifyVo uv : lux) {
//            System.out.println(uv.toString());
//        }
//        List<BusCollectVo> lux = info.ListBusCollectInfo("话");
//        for (BusCollectVo uv : lux) {
//            System.out.println(uv.toString());
//        }
        List<EmotionVo> lux = info.ListEmotionInfo("", "2");
        for (EmotionVo uv : lux) {
            System.out.println(uv.toString());
        }
//          List<KeywordVo> lux = info.ListkeywordInfo("D:\\\\beijing_mobile\\\\SL\\\\1556533");
//        for (KeywordVo uv : lux) {
//            System.out.println(uv.toString());
//        }
//        List<SilenceDetectionVo> lux = info.ListSilenceInfo("D:\\\\beijing_mobile\\\\SL\\\\1553121");
//        for (SilenceDetectionVo uv : lux) {
//            System.out.println(uv.toString());
//        }
//        List<SpeechVo> lux = info.ListKeywordResult("", "流量", "");
//        for (SpeechVo uv : lux) {
//            System.out.println(uv.toString());
//        }
//        List<SpeechVo> lux = info.SearchSilenceList("09", "1");
//        for (SpeechVo uv : lux) {
//            System.out.println(uv.toString());
//        }

    }

}
