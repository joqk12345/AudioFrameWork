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

/**
 * * RUN Luck Man
 *
 * @author qiaokai
 * @datetime 2014-2-14 15:10:28
 * @mail to: qianyanqk@163.com
 */

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

//import org.apache.tools.zip.ZipEntry;
//import org.apache.tools.zip.ZipOutputStream;

/**
 * @author geloin
 * @date 2012-5-5 下午12:05:57
 */
public class FileOperateUtil {

    private static final String REALNAME = "realName";
    private static final String STORENAME = "storeName";
    private static final String SIZE = "size";
    private static final String SUFFIX = "suffix";
    private static final String CONTENTTYPE = "contentType";
    private static final String CREATETIME = "createTime";
    public static final String UPLOADDIR = "uploadDir/";

    /**
     * 将上传的文件进行重命名
     *
     * @param name
     * @return
     * @author geloin
     * @date 2012-3-29 下午3:39:53
     */
    private static String rename(String name) {

        Long now = Long.parseLong(new SimpleDateFormat("yyyyMMddHHmmss")
                .format(new Date()));
        Long random = (long) (Math.random() * now);
        String fileName = now + "" + random;

        if (name.indexOf(".") != -1) {
            fileName += name.substring(name.lastIndexOf("."));
        }

        return fileName;
    }

    /**
     * 压缩后的文件名
     *
     * @param name
     * @return
     * @author geloin
     * @date 2012-3-29 下午6:21:32
     */
    private static String zipName(String name) {
        String prefix = "";
        if (name.indexOf(".") != -1) {
            prefix = name.substring(0, name.lastIndexOf("."));
        } else {
            prefix = name;
        }
        return prefix + ".zip";
    }

    /**
     * 下载
     *
     * @param request
     * @param response
     * @param storeName
     * @param contentType
     * @param realName
     * @throws Exception
     * @author geloin
     * @date 2012-5-5 下午12:25:39
     */
    public static void download(HttpServletRequest request,
                                HttpServletResponse response, String storeName, String contentType,
                                String realName) throws Exception {
        response.setContentType("text/html;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");
        BufferedInputStream bis = null;
        BufferedOutputStream bos = null;

        String ctxPath = request.getSession().getServletContext().getRealPath("/") + FileOperateUtil.UPLOADDIR;
        String downLoadPath = ctxPath + storeName;

        long fileLength = new File(downLoadPath).length();

        response.setContentType(contentType);
        response.setHeader("Content-disposition", "attachment; filename=" + new String(realName.getBytes("utf-8"), "ISO8859-1"));
        response.setHeader("Content-Length", String.valueOf(fileLength));

        bis = new BufferedInputStream(new FileInputStream(downLoadPath));
        bos = new BufferedOutputStream(response.getOutputStream());
        byte[] buff = new byte[2048];
        int bytesRead;
        while (-1 != (bytesRead = bis.read(buff, 0, buff.length))) {
            bos.write(buff, 0, bytesRead);
        }
        bis.close();
        bos.close();
    }

    /**
     * 上传文件
     *
     * @author geloin
     * @date 2012-5-5 下午12:25:47
     * @param request
     * @param params
     * @param values
     * @return
     * @throws Exception
     */
//	public static List<Map<String, Object>> upload(HttpServletRequest request,
//			String[] params, Map<String, Object[]> values) throws Exception {
//
//		List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
//
//		MultipartHttpServletRequest mRequest = (MultipartHttpServletRequest) request;
//		Map<String, MultipartFile> fileMap = mRequest.getFileMap();
//
//		String uploadDir = request.getSession().getServletContext()
//				.getRealPath("/")
//				+ FileOperateUtil.UPLOADDIR;
//		File file = new File(uploadDir);
//
//		if (!file.exists()) {
//			file.mkdir();
//		}
//
//		String fileName = null;
//		int i = 0;
//		for (Iterator<Map.Entry<String, MultipartFile>> it = fileMap.entrySet()
//				.iterator(); it.hasNext(); i++) {
//
//			Map.Entry<String, MultipartFile> entry = it.next();
//			MultipartFile mFile = entry.getValue();
//
//			fileName = mFile.getOriginalFilename();
//
//			String storeName = rename(fileName);
//
//			String noZipName = uploadDir + storeName;
//			String zipName = zipName(noZipName);
//
//			// 上传成为压缩文件
//			ZipOutputStream outputStream = new ZipOutputStream(
//					new BufferedOutputStream(new FileOutputStream(zipName)));
//			outputStream.putNextEntry(new ZipEntry(fileName));
//			outputStream.setEncoding("GBK");
//
//			FileCopyUtils.copy(mFile.getInputStream(), outputStream);
//
//			Map<String, Object> map = new HashMap<String, Object>();
//			// 固定参数值对
//			map.put(FileOperateUtil.REALNAME, zipName(fileName));
//			map.put(FileOperateUtil.STORENAME, zipName(storeName));
//			map.put(FileOperateUtil.SIZE, new File(zipName).length());
//			map.put(FileOperateUtil.SUFFIX, "zip");
//			map.put(FileOperateUtil.CONTENTTYPE, "application/octet-stream");
//			map.put(FileOperateUtil.CREATETIME, new Date());
//
//			// 自定义参数值对
//			for (String param : params) {
//				map.put(param, values.get(param)[i]);
//			}
//
//			result.add(map);
//		}
//		return result;
//	}
}
