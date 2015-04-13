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

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * * RUN Luck Man
 *
 * @author qiaokai
 * @datetime 2014-2-12 15:39:40
 * @mail to: qianyanqk@163.com
 */
public class StringUtil {

    public static String toDotString(String t) {
        return "\"" + t + "\"";
    }

    public static String toSqlString(String s) {
        String r = s.replace("\\", "\\\\");
        System.out.println("文档结果：" + r);
        return r;
    }

    /**
     * 转变为正常的sql语句
     *
     * @param s
     * @return
     */
    public static String toNormalString(String s) {
        String r = s.replace("\\\\", "\\");
        return r;
    }

    public static String toWindowFileString(String s) {
        String r = s.replace("\\\\", "\\");
        return r;
    }

    /**
     * 去掉字符串中的回车换行、制表符等
     *
     * @param str
     * @return
     */
    public static String replaceBlank(String str) {
        String dest = "";
        if (str != null) {
            Pattern p = Pattern.compile("\\s*|\t|\r|\n");
            Matcher m = p.matcher(str);
            dest = m.replaceAll("");
        }
        return dest;
    }

    public static void main(String args[]) {
        StringUtil stringUtil = new StringUtil();

        System.out.println(replaceBlank("adsfa ,就快了"));

//        System.out.println(stringUtil.toDotString("SL\\\\12341"));
        System.out.println(stringUtil.toSqlString("SL\\1553121"));
    }

}
