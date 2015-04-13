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
        form.attr('action', 'moodExport.do');
        var input1 = $('<input>');
        input1.attr('type', 'hidden');
        input1.attr('name', 'json');
        input1.attr('value', content);
        $('body').append(form);
        form.append(input1);
        form.submit();
        form.remove();
    });
    //添加默认加载信息

    $.getJSON(
            "busEmotion.do",
            {
                busName: name,
                mType: "情绪正常"
            },
            //        {busReqType: $("#busReqType").val()},
            function (data1) {
                data = data1;
                content = "";
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
                        {name: 'emotion', type: 'string'}
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
                                {text: '情绪状态', datafield: 'emotion', width: 200},
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
                                    var OCXPath = Prefix + dataRecord.path + Suffix;
                                    var wavPath = dataRecord.path;
//                                            alert(wavPath);
                                    // show the popup window.
                                    $("#popupWindow").jqxWindow('open');
                                    //设置wavpath的路径
//                                    loadWav("D:\\beijing_mobile\\0906596.wav");
                                    var AudioOCX = document.getElementById("AudioOCX");
                                    if (null === AudioOCX) {

                                    } else {  //如果路径存在的话显示
                                        AudioOCX.SetFile(OCXPath, "", 0);
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


    //添加查询按钮信息框
    $("#search").click(function () {
        //显示过去查询条件的值
//                alert($("#wavPath").val());    //这个是 用与接收ajax请求的时候用到的
        var name = $("#wavPath").val() ? $("#wavPath").val() : "";
        $.getJSON(
                "busEmotion.do",
                {
                    busName: name,
                    //情绪类型
                    mType: $("#mType").val()
                },
                //        {busReqType: $("#busReqType").val()},
                function (data1) {
                    data = data1;
                    content = "";
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
                            {name: 'emotion', type: 'string'}
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
                                selectionmode: 'checkbox',
                                pageable: true,
                                columns: [
                                    {text: '编号', datafield: 'id', width: 100},
                                    {text: '名称', datafield: 'path', width: 500},
                                    {text: '情绪状态', datafield: 'emotion', width: 200},
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
                                        var OCXPath = Prefix + dataRecord.path + Suffix;
                                        var wavPath = dataRecord.path;
//                                            alert(wavPath);
                                        // show the popup window.
                                        $("#popupWindow").jqxWindow('open');
                                        //设置wavpath的路径
//                                    loadWav("D:\\beijing_mobile\\0906596.wav");
                                        var AudioOCX = document.getElementById("AudioOCX");
                                        if (null === AudioOCX) {

                                        } else {  //如果路径存在的话显示
                                            AudioOCX.SetFile(OCXPath, "", 0);
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
            {name: 'emotion', type: 'string'}
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
                    {text: '情绪状态', datafield: 'emotion', width: 200},
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
                                    {name: 'content', type: 'string'},
                                    {name: 'speed', type: 'string'}
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
                                            {text: '段号', datafield: 'segmentNo', width: 50},
                                            {text: '开始时间点', datafield: 'timeStart', width: 100, cellsalign: 'right'},
                                            {text: '结束时间点', datafield: 'timeEnd', width: 100, cellsalign: 'right', cellsformat: 'c2'},
                                            {text: '内容', datafield: 'content', cellsalign: 'right', cellsformat: 'c2'},
                                            {text: '语速', datafield: 'speed', width: 100, columntype: 'button'}
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
                            <legend>情绪检测查询</legend>
                            <div class="control-group">
                                <div class="row-fluid">
                                    <div class="span4"><label class=" control-label">录音名称：</label>
                                        <input type="text" id="wavPath" name="wavPath" class="input-medium"
                                               placeholder="录音名称">
                                    </div>
                                    <div class="span4">
                                        <label class="text">情绪类型：</label>
                                        <select class="input-medium" id="mType">
                                            <option selected>情绪正常</option>
                                            <option>情绪异常</option>
                                            <option>所有情绪</option>
                                        </select>
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
                                        codebase="AudioEditorOCX.ocx" name="AudioOCX" width="100%" height="90%"
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
                                        </td>
                                    </tr>
                                </table>

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
