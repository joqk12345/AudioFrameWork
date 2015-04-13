/*
 * Copyright (C) 2014 Administrator.
 *
 */
package com.thinkit.operationsys.service;

import com.thinkit.operationsys.constant.FileConstant;
import com.thinkit.operationsys.util.FileUtil;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * * RUN Luck Man
 *
 * @author qiaokai
 * @datetime 2014-2-17 16:09:48
 * @mail to: qianyanqk@163.com
 */
@Service
public class KeywordRetrieveService {

    protected org.slf4j.Logger logger = LoggerFactory.getLogger(this.getClass());
    //设置进程
    protected volatile Process process;

    /**
     * 根据关键词列表检索关键词 d
     *
     * @param voList
     * @param serverDir
     * @return
     */
    public boolean RetrieveKeyword(String voList, String keywordBaseHome, String serverBasePath) throws IOException {
        boolean r = false;
        //解析关键词列表  
        if ("" != voList && !voList.equals(null)) {
            if (voList.contains(",")) {
                //取消关键词的 回车换行、以及空格显示
                //获取原始的关键词列表
//                String tempVolist = StringUtil.replaceBlank(voList);
                String[] content = voList.split(",");
                StringBuffer sb = new StringBuffer();
                for (int i = 0; i < content.length; i++) {
                    System.out.println("关键词的名称为：" + content[i]);
                    //将关键词列表下发到该文件夹下面
//                    sb.append(content[i] + "\r\n");
                    sb.append(content[i]);
                }
                String path = keywordBaseHome + FileConstant.KWTEMPFILENAME;
                FileUtil.write(path, sb.toString());
            } else if (voList.contains("，")) {
                //取消关键词的 回车换行、以及空格显示
                //获取原始的关键词列表
//                String tempVolist = StringUtil.replaceBlank(voList);
                String[] content = voList.split("，");
                StringBuffer sb = new StringBuffer();
                for (int i = 0; i < content.length; i++) {
                    System.out.println("关键词的名称为：" + content[i]);
                    //将关键词列表下发到该文件夹下面
//                    sb.append(content[i] + "\r\n");
                    sb.append(content[i]);
                }
                String path = keywordBaseHome + FileConstant.KWTEMPFILENAME;
                FileUtil.write(path, sb.toString());
            }
        }
        //生成关键词列表文件
        //调用关键词脚本  生成列表文件和拼音对应
        String cmd = "";
        //该cmd命令用于生成关键次中间列表文件
//        runShell(FileConstant.KWTOOLS);
        try {
            //调用关键词脚本cmd 生成列关键词结果文件（该段时间内可能较长）
//        runShell(FileConstant.KWTORESULT);
//            exec(new String[]{"cmd.exe", "/k", FileConstant.KWTORESUL{T})
            int a = runShell(FileConstant.KWTORESULT, new File(FileConstant.KEYWORDDIRECTORY));
            logger.info("cmd执行之后的结果:" + a);
            if (a == 0) {
                //如果执行成功
                //将结果文件写到置顶目录下面
                String srcFilePath = keywordBaseHome + "result\\search_result_top.txt";
                //把结果文件写入服务器
                String desFilePath = serverBasePath + FileConstant.KEYWORDTOTEXT;
                logger.info("copy文件:" + srcFilePath);
                logger.info("copy文件:" + desFilePath);
                //文件copy
                FileUtil.copyFile(srcFilePath, desFilePath);
                //将指定文件返回到前端服务器，以供用户下载
                r = true;
            } else {
                //如果执行失败
                //将结果文件写到置顶目录下面
                String srcFilePath = keywordBaseHome + "result\\search_result_top.txt";
                //把结果文件写入服务器
                String desFilePath = serverBasePath + FileConstant.KEYWORDTOTEXT;
                logger.info("copy文件2:" + srcFilePath);
                //文件copy
                FileUtil.copyFile(srcFilePath, desFilePath);
                //将指定文件返回到前端服务器，以供用户下载
                r = true;
            }
        } catch (Exception ex) {
            Logger.getLogger(KeywordRetrieveService.class.getName()).log(Level.SEVERE, null, ex);
        }
        return r;
    }

    private int runShell(String cmd, File workspace) throws IOException, Exception {
//		String cmd1 = "cd /home/thinkit/huawei_test/"; // this is the command to execute in the Unix shell
//		String cmd1 ="cd /home/thinkit/huawei_test/; sh run.sh ";
        logger.info("the command " + cmd);
        // create a process for the shell

        ProcessBuilder pb = new ProcessBuilder("cmd.exe", "/c", cmd);
//            logger.info("the environment  before " + pb.directory().toString());
//        pb.directory(new File(FileConstant.KEYWORDDIRECTORY));
        pb.directory(workspace);
        logger.info("the environment after" + pb.directory().toString());
//        pb.redirectErrorStream(true);
// use this to capture messages sent to stderr
        process = pb.start();
//         System.out.print(process.exitValue());
//         logger.info("exitValue:"+process.exitValue());
//        return waitForProcess(process);
        final InputStream inputStream = process.getInputStream();
        final InputStream errorStream = process.getErrorStream();
        //这里的两个线程分别用于接收结果流和错误流
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
                    String line;
                    while ((line = reader.readLine()) != null) {
                        logger.debug(line);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }, "one").start();

        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    BufferedReader reader = new BufferedReader(new InputStreamReader(errorStream));
                    String line;
                    while ((line = reader.readLine()) != null) {
                        logger.debug(line);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }, "error").start();
        int shellExitStatus = 0;
        try {
            //等待执行cmd
            shellExitStatus = process.waitFor();
            logger.debug("shellExitStatus:" + shellExitStatus);
            return shellExitStatus;
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            process = null;
        }
        return -1;

    }

    /**
     * 运行cmd命令
     */
    public static boolean exec(String[] cmdAry) throws Exception {
        Runtime rt = Runtime.getRuntime();
        Process proc = null;
        try {
            proc = rt.exec(cmdAry);
            /* 
             * Runtime的exec()方法类似线程，不会在cmd命令执行完成后再继续运行下面的代码，
             * 所以导致可能cmd命令还没执行完毕，程序就运行到了Process的destroy()方法，因
             * 此需要一个方法去等待cmd命令执行完毕后，再运行exec()之后的方法
             */
            return waitForProcess(proc) > 0;
        } finally {
            if (proc != null) {
                proc.destroy();
                proc = null;
            }
        }
    }

    /**
     * 得到cmd命令返回的信息数据流，该流的运行周期与cmd命令的实行时间相同
     */
    public static int waitForProcess(Process proc) throws Exception {
        // cmd命令有返回正确的信息流，和错误信息流，不过不能绝对表示cmd命令是否执行正确
        BufferedReader in = null;
        BufferedReader err = null;
        String msg = null;
        int exitValue = -1;
        try {
            in = new BufferedReader(new InputStreamReader(proc.getInputStream()));
            while ((msg = in.readLine()) != null) {
                System.out.println(msg);
                if (1 != exitValue) {
                    exitValue = 1;
                }
            }
            err = new BufferedReader(new InputStreamReader(proc.getErrorStream()));
            while ((msg = err.readLine()) != null) {
                System.out.println(msg);
                if (0 != exitValue) {
                    exitValue = 0;
                }
            }
            return exitValue;
        } finally {
            if (null != in) {
                in.close();
                in = null;
            }
            if (null != err) {
                err.close();
                err = null;
            }
        }
    }

    public static void main(String args[]) throws Exception {
        System.out.println("hello world");
        KeywordRetrieveService krs = new KeywordRetrieveService();
        int a = krs.runShell("perl 1.pl", new File("C:\\Perl\\bin"));
        if (a == 0) {
            System.out.println("输出的文件内容");
        }
        System.out.println("hello world end" + a);

//        String cmd = "dir D:";
//        String cmd1 = "cd D:\\xxy";
//        krs.runShell(cmd);
//        krs.runShell(cmd1);
//        krs.runShell("dir");
//        krs.exec(new String[]{
//            "cmd.exe",
//            "/K",
//            "dir"
//        });
//        krs.runShell("dir");
//        String cmd = "cmd.exe /c ipconfig /all";
//        Process p;
//        try {
//            p = Runtime.getRuntime().exec(cmd);
//            InputStream is = p.getInputStream();
////具体业务
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
    }

}
