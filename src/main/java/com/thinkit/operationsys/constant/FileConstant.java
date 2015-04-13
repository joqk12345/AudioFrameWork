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
package com.thinkit.operationsys.constant;

/**
 * @author Administrator
 */
public class FileConstant {

    //全文转写的文件名
    public static final String VOICETOTEXT = "voice.txt";
    //场景分割的文件名
    public static final String SCENCETOTEXT = "scence.txt";
    //静音检测的文件名
    public static final String SILENCETOTEXT = "silence.txt";
    //情绪识别的文件名
    public static final String BUSTOTEXT = "bus.txt";
    //情绪识别的文件名
    public static final String MOODTOTEXT = "mood.txt";

    //检索关键词列表
    public static final String KEYWORDTOTEXT = "keyword.txt";


    //检索关键词列表引擎的HOME目录，代表在服务器上设置的目录  目前是支持window的文件目录
    //在该目录下面  生成名字为keyword_in.txt的关键词列表
    public static final String KEYWORDDIRECTORY = "D:\\xxy\\Scene_Segmentation_Text_Words_Beijing\\bin\\";
    //工具执行bat 用来执行生成 符合条件的关键词列表
//      public static final String KWTOOLS = KEYWORDDIRECTORY+"tools_fayin\\run_fayin.bat";
    public static final String KWTOOLS = KEYWORDDIRECTORY + "run_fayin.bat";
    //       public static final String KWTOOLS = "tools_fayin\\run_fayin.bat";
    //生成结果文件列表 run_key.bat
    public static final String KWTORESULT = KEYWORDDIRECTORY + "run_key.bat";
    //        public static final String KWTORESULT = "run_key.bat";
    //生成临时关键词列表的文件名称
    public static final String KWTEMPFILENAME = "keywords_in.txt";


    //作者：
    public static final String AUTHOR = "hisun";


    //模块信息
    public static final String RESULTVOICERESUTL = "全文转写结果";
    public static final String SCENCEDIVISIONRESUTL = "场景分割结果";
    public static final String SILENCEDIVISIONRESUTL = "静音检测结果";
    public static final String BUSCLASSFYRESUTL = "业务归类结果";
    public static final String MOODDIVISIONRESUTL = "情绪检测结果";


    public static final String SUFFIX = ".V3";

}
