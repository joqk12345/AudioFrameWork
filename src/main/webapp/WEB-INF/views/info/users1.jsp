<%-- 
    Document   : a
    Created on : 2013-12-17, 11:35:23
    Author     : qiaokai
    RUNRUNRUN
--%>


<%@page import="java.util.Collections" %>
<%@page import="java.util.List" %>
<%@page contentType="text/html" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/common/header.jsp" %>
<%@ include file="/common/jqwidgets.jsp" %>
<!--   ${users}-->
<script>
$(document).ready(function () {

    $("#search").click(function () {
//          alert("ip");    这个是 用与接收ajax请求的时候用到的
        $.getJSON(
                "searchUsers.do",
                //    { busReqType:$("#busReqType").val()},
                function (data1) {
                    data = data1;

                    var source =
                    {
                        localdata: data,
                        datatype: "json",
                        datafields: [
                            {name: 'userid', type: 'string'},
                            {name: 'username', type: 'string'},
                            {name: 'email', type: 'string'},
                            {name: 'realname', type: 'string'},
                            {name: 'createtime', type: 'string'}
                        ],
                        updaterow: function (rowid, rowdata, commit) {
                            // synchronize with the server - send update command
                            // call commit with parameter true if the synchronization with the server is successful
                            // and with parameter false if the synchronization failder.
                            commit(true);
                        }
                    };

                    // initialize the input fields.
                    $("#userid").jqxInput({theme: theme});
                    $("#username").jqxInput({theme: theme});
                    $("#email").jqxInput({theme: theme});
                    $("#realname").jqxInput({theme: theme});
                    $("#createtime").jqxInput({theme: theme});

                    $("#userid").width(150);
                    $("#userid").height(23);
                    $("#username").width(150);
                    $("#username").height(23);
                    $("#email").width(150);
                    $("#email").height(23);

                    // $("#quantity").jqxNumberInput({width: 150, height: 23, decimalDigits: 0, spinButtons: true});
                    //   $("#price").jqxNumberInput({symbol: '$', width: 150, height: 23, spinButtons: true});
                    $("#realname").width(150);
                    $("#realname").height(23);
                    $("#createtime").width(150);
                    $("#createtime").height(23);

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
                                    {text: '编号', datafield: 'userid', width: 100},
                                    {text: '用户名', datafield: 'username', width: 100},
                                    {text: '邮件', datafield: 'email', width: 190},
                                    {text: '真实姓名', datafield: 'realname', width: 90, cellsalign: 'right'},
                                    {text: '注册日期', datafield: 'createtime', cellsalign: 'right', cellsformat: 'c2'},
                                    {text: 'Edit', datafield: 'Edit', columntype: 'button', cellsrenderer: function () {
                                        return "Edit";
                                    }, buttonclick: function (row) {
                                        // open the popup window when the user clicks a button.
                                        editrow = row;
                                        var offset = $("#jqxgrid").offset();
                                        $("#popupWindow").jqxWindow({position: {x: parseInt(offset.left) + 60, y: parseInt(offset.top) + 60}});

                                        // get the clicked row's data and initialize the input fields.
                                        var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', editrow);
                                        $("#userid").val(dataRecord.userid);
                                        $("#username").val(dataRecord.username);
                                        $("#email").val(dataRecord.email);
                                        $("#realname").val(dataRecord.realname);
                                        $("#createtime").val(dataRecord.createtime);
                                        //$("#reanlname").jqxNumberInput({decimal: dataRecord.quantity});
                                        //$("#createtime").jqxNumberInput({decimal: dataRecord.price});

                                        // show the popup window.
                                        $("#popupWindow").jqxWindow('open');
                                    }
                                    }
                                ]
                            });


                });
    });


    var data = [
        {"userid": "40", "username": "admin1", "email": "qianyanqk@163.com", "realname": "qiaokai", "createtime": "2014年1月17日15:29:14"},
        {"userid": "5", "username": "admin1", "email": "192173@163.com", "realname": "乔凯", "createtime": "登陆系统"}
    ];

    //var data = [];
    var source =
    {
        localdata: data,
        datatype: "json",
        datafields: [
            {name: 'userid', type: 'string'},
            {name: 'username', type: 'string'},
            {name: 'email', type: 'string'},
            {name: 'realname', type: 'string'},
            {name: 'createtime', type: 'string'}
        ],
        updaterow: function (rowid, rowdata, commit) {
            // synchronize with the server - send update command
            // call commit with parameter true if the synchronization with the server is successful
            // and with parameter false if the synchronization failder.
            commit(true);
        }
    };

    // initialize the input fields.
    $("#userid").jqxInput({theme: theme});
    $("#username").jqxInput({theme: theme});
    $("#email").jqxInput({theme: theme});
    $("#realname").jqxInput({theme: theme});
    $("#createtime").jqxInput({theme: theme});

    $("#userid").width(150);
    $("#userid").height(23);
    $("#username").width(150);
    $("#username").height(23);
    $("#email").width(150);
    $("#email").height(23);

    // $("#quantity").jqxNumberInput({width: 150, height: 23, decimalDigits: 0, spinButtons: true});
    //   $("#price").jqxNumberInput({symbol: '$', width: 150, height: 23, spinButtons: true});
    $("#realname").width(150);
    $("#realname").height(23);
    $("#createtime").width(150);
    $("#createtime").height(23);

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
                    {text: '编号', datafield: 'userid', width: 100},
                    {text: '用户名', datafield: 'username', width: 100},
                    {text: '邮件', datafield: 'email', width: 190},
                    {text: '真实姓名', datafield: 'realname', width: 90, cellsalign: 'right'},
                    {text: '注册日期', datafield: 'createtime', cellsalign: 'right', cellsformat: 'c2'},
                    {text: 'Edit', datafield: 'Edit', columntype: 'button', cellsrenderer: function () {
                        return "Edit";
                    }, buttonclick: function (row) {
                        // open the popup window when the user clicks a button.
                        editrow = row;
                        var offset = $("#jqxgrid").offset();
                        $("#popupWindow").jqxWindow({position: {x: parseInt(offset.left) + 60, y: parseInt(offset.top) + 60}});

                        // get the clicked row's data and initialize the input fields.
                        var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', editrow);
                        $("#userid").val(dataRecord.userid);
                        $("#username").val(dataRecord.username);
                        $("#email").val(dataRecord.email);
                        $("#realname").val(dataRecord.realname);
                        $("#createtime").val(dataRecord.createtime);
                        //$("#reanlname").jqxNumberInput({decimal: dataRecord.quantity});
                        //$("#createtime").jqxNumberInput({decimal: dataRecord.price});

                        // show the popup window.
                        $("#popupWindow").jqxWindow('open');
                    }
                    }
                ]
            });

    // initialize the popup window and buttons.
    $("#popupWindow").jqxWindow({
        width: 250, resizable: false, isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.01
    });

    $("#popupWindow").on('open', function () {
        $("#userid").jqxInput('selectAll');
    });

    $("#Cancel").jqxButton({theme: theme});
    $("#Save").jqxButton({theme: theme});

    // update the edited row when the user clicks the 'Save' button.
    $("#Save").click(function () {
        if (editrow >= 0) {
            var row = {userid: $("#userid").val(), username: $("#username").val(), email: $("#email").val(),
                realname: $("#realname").val(), createtime: $("#createtime").val()
            };
            var rowID = $('#jqxgrid').jqxGrid('getrowid', editrow);
            $('#jqxgrid').jqxGrid('updaterow', rowID, row);
            $("#popupWindow").jqxWindow('hide');
        }
    });
});

</script>


</head>
<body class='default'>
<%@ include file="/common/nav.jsp" %>
<div class="container-fluserid">

    <div class="row-fluserid">
        <!--sidebar -->
        <div class="span2">
            <%@ include file="/common/sidebar.jsp" %>
        </div>

        <div class="span10 well">

            <div class="container-fluserid">
                <div class="row-fluserid">
                    <form class="well form-inline" action="Test">
                        <fieldset>
                            <legend>用户管理界面</legend>
                            <div class="control-group">
                                <div class="row-fluserid">
                                    <div class="span4">
                                        <label class="text">服务器IP：</label>
                                        <select class="input-medium">
                                            <option>192.168.10.212</option>
                                            <option>192.168.10.213</option>
                                            <option>192.168.10.214</option>
                                            <option>192.168.10.215</option>
                                            <option>192.168.10.216</option>
                                        </select>
                                    </div>
                                    <div class="span4">
                                        <label class="text">数 据 库 ：</label>
                                        <select class="input-medium">
                                            <option>audioKeeper1</option>
                                            <option>audioKeeper2</option>
                                            <option>audioKeeper3</option>
                                            <option>audioKeeper4</option>
                                            <option>audioKeeper5</option>
                                        </select>
                                    </div>
                                    <div class="span4">
                                        <label class="">其他信息：</label>
                                        <input type="text" name="test" class="input-medium" placeholder="test">

                                        <input type="hidden" id="busReqType" class="input-medium" value="logInfo">
                                    </div>
                                    <!--                                        <div class="span3">
                                                                                <label class="text">other：</label>
                                                                                <input type="text" name="test" class="input-small" placeholder="test">
                                                                            </div>-->
                                </div>
                            </div>
                            <div class="control-group">
                                <div class="row-fluserid">
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
                                            <option selected>按天统计</option>
                                        </select>

                                    </div>
                                </div>
                            </div>
                            <div class="row-fluserid">
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
                </form>
            </div>
        </div>
        <!--                                <div class="row-fluserid">
                                                <input type="button"  value="Export to Excel" id='excelExport' />
                                                <input type="button" value="Export to XML" id='xmlExport' />
                                                <input type="button" value="Export to CSV" id='csvExport' />
                                                <input type="button" value="Export to TSV" id='tsvExport' />
                                                <input type="button" value="Export to HTML" id='htmlExport' />
                                                <input type="button" value="Export to JSON" id='jsonExport' />
                                        </div>-->

        <div class="row-fluserid">
            <!--用于jqgrid显示的-->
            <div id='jqxWidget'>
                <div id="jqxgrid"></div>
                <div style="margin-top: 30px;">
                    <div id="cellbegineditevent"></div>
                    <div style="margin-top: 10px;" id="cellendeditevent"></div>
                </div>
                <div id="popupWindow">
                    <div>Edit</div>
                    <div style="overflow: hidden;">
                        <table>
                            <tr>
                                <td align="right">编号:</td>
                                <td align="left"><input id="userid" readonly="true"/></td>
                            </tr>
                            <tr>
                                <td align="right">用户名:</td>
                                <td align="left"><input id="username"/></td>
                            </tr>
                            <tr>
                                <td align="right">邮件</td>
                                <td align="left"><input id="email"/></td>
                            </tr>
                            <tr>
                                <td align="right">真实姓名</td>
                                <td align="left"><input id="realname">
                    </div>
                    </td>
                    </tr>
                    <tr>
                        <td align="right">注册时间</td>
                        <td align="left"><input id="createtime">
                </div>
                </td>
                </tr>
                <tr>
                    <td align="right"></td>
                    <td style="padding-top: 10px;" align="right"><input style="margin-right: 5px;" type="button"
                                                                        id="Save" value="保存"/><input id="Cancel"
                                                                                                     type="button"
                                                                                                     value="取消"/></td>
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
