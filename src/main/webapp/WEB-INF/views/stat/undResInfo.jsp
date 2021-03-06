<%-- 
    Document   : dataexport
    Created on : 2013-12-26, 20:08:55
    Author     : qiaokai
    RUNRUNRUN
--%>

<%@page contentType="text/html" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<head>

    <%@ include file="/common/header.jsp" %>
    <%@ include file="/common/jqwidgets.jsp" %>
    <script type="text/javascript">
        $(document).ready(function () {
            // prepare the data
//            var data = generatedata(100);
            var data = [];

            $("#search").click(function () {
                $.getJSON(
                        "search.do",
                        {
                            //        busReqType:$("#busReqType").val(),
                            startday: $("#startday").val(), //开始时间
                            endday: $("#endday").val()                //开始时间
                        },
                        function (data1) {
                            data = data1;
                            var source =
                            {
                                localdata: data,
                                datatype: "json",
                                datafields: [
                                    {name: 'id', type: 'int'},
                                    {name: 'hour', type: 'string'},
                                    {name: 'resultInfo', type: 'string'},
                                    {name: 'confidence', type: 'string'},
                                    {name: 'underInfo', type: 'string'},
                                    {name: 'underInfoTips', type: 'string'},
                                    {name: 'scores', type: 'string'}
                                ]
                            };
                            var dataAdapter = new $.jqx.dataAdapter(source);

                            // initialize jqxGrid
                            $("#jqxgrid").jqxGrid(
                                    {
                                        width: 930,
                                        source: dataAdapter,
                                        autoheight: true,
                                        altrows: true,
                                        sortable: true,
                                        pageable: true,
                                        columns: [
                                            {text: 'id', datafield: 'id', cellsalign: 'left', align: 'right'},
                                            {text: '时间', width: 180, datafield: 'hour', cellsalign: 'left', align: 'right'},
                                            {text: '识别结果', datafield: 'resultInfo'},
                                            {text: '置信度', datafield: 'confidence'},
                                            {text: '理解结果', datafield: 'underInfo'},
                                            {text: '业务提示', datafield: 'underInfoTips'},
                                            {text: '打分', width: 180, datafield: 'scores'}
                                        ]
                                    });

                        });

            });

            var source =
            {
                localdata: data,
                datatype: "json",
                datafields: [
                    {name: 'id', type: 'int'},
                    {name: 'hour', type: 'string'},
                    {name: 'resultInfo', type: 'string'},
                    {name: 'confidence', type: 'string'},
                    {name: 'underInfo', type: 'string'},
                    {name: 'underInfoTips', type: 'string'},
                    {name: 'scores', type: 'string'}
                ]
            };
            var dataAdapter = new $.jqx.dataAdapter(source);

            // initialize jqxGrid
            $("#jqxgrid").jqxGrid(
                    {
                        width: 930,
                        source: dataAdapter,
                        autoheight: true,
                        altrows: true,
                        sortable: true,
                        pageable: true,
                        columns: [
                            {text: 'id', width: 180, datafield: 'id', cellsalign: 'left', align: 'right'},
                            {text: '时间', width: 180, datafield: 'hour', cellsalign: 'left', align: 'right'},
                            {text: '识别结果', datafield: 'resultInfo'},
                            {text: '置信度', datafield: 'confidence'},
                            {text: '理解结果', datafield: 'underInfo'},
                            {text: '业务提示', datafield: 'underInfoTips'},
                            {text: '打分', datafield: 'scores'}
                        ]
                    });

            $("#excelExport").jqxButton({theme: theme});
            $("#xmlExport").jqxButton({theme: theme});
            $("#csvExport").jqxButton({theme: theme});
            $("#tsvExport").jqxButton({theme: theme});
            $("#htmlExport").jqxButton({theme: theme});
            $("#jsonExport").jqxButton({theme: theme});

            $("#excelExport").click(function () {
                $("#jqxgrid").jqxGrid('exportdata', 'xls', 'jqxGrid');
            });
        });
    </script>
</head>
<body class='default'>
<%@ include file="/common/nav.jsp" %>
<div class="container-fluid">

    <div class="row-fluid">
        <!--sidebar -->
        <div class="span2">
            <%@ include file="/common/sidebar.jsp" %>
        </div>

        <div class="span10 well">

            <div class="container-fluid">
                <div class="row-fluid">
                    <form class="well form-inline" action="Test">
                        <fieldset>
                            <legend>识别结果统计</legend>
                            <div class="control-group">
                                <div class="row-fluid">
                                    <div class="span4">
                                        <label class="text">服务器IP：</label>
                                        <select class="input-medium">
                                            <option>192.168.10.212</option>
                                            <!--                                                <option>192.168.10.213</option>
                                                                                            <option>192.168.10.214</option>
                                                                                            <option>192.168.10.215</option>
                                                                                            <option>192.168.10.216</option>-->
                                        </select>
                                    </div>
                                    <div class="span4">
                                        <label class="text">数 据 库 ：</label>
                                        <select class="input-medium">
                                            <option>audioKeeper1</option>
                                            <!--                                                <option>audioKeeper2</option>
                                                                                            <option>audioKeeper3</option>
                                                                                            <option>audioKeeper4</option>
                                                                                            <option>audioKeeper5</option>-->
                                        </select>
                                    </div>
                                    <div class="span4">
                                        <label class="">其他信息：</label>
                                        <input type="text" name="test" class="input-medium" placeholder="test">
                                        <input type="hidden" id="busReqType" class="input-medium" value="undResInfo">
                                    </div>
                                </div>
                            </div>
                            <div class="control-group">
                                <div class="row-fluid">
                                    <div class="span4">
                                        <label class="text">开始时间：</label>
                                        <input id="startime" type="text" class="input-medium form_time" size="16"
                                               data-date="" data-date-format="hh:ii" placeholder="开始时间" readonly>
                                    </div>
                                    <div class="span4">
                                        <label class="text">结束时间：</label>
                                        <input type="text" id="endtime" class="input-medium form_time" size="16"
                                               data-date="" data-date-format="hh:ii" placeholder="结束时间" readonly>
                                    </div>
                                    <div class="span4">
                                        <label class="text">统计类型：</label>
                                        <select class="input-medium">
                                            <!--                                                <option>按月统计</option>
                                                                                            <option selected >按天统计</option>-->
                                        </select>

                                    </div>
                                </div>
                            </div>
                            <div class="row-fluid">
                                <div class="span4">
                                    <label class=" control-label">开始日期：</label>
                                    <input type="text" id="startday" class="input-medium form_date" size="16"
                                           data-date="" data-date-format="yyyy-mm-dd" placeholder="开始日期" readonly>
                                </div>
                                <div class="span4">
                                    <label class="text">结束日期：</label>
                                    <input type="text" id="endday" class="input-medium form_date" size="16" data-date=""
                                           data-date-format="yyyy-mm-dd" placeholder="结束日期" readonly>

                                </div>
                                <div class="span4">
                                    <button type="button" class="btn btn-info right" id="search">查询</button>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>

            <div class="row-fluid">
                <div id='jqxWidget' style="font-size: 13px; font-family: Verdana; float: left;" class="span10">
                    <div id="jqxgrid" style="margin-left: 30px"></div>
                </div>
            </div>
        </div>
    </div>


</div>


<%@ include file="/common/footer.jsp" %>

<script src="${pageContext.request.contextPath}/resources/lib/bootstrap/js/bootstrap.js"></script>
<!--添加日期组件 -->
<script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/lib/datetimepicker/js/bootstrap-datetimepicker.min.js"
        charset="UTF-8"></script>
<script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/lib/datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js"
        charset="UTF-8"></script>
<script type="text/javascript">

    $('.form_date').datetimepicker({
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });
    $('.form_time').datetimepicker({
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 1,
        minView: 0,
        maxView: 1,
        forceParse: 0
    });
</script>
</body>
</html>
