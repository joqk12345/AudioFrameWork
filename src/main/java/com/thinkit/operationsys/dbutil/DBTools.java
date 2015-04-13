/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thinkit.operationsys.dbutil;

import com.thinkit.operationsys.vo.*;
import org.springframework.stereotype.Repository;

import java.beans.Statement;
import java.sql.*;
import java.util.*;
import java.util.Date;

/**
 * RUN Luck Man 使用spring注解作为资源
 *
 * @author qiaokai
 * @date 2013-12-18 17:43:30
 */
@Repository
public class DBTools {

    private static Connection conn = null;

    private static Statement st;

    private static CallableStatement callableStatement;

    public DBTools() {

    }

    public static Connection getConnection() {
        try {
            Class.forName("com.mysql.jdbc.Driver");// 
//            conn = (Connection) DriverManager.getConnection("jdbc:mysql://192.168.14.240:3306/audiokeeper2004", "root", "123456");
            conn = (Connection) DriverManager.getConnection("jdbc:mysql://192.168.14.211:3306/audiokeeper", "root", "123456");
        } catch (Exception e) {
            System.out.println("" + e.getMessage());
        }
        return conn;
    }

    /**
     */
    public static void loadData() throws SQLException {
        conn = getConnection();

        callableStatement = conn.prepareCall("{call proc_create_table_lzp1(?)}");
        callableStatement.setString("fdate", "20131221");
        ResultSet resultSet = callableStatement.executeQuery();

    }

    public static List<AudioKeeperInfoVo> queryAudioKeeperInfo(String startDay, String endDay) throws SQLException {
        StringBuilder whereSentence = new StringBuilder("where 1=1 ");
        if ("" != startDay) {
            whereSentence.append("and curtime>='" + startDay + "'");
        }
        if ("" != endDay) {
            whereSentence.append("and curtime<='" + endDay + "'");
        }
        List<AudioKeeperInfoVo> res = null;
//		conn =   C3P0Tools.getInstance().getConnection();
        conn = getConnection();
        String sql = "select * from resultinfo " + whereSentence.toString() + "  limit 500";
        System.out.println("sql:" + sql);
        try(java.sql.Statement statement =conn.createStatement()) {

            ResultSet resultSet =statement.executeQuery(sql);

            res = new ArrayList<AudioKeeperInfoVo>();
            while (resultSet.next()) {
                AudioKeeperInfoVo d = new AudioKeeperInfoVo();
                Date curtime = resultSet.getDate("curtime");
                d.setHour(curtime.toString());
                String result_1 = resultSet.getString("result_1");
                d.setResultInfo(result_1);
                String confidence_of_result_1 = resultSet.getString("confidence_of_result_1");
                d.setConfidence(confidence_of_result_1);
                String segtime_of_result_1 = resultSet.getString("segtime_of_result_1");
                d.setPhoneme(segtime_of_result_1);

                System.out.println(" " + curtime + " " + result_1);
                res.add(d);
            }
            return res;
        } catch (SQLException e) {
            System.out.println("sql error");
        } finally {
            if (conn != null) {
                conn.close();
            }
        }
        return res;
    }

    public static List<UndResultVo> queryUndResInfo(String startDay, String endDay) throws SQLException {
        StringBuilder whereSentence = new StringBuilder("where 1=1 ");
        if ("" != startDay) {
            whereSentence.append("and timestamp>='" + startDay + "'");
        }
        if ("" != endDay) {
            whereSentence.append("and timestamp<='" + endDay + "'");
        }
        List<UndResultVo> res = null;
//		conn =   C3P0Tools.getInstance().getConnection();
        conn = getConnection();
        try {
            String sql = "select * from resultset " + whereSentence.toString() + "  limit 1000";
//            String sql = "select * from resultset ";
//            st = (Statement) conn.createStatement();

            java.sql.Statement statement = conn.createStatement();
            System.out.println("sql:" + sql);
            ResultSet rs = statement.executeQuery(sql);
            res = new ArrayList<UndResultVo>();
            while (rs.next()) {
//                System.out.println("sql:"+sql);
                UndResultVo d = new UndResultVo();
                d.setId(rs.getInt("id"));
//                Date curtime = rs.getDate("timestamp");
                Timestamp st = rs.getTimestamp("timestamp");
//                java.text.DateFormat format1 = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//                String s = format1.format(curtime);
                d.setHour(st.toString());
                String result_1 = rs.getString("Result_of_rec");
                d.setResultInfo(result_1);
                String confidence_of_result_1 = rs.getString("confidence");
                d.setConfidence(confidence_of_result_1);
                String action = rs.getString("action");
                d.setUnderInfo(action);
                String actionTips = rs.getString("reply");
                d.setUnderInfoTips(actionTips);
                String scores = rs.getString("score");
                if (scores.length() > 4) {
                    d.setScores(scores.substring(0, 4));
                } else {
                    d.setScores(scores);
                }

//                System.out.println(" " + curtime + " " + result_1);
                res.add(d);
            }
            return res;
        } catch (SQLException e) {
            System.out.println("sql error");
        } finally {
            if (conn != null) {
                conn.close();
            }
        }
        return res;
    }

    public HourConfigVo queryByMonth() throws SQLException {

//        List<HourConfigVo> res = null;
        ResultSet rs = null;
        HourConfigVo Hcv = null;
        conn = getConnection();
        try {
            String sql = "select month(tim) as month,sum(total_sum) as total from lzp_total group by month(tim)";
            java.sql.Statement statement = conn.createStatement();
            rs = statement.executeQuery(sql);
//                res = new ArrayList<HourConfigVo>();
            Hcv = new HourConfigVo();
            while (rs.next()) {
                String month = rs.getString("month");
                String total = rs.getString("total");
                System.out.println(month + " " + total);
                Hcv.setData(month, Integer.parseInt(total));
//                    res.add(Hcv);
            }
            return Hcv;
        } catch (SQLException e) {
            System.out.println("sql error");
        } finally {
            if (conn != null) {
                conn.close();
            }
        }

        return Hcv;
    }

    /**
     * *
     *
     * @return
     */
    public ArrayList<SortedMap<String, String>> querySucSum(String sYear, String sMonth, String eYear, String eMonth) throws SQLException {
        StringBuilder whereSentence = new StringBuilder("where 1=1 ");

        if ("" != sYear) {
            whereSentence.append("and year(tim)>+'" + sYear + "'");
        } else if ("" != sMonth) {
            whereSentence.append("and month(tim)>+'" + sMonth + "'");
        } else if ("" != eYear) {
            whereSentence.append("and year(tim)<+'" + eYear + "'");
        } else if ("" != eMonth) {
            whereSentence.append("and month(tim)<+'" + eMonth + "'");
        }

        ResultSet rs = null;
        ArrayList<SortedMap<String, String>> res = new ArrayList<SortedMap<String, String>>();
        conn = getConnection();
        try {
            String sql = "select month(tim) as month ,sum(suc_sum) as sumtotal from lzp_total " + whereSentence.toString() + "group by month(tim);";
            System.out.println("sql:" + sql);
            java.sql.Statement statement = conn.createStatement();
            rs = statement.executeQuery(sql);
            SortedMap<String, String> hashSet = new TreeMap<String, String>() {
            };
            while (rs.next()) {
                String month = rs.getString("month");
                String sumtotal = rs.getString("sumtotal");
                System.out.println(month + " " + sumtotal);
//                    Hcv.setData(month,Integer.parseInt(total));
                hashSet.put(month, sumtotal);
            }
            res.add(hashSet);
            return res;
        } catch (SQLException e) {
            System.out.println("sql error");
        } finally {
            if (conn != null) {
                conn.close();
            }
        }
        return res;
    }

    /**
     * *
     *
     * @return
     */
    public ArrayList<SortedMap<String, String>> queryTotal(String sYear, String sMonth, String eYear, String eMonth) throws SQLException {
        StringBuilder whereSentence = new StringBuilder("where 1=1 ");

        if ("" != sYear) {
            whereSentence.append("and year(tim)>+'" + sYear + "'");
        } else if ("" != sMonth) {
            whereSentence.append("and month(tim)>+'" + sMonth + "'");
        } else if ("" != eYear) {
            whereSentence.append("and year(tim)<+'" + eYear + "'");
        } else if ("" != eMonth) {
            whereSentence.append("and month(tim)<+'" + eMonth + "'");
        }

        ResultSet rs = null;
        ArrayList<SortedMap<String, String>> res = new ArrayList<SortedMap<String, String>>();
        conn = getConnection();
        try {
            String sql = "select month(tim) as month ,sum(total_sum) as sumtotal from lzp_total " + whereSentence.toString() + "group by month(tim);";
            System.out.println("sql:" + sql);
            java.sql.Statement statement = conn.createStatement();
            rs = statement.executeQuery(sql);
//                res = new ArrayList<HourConfigVo>();
//                 Hcv = new HourConfigVo();
            SortedMap<String, String> hashSet = new TreeMap<String, String>() {
            };
            while (rs.next()) {
                String month = rs.getString("month");
                String sumtotal = rs.getString("sumtotal");
                System.out.println(month + " " + sumtotal);
//                    Hcv.setData(month,Integer.parseInt(total));
                hashSet.put(month, sumtotal);
            }
            res.add(hashSet);
            return res;
        } catch (SQLException e) {
            System.out.println("sql error");
        } finally {
            if (conn != null) {
                conn.close();
            }
        }
        return res;
    }

    /**
     * @param countType ͳ������
     * @param startDay  ��ʼ����
     * @param endDay    ��������
     * @return
     */
    public ArrayList<AudioKeeperInfoVoCount> queryAudioKeeperInfoCount(int countType, String startDay, String endDay) throws SQLException {
        conn = getConnection();
        StringBuilder whereSentence = new StringBuilder("where 1=1 ");
        ArrayList<AudioKeeperInfoVoCount> result = null;
        ResultSet rs = null;
        String sql = "";
        switch (countType) {
            case 1: // ����
                if ("" != startDay) {
                    whereSentence.append("and tim>='" + startDay + "'");
                } else if ("" != startDay) {
                    whereSentence.append("and tim<='" + startDay + "'");
                }
//                sql = " select day(tim) as tm,sum(total_sum) as total,sum(suc_sum) as sucsum from lzp_total " + whereSentence.toString() + "group by day(tim);";
                sql = " select tim as  tm,sum(total_sum) as total,sum(suc_sum) as sucsum from lzp_total " + whereSentence.toString() + "group by day(tim);";
                break;
            case 2:  //����
                if ("" != startDay) {
                    whereSentence.append("and tim>='" + startDay + "'");
                } else if ("" != startDay) {
                    whereSentence.append("and tim<='" + startDay + "'");
                }
//                sql = " select month(tim) as tm,sum(total_sum) as total,sum(suc_sum) as sucsum from lzp_total " + whereSentence.toString() + "group by month(tim);";
                sql = " select substring(tim,1,7) as tm,sum(total_sum) as total,sum(suc_sum) as sucsum from lzp_total " + whereSentence.toString() + "group by month(tim);";
                break;
            case 3://��ʱ��
                if ("" != startDay) {
                    whereSentence.append("and tim='" + startDay + "'");
                } else {
                    startDay = "2014-01-09";
                    whereSentence.append("and tim='" + startDay + "'");
                }
                sql = "select hour as tm, total_sum as total ,suc_sum as sucsum from lzp_total " + whereSentence.toString();
                break;
        }

        System.out.println("sql:" + sql);
        java.sql.Statement statement = conn.createStatement();
        rs = statement.executeQuery(sql);
        result = new ArrayList<AudioKeeperInfoVoCount>();
        while (rs.next()) {
            AudioKeeperInfoVoCount aiv = new AudioKeeperInfoVoCount();

            Integer total = rs.getInt("total");
            Integer sucnum = rs.getInt("sucsum");
            float rate;
            if (total != 0) {
                rate = (float) ((double) sucnum / (double) total) * 100;
            } else {
                rate = 0.0f;
            }

            aiv.setHour(rs.getString("tm"));
            aiv.setTotal(total.toString());
            aiv.setSucnum(sucnum.toString());
            aiv.setRate(Float.toString(rate));

            result.add(aiv);
        }

        return result;
    }

    public ArrayList<ChartInfoVo> queryAudioKeeperChartCount(int countType, String startDay, String endDay) throws SQLException {
        conn = getConnection();
        StringBuilder whereSentence = new StringBuilder("where 1=1 ");
        ArrayList<ChartInfoVo> result = null;
        ResultSet rs = null;
        String sql = "";
        switch (countType) {
            case 1: // ����
                if ("" != startDay) {
                    whereSentence.append("and tim>='" + startDay + "'");
                } else if ("" != startDay) {
                    whereSentence.append("and tim<='" + startDay + "'");
                }
                sql = " select substring(tim,6,11) as tm,sum(total_sum) as total,sum(suc_sum) as sucsum from lzp_total " + whereSentence.toString() + "group by day(tim);";
                break;
            case 2:  //����
                if ("" != startDay) {
                    whereSentence.append("and tim>='" + startDay + "'");
                } else if ("" != startDay) {
                    whereSentence.append("and tim<='" + startDay + "'");
                }
                sql = " select month(tim) as tm,sum(total_sum) as total,sum(suc_sum) as sucsum from lzp_total " + whereSentence.toString() + "group by month(tim);";
                break;
            case 3://��ʱ��
                if ("" != startDay) {
                    whereSentence.append("and tim='" + startDay + "'");
                } else {
                    startDay = "2014-01-08";
                    whereSentence.append("and tim='" + startDay + "'");
                }
                sql = "select hour as tm, total_sum as total ,suc_sum as sucsum from lzp_total " + whereSentence.toString();
                break;
        }

        System.out.println("sql:" + sql);
        java.sql.Statement statement = conn.createStatement();
        rs = statement.executeQuery(sql);
        result = new ArrayList<ChartInfoVo>();
        while (rs.next()) {
            ChartInfoVo aiv = new ChartInfoVo();

            Integer total = rs.getInt("total");
            Integer sucnum = rs.getInt("sucsum");

            aiv.setDayy(rs.getString("tm"));
            aiv.setTotal(total.toString());
            aiv.setSucsum(sucnum.toString());

            result.add(aiv);
        }

        return result;
    }

    public ArrayList<HandlingCapacityVo> QueryHandlingCapacityInfo(String startDay, String endDay) throws SQLException {
        conn = getConnection();
        StringBuilder whereSentence = new StringBuilder("where 1=1 ");
        ArrayList<HandlingCapacityVo> result = null;
        ResultSet rs = null;
        String sql = "";
        if ("" != startDay) {
            whereSentence.append("and tim>='" + startDay + "'");
        }
        if ("" != endDay) {
            whereSentence.append("and tim<='" + endDay + "'");
        }
//                sql = " select substring(tim,6,11) as tm,sum(total_sum) as total,sum(suc_sum) as sucsum from lzp_total " + whereSentence.toString() + "group by day(tim);";
        sql = " select substring(tim,6,11) as tm,sum(total_sum) as total from lzp_total " + whereSentence.toString() + "group by day(tim);";
        System.out.println("sql:" + sql);
        java.sql.Statement statement = conn.createStatement();
        rs = statement.executeQuery(sql);
        result = new ArrayList<HandlingCapacityVo>();
        while (rs.next()) {
            HandlingCapacityVo aiv = new HandlingCapacityVo();
            // ʱ��
            aiv.setTime(rs.getString("tm"));
            //��������
            Integer total = rs.getInt("total");
            aiv.setCallNum(total.toString());
            //ת�˹���
            aiv.setSwitchPeople(geneter(9, 5));
            //ת�˹���
            aiv.setSwitchPeopleRate(geneter(5, 1));
            //����ͨ����
            aiv.setSilentTalkRate(geneter(10, 1));
            //ƽ������
            aiv.setAvgInteractiveNum(geneter(3, 1));
            //ƽ��ʱ��
            aiv.setAvgInteractiveRate(geneter(32, 25));
            result.add(aiv);
        }
        return result;
    }

    private String geneter(int max, int min) {
        Random random = new Random();
        Integer s = random.nextInt(max) % (max - min + 1) + min;
        return s.toString();
    }

    public static List<logInfoVo> queryLogInfo(String startDay, String endDay) throws SQLException {
        StringBuilder whereSentence = new StringBuilder("where 1=1 ");
        if ("" != startDay) {
            whereSentence.append("and optime>='" + startDay + "'");
        }
        if ("" != endDay) {
            whereSentence.append("and optime<='" + endDay + "'");
        }
        List<logInfoVo> res = null;
//		conn =   C3P0Tools.getInstance().getConnection();
        conn = getConnection();
        ResultSet rs;
        try {
            String sql = "select * from loginfo " + whereSentence.toString() + "  limit 500";
            java.sql.Statement statement = conn.createStatement();

            System.out.println("sql:" + sql);
            rs = statement.executeQuery(sql);
            res = new ArrayList<logInfoVo>();
            while (rs.next()) {
                logInfoVo d = new logInfoVo();
                d.setUname(rs.getString("uname"));
                d.setHostIp(rs.getString("hostip"));

                Timestamp st = rs.getTimestamp("optime");
                d.setTime(st.toString());
                d.setOp(rs.getString("op"));
                d.setOpcontent(rs.getString("opcontent"));

//                Date curtime = rs.getDate("curtime");
//                d.setHour(curtime.toString());
//                String result_1 = rs.getString("result_1");
//                d.setResultInfo(result_1);
//                String confidence_of_result_1 = rs.getString("confidence_of_result_1");
//                d.setConfidence(confidence_of_result_1);
//                String segtime_of_result_1 = rs.getString("segtime_of_result_1");
//                d.setPhoneme(segtime_of_result_1);
//                System.out.println(" " + curtime + " " + result_1);
                res.add(d);
            }
            return res;
        } catch (SQLException e) {
            System.out.println("sql error");
        } finally {
            if (conn != null) {
                conn.close();
            }
        }
        return res;
    }

    public static void main(String[] args) throws SQLException {

        DBTools dt = new DBTools();
        List<logInfoVo> al = dt.queryLogInfo("2013-12-30", "2014-01-10");
        for (logInfoVo a : al) {
            System.out.println(a);
        }

//        int max=15;
//        int min=10;
//        Random random = new Random();
//
//        int s = random.nextInt(max)%(max-min+1) + min;
//        System.out.println("1"+s);
//        
//        
//         for(int i = 0; i < 50; i++)  
//        {  
//            System.out.println((int)(Math.random() * 41 + 10));  
//        }  
//           int a=10;
//           int b=9;
//           
//        System.out.println(((double)b/(double)a)*100);
//          DBTools dt = new DBTools();
//        List<UndResultVo> al = dt.queryUndResInfo("2013-12-30", "2014-01-09");
//        for (UndResultVo a : al) {
//            System.out.println(a);
//        }
//        DBTools dt = new DBTools();
//        List<AudioKeeperInfoVo> al = dt.queryAudioKeeperInfo("2013-12-30", "2014-01-09");
//        for (AudioKeeperInfoVo a : al) {
//            System.out.println(a);
//        }
//        ClassLoader current;
//        current = DBTools.class.getClassLoader();
//
//        System.out.println(current);
//        System.out.println(current.getParent());
//        DBTools dt = new DBTools();
//             dt.query();
//             dt.queryByMonth();
//        System.out.println(dt.querySucSum());
//        ArrayList<SortedMap<String,String>> al  =   dt.querySucSum();
//        for(SortedMap s:al){
//           for(Iterator iter=s.entrySet().iterator(); iter.hasNext();){  
//                Entry entry = (Entry)iter.next();  
//                String key =entry.getKey().toString();     //����������Ӧ�ļ�  
//                String value=entry.getValue().toString();   //����������Ӧ��ֵ  
//                System.out.println(key+" --------------"+value);
//            }  
//        }
    }
}
