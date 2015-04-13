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
<script>
$(document).ready(function () {

    $.getJSON(
            "busCollect.do",
            {
                busName: name
            },
            //        {busReqType: $("#busReqType").val()},
            function (data1) {
                data = data1;

//grid 默认显示
                var source =
                {
                    localdata: data,
                    datatype: "json",
                    datafields: [
                        {name: 'uid', type: 'string'},
                        {name: 'busName', type: 'string'},
                        {name: 'conut', type: 'string'}
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
                                {text: '编号', datafield: 'uid', width: 200},
                                {text: '业务名称', datafield: 'busName', width: 500},
                                {text: '个数', datafield: 'conut'}

                            ]
                        });
//柱状图显示
                var settings = {
                    title: "业务Top排名统计",
                    description: "业务统计详细信息",
                    enableAnimations: true,
                    showLegend: true,
                    padding: {left: 5, top: 5, right: 5, bottom: 5},
                    titlePadding: {left: 90, top: 0, right: 0, bottom: 10},
                    enableCrosshairs: true,
                    //这里设置数据结构
                    source: data,
                    categoryAxis: {
                        text: 'Category Axis',
                        textRotationAngle: 0,
                        dataField: 'busName',
                        showTickMarks: true,
                        tickMarksInterval: 1,
                        tickMarksColor: '#2190c4',
                        unitInterval: 1,
                        showGridLines: true,
                        gridLinesInterval: 3,
                        gridLinesColor: '#888888'
                    },
                    colorScheme: 'scheme05',
                    seriesGroups: [
                        {
                            type: 'rangecolumn',
                            columnsGapPercent: 100,
                            //                            toolTipFormatFunction: toolTipCustomFormatFn,
                            valueAxis: {
                                unitInterval: 25,
                                displayValueAxis: true,
                                description: '业务总和',
                                axisSize: 'auto',
                                tickMarksColor: '#888888',
                                minValue: 0,
                                maxValue: 250
                            },
                            series: [
                                {dataFieldTo: 'conut', displayText: '业务名称'}
                            ]
                        }

                    ]
                };
                // setup the chart
                $('#jqxChart').jqxChart(settings);

            });

    //备用的测试数据

//               var data = [
//                    {"month": "话费服务", "max": 60},
//                    {"month": "手机上网", "max": 5.9},
//                    {"month": "三月", "max": 9.8},
//                    {"month": "四月", "max": 13.9},
//                    {"month": "五月", "max": 18},
//                    {"month": "六月", "max": 222},
//                    {"month": "七月", "max": 253},
//                    {"month": "八月", "max": 244},
//                    {"month": "九月", "max": 208},
//                    {"month": "十月", "max": 14.9},
//                    {"month": "十一月", "max": 8.4},
//                    {"month": "十二月", "max": 4.5}
//                ];
    //柱状图的设置


    //添加查询信息框
    $("#search").click(function () {
        //显示过去查询条件的值
//                alert($("#wavPath").val());    //这个是 用与接收ajax请求的时候用到的
        var name = $("#busName").val() ? $("#busName").val() : "";
        $.getJSON(
                "busCollect.do",
                {
                    busName: name
                },
                //        {busReqType: $("#busReqType").val()},
                function (data1) {
                    data = data1;
                    var source =
                    {
                        localdata: data,
                        datatype: "json",
                        datafields: [
                            {name: 'uid', type: 'string'},
                            {name: 'busName', type: 'string'},
                            {name: 'conut', type: 'string'}
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
                                    {text: '编号', datafield: 'uid', width: 200},
                                    {text: '业务名称', datafield: 'busName', width: 500},
                                    {text: '个数', datafield: 'conut'}

                                ]
                            });
                });

        //------------------------------------------------------------------------------------------------------------------------------------------------------------------


    });

    var data = [
//                {"id": "40", "path": "D:\\beijing_mobile\\0907045.wav", "segmentNo": "23"},
//                {"id": "5", "path": "D:\\beijing_mobile\\0907045.wav", "segmentNo": "24"}
    ];

    //var data = [];
    var source =
    {
        localdata: data,
        datatype: "json",
        datafields: [
            {name: 'id', type: 'string'},
            {name: 'path', type: 'string'},
            {name: 'segmentNo', type: 'string'}
//                                    {name: 'timeStart', type: 'string'},
//                                    {name: 'timeEnd', type: 'string'},
//                                    {name: 'content', type: 'string'},
//                                    {name: 'speed', type: 'string'}
        ],
        updaterow: function (rowid, rowdata, commit) {
            commit(true);
        }
    };

    // initialize the input fields.

    var dataAdapter = new $.jqx.dataAdapter(source);
    var editrow = -1;

    // initialize jqxGrid
    $("#jqxgrid").jqxGrid(
            {
                width: 930,
                source: dataAdapter,
                pageable: true,
                autoheight: true,
                columns: [
                    {text: '编号', datafield: 'id', width: 200},
                    {text: '业务名称', datafield: 'path', width: 500},
                    {text: '总数', datafield: 'segmentNo'}
//                            {text: '开始时间点', datafield: 'timeStart', width: 90, cellsalign: 'right'},
//                            {text: '结束时间点', datafield: 'timeEnd', width: 90, cellsalign: 'right', cellsformat: 'c2'},
//                            {text: '内容', datafield: 'content', width: 200, cellsalign: 'right', cellsformat: 'c2'},
//                            {text: '语速', datafield: 'speed', width: 90, cellsalign: 'right', cellsformat: 'c2'},
                ]
            });

    // initialize the popup window and buttons.
    $("#popupWindow").jqxWindow({
        width: 710, height: 320, resizable: false, isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.01
    });

    $("#popupWindow").on('open', function () {
    });

    //定义按钮的样式
    $("#playAudio").jqxButton({theme: theme});
    $("#pauseAudio").jqxButton({theme: theme});
    $("#stopAudio").jqxButton({theme: theme});
    $("#zoomIn").jqxButton({theme: theme});
    $("#zoomOut").jqxButton({theme: theme});
    $("#Cancel").jqxButton({theme: theme});


    // update the edited row when the user clicks the 'Save' button.
    $("#playAudio").click(function () {
        PlayAudio();
//                if (editrow >= 0) {
////                    var rowID = $('#jqxgrid').jqxGrid('getrowid', editrow);
////                    $('#jqxgrid').jqxGrid('updaterow', rowID, row);
////                    $("#popupWindow").jqxWindow('hide');
//                
//                }
    });

    $("#pauseAudio").click(function () {
        PauseAudio();
    });

    $("#stopAudio").click(function () {
        StopAudio();
    });

    $("#zoomIn").click(function () {
        ZoomIn();
    });

    $("#zoomOut").click(function () {
        ZoomOut();
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
                    <form class="well form-inline" action="#">
                        <fieldset>
                            <legend>业务Top排名统计</legend>
                            <div class="control-group">

                                <div class="row-fluid">
                                    <div class="span6"><label class=" control-label">业务名称：</label>
                                        <input type="text" id="busName" name="busName" class="input-medium"
                                               placeholder="test">
                                    </div>

                                    <div class="span2">
                                        <!--                                            <label class="text">查询条件2：</label>
                                                                                    <input type="text" name="test" class="input-medium" placeholder="test">-->
                                    </div>
                                    <div class="span4">
                                        <button type="button" id="search" class="btn btn-info right">查询</button>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
            <div class="container-fluid">
                <div class="row-fluid">
                    <!--用于jqgrid显示的-->
                    <div id='jqxWidget'>
                        <div id="jqxgrid"></div>
                        <div style="margin-top: 30px;">
                            <div id="cellbegineditevent"></div>
                            <div style="margin-top: 10px;" id="cellendeditevent"></div>
                        </div>
                        <!--弹出页面为播放器页面 -->
                        <div id="popupWindow">
                            <div>播放器页面</div>
                            <div style="overflow: hidden;">
                                <!-- 引入控件实体，可以通过设置长宽为0来隐藏控件 -->
                                <object classid="clsid:EE3CF11B-332A-4CBB-8EF8-C330B48FFF7D"
                                        codebase="AudioEditorOCX.ocx" name="AudioOCX" width="700" height="160"
                                        align="middle" id="AudioOCX">
                                </object>

                                <table>
                                    <tr>
                                        <td align="right"></td>
                                        <td style="padding-top: 10px;" align="right">
                                            <a class="btn btn-mini" href="#" id="playAudio"><i class="icon-play"></i> 播放</a>
                                            <a class="btn btn-mini" href="#" id="pauseAudio"><i class="icon-pause"></i>
                                                暂停</a>
                                            <a class="btn btn-mini" href="#" id="stopAudio"><i class="icon-stop"></i>停止</a>
                                            <a class="btn btn-mini" href="#" id="zoomIn"><i class="icon-zoom-in"></i> 放大</a>
                                            <a class="btn btn-mini" href="#" id="zoomOut"><i class="icon-zoom-out"></i>
                                                缩小</a>
                                            <a class="btn btn-mini" href="#" id="Cancel"><i class="icon-remove"></i> 关闭</a>
                                        </td>
                                    </tr>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
                <!-- 改行用于显示柱状图-->
                <div class="row-fluid">
                    <div id='jqxChart' style="width:930px; height:300px"></div>
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
