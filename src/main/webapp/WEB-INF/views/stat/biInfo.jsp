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

            var data = [];
            // prepare the data
//            var data = generatedata(100);
            $("#search").click(function () {
//          alert("ip");    这个是 用与接收ajax请求的时候用到的
                $.getJSON(
                        "bus.do",
                        //    { busReqType:$("#busReqType").val()},
                        function (data1) {
                            data = data1;
                            var source =
                            {
                                localdata: data,
                                datatype: "json",
                                datafields: [
                                    {name: 'hour', type: 'string'},
                                    {name: 'accountNum', type: 'string'},
                                    {name: 'smsNum', type: 'string'},
                                    {name: 'financialSerNum', type: 'string'},
                                    {name: 'fundSerNum', type: 'string'},
                                    {name: 'openingBankNum', type: 'number'},
                                    {name: 'passwdSerNum', type: 'number'}
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
                                            {text: '小时', width: 180, datafield: 'hour', cellsalign: 'left', align: 'right'},
                                            {text: '账户查询量', datafield: 'accountNum'},
                                            {text: '短信服务量', datafield: 'smsNum'},
                                            {text: '理财服务量', datafield: 'financialSerNum'},
                                            {text: '基金服务量', datafield: 'fundSerNum'},
                                            {text: '开户行查询量', datafield: 'openingBankNum', cellsalign: 'right', align: 'right'},
                                            {text: '密码服务量', datafield: 'passwdSerNum', cellsalign: 'right', align: 'right'}
                                        ]
                                    });

                        });
            });

            var source =
            {
                localdata: data,
                datatype: "json",
                datafields: [
                    {text: '小时', width: 180, datafield: 'date', cellsalign: 'left', align: 'right'},
                    {text: '账户查询量', datafield: 'callnum'},
                    {text: '短信服务量', datafield: 'peoplenum'},
                    {text: '理财服务量', datafield: 'peopleffective'},
                    {text: '基金服务量', datafield: 'available'},
                    {text: '开户行查询量', datafield: 'quantity', cellsalign: 'right', align: 'right'},
                    {text: '密码服务量', datafield: 'price', cellsalign: 'right', align: 'right'}
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
                            {text: '小时', width: 180, datafield: 'date', cellsalign: 'left', align: 'right'},
                            {text: '账户查询量', datafield: 'callnum'},
                            {text: '短信服务量', datafield: 'peoplenum'},
                            {text: '理财服务量', datafield: 'peopleffective'},
                            {text: '基金服务量', datafield: 'available'},
                            {text: '开户行查询量', datafield: 'quantity', cellsalign: 'right', align: 'right'},
                            {text: '密码服务量', datafield: 'price', cellsalign: 'right', align: 'right'}
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
//            $("#xmlExport").click(function() {
//                $("#jqxgrid").jqxGrid('exportdata', 'xml', 'jqxGrid');
//            });
//            $("#csvExport").click(function() {
//                $("#jqxgrid").jqxGrid('exportdata', 'csv', 'jqxGrid');
//            });
//            $("#tsvExport").click(function() {
//                $("#jqxgrid").jqxGrid('exportdata', 'tsv', 'jqxGrid');
//            });
//            $("#htmlExport").click(function() {
//                $("#jqxgrid").jqxGrid('exportdata', 'html', 'jqxGrid');
//            });
//            $("#jsonExport").click(function() {
//                $("#jqxgrid").jqxGrid('exportdata', 'json', 'jqxGrid');
//            });
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
                            <legend>业务信息查询</legend>
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
                                        <label class="text">统计类型：</label>
                                        <select class="input-medium">
                                            <option>按月统计</option>
                                            <option selected>按天统计</option>
                                        </select>
                                    </div>
                                    <!--                                        <div class="span3">
                                                                                <label class="text">other：</label>
                                                                                <input type="text" name="test" class="input-small" placeholder="test">
                                                                            </div>-->
                                </div>
                            </div>
                            <div class="control-group">
                                <div class="row-fluid">
                                    <div class="span4">
                                        <label class="text">开始时间：</label>
                                        <input type="text" class="input-medium form_time" size="16" data-date=""
                                               data-date-format="hh:ii" placeholder="开始时间" readonly>
                                    </div>
                                    <div class="span4">
                                        <label class="text">结束时间：</label>
                                        <input type="text" class="input-medium form_time" size="16" data-date=""
                                               data-date-format="hh:ii" placeholder="结束时间" readonly></div>

                                    <div class="span4">
                                        <label class="text">业务类型：</label>
                                        <select class="input-medium">
                                            <option>全部</option>
                                            <option>账户查询</option>
                                            <option>短信查询</option>
                                            <option>理财服务</option>
                                            <option>基金服务</option>
                                            <option>开户行查询</option>
                                            <option>收费标准查询</option>
                                            <option>信用卡账单</option>
                                            <option>卡内转账</option>
                                            <option>密码服务</option>
                                            <option>信用卡还款</option>
                                        </select>

                                        <input type="hidden" id="busReqType" class="input-medium" value="busType">
                                    </div>
                                </div>
                            </div>
                            <div class="row-fluid">
                                <div class="span4"><label class=" control-label">开始日期：</label>
                                    <input type="text" class="input-medium form_date" size="16" data-date=""
                                           data-date-format="yyyy-mm-dd" placeholder="开始日期" readonly></div>

                                <div class="span4">
                                    <label class="text">结束日期：</label>
                                    <input type="text" class="input-medium form_date" size="16" data-date=""
                                           data-date-format="yyyy-mm-dd" placeholder="结束日期" readonly>

                                </div>
                                <div class="span4">
                                    <button type="button" id="search" class="btn btn-info right">查询</button>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
            <!--                                <div class="row-fluid">
                                                    <input type="button"  value="Export to Excel" id='excelExport' />
                                                    <input type="button" value="Export to XML" id='xmlExport' />
                                                    <input type="button" value="Export to CSV" id='csvExport' />
                                                    <input type="button" value="Export to TSV" id='tsvExport' />
                                                    <input type="button" value="Export to HTML" id='htmlExport' />
                                                    <input type="button" value="Export to JSON" id='jsonExport' />
                                            </div>-->

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
