<%-- 
    Document   : sidebar
    Created on : 2013-12-17, 12:53:28
    Author     : qiaokai
    RUNRUNRUN
--%>
<%@page contentType="text/html" pageEncoding="UTF-8" %>
<div class="sidebar-nav">
    <div class="nav-header" data-toggle="collapse" data-target="#dashboard-menu"><i class="icon-dashboard"></i>信息管理
    </div>
    <ul id="dashboard-menu" class="nav nav-list collapse in">
        <li><a href="${pageContext.request.contextPath}/info/users">用户管理</a></li>
        <li><a href="${pageContext.request.contextPath}/info/roles">角色管理</a></li>
        <li><a href="${pageContext.request.contextPath}/info/op">操作项管理</a></li>
        <li><a href="${pageContext.request.contextPath}/info/server">服务器状态管理</a></li>
        <li><a href="${pageContext.request.contextPath}/info/log">操作日志</a></li>
    </ul>


    <div class="nav-header" data-toggle="collapse" data-target="#accounts-menu"><i class="icon-briefcase"></i>语音分析
        <!--        <span class="label label-info">+10</span>-->
    </div>
    <ul id="accounts-menu" class="nav nav-list collapse in">
        <li><a href="${pageContext.request.contextPath}/analysis/voiceConvertor">语音转写</a></li>
        <li><a href="${pageContext.request.contextPath}/analysis/keywordExport">检索关键词</a></li>
        <li><a href="${pageContext.request.contextPath}/analysis/keywordDetection">关键词查看</a></li>
        <li><a href="${pageContext.request.contextPath}/analysis/sceneDivision">场景分割</a></li>
        <li><a href="${pageContext.request.contextPath}/analysis/silenceDetection">静音检测</a></li>
        <li><a href="${pageContext.request.contextPath}/analysis/busClassify">业务归类</a></li>
        <li><a href="${pageContext.request.contextPath}/analysis/busCollect">业务TOP排名</a></li>
        <li><a href="${pageContext.request.contextPath}/analysis/moodRecognize">情绪识别</a></li>


        <!--        <li ><a href="reset-password.html">识别模型管理</a></li>-->
    </ul>

    <div class="nav-header" data-toggle="collapse" data-target="#settings-menu"><i class="icon-bar-chart">统计分析</i></div>
    <ul id="settings-menu" class="nav nav-list collapse in">
        <!--        <li ><a href="audikeeper.jsp">Auduikeeper</a></li>
                <li ><a href="tts.jsp">TTS</a></li>
                <li ><a href="chart.jsp">图表查看</a></li>-->
        <li><a href="${pageContext.request.contextPath}/stat/runstat">系统运行状态汇总</a></li>
        <!--        <li ><a href="audiokeeperInfo.jsp">识别结果查询</a></li>-->
        <li><a href="${pageContext.request.contextPath}/stat/undResInfo">识别结果查询</a></li>
        <li><a href="${pageContext.request.contextPath}/stat/dataexport">处理能力统计</a></li>
        <li><a href="${pageContext.request.contextPath}/stat/audiokeeperInfoCount">识别结果汇总</a></li>
        <li><a href="${pageContext.request.contextPath}/stat/biInfo">按业务统计</a></li>
    </ul>
    <div class="nav-header" data-toggle="collapse" data-target="#accounts-menu"><i class="icon-briefcase"></i>任务管理<span
            class="label label-info">+10</span></div>
    <ul id="accounts-menu" class="nav nav-list collapse in">
        <li><a href="${pageContext.request.contextPath}/task/job">任务分配</a></li>
        <li><a href="${pageContext.request.contextPath}/task/numset">号码集分配</a></li>
        <!--        <li ><a href="reset-password.html">识别模型管理</a></li>-->
    </ul>

    <div class="nav-header" data-toggle="collapse" data-target="#legal-menu"><i class="icon-legal"></i>配置管理</div>
    <ul id="legal-menu" class="nav nav-list collapse in">
        <li><a href="${pageContext.request.contextPath}/config/bus">业务种类管理</a></li>
        <!--<li ><a href="keyword.jsp">关键词管理</a></li>-->
        <li><a href="${pageContext.request.contextPath}/config/model">识别模型管理</a></li>
    </ul>
</div>