/*
 * Copyright (C) 2014 lenovo.
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
 * MA 02110-1301  USA
 */
package com.thinkit.operationsys.util;

import com.thinkit.operationsys.constant.FileConstant;
import org.apache.commons.io.FileUtils;

import java.io.*;
import java.util.logging.Logger;

/**
 * * RUN Luck Man
 *
 * @author qiaokai
 * @datetime 2014-2-14 11:19:58
 * @mail to: qianyanqk@163.com
 */
public class FileUtil {

    protected static Logger logger = Logger.getLogger(FileUtil.class.getName());
    //文件copy 

    /**
     * @param topath   文件路径
     * @param frompath 新文件路径
     * @throws IOException
     */
    public static void startCopy(String src, String dest) throws IOException {
        System.out.println("开始copy文件");
        //默认文件不能够创造，如果没有文件的话就创建一个文件
        File srcfile = new File(src);
        File destfile = new File(dest);

        if (srcfile.exists() && destfile.exists()) {
            FileUtils.copyFile(srcfile, destfile);
        } else {
            srcfile.getParentFile().mkdirs();
            try {
                srcfile.createNewFile();
            } catch (IOException e) {
                logger.info("create  file error");
                e.printStackTrace();
            }
            destfile.getParentFile().mkdirs();
            try {
                destfile.createNewFile();
            } catch (IOException e) {
                logger.info("create  file error");
                e.printStackTrace();
            }
        }

    }

    public static void copyFile(String src, String dest) {
        System.out.println("开始copy文件");
        File f1 = new File(src);
        File f2 = new File(dest);
        //int b=0;
        String line = "";
        try {
            FileReader reader = new FileReader(f1);
            FileWriter writer = new FileWriter(f2);
            BufferedReader br = new BufferedReader(reader);
            BufferedWriter bw = new BufferedWriter(writer);
            while ((line = br.readLine()) != null) {
                System.out.println(line);
                bw.write(line);
                bw.newLine();
                bw.flush();
            }
            reader.close();
            writer.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    /**
     * 创建文件，并写入文件信息
     *
     * @param fileName
     * @param data
     */
    public static void write(String fileName, String data) {
        BufferedWriter bw = null;
        try {
//			String name = getName(link) + "analyze.txt";
            bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(fileName)));
            bw.write(data);
            bw.flush();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (null != bw) {
                try {
                    bw.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    public static InputStream getStringStream(String sInputString) {
        if (sInputString != null && !sInputString.trim().equals("")) {
            try {
                ByteArrayInputStream tInputStringStream = new ByteArrayInputStream(sInputString.getBytes());
                return tInputStringStream;
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
        return null;
    }

    public static void main(String args[]) throws IOException {
        FileUtil.copyFile(FileConstant.KEYWORDDIRECTORY + "result\\search_result_result_top.txt", "D://aaa.txt");
    }

}
