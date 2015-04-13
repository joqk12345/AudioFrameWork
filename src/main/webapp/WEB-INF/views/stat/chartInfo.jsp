<%-- 
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
            $("#search").click(function () {

                startday = $("#startday").val();
//                if (startday === "") {
//                    alert("请选择日期");
//                    return;
//                } else {
                $.getJSON(
                        "runstat.do",
                        {
//                                busReqType: $("#busReqType").val(),    //audioKeeperCount
                            //    chartdata:$("#chartdata").val(),    // 其他信息
                            //    datatype:encodeURI($("#datatype").val()),    //统计类型、按天统计、按时段统计、按月统计
                            datatype: $("#datatype").val(),
                            startday: $("#startday").val(), //开始时间
                            endday: $("#endday").val()                //开始时间
                        },
                        function (data1) {
                            data = data1;


                            var settings = {
                                title: "访问次数",
//                       description: "按月统计识别请求次数",
                                enableAnimations: true,
                                showLegend: true,
                                padding: {left: 10, top: 5, right: 10, bottom: 5},
                                titlePadding: {left: 90, top: 0, right: 0, bottom: 10},
                                source: data,
                                categoryAxis: {
                                    text: 'Category Axis',
                                    textRotationAngle: 0,
                                    dataField: 'dayy',
                                    showTickMarks: true,
                                    valuesOnTicks: false,
                                    tickMarksInterval: 1,
                                    tickMarksColor: '#888888',
                                    unitInterval: 1,
                                    gridLinesInterval: 1,
                                    gridLinesColor: '#888888',
                                    axisSize: 'auto'
                                },
                                colorScheme: 'scheme05',
                                seriesGroups: [
                                    {
                                        type: 'line',
                                        showLabels: true,
                                        symbolType: 'circle',
                                        valueAxis: {
                                            unitInterval: 60,
                                            minValue: 0,
                                            maxValue: 600,
                                            description: '访问次数',
                                            axisSize: 'auto',
                                            tickMarksColor: '#777777'
                                        },
                                        series: [
                                            {dataField: 'total', displayText: '总访问量'},
                                            {dataField: 'sucsum', displayText: '成功次数'}
                                        ]
                                    }
                                ]
                            };

                            // initialize jqxGrid
                            $('#jqxChart').jqxChart(settings);
                        });


//                }

            });

            // prepare chart data as an array
            var sampleData = [
                {Day: '12-18', Running: 49, Goal: 50},
                {Day: '12-19', Running: 50, Goal: 60},
                {Day: '12-20', Running: 70, Goal: 90},
                {Day: '12-21', Running: 30, Goal: 40},
                {Day: '12-22', Running: 25, Goal: 50},
                {Day: '12-23', Running: 30, Goal: 60},
                {Day: '12-24', Running: 20, Goal: 40},
                {Day: '12-25', Running: 30, Goal: 50},
                {Day: '12-26', Running: 30, Goal: 60},
                {Day: '12-27', Running: 80, Goal: 90},
                {Day: '12-28', Running: 40, Goal: 50},
                {Day: '12-29', Running: 30, Goal: 60},
                {Day: '12-30', Running: 60, Goal: 90}
            ];

            // prepare jqxChart settings
            var settings = {
                title: "访问次数",
                description: "按月统计识别请求次数",
                enableAnimations: true,
                showLegend: true,
                padding: {left: 10, top: 5, right: 10, bottom: 5},
                titlePadding: {left: 90, top: 0, right: 0, bottom: 10},
                source: sampleData,
                categoryAxis: {
                    text: 'Category Axis',
                    textRotationAngle: 0,
                    dataField: 'Day',
                    showTickMarks: true,
                    valuesOnTicks: false,
                    tickMarksInterval: 1,
                    tickMarksColor: '#888888',
                    unitInterval: 1,
                    gridLinesInterval: 1,
                    gridLinesColor: '#888888',
                    axisSize: 'auto'
                },
                colorScheme: 'scheme05',
                seriesGroups: [
                    {
                        type: 'line',
                        showLabels: true,
                        symbolType: 'circle',
                        valueAxis: {
                            unitInterval: 10,
                            minValue: 0,
                            maxValue: 100,
                            description: '访问次数',
                            axisSize: 'auto',
                            tickMarksColor: '#777777'
                        },
                        series: [
                            {dataField: 'Goal', displayText: '总访问量'},
                            {dataField: 'Running', displayText: '成功次数'}
                        ]
                    }
                ]
            };

            // setup the chart
            $('#jqxChart').jqxChart(settings);

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
                                        <label class="">其他信息：</label>
                                        <input type="text" name="test" class="input-medium" placeholder="test">
                                        <input type="hidden" name="test" class="input-medium" id="chartdata"
                                               value="chartdata">
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
                                        <select class="input-medium" id="datatype">
                                            <option>按月统计</option>
                                            <option>按天统计</option>
                                            <option selected>按时段统计</option>
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
                                    <button type="button" id="search" class="btn btn-info right">查询</button>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>

            <div style='height: 400px; width: 900px;'>
                <div id='host' style="margin: 0 auto; width:800px; height:400px;">
                    <div id='jqxChart' style="width:750px; height:400px; position: relative; left: 0px; top: 0px;">
                    </div>
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
