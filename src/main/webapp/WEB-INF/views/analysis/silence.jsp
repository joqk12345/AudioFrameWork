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


    var content = "";
    //文档的导出功能导出文档
    $("#export").click(function () {

        //实现选择checkbox 导出
        var selectedrowindexes = $('#jqxgrid').jqxGrid('selectedrowindexes');
//                alert(selectedrowindexes);
        if (selectedrowindexes && selectedrowindexes.length > 0) {
            content = "";
            $.each(selectedrowindexes, function (i, item) {
//                        alert(item);
                var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', item);
//                        alert("data" + dataRecord.path);
                content += dataRecord.path + ",";
            });
        }

        var form = $("<form>");
        form.attr('style', 'display:none');
        form.attr('target', '');
        form.attr('method', 'post');
        form.attr('action', 'silenceExport.do');
        var input1 = $('<input>');
        input1.attr('type', 'hidden');
        input1.attr('name', 'json');
        input1.attr('value', content);
        $('body').append(form);
        form.append(input1);
        form.submit();
        form.remove();
    });

    //添加录音信息
    search($("#wavPath").val(), 10);

    //添加查询信息框
    $("#search").click(function () {
        //显示过去查询条件的值
//                alert($("#wavPath").val());    //这个是 用与接收ajax请求的时候用到的
        search($("#wavPath").val(), $("#threshold").val());
    });
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------


//参数值得获得  $("#wavPath").val()  、$("#threshold").val()
    function search(wavpath, threshold) {
        $.getJSON(
                "silenceSearch.do",
                {
                    wavPath: wavpath,
                    threshold: threshold
                },
                //        {busReqType: $("#busReqType").val()},
                function (data1) {
                    data = data1;
                    content = "";
                    //提交值的初始化
                    $.each(data, function (i, item) {
//                    alert(item.id+"名称"+item.path);
                        content += item.path + ",";
                    });
                    var source =
                    {
                        localdata: data,
                        datatype: "json",
                        datafields: [
                            {name: 'id', type: 'string'},
                            {name: 'path', type: 'string'},
                            {name: 'total', type: 'string'}
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
                                selectionmode: 'checkbox',
                                columns: [
                                    {text: '编号', datafield: 'id', width: 100},
                                    {text: '名称', datafield: 'path', width: 500},
                                    {text: '长度', datafield: 'total', width: 200},
                                    {text: '查看', datafield: 'Edit', columntype: 'button', cellsrenderer: function () {
                                        return "查看";
                                    }, buttonclick: function (row) {
                                        // open the popup window when the user clicks a button.
//                                            alert(id);
                                        editrow = row;
                                        var offset = $("#jqxgrid").offset();
                                        $("#popupWindow").jqxWindow({position: {x: parseInt(offset.left) + 60, y: parseInt(offset.top) + 60}});

                                        // get the clicked row's data and initialize the input fields.
                                        var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', editrow);
                                        //$("#reanlname").jqxNumberInput({decimal: dataRecord.quantity});
                                        //$("#createtime").jqxNumberInput({decimal: dataRecord.price});

                                        //   $("#userid").val(dataRecord.userid);
                                        //当前路径赋给wavpath
                                        var wavPath = dataRecord.path;
                                        var OCXPath = Prefix + dataRecord.path + Suffix;
//                                            alert(wavPath);
                                        // show the popup window.
                                        $("#popupWindow").jqxWindow('open');
                                        //设置wavpath的路径
//                                    loadWav("D:\\beijing_mobile\\0906596.wav");
                                        var AudioOCX = document.getElementById("AudioOCX");
                                        if (null === AudioOCX) {

                                        } else {  //如果路径存在的话显示
                                            AudioOCX.SetFile(OCXPath, "", 0);
                                            //初始化grid表单 显示场景分割的详细信息
                                            $.getJSON(
                                                    "silenceVo.do",
                                                    {
                                                        wavPath: wavPath
                                                    },
                                                    function (json) {
//                                                                alert("JSON Data: " + json.users[3].name);
                                                        detail = json;

                                                        var source =
                                                        {
                                                            localdata: detail,
                                                            datatype: "json",
                                                            datafields: [
//                                                                {name: 'id', type: 'string'},
//                                                                {name: 'path', type: 'string'},
                                                                {name: 'segmentNo', type: 'string'},
                                                                {name: 'timeStart', type: 'string'},
                                                                {name: 'timeEnd', type: 'string'}
//                                                                            {name: 'content', type: 'string'},
//                                                                            {name: 'role', type: 'string'},
//                                                                            {name: 'speed', type: 'string'}
                                                            ],
                                                            updaterow: function (rowid, rowdata, commit) {
                                                                commit(true);
                                                            }
                                                        };
                                                        var dataAdapter = new $.jqx.dataAdapter(source);
                                                        var editrow = -1;
                                                        $("#jqxWidgetPop").jqxGrid(
                                                                {
                                                                    width: 700,
                                                                    source: dataAdapter,
                                                                    pageable: true,
                                                                    theme: Theme,
                                                                    autoheight: true,
                                                                    columns: [
//                                                        {text: '编号', datafield: 'id', width: 50},
//                                                        {text: '路径', datafield: 'path', width: 300},
                                                                        {text: '段号', datafield: 'segmentNo', width: 100},
                                                                        {text: '开始时间点', datafield: 'timeStart', width: 300, cellsalign: 'right'},
                                                                        {text: '结束时间点', datafield: 'timeEnd', width: 300, cellsalign: 'right', cellsformat: 'c2'}
//                                                                    {text: '内容', datafield: 'content', cellsalign: 'left', cellsformat: 'c2'},
//                                                                    {text: '角色', datafield: 'role', width:50,cellsalign: 'right', cellsformat: 'c2'},
//                                                                    {text: '语速', datafield: 'speed', width: 50, cellsalign: 'right'}
                                                                    ]
                                                                });
                                                        $('#jqxWidgetPop').on('rowdoubleclick', function (event) {
                                                            // event.args.rowindex is a bound index.
//                                                        alert("Row with bound index: " + event.args.rowindex + " has been clicked.");
                                                            var editrow = event.args.rowindex;
                                                            var data = $('#jqxWidgetPop').jqxGrid('getrowdata', editrow);
//                                                        alert(data.timeStart + " " + data.timeEnd);
                                                            // 显示段落
                                                            showSegment(data.timeStart, data.timeEnd);

                                                            //$("img").attr("src","test.jpg");
//                                                        $('#start').attr("value",data.timeStart);
//                                                        $('#end').attr("value",data.timeEnd);
                                                            playPart(data.timeStart, data.timeEnd);
                                                        });
                                                    });
//                                                var detail = [
//                                                    {"segmentNo": "23", "timeStart": "57.34", "timeEnd": "59.34", "content": "你好，", "speed": "15"},
//                                                    {"segmentNo": "24", "timeStart": "61.03", "timeEnd": "63.15", "content": "请问有什么要帮助您的嘛", "speed": "15"}
//                                                ];
                                        }

                                    }
                                    }

                                ]
                            });
                });

    }

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
                    {text: '编号', datafield: 'id', width: 100},
                    {text: '名称', datafield: 'path', width: 500},
                    {text: '总长度', datafield: 'segmentNo', width: 200},
//                            {text: '开始时间点', datafield: 'timeStart', width: 90, cellsalign: 'right'},
//                            {text: '结束时间点', datafield: 'timeEnd', width: 90, cellsalign: 'right', cellsformat: 'c2'},
//                            {text: '内容', datafield: 'content', width: 200, cellsalign: 'right', cellsformat: 'c2'},
//                            {text: '语速', datafield: 'speed', width: 90, cellsalign: 'right', cellsformat: 'c2'},
                    {text: '查看', datafield: 'Edit', columntype: 'button', cellsrenderer: function () {
                        return "查看";
                    }, buttonclick: function (row) {
                        // open the popup window when the user clicks a button.
                        editrow = row;
                        var offset = $("#jqxgrid").offset();
                        $("#popupWindow").jqxWindow({position: {x: parseInt(offset.left) + 60, y: parseInt(offset.top) + 60}});

                        // get the clicked row's data and initialize the input fields.
                        var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', editrow);
                        //$("#reanlname").jqxNumberInput({decimal: dataRecord.quantity});
                        //$("#createtime").jqxNumberInput({decimal: dataRecord.price});

                        //   $("#userid").val(dataRecord.userid);
                        //当前路径赋给wavpath
                        //   var wavPath = dataRecord.path;

                        // show the popup window.
                        $("#popupWindow").jqxWindow('open');
                        //设置wavpath的路径
//                                    loadWav("D:\\beijing_mobile\\0906596.wav");
                        var AudioOCX = document.getElementById("AudioOCX");
                        if (null === AudioOCX) {

                        } else {  //如果路径存在的话显示
                            AudioOCX.SetFile("D:\\beijing_mobile\\0906596.wav", "", 0);
                            //初始化grid表单 显示花旦的详细信息

                            var detail = [
                                {"segmentNo": "23", "timeStart": "57.34", "timeEnd": "59.34", "content": "你好，", "speed": "15"},
                                {"segmentNo": "24", "timeStart": "61.03", "timeEnd": "63.15", "content": "请问有什么要帮助您的嘛", "speed": "15"}
                            ];
                            var source =
                            {
                                localdata: data,
                                datatype: "json",
                                datafields: [
//                                                                {name: 'id', type: 'string'},
//                                                                {name: 'path', type: 'string'},
                                    {name: 'segmentNo', type: 'string'},
                                    {name: 'timeStart', type: 'string'},
                                    {name: 'timeEnd', type: 'string'},
//                                                                {name: 'content', type: 'string'},
//                                                                {name: 'speed', type: 'string'}
                                ],
                                updaterow: function (rowid, rowdata, commit) {
                                    commit(true);
                                }
                            };
                            var dataAdapter = new $.jqx.dataAdapter(source);
                            var editrow = -1;
                            $("#jqxWidgetPop").jqxGrid(
                                    {
                                        width: 700,
                                        source: dataAdapter,
                                        pageable: true,
                                        autoheight: true,
                                        columns: [
//                                                        {text: '编号', datafield: 'id', width: 50},
//                                                        {text: '路径', datafield: 'path', width: 300},
                                            {text: '段号', datafield: 'segmentNo', width: 100},
                                            {text: '开始时间点', datafield: 'timeStart', width: 300, cellsalign: 'right'},
                                            {text: '结束时间点', datafield: 'timeEnd', width: 300, cellsalign: 'right', cellsformat: 'c2'}
//                                                        {text: '内容', datafield: 'content', cellsalign: 'right', cellsformat: 'c2'},
//                                                        {text: '语速', datafield: 'speed', width: 100, columntype: 'button'}
                                        ]
                                    });

                        }

                    }
                    }
                ]
            });

    // initialize the popup window and buttons.
    $("#popupWindow").jqxWindow({
        width: POPWeight, height: POPHeight, resizable: false, isModal: true, autoOpen: false, modalOpacity: 0.01, theme: Theme
    });

    $("#popupWindow").on('open', function () {
    });
    //添加关闭窗体的时候停止播放
    $('#popupWindow').on('close', function (event) {
        StopAudio();
    });

    //定义按钮的样式
    $("#playAudio").jqxButton({theme: Theme});
    $("#pauseAudio").jqxButton({theme: Theme});
    $("#stopAudio").jqxButton({theme: Theme});
    $("#zoomIn").jqxButton({theme: Theme});
    $("#zoomOut").jqxButton({theme: Theme});

    // update the edited row when the user clicks the 'Save' button.
    $("#playAudio").click(function () {
        PlayAudio();
//$("img").attr("src","test.jpg");
//                playPart($("#start").val(), $("#end").val());
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
                            <legend>静音检测查询</legend>
                            <div class="control-group">

                                <div class="row-fluid">
                                    <div class="span4">
                                        <label class=" control-label">录音名称：</label>
                                        <input type="text" id="wavPath" name="wavPath" class="input-medium"
                                               placeholder="test">
                                    </div>
                                    <div class="span4">
                                        <label class=" control-label">静音阀值：</label>
                                        <input type="text" id="threshold" name="threshold" class="input-medium"
                                               placeholder="test">
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
                <!-- 添加文件导出按钮-->
                <div class="row-fluid">
                    <a class="btn btn-mini" href="#" id="export"><i class="icon-arrow-down"></i> 保存结果</a>
                </div>
                <div class="row-fluid">
                    <!--用于jqgrid显示的-->
                    <div id='jqxWidget'>
                        <div id="jqxgrid"></div>
                        <div style="margin-top: 30px;">
                            <div id="cellbegineditevent"></div>
                            <div style="margin-top: 10px;" id="cellendeditevent"></div>
                        </div>
                        <div id="popupWindow">
                            <div>播放器页面</div>
                            <div style="overflow: hidden;">
                                <!-- 引入控件实体，可以通过设置长宽为0来隐藏控件 -->
                                <object classid="clsid:EE3CF11B-332A-4CBB-8EF8-C330B48FFF7D"
                                        codebase="AudioEditorOCX.ocx" name="AudioOCX" width="100%" height="26%"
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
                                            <!--                                                <a class="btn btn-mini" href="#" id="Cancel"><i class="icon-remove"></i> 关闭</a>-->
                                            <!--                                                隐藏开始时间，结束时间
                                                                                            <input type="hidden" id="start"  class="input-medium" value="0" >
                                                                                            <input type="hidden" id="end"  class="input-medium"  value="0">-->
                                        </td>
                                    </tr>
                                </table>

                                <!-- 录音详细信息展示-->
                                <div class="row-fluid">
                                    <div id='jqxWidgetPop' style="font-size: 13px; font-family: Verdana; float: left;"
                                         class="span10">
                                        <div id="jqxgridPop" style="margin-left: 30px"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
