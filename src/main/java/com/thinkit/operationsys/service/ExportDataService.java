package com.thinkit.operationsys.service;

import com.thinkit.operationsys.constant.FileConstant;
import com.thinkit.operationsys.dbutil.AnalysisExportDataUtil;
import com.thinkit.operationsys.util.FileUtil;
import com.thinkit.operationsys.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;

/**
 * * RUN Luck Man
 *
 * @author qiaokai
 * @datetime 2014-2-14 16:22:01
 * @mail to: qianyanqk@163.com
 */
@Service
public class ExportDataService extends ExportBaseService {

    @Autowired
    private AnalysisExportDataUtil analysisExportDataUtil = new AnalysisExportDataUtil();

    public AnalysisExportDataUtil getAnalysisExportDataUtil() {
        return analysisExportDataUtil;
    }

    public void setAnalysisExportDataUtil(AnalysisExportDataUtil analysisExportDataUtil) {
        this.analysisExportDataUtil = analysisExportDataUtil;
    }

    /**
     * 获取全文转写的内容
     *
     * @param voList
     * @param serverDir
     * @return
     * @throws SQLException
     */
    public boolean getVoiceText(String voList, String serverDir) throws SQLException {
        String[] s = {};
        //转换成数组
        if (voList.contains(",")) {
            s = voList.split(",");
        } else {

        }

        //批量调用sql   ---话单--》名字加内容
        //输入文件头信息
        StringBuffer BufferContext = new StringBuffer();
        //写入文件头信息
        BufferContext.append(getExprotTitle(FileConstant.RESULTVOICERESUTL, FileConstant.AUTHOR));
        for (int i = 0; i < s.length; i++) {
            if (s[i] != null && s[i] != "") {
                System.out.println("context:" + s[i]);
                BufferContext.append(analysisExportDataUtil.getVoiceText(StringUtil.toSqlString(s[i])));
                //写一个结尾信息
                BufferContext.append(getExprotFooter());
                System.out.println("context:" + BufferContext.toString());
            }
        }
        //写文件  成功了 返回为true 失败了返回为false
        String path = serverDir + FileConstant.VOICETOTEXT;
        FileUtil.write(path, BufferContext.toString());
        return true;
    }

    /**
     * 使用多线程
     * 获取文件内容
     *
     * @param voList
     * @param serverDir
     * @return
     * @throws SQLException
     */
    public boolean getConVoiceText(String voList, String serverDir) throws SQLException {
        String[] s = {};
        //转换成数组
        if (voList.contains(",")) {
            s = voList.split(",");
        } else {
        }
        return true;
    }

    /**
     * 过去场景分割的导出内容
     *
     * @param voList
     * @param serverDir
     * @return
     * @throws SQLException
     */
    public boolean getScenceText(String voList, String serverDir) throws SQLException {
        String[] s = {};
        //转换成数组
        if (voList.contains(",")) {
            s = voList.split(",");
        } else {
        }
        //批量调用sql   ---话单--》名字加内容
        StringBuffer BufferContext = new StringBuffer();
        //写入文件头信息
        BufferContext.append(getExprotTitle(FileConstant.SCENCEDIVISIONRESUTL, FileConstant.AUTHOR));
        for (int i = 0; i < s.length; i++) {
            if (s[i] != null && s[i] != "") {
                System.out.println("context:" + s[i]);
                BufferContext.append(analysisExportDataUtil.getScenceText(StringUtil.toSqlString(s[i])));
                //写一个结尾信息
                BufferContext.append(getExprotFooter());
                System.out.println("context:" + BufferContext.toString());
            }
        }
        //写文件  成功了 返回为true 失败了返回为false
        String path = serverDir + FileConstant.SCENCETOTEXT;
        FileUtil.write(path, BufferContext.toString());
        return true;
    }

    /**
     * 获取静音检测导出内容
     *
     * @param voList
     * @param serverDir
     * @return
     * @throws SQLException
     */
    public boolean getSilenceText(String voList, String serverDir) throws SQLException {
        String[] s = {};
        //转换成数组
        if (voList.contains(",")) {
            s = voList.split(",");
        } else {
        }

        //批量调用sql   ---话单--》名字加内容
        StringBuffer BufferContext = new StringBuffer();
        //写入文件头信息
        BufferContext.append(getExprotTitle(FileConstant.SILENCEDIVISIONRESUTL, FileConstant.AUTHOR));
        for (int i = 0; i < s.length; i++) {
            if (s[i] != null && s[i] != "") {
                //打印要导出的文件名子
                System.out.println("context:" + s[i]);
//                BufferContext.append("文件名：" + s[i] + "\r\n");
                BufferContext.append(getExprotDirctory(s[i]));
//                BufferContext.append(analysisExportDataUtil.getScenceText(StringUtil.toSqlString(s[i])));
                System.out.println("context:" + BufferContext.toString());
            }
        }
        //写文件  成功了 返回为true 失败了返回为false
        String path = serverDir + FileConstant.SILENCETOTEXT;
        FileUtil.write(path, BufferContext.toString());
        return true;
    }

    /**
     * 获取情绪识别内容
     *
     * @param voList
     * @param serverDir
     * @return
     * @throws SQLException
     */
    public boolean getMoodText(String voList, String serverDir) throws SQLException {
        String[] s = {};
        //转换成数组
        if (voList.contains(",")) {
            s = voList.split(",");
        } else {
        }

        //批量调用sql   ---话单--》名字加内容
        StringBuffer BufferContext = new StringBuffer();
        //写入文件头信息
        BufferContext.append(getExprotTitle(FileConstant.MOODDIVISIONRESUTL, FileConstant.AUTHOR));
        for (int i = 0; i < s.length; i++) {
            if (s[i] != null && s[i] != "") {
                //打印要导出的文件名子
                System.out.println("context:" + s[i]);
//                BufferContext.append("文件名：" + s[i] + "\r\n");
                BufferContext.append(getExprotDirctory(s[i]));
//                BufferContext.append(analysisExportDataUtil.getScenceText(StringUtil.toSqlString(s[i])));
                System.out.println("context:" + BufferContext.toString());
            }
        }
        //写文件  成功了 返回为true 失败了返回为false
        String path = serverDir + FileConstant.MOODTOTEXT;
        FileUtil.write(path, BufferContext.toString());
        return true;
    }

    /**
     * 取得业务分类到处信息
     *
     * @param voList
     * @param serverDir
     * @return
     * @throws SQLException
     */
    public boolean getBusText(String voList, String serverDir) throws SQLException {
        String[] s = {};
        //转换成数组
        if (voList.contains(",")) {
            s = voList.split(",");
        } else {
        }

        //批量调用sql   ---话单--》名字加内容
        StringBuffer BufferContext = new StringBuffer();
        StringBuffer fileContext = new StringBuffer();
        String busName = "";
        //写入文件头信息
        BufferContext.append(getExprotTitle(FileConstant.BUSCLASSFYRESUTL, FileConstant.AUTHOR));
        for (int i = 0; i < s.length; i++) {
            if (s[i] != null && s[i] != "") {
                //打印要导出的文件名子
                System.out.println("context:" + s[i]);
                //业务名称
                busName = analysisExportDataUtil.getBusText(StringUtil.toSqlString(s[i]));
                //文件名称
                fileContext.append(getExprotDirctory(s[i]));
                System.out.println("context:" + fileContext.toString());
            }
        }
        if (busName != null) {
            BufferContext.append(busName);
        }
        if (fileContext != null) {
            BufferContext.append(fileContext);
        }

        //写文件  成功了 返回为true 失败了返回为false
        String path = serverDir + FileConstant.BUSTOTEXT;
        FileUtil.write(path, BufferContext.toString());
        return true;
    }

    public static void main(String args[]) throws SQLException {
        ExportDataService e = new ExportDataService();
        e.getVoiceText("SL\\1553121,SL\\1554165", "D:\\beijing");
    }

}
