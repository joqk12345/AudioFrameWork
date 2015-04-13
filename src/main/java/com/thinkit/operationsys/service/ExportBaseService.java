/*
 * Copyright (C) 2014 Administrator.
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

package com.thinkit.operationsys.service;

import com.thinkit.operationsys.constant.FileConstant;
import com.thinkit.operationsys.util.StringUtil;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * * RUN Luck Man
 *
 * @author qiaokai
 * @datetime 2014-2-16  18:02:24
 * @mail to: qianyanqk@163.com
 */
public class ExportBaseService {

    protected String getExprotTitle(String name, String author) {
        StringBuffer r = new StringBuffer();
        r.append(name);
        r.append("\r\n");
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy年MM月dd日   HH:mm:ss     ");
        Date curDate = new Date(System.currentTimeMillis());//获取当前时间     
        String str = formatter.format(curDate);
        r.append("author:");
        r.append(author);
        r.append("\t");
        r.append("Time:");
        r.append(str);
        r.append("\r\n");
        r.append("\r\n");
        return r.toString();
    }

    /**
     * 输入文件目录类型
     *
     * @param name
     * @param author
     * @return
     */
    protected String getExprotDirctory(String wavPath) {
        StringBuffer result = new StringBuffer();
        result.append("文件名：" + StringUtil.toWindowFileString(wavPath) + FileConstant.SUFFIX + "\r\n");
        return result.toString();
    }

    protected String getExprotContext(String s) {
        String text = s + "\r\n";
        return text;
    }

    protected String getExprotFooter() {
        String text = "\r\n";
        return text;
    }


}
