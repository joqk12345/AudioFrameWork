/*
 * Copyright (C) 2014 Administrator.

 *

 */

package com.thinkit.operationsys.sub.controller;

import com.thinkit.operationsys.controller.BaseController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 关键词控制器
 *
 * @author Administrator
 */
@Controller
public class KeywordExportController extends BaseController {

    /**
     * 导出关键词列表
     *
     * @return
     */
    @RequestMapping("/analysis/keywordExport")
    public String keywordExportManager() {
        return "analysis/keywordExport";
    }

}
