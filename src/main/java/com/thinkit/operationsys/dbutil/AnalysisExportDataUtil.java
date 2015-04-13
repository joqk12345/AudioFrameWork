package com.thinkit.operationsys.dbutil;

import com.thinkit.operationsys.constant.FileConstant;
import com.thinkit.operationsys.util.FileUtil;
import com.thinkit.operationsys.util.StringUtil;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Repository;

import java.sql.*;

/**
 * * RUN Luck Man
 *
 * @author qiaokai
 * @datetime 2014-2-14 16:25:50
 * @mail to: qianyanqk@163.com
 */
@Repository
public class AnalysisExportDataUtil {

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
     * 根据话单名称获取话单详细内容
     *
     * @param wavpath
     * @return
     */
    public String getVoiceText(String wavPath) throws SQLException {

        StringBuffer result = new StringBuffer();
        try {
//            con = C3P0Tools.getInstance().getConnection();
            con = getConnection();
            //为获转义的详细的sql信息
//        String path = 
            String sql = "select * from rec_result  where path ='" + wavPath.trim() + "' ";
            st = (Statement) con.createStatement();
            System.out.println("sql:" + sql);
            logger.info(sql);
            ResultSet rs = st.executeQuery(sql);
            //文件目录转义
            result.append(getExprotDirctory(wavPath));
            while (rs.next()) {
//            String text = StringUtil.toNormalString(rs.getString("content")) + "\n";
                String text = rs.getString("content") + "\r\n";
//            String text = getExprotContext(rs.getString("content"));
                result.append(text);
            }
            System.out.println(result.toString());
        } catch (SQLException e) {
            System.out.println("sql error");
        } finally {
            if (st != null) {
                st.close();
            }
            if (con != null) {
                con.close();
            }
        }
        return result.toString();
    }

    /**
     * *
     * 根据话单名称获取场景分割的信息
     *
     * @param wavPath
     * @return
     * @throws SQLException
     */
    public String getScenceText(String wavPath) throws SQLException {

        StringBuffer result = new StringBuffer();
        try {
            con = getConnection();
            //为获转义的详细的sql信息
//        String path = 
//        String sql = "select * from rec_result  where path ='" + wavPath.trim() + "' limit 500";
            String sql = "select * from role_segment  where path ='" + wavPath.trim() + "' ";
            st = (Statement) con.createStatement();
            System.out.println("sql:" + sql);
            logger.info(sql);

            ResultSet rs = st.executeQuery(sql);
            //输入文件头信息
            //文件目录转义
            result.append(getExprotDirctory(wavPath));
//        result.append("文件名" + StringUtil.toNormalString(wavPath) + "\r\n");
            while (rs.next()) {
//            String text = StringUtil.toNormalString(rs.getString("content")) + "\n";
                String role = rs.getString("role") + ":\t";
                String text = rs.getString("content") + "\r\n";
                result.append(role);
                result.append(text);
            }
            System.out.println(result.toString());
        } catch (SQLException e) {
            System.out.println("sql error");
        } finally {
            if (st != null) {
                st.close();
            }
            if (con != null) {
                con.close();
            }
        }
        return result.toString();
    }

    /**
     * 获取查询的业务名字 目前只是根据文件名称获取业务名称
     *
     * @param wavPath
     * @return
     * @throws SQLException
     */
    public String getBusText(String wavPath) throws SQLException {
        StringBuffer result = new StringBuffer();
        try {
            con = getConnection();
            //为获转义的详细的sql信息
//        String path = 
//        String sql = "select * from rec_result  where path ='" + wavPath.trim() + "' limit 500";
            String sql = "select * from business_classify  where path ='" + wavPath.trim() + "' ";
            st = (Statement) con.createStatement();
            System.out.println("sql:" + sql);
            logger.info(sql);
            ResultSet rs = st.executeQuery(sql);
//        result.append("文件名" + wavPath + "\r\n");
            if (rs.next()) {
//            String text = StringUtil.toNormalString(rs.getString("content")) + "\n";
//            String role = rs.getString("role") + ":\t";
                String text = rs.getString("classify") + "\r\n";
                result.append("业务名称:" + text);
            }
            System.out.println(result.toString());
        } catch (SQLException e) {
            System.out.println("sql error");
        } finally {
            if (st != null) {
                st.close();
            }
            if (con != null) {
                con.close();
            }
        }

        return result.toString();
    }

    private String toSqlString(String s) {
        String r = s.replace("\\", "\\\\");
        return r;
    }

    public static void main(String args[]) throws SQLException {
        AnalysisExportDataUtil e = new AnalysisExportDataUtil();
        StringBuffer BufferContext = new StringBuffer();
        String json = "voice1\\\\csly (2330),voice1\\\\csly (2331),voice1\\\\csly (2332),voice1\\\\csly (2333),voice1\\\\csly (2334),voice1\\\\csly (2335),voice1\\\\csly (2336),voice1\\\\csly (2337),voice1\\\\csly (2338),voice1\\\\csly (2339),voice1\\\\csly (2340),voice1\\\\csly (2341),voice1\\\\csly (2342),voice1\\\\csly (2343),voice1\\\\csly (2344),voice1\\\\csly (2345),voice1\\\\csly (2346),voice1\\\\csly (2347),voice1\\\\csly (2348),voice1\\\\csly (2349),voice1\\\\csly (2350),voice1\\\\csly (2351),voice1\\\\csly (2352),voice1\\\\csly (2353),voice1\\\\csly (2354),voice1\\\\csly (2355),voice1\\\\csly (2356),voice1\\\\csly (2357),voice1\\\\csly (2358),voice1\\\\csly (2359),voice1\\\\csly (2360),voice1\\\\csly (2361),voice1\\\\csly (2362),voice1\\\\csly (2363),voice1\\\\csly (2364),voice1\\\\csly (2365),voice1\\\\csly (2366),voice1\\\\csly (2367),voice1\\\\csly (2368),voice1\\\\csly (2369),voice1\\\\csly (2370),voice1\\\\csly (2371),voice1\\\\csly (2372),voice1\\\\csly (2373),voice1\\\\csly (2374),voice1\\\\csly (2375),voice1\\\\csly (2376),voice1\\\\csly (2377),voice1\\\\csly (2378),voice1\\\\csly (2379),voice1\\\\csly (2380),voice1\\\\csly (2381),voice1\\\\csly (2382),voice1\\\\csly (2383),voice1\\\\csly (2384),voice1\\\\csly (2385),voice1\\\\csly (2386),voice1\\\\csly (2387),voice1\\\\csly (2388),voice1\\\\csly (2389),voice1\\\\csly (2390),voice1\\\\csly (2391),voice1\\\\csly (2392),voice1\\\\csly (2393),voice1\\\\csly (2394),voice1\\\\csly (2395),voice1\\\\csly (2396),voice1\\\\csly (2397),voice1\\\\csly (2398),voice1\\\\csly (2399),voice1\\\\csly (2400),voice1\\\\csly (2401),voice1\\\\csly (2402),voice1\\\\csly (2403),voice1\\\\csly (2404),voice1\\\\csly (2405),voice1\\\\csly (2406),voice1\\\\csly (2407),voice1\\\\csly (2408),voice1\\\\csly (2409),voice1\\\\csly (2410),voice1\\\\csly (2411),voice1\\\\csly (2412),voice1\\\\csly (2413),voice1\\\\csly (2414),voice1\\\\csly (2415),voice1\\\\csly (2416),voice1\\\\csly (2417),voice1\\\\csly (2418),voice1\\\\csly (2419),voice1\\\\csly (2420),voice1\\\\csly (2421),voice1\\\\csly (2422),voice1\\\\csly (2423),voice1\\\\csly (2424),voice1\\\\csly (2425),voice1\\\\csly (2426),voice1\\\\csly (2427),voice1\\\\csly (2428),voice1\\\\csly (2429),voice1\\\\csly (2430),voice1\\\\csly (2431),voice1\\\\csly (2432),voice1\\\\csly (2433),voice1\\\\csly (2434),voice1\\\\csly (2435),voice1\\\\csly (2436),voice1\\\\csly (2437),voice1\\\\csly (2438),voice1\\\\csly (2439),voice1\\\\csly (2440),voice1\\\\csly (2441),voice1\\\\csly (2442),voice1\\\\csly (2443),voice1\\\\csly (2444),voice1\\\\csly (2445),voice1\\\\csly (2446),voice1\\\\csly (2447),voice1\\\\csly (2448),voice1\\\\csly (2449),voice1\\\\csly (2450),voice1\\\\csly (2451),voice1\\\\csly (2452),voice1\\\\csly (2453),voice1\\\\csly (2454),voice1\\\\csly (2455),voice1\\\\csly (2456),voice1\\\\csly (2457),voice1\\\\csly (2458),voice1\\\\csly (2459),voice1\\\\csly (2460),voice1\\\\csly (2461),voice1\\\\csly (2462),voice1\\\\csly (2463),voice1\\\\csly (2464),voice1\\\\csly (2465),voice1\\\\csly (2466),voice1\\\\csly (2467),voice1\\\\csly (2468),voice1\\\\csly (2469),voice1\\\\csly (2470),voice1\\\\csly (2471),voice1\\\\csly (2499),voice1\\\\csly (2500),voice2\\\\csly (10),voice2\\\\csly (1000),voice2\\\\csly (1001),voice2\\\\csly (1002),voice2\\\\csly (1003),voice2\\\\csly (1004),voice2\\\\csly (1005),voice2\\\\csly (1006),voice2\\\\csly (1007),voice2\\\\csly (1008),voice2\\\\csly (1009),voice2\\\\csly (1010),voice2\\\\csly (1011),voice2\\\\csly (1012),voice2\\\\csly (1013),voice2\\\\csly (1014),voice2\\\\csly (1015),voice2\\\\csly (1017),voice2\\\\csly (1018),voice2\\\\csly (1019),voice2\\\\csly (1020),voice2\\\\csly (1021),voice2\\\\csly (1022),voice2\\\\csly (1023),voice2\\\\csly (1024),voice2\\\\csly (1025),voice2\\\\csly (1026),voice2\\\\csly (1027),voice2\\\\csly (1028),voice2\\\\csly (1029),voice2\\\\csly (1030),voice2\\\\csly (1031),voice2\\\\csly (1032),voice2\\\\csly (1033),voice2\\\\csly (1034),voice2\\\\csly (1035),voice2\\\\csly (1036),voice2\\\\csly (1037),voice2\\\\csly (1038),voice2\\\\csly (1039),voice2\\\\csly (1040),voice2\\\\csly (1041),voice2\\\\csly (1042),voice2\\\\csly (1043),voice2\\\\csly (1044),voice2\\\\csly (1045),voice2\\\\csly (1046),voice2\\\\csly (1047),voice2\\\\csly (1048),voice2\\\\csly (1049),voice2\\\\csly (1050),voice2\\\\csly (1051),voice2\\\\csly (1052),voice2\\\\csly (1053),voice2\\\\csly (1054),voice2\\\\csly (1055),voice2\\\\csly (1056),voice2\\\\csly (1057),voice2\\\\csly (1058),voice2\\\\csly (1059),voice2\\\\csly (1060),voice2\\\\csly (1061),voice2\\\\csly (1062),voice2\\\\csly (1063),voice2\\\\csly (1064),voice2\\\\csly (1065),voice2\\\\csly (1066),voice2\\\\csly (1067),voice2\\\\csly (1068),voice2\\\\csly (1069),voice2\\\\csly (1070),voice2\\\\csly (1071),voice2\\\\csly (1072),voice2\\\\csly (1073),voice2\\\\csly (1074),voice2\\\\csly (1075),voice2\\\\csly (1076),voice2\\\\csly (1077),voice2\\\\csly (1078),voice2\\\\csly (1079),voice2\\\\csly (1080),voice2\\\\csly (1081),voice2\\\\csly (1082),voice2\\\\csly (1083),voice2\\\\csly (1084),voice2\\\\csly (1085),voice2\\\\csly (1086),voice2\\\\csly (1087),voice2\\\\csly (1088),voice2\\\\csly (1089),voice2\\\\csly (1090),voice2\\\\csly (1091),voice2\\\\csly (1092),voice2\\\\csly (1093),voice2\\\\csly (1094),voice2\\\\csly (1095),voice2\\\\csly (1096),voice2\\\\csly (1097),voice2\\\\csly (1098),voice2\\\\csly (1099),voice2\\\\csly (11),voice2\\\\csly (1100),voice2\\\\csly (1101),voice2\\\\csly (1102),voice2\\\\csly (1103),voice2\\\\csly (1104),voice2\\\\csly (1105),voice2\\\\csly (1106),voice2\\\\csly (1107),voice2\\\\csly (1108),voice2\\\\csly (1109),voice2\\\\csly (1110),voice2\\\\csly (1111),voice2\\\\csly (1112),voice2\\\\csly (1113),voice2\\\\csly (1114),voice2\\\\csly (1115),voice2\\\\csly (1116),voice2\\\\csly (1117),voice2\\\\csly (1118),voice2\\\\csly (1119),voice2\\\\csly (1120),voice2\\\\csly (1121),voice2\\\\csly (1122),voice2\\\\csly (1123),voice2\\\\csly (1124),voice2\\\\csly (1125),voice2\\\\csly (1126),voice2\\\\csly (1127),voice2\\\\csly (1128),voice2\\\\csly (1129),voice2\\\\csly (1130),voice2\\\\csly (1131),voice2\\\\csly (1132),voice2\\\\csly (1133),voice2\\\\csly (1134),voice2\\\\csly (1135),voice2\\\\csly (1136),voice2\\\\csly (1137),voice2\\\\csly (1138),voice2\\\\csly (1139),voice2\\\\csly (1140),voice2\\\\csly (1141),voice2\\\\csly (1142),voice2\\\\csly (1143),voice2\\\\csly (1144),voice2\\\\csly (1145),voice2\\\\csly (1146),voice2\\\\csly (1147),voice2\\\\csly (1148),voice2\\\\csly (1149),voice2\\\\csly (1150),voice2\\\\csly (1151),voice2\\\\csly (1152),voice2\\\\csly (1153),voice2\\\\csly (12),voice2\\\\csly (13),voice2\\\\csly (201),voice2\\\\csly (202),voice2\\\\csly (203),voice2\\\\csly (204),voice2\\\\csly (205),voice2\\\\csly (206),voice2\\\\csly (207),voice2\\\\csly (208),voice2\\\\csly (209),voice2\\\\csly (210),voice2\\\\csly (211),voice2\\\\csly (212),voice2\\\\csly (213),voice2\\\\csly (214),voice2\\\\csly (215),voice2\\\\csly (216),voice2\\\\csly (217),voice2\\\\csly (218),voice2\\\\csly (219),voice2\\\\csly (220),voice2\\\\csly (221),voice2\\\\csly (222),voice2\\\\csly (223),voice2\\\\csly (224),voice2\\\\csly (225),voice2\\\\csly (226),voice2\\\\csly (227),voice2\\\\csly (228),voice2\\\\csly (229),voice2\\\\csly (230),voice2\\\\csly (231),voice2\\\\csly (232),voice2\\\\csly (233),voice2\\\\csly (234),voice2\\\\csly (235),voice2\\\\csly (236),voice2\\\\csly (237),voice2\\\\csly (238),voice2\\\\csly (239),voice2\\\\csly (240),voice2\\\\csly (271),voice2\\\\csly (272),voice2\\\\csly (273),voice2\\\\csly (274),voice2\\\\csly (275),voice2\\\\csly (276),voice2\\\\csly (277),voice2\\\\csly (278),voice2\\\\csly (279),voice2\\\\csly (280),voice2\\\\csly (281),voice2\\\\csly (282),voice2\\\\csly (283),voice2\\\\csly (284),voice2\\\\csly (285),voice2\\\\csly (286),voice2\\\\csly (287),voice2\\\\csly (288),voice2\\\\csly (289),voice2\\\\csly (290),voice2\\\\csly (291),voice2\\\\csly (292),voice2\\\\csly (293),voice2\\\\csly (294),voice2\\\\csly (295),voice2\\\\csly (296),voice2\\\\csly (297),voice2\\\\csly (298),voice2\\\\csly (299),voice2\\\\csly (300),voice2\\\\csly (322),voice2\\\\csly (323),voice2\\\\csly (324),voice2\\\\csly (325),voice2\\\\csly (326),voice2\\\\csly (327),voice2\\\\csly (328),voice2\\\\csly (329),voice2\\\\csly (330),voice2\\\\csly (331),voice2\\\\csly (332),voice2\\\\csly (333),voice2\\\\csly (334),voice2\\\\csly (335),voice2\\\\csly (336),voice2\\\\csly (337),voice2\\\\csly (338),voice2\\\\csly (339),voice2\\\\csly (340),voice2\\\\csly (341),voice2\\\\csly (342),voice2\\\\csly (343),voice2\\\\csly (344),voice2\\\\csly (345),voice2\\\\csly (346),voice2\\\\csly (347),voice2\\\\csly (348),voice2\\\\csly (349),voice2\\\\csly (350),voice2\\\\csly (351),voice2\\\\csly (352),voice2\\\\csly (353),voice2\\\\csly (354),voice2\\\\csly (355),voice2\\\\csly (356),voice2\\\\csly (357),voice2\\\\csly (358),voice2\\\\csly (359),voice3\\\\csly (1154),voice3\\\\csly (1155),voice3\\\\csly (1156),voice3\\\\csly (1157),voice3\\\\csly (1158),voice3\\\\csly (1159),voice3\\\\csly (1160),voice3\\\\csly (1161),voice3\\\\csly (1162),voice3\\\\csly (1163),voice3\\\\csly (1164),voice3\\\\csly (1165),voice3\\\\csly (1166),voice3\\\\csly (1167),voice3\\\\csly (1168),voice3\\\\csly (1169),voice3\\\\csly (1170),voice3\\\\csly (1171),voice3\\\\csly (1172),voice3\\\\csly (1173),voice3\\\\csly (1174),voice3\\\\csly (1175),voice3\\\\csly (1176),voice3\\\\csly (1177),voice3\\\\csly (1178),voice3\\\\csly (1179),voice3\\\\csly (1180),voice3\\\\csly (1181),voice3\\\\csly (1182),voice3\\\\csly (1183),voice3\\\\csly (1184),voice3\\\\csly (1185),voice3\\\\csly (1186),voice3\\\\csly (1187),voice3\\\\csly (1188),voice3\\\\csly (1189),voice3\\\\csly (1190),voice3\\\\csly (1191),voice3\\\\csly (1192),voice3\\\\csly (1193),voice3\\\\csly (1194),voice3\\\\csly (1195),voice3\\\\csly (1196),voice3\\\\csly (1197),voice3\\\\csly (1198),voice3\\\\csly (1199),voice3\\\\csly (1200),voice3\\\\csly (1201),voice3\\\\csly (1202),voice3\\\\csly (1203),voice3\\\\csly (1204),voice3\\\\csly (1205),voice3\\\\csly (1206),voice3\\\\csly (1207),voice3\\\\csly (1208),voice3\\\\csly (1209),voice3\\\\csly (1210),voice3\\\\csly (1211),voice3\\\\csly (1212),voice3\\\\csly (1213),voice3\\\\csly (1214),voice3\\\\csly (1215),voice3\\\\csly (1216),voice3\\\\csly (1217),voice3\\\\csly (1218),voice3\\\\csly (1219),voice3\\\\csly (1220),voice3\\\\csly (1221),voice3\\\\csly (1222),voice3\\\\csly (1223),voice3\\\\csly (1224),voice3\\\\csly (1225),voice3\\\\csly (1226),voice3\\\\csly (1227),voice3\\\\csly (1228),voice3\\\\csly (1229),voice3\\\\csly (1230),voice3\\\\csly (1231),voice3\\\\csly (1232),voice3\\\\csly (1233),voice3\\\\csly (1234),voice3\\\\csly (1235),voice3\\\\csly (1236),voice3\\\\csly (1237),voice3\\\\csly (1238),voice3\\\\csly (1239),voice3\\\\csly (1240),voice3\\\\csly (1241),voice3\\\\csly (1242),voice3\\\\csly (1243),voice3\\\\csly (1244),voice3\\\\csly (1245),voice3\\\\csly (1247),voice3\\\\csly (1248),voice3\\\\csly (1249),voice3\\\\csly (1250),voice3\\\\csly (1251),voice3\\\\csly (1252),voice3\\\\csly (1253),voice3\\\\csly (1254),voice3\\\\csly (1255),voice3\\\\csly (1256),voice3\\\\csly (1257),voice3\\\\csly (1258),voice3\\\\csly (1259),voice3\\\\csly (1260),voice3\\\\csly (1261),voice3\\\\csly (1262),voice3\\\\csly (1263),voice3\\\\csly (1264),voice3\\\\csly (1265),voice3\\\\csly (1266),voice3\\\\csly (1267),voice3\\\\csly (1268),voice3\\\\csly (1269),voice3\\\\csly (1270),voice3\\\\csly (1271),voice3\\\\csly (1272),voice3\\\\csly (1273),voice3\\\\csly (1274),voice3\\\\csly (1275),voice3\\\\csly (1276),voice3\\\\csly (1278),voice3\\\\csly (1279),voice3\\\\csly (1280),voice3\\\\csly (1281),voice3\\\\csly (1282),voice3\\\\csly (1283),voice3\\\\csly (1284),voice3\\\\csly (1285),voice3\\\\csly (1286),voice3\\\\csly (1287),voice3\\\\csly (1288),voice3\\\\csly (1289),voice3\\\\csly (1290),voice3\\\\csly (1291),voice3\\\\csly (1292),voice3\\\\csly (1293),voice3\\\\csly (1294),voice3\\\\csly (1295),voice3\\\\csly (1296),voice3\\\\csly (1297),voice3\\\\csly (1298),voice3\\\\csly (1299),voice3\\\\csly (1300),voice3\\\\csly (1301),voice3\\\\csly (1302),voice3\\\\csly (1303),voice3\\\\csly (1304),voice3\\\\csly (1305),voice3\\\\csly (1306),voice3\\\\csly (1307),voice3\\\\csly (1308),voice3\\\\csly (1309),voice3\\\\csly (1310),voice3\\\\csly (1311),voice3\\\\csly (1312),voice3\\\\csly (1313),voice3\\\\csly (1314),voice3\\\\csly (1315),voice3\\\\csly (1316),voice3\\\\csly (1317),voice3\\\\csly (1318),voice3\\\\csly (1319),voice3\\\\csly (1320),voice3\\\\csly (1321),voice3\\\\csly (1322),voice3\\\\csly (1323),voice3\\\\csly (1324),voice3\\\\csly (1325),voice3\\\\csly (1326),voice3\\\\csly (1327),voice3\\\\csly (1328),voice3\\\\csly (1329),voice3\\\\csly (1330),voice3\\\\csly (1331),voice3\\\\csly (1332),voice3\\\\csly (1333),voice3\\\\csly (1334),voice3\\\\csly (1335),voice3\\\\csly (1336),voice3\\\\csly (1337),voice3\\\\csly (1338),voice3\\\\csly (1339),voice3\\\\csly (1340),voice3\\\\csly (1341),voice3\\\\csly (1342),voice3\\\\csly (1343),voice3\\\\csly (1344),voice3\\\\csly (1345),voice3\\\\csly (1346),voice3\\\\csly (1347),voice3\\\\csly (1348),voice3\\\\csly (1349),voice3\\\\csly (1350),voice3\\\\csly (1351),voice3\\\\csly (1352),voice3\\\\csly (1353),voice3\\\\csly (1354),voice3\\\\csly (1355),voice3\\\\csly (1356),voice3\\\\csly (1357),voice3\\\\csly (1358),voice3\\\\csly (1359),voice3\\\\csly (1360),voice3\\\\csly (1361),voice3\\\\csly (1362),voice3\\\\csly (1363),voice3\\\\csly (1364),voice3\\\\csly (1365),voice3\\\\csly (1366),voice3\\\\csly (1367),voice3\\\\csly (1369),voice3\\\\csly (1370),voice3\\\\csly (1371),voice3\\\\csly (1372),voice3\\\\csly (1373),voice3\\\\csly (1374),voice3\\\\csly (1375),voice3\\\\csly (1376),voice3\\\\csly (1377),voice3\\\\csly (1383),voice3\\\\csly (1386),voice3\\\\csly (1387),voice3\\\\csly (1388),voice3\\\\csly (1400),voice3\\\\csly (1401),voice3\\\\csly (1402),voice3\\\\csly (1403),voice3\\\\csly (1404),voice3\\\\csly (1405),voice3\\\\csly (1406),voice3\\\\csly (1407),voice3\\\\csly (1408),voice3\\\\csly (1409),voice3\\\\csly (2001),voice3\\\\csly (2002),voice3\\\\csly (2003),voice3\\\\csly (2004),voice3\\\\csly (2005),voice3\\\\csly (2006),voice3\\\\csly (2007),voice3\\\\csly (2008),voice3\\\\csly (2009),voice3\\\\csly (2010),voice3\\\\csly (2011),voice3\\\\csly (2012),voice3\\\\csly (2013),voice3\\\\csly (2014),voice3\\\\csly (2015),voice3\\\\csly (2016),voice3\\\\csly (2017),voice3\\\\csly (2018),voice3\\\\csly (2019),voice3\\\\csly (2020),voice3\\\\csly (2021),voice3\\\\csly (2022),voice3\\\\csly (2023),voice3\\\\csly (2024),voice3\\\\csly (2025),voice3\\\\csly (2026),voice3\\\\csly (2027),voice3\\\\csly (2028),voice3\\\\csly (2029),voice3\\\\csly (2030),voice3\\\\csly (2031),voice3\\\\csly (2032),voice3\\\\csly (2033),voice3\\\\csly (2034),voice3\\\\csly (2035),voice3\\\\csly (2036),voice3\\\\csly (2037),voice3\\\\csly (2038),voice3\\\\csly (2039),voice3\\\\csly (2040),voice3\\\\csly (2041),voice3\\\\csly (2042),voice3\\\\csly (2043),voice3\\\\csly (2044),voice3\\\\csly (2045),voice3\\\\csly (2046),voice3\\\\csly (2047),voice3\\\\csly (2048),voice3\\\\csly (2049),voice3\\\\csly (2050),voice3\\\\csly (2051),voice3\\\\csly (2052),voice3\\\\csly (2053),voice3\\\\csly (2054),voice3\\\\csly (2055),voice3\\\\csly (2056),voice3\\\\csly (2057),voice3\\\\csly (2058),voice3\\\\csly (2059),voice3\\\\csly (2060),voice3\\\\csly (2061),voice3\\\\csly (2062),voice3\\\\csly (2063),voice3\\\\csly (2064),voice3\\\\csly (2065),voice3\\\\csly (2066),voice3\\\\csly (2067),voice3\\\\csly (2068),voice3\\\\csly (2069),voice3\\\\csly (2070),voice3\\\\csly (2071),voice3\\\\csly (2072),voice3\\\\csly (2073),voice3\\\\csly (2074),voice3\\\\csly (2075),voice3\\\\csly (2076),voice3\\\\csly (2077),voice3\\\\csly (2078),voice3\\\\csly (2079),voice3\\\\csly (2080),voice3\\\\csly (2081),voice3\\\\csly (2082),voice3\\\\csly (2083),voice3\\\\csly (2084),voice3\\\\csly (2085),voice3\\\\csly (2086),voice3\\\\csly (2087),voice3\\\\csly (2088),voice3\\\\csly (2089),voice3\\\\csly (2090),voice3\\\\csly (2091),voice3\\\\csly (2092),voice3\\\\csly (2093),voice3\\\\csly (2094),voice3\\\\csly (2095),voice3\\\\csly (2096),voice3\\\\csly (2097),voice3\\\\csly (2098),voice3\\\\csly (2099),voice3\\\\csly (2100),voice3\\\\csly (2101),voice3\\\\csly (2102),voice3\\\\csly (2103),voice3\\\\csly (2104),voice3\\\\csly (2105),voice3\\\\csly (2106),voice3\\\\csly (2107),voice3\\\\csly (2108),voice3\\\\csly (2109),voice3\\\\csly (2110),voice3\\\\csly (2111),voice3\\\\csly (2112),voice3\\\\csly (2113),voice3\\\\csly (2114),voice3\\\\csly (2115),voice3\\\\csly (2116),voice3\\\\csly (2117),voice3\\\\csly (2118),voice3\\\\csly (2119),voice3\\\\csly (2120),voice3\\\\csly (2121),voice3\\\\csly (2122),voice3\\\\csly (2123),voice3\\\\csly (2124),voice3\\\\csly (2125),voice3\\\\csly (2126),voice3\\\\csly (2127),voice3\\\\csly (2128),voice3\\\\csly (2129),voice3\\\\csly (2130),voice3\\\\csly (2131),voice3\\\\csly (2132),voice3\\\\csly (2133),voice3\\\\csly (2134),voice3\\\\csly (2135),voice3\\\\csly (2136),voice3\\\\csly (2137),voice3\\\\csly (2138),voice3\\\\csly (2139),voice3\\\\csly (2140),voice3\\\\csly (2141),voice3\\\\csly (2142),voice3\\\\csly (2143),voice3\\\\csly (2144),voice3\\\\csly (2145),voice3\\\\csly (2146),voice3\\\\csly (2147),voice3\\\\csly (2148),voice3\\\\csly (2149),voice3\\\\csly (2150),voice3\\\\csly (2151),voice3\\\\csly (2152),voice3\\\\csly (2153),voice3\\\\csly (2154),voice3\\\\csly (2155),voice3\\\\csly (2156),voice3\\\\csly (2157),voice3\\\\csly (2158),voice3\\\\csly (2159),voice3\\\\csly (2160),voice3\\\\csly (2161),voice3\\\\csly (2162),voice3\\\\csly (2163),voice3\\\\csly (2164),voice3\\\\csly (2165),voice3\\\\csly (2166),voice3\\\\csly (2167),voice3\\\\csly (2168),voice3\\\\csly (2169),voice3\\\\csly (2170),voice3\\\\csly (2171),voice3\\\\csly (2172),voice3\\\\csly (2173),voice3\\\\csly (2174),voice3\\\\csly (2175),voice3\\\\csly (2176),voice3\\\\csly (2177),voice3\\\\csly (2178),voice3\\\\csly (2179),voice3\\\\csly (2180),voice3\\\\csly (2181),voice3\\\\csly (2182),voice3\\\\csly (2183),voice3\\\\csly (2184),voice3\\\\csly (2185),voice3\\\\csly (2186),voice3\\\\csly (2187),voice3\\\\csly (2188),voice3\\\\csly (2189),voice3\\\\csly (2190),voice3\\\\csly (2191),voice3\\\\csly (2192),voice3\\\\csly (2193),voice3\\\\csly (2194),voice3\\\\csly (2195),voice3\\\\csly (2196),voice3\\\\csly (2197),voice3\\\\csly (2198),voice3\\\\csly (2199),voice3\\\\csly (2200),voice3\\\\csly (2201),voice3\\\\csly (2202),voice3\\\\csly (2203),voice3\\\\csly (2204),voice3\\\\csly (2205),voice3\\\\csly (2206),voice3\\\\csly (2207),voice3\\\\csly (2208),voice3\\\\csly (2209),voice3\\\\csly (2210),voice3\\\\csly (2211),voice3\\\\csly (2212),voice3\\\\csly (2213),voice3\\\\csly (2214),voice3\\\\csly (2215),voice3\\\\csly (2216),voice3\\\\csly (2217),voice3\\\\csly (2218),voice3\\\\csly (2219),voice3\\\\csly (2220),voice3\\\\csly (2221),voice3\\\\csly (2222),voice3\\\\csly (2223),voice3\\\\csly (2224),voice3\\\\csly (2225),voice3\\\\csly (2226),voice3\\\\csly (2227),voice3\\\\csly (2228),voice3\\\\csly (2229),voice3\\\\csly (2230),voice3\\\\csly (2231),voice3\\\\csly (2232),voice3\\\\csly (2233),voice3\\\\csly (2234),voice3\\\\csly (2235),voice3\\\\csly (2236),voice3\\\\csly (2237),voice3\\\\csly (2238),voice3\\\\csly (2239),voice3\\\\csly (2240),voice3\\\\csly (2241),voice3\\\\csly (2242),voice3\\\\csly (2243),voice3\\\\csly (2244),voice3\\\\csly (2245),voice3\\\\csly (2246),voice3\\\\csly (2247),voice3\\\\csly (2248),voice3\\\\csly (2249),voice3\\\\csly (2250),voice3\\\\csly (2251),voice3\\\\csly (2252),voice3\\\\csly (2253),voice3\\\\csly (2254),voice3\\\\csly (2255),voice3\\\\csly (2256),voice3\\\\csly (2257),voice3\\\\csly (2258),voice3\\\\csly (2259),voice3\\\\csly (2260),voice3\\\\csly (2261),voice3\\\\csly (2262),voice3\\\\csly (2263),voice3\\\\csly (2264),voice3\\\\csly (2265),voice3\\\\csly (2266),voice3\\\\csly (2267),voice3\\\\csly (2268),voice3\\\\csly (2269),voice3\\\\csly (2270),voice3\\\\csly (2271),voice3\\\\csly (2272),voice3\\\\csly (2273),voice3\\\\csly (2274),voice3\\\\csly (2275),voice3\\\\csly (2276),voice3\\\\csly (2277),voice3\\\\csly (2278),voice3\\\\csly (2279),voice3\\\\csly (2280),voice3\\\\csly (2281),voice3\\\\csly (2282),voice3\\\\csly (2283),voice3\\\\csly (2284),voice3\\\\csly (2285),voice3\\\\csly (2286),voice3\\\\csly (2287),voice3\\\\csly (2288),voice3\\\\csly (2289),voice3\\\\csly (2290),voice3\\\\csly (2291),voice3\\\\csly (2292),voice3\\\\csly (2293),voice3\\\\csly (2294),voice3\\\\csly (2295),voice3\\\\csly (2296),voice3\\\\csly (2297),voice3\\\\csly (2298),voice3\\\\csly (2299),voice3\\\\csly (2300),voice3\\\\csly (2301),voice3\\\\csly (2302),voice3\\\\csly (2303),voice3\\\\csly (2304),voice3\\\\csly (2305),voice3\\\\csly (2306),voice3\\\\csly (2307),voice3\\\\csly (2308),voice3\\\\csly (2309),voice3\\\\csly (2310),voice3\\\\csly (2311),voice3\\\\csly (2312),voice3\\\\csly (2313),voice3\\\\csly (2314),voice3\\\\csly (2315),voice3\\\\csly (2316),voice3\\\\csly (2317),voice3\\\\csly (2318),voice3\\\\csly (2319),voice3\\\\voice31\\\\csly (2320),voice3\\\\voice31\\\\csly (2321),voice3\\\\voice31\\\\csly (2322),voice3\\\\voice31\\\\csly (2323),voice3\\\\voice31\\\\csly (2324),voice3\\\\voice31\\\\csly (2325),voice3\\\\voice31\\\\csly (2326),voice3\\\\voice31\\\\csly (2327),voice3\\\\voice31\\\\csly (2328),voice3\\\\voice31\\\\csly (2329),voice3\\\\voice31\\\\csly (2472),voice3\\\\voice31\\\\csly (2473),voice3\\\\voice31\\\\csly (2474),voice3\\\\voice31\\\\csly (2475),voice3\\\\voice31\\\\csly (2476),voice3\\\\voice31\\\\csly (2477),voice3\\\\voice31\\\\csly (2478),voice3\\\\voice31\\\\csly (2479),voice3\\\\voice31\\\\csly (2480),voice3\\\\voice31\\\\csly (2481),voice3\\\\voice31\\\\csly (2482),voice3\\\\voice31\\\\csly (2483),voice3\\\\voice31\\\\csly (2484),voice3\\\\voice31\\\\csly (2485),voice3\\\\voice31\\\\csly (2486),voice3\\\\voice31\\\\csly (2487),voice3\\\\voice31\\\\csly (2488),voice3\\\\voice31\\\\csly (2489),voice3\\\\voice31\\\\csly (2490),voice3\\\\voice31\\\\csly (2491),voice3\\\\voice31\\\\csly (2492),voice3\\\\voice31\\\\csly (2493),voice3\\\\voice31\\\\csly (2494),voice3\\\\voice31\\\\csly (2495),voice3\\\\voice31\\\\csly (2496),voice3\\\\voice31\\\\csly (2497),voice3\\\\voice31\\\\csly (2498),";
        String s[] = json.split(",");
        for (int i = 0; i < s.length; i++) {
            System.out.print("第" + i + "个" + e.getVoiceText(StringUtil.toSqlString(s[i])));
            String r = e.getVoiceText(StringUtil.toSqlString(s[i]));
            BufferContext.append(r);
        }
        System.out.print(BufferContext.toString());
        FileUtil.write("D://result.txt", BufferContext.toString());
//        System.out.print(e.getScenceText(StringUtil.toSqlString("SL\\1553121")));
    }

}
