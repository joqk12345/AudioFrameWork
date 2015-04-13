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
                        "HandlingCapacity.do",
                        {
                            startday: $("#startday").val(), //开始时间
                            endday: $("#endday").val()                //开始时间
                        },
                        //        {busReqType: $("#busReqType").val()},
                        function (data1) {
                            data = data1;
                            var source =
                            {
                                localdata: data,
                                datatype: "json",
                                datafields: [
                                    {name: 'time', type: 'string'},
                                    {name: 'callNum', type: 'string'},
                                    {name: 'switchPeople', type: 'string'},
                                    {name: 'switchPeopleRate', type: 'string'},
                                    {name: 'silentTalkRate', type: 'string'},
                                    {name: 'avgInteractiveNum', type: 'number'},
                                    {name: 'avgInteractiveRate', type: 'string'}
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
                                            {text: '时间', width: 180, datafield: 'time', cellsalign: 'left', align: 'right'},
                                            {text: '呼叫量', datafield: 'callNum'},
                                            {text: '转人工量', datafield: 'switchPeople'},
                                            {text: '转人工率', datafield: 'switchPeopleRate'},
                                            {text: '无声通话率', datafield: 'silentTalkRate'},
                                            {text: '平均交互次数', datafield: 'avgInteractiveNum', cellsalign: 'right', align: 'right'},
                                            {text: '平均交互时长', datafield: 'avgInteractiveRate', cellsalign: 'right', align: 'right'}
                                        ]
                                    });

                        });
            });

//            var data = [
//                {"date": "2013-12-20", "callnum": "700", "peoplenum": "211", "peopleffective": "50%", "available": "42%", "quantity": "50", "price": "25s"},
//                {"date": "2013-12-21", "callnum": "700", "peoplenum": "211", "peopleffective": "50%", "available": "42%", "quantity": "50", "price": "25s"}, {"date": "2013-12-22", "callnum": "329", "peoplenum": "75", "peopleffective": "47", "available": "26%", "quantity": "51", "price": "22s"},
//                {"date": "2013-12-23", "callnum": "392", "peoplenum": "75", "peopleffective": "47", "available": "26%", "quantity": "51", "price": "22s"},
//                {"date": "2013-12-24", "callnum": "377", "peoplenum": "75", "peopleffective": "47", "available": "26%", "quantity": "51", "price": "22s"},
//                {"date": "2013-12-25", "callnum": "392", "peoplenum": "75", "peopleffective": "47", "available": "7%", "quantity": "51", "price": "22s"},
//                {"date": "2013-12-26", "callnum": "399", "peoplenum": "75", "peopleffective": "47", "available": "26%", "quantity": "51", "price": "22s"},
//                {"date": "2013-12-27", "callnum": "392", "peoplenum": "75", "peopleffective": "47", "available": "26%", "quantity": "51", "price": "22s"},
//                {"date": "2013-12-28", "callnum": "392", "peoplenum": "75", "peopleffective": "47", "available": "26%", "quantity": "51", "price": "22s"},
//                {"date": "2013-12-29", "callnum": "392", "peoplenum": "75", "peopleffective": "47", "available": "26%", "quantity": "51", "price": "22s"},
//                {"date": "2013-12-30", "callnum": "392", "peoplenum": "75", "peopleffective": "47", "available": "26%", "quantity": "51", "price": "22s"}
//            ];

            var source =
            {
                localdata: data,
                datatype: "json",
                datafields: [
                    {name: 'time', type: 'string'},
                    {name: 'callNum', type: 'string'},
                    {name: 'switchPeople', type: 'string'},
                    {name: 'switchPeopleRate', type: 'string'},
                    {name: 'silentTalkRate', type: 'string'},
                    {name: 'avgInteractiveNum', type: 'number'},
                    {name: 'avgInteractiveRate', type: 'string'}
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
                            {text: '时间', width: 180, datafield: 'time', cellsalign: 'left', align: 'right'},
                            {text: '呼叫量', datafield: 'callNum'},
                            {text: '转人工量', datafield: 'switchPeople'},
                            {text: '转人工率', datafield: 'switchPeopleRate'},
                            {text: '无声通话率', datafield: 'silentTalkRate'},
                            {text: '平均交互次数', datafield: 'avgInteractiveNum', cellsalign: 'right', align: 'right'},
                            {text: '平均交互时长', datafield: 'avgInteractiveRate', cellsalign: 'right', align: 'right'}
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
                            <legend>处理能力统计</legend>
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
                                        <input type="text" name="test" class="input-medium" placeholder="Test">
                                        <input type="hidden" id="busReqType" class="input-medium"
                                               value="handlingCapacity">
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
                                               data-date-format="hh:ii" placeholder="结束时间" readonly>
                                    </div>
                                    <div class="span4">
                                        <label class="text">统计类型：</label>
                                        <select class="input-medium">
                                            <option>按月统计</option>
                                            <option>按天统计</option>
                                        </select>

                                    </div>
                                </div>
                            </div>
                            <div class="row-fluid">
                                <div class="span4">
                                    <label class=" control-label">开始日期：</label>
                                    <input type="text" class="input-medium form_date" size="16" id="startday"
                                           data-date="" data-date-format="yyyy-mm-dd" placeholder="开始日期" readonly>
                                </div>
                                <div class="span4">
                                    <label class="text">结束日期：</label>
                                    <input type="text" class="input-medium form_date" size="16" id="endday" data-date=""
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

            <div class="row-fluid">
                &nbsp;&nbsp; &nbsp;&nbsp; <input type="button" value="Export to Excel" id='excelExport'/>
                <!--                                                        <input type="button" value="Export to XML" id='xmlExport' />
                                                                        <input type="button" value="Export to CSV" id='csvExport' />
                                                                        <input type="button" value="Export to TSV" id='tsvExport' />
                                                                        <input type="button" value="Export to HTML" id='htmlExport' />
                                                                        <input type="button" value="Export to JSON" id='jsonExport' />-->
            </div>


            <div class="row-fluid">
                <div><br/></div>
            </div>

            <div class="row-fluid">
                <div id='jqxWidget' style="font-size: 13px; font-family: Verdana; float: left;" class="span10">
                    <div id="jqxgrid" style="margin-left: 30px"></div>
                    <!--                        <div style='margin-top: 20px;'>
                                                <div style="margin-left: 30px">
                                                    <input type="button" value="Export to Excel" id='excelExport' />
                                                    <br /><br />
                                                    <input type="button" value="Export to XML" id='xmlExport' />
                                                </div>
                                                <div style='margin-left: 10px; float: left;'>
                                                    <input type="button" value="Export to CSV" id='csvExport' />
                                                    <br /><br />
                                                    <input type="button" value="Export to TSV" id='tsvExport' />
                                                </div>
                                                <div style='margin-left: 10px; float: left;'>
                                                    <input type="button" value="Export to HTML" id='htmlExport' />
                                                    <br /><br />
                                                    <input type="button" value="Export to JSON" id='jsonExport' />
                                                </div>
                                            </div>-->
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
