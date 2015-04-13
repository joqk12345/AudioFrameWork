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
package com.thinkit.operationsys.sub.controller;

import com.thinkit.operationsys.service.AnService;
import com.thinkit.operationsys.service.ExportDataService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * * RUN Luck Man
 *
 * @author qiaokai
 * @datetime 2014-1-24 10:26:29
 * @mail to: qianyanqk@163.com
 */
public abstract class AnalysisBaseController {

    protected org.slf4j.Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    protected AnService analysisServcie;

    @Autowired
    //导出文件服务
    protected ExportDataService exportDataService;

    public AnService getAnalysisServcie() {
        return analysisServcie;
    }

    public void setAnalysisServcie(AnService analysisServcie) {
        this.analysisServcie = analysisServcie;
    }

    public ExportDataService getExportDataService() {
        return exportDataService;
    }

    public void setExportDataService(ExportDataService exportDataService) {
        this.exportDataService = exportDataService;
    }


}
