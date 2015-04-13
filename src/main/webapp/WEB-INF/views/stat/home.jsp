<%-- 
    Document   : home
    Created on : 2014-1-14, 15:08:40
    Author     : lenovo
--%>

<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%-- 
    Document   : audikeeper
    Created on : 2013-12-17, 10:35:48
    Author     : qiaokai
    RUNRUNRUN
--%>

<!DOCTYPE html>
<html>
<head>
    <%@ include file="/common/header.jsp" %>
    <%@ include file="/common/jqwidgets.jsp" %>
    <script>
        $(document).ready(function () {
            //使用ajax方式处理用户的查询信息

            var data = [
                {"date": "2013-12-20", "callnum": "700", "peoplenum": "211", "peopleffective": "50%", "available": "42%", "quantity": "50", "price": "25s"},
                {"date": "2013-12-21", "callnum": "700", "peoplenum": "211", "peopleffective": "50%", "available": "42%", "quantity": "50", "price": "25s"},
                {"date": "2013-12-22", "callnum": "329", "peoplenum": "75", "peopleffective": "47", "available": "26%", "quantity": "51", "price": "22s"},
                {"date": "2013-12-23", "callnum": "392", "peoplenum": "75", "peopleffective": "47", "available": "26%", "quantity": "51", "price": "22s"},
                {"date": "2013-12-24", "callnum": "377", "peoplenum": "75", "peopleffective": "47", "available": "26%", "quantity": "51", "price": "22s"},
                {"date": "2013-12-25", "callnum": "392", "peoplenum": "75", "peopleffective": "47", "available": "7%", "quantity": "51", "price": "22s"},
                {"date": "2013-12-26", "callnum": "399", "peoplenum": "75", "peopleffective": "47", "available": "26%", "quantity": "51", "price": "22s"},
                {"date": "2013-12-27", "callnum": "392", "peoplenum": "75", "peopleffective": "47", "available": "26%", "quantity": "51", "price": "22s"},
                {"date": "2013-12-28", "callnum": "392", "peoplenum": "75", "peopleffective": "47", "available": "26%", "quantity": "51", "price": "22s"},
                {"date": "2013-12-29", "callnum": "392", "peoplenum": "75", "peopleffective": "47", "available": "26%", "quantity": "51", "price": "22s"},
                {"date": "2013-12-30", "callnum": "392", "peoplenum": "75", "peopleffective": "47", "available": "26%", "quantity": "51", "price": "22s"}
            ];

            var source =
            {
                localdata: data,
                datatype: "json",
                datafields: [
                    {name: 'date', type: 'string'},
                    {name: 'callnum', type: 'string'},
                    {name: 'peoplenum', type: 'string'},
                    {name: 'peopleffective', type: 'string'},
                    {name: 'available', type: 'string'},
                    {name: 'quantity', type: 'number'},
                    {name: 'price', type: 'number'}
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
                            {text: '时间', width: 180, datafield: 'date', cellsalign: 'left', align: 'right'},
                            {text: '呼叫量', datafield: 'callnum'},
                            {text: '转人工量', datafield: 'peoplenum'},
                            {text: '转人工率', datafield: 'peopleffective'},
                            {text: '无声通话率', datafield: 'available'},
                            {text: '平均交互次数', datafield: 'quantity', cellsalign: 'right', align: 'right'},
                            {text: '平均交互时长', datafield: 'price', cellsalign: 'right', align: 'right'}
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


//                $("#search").click(function() {
//                    $.getJSON(
//                            "Test",
//                            {
//                                serverIp: $("#serverIp").val()
//                            },
//                    function(data, status) {
//                        var html = "";
////                        alert("Data: " + data + "\nStatus: " + status);
//                        $.each(data, function(index) {
//                            html += "<tr>";
////                           $.each(data[index],function(key,value){
////                              alert(key+"----"+value); 
////                                var result  = "<span>serverIp:" + key + "</span></br><span>size:" + value+ "</span>";
////                                $("#result_search").append("<div>"+key+"---"+value+"</div>");  
//                            html += "<td>#</td><td>" + data[index].name + "</td><td>" + data[index].serverIp + "</td><td>" + data[index].location + "</td>";
////                           });
//                            html += "</tr>";
//                        });
//                        $("#table tbody").html(html);
////                    var result = "<span>serverIp:" + data.serverIp + "</span></br><span>size:" + data.name+ "</span></br><span>createTime:" + data.location + "</span>";
////                    $("#result_search").replaceWith("<div id='result_search'>" + result + "</div>");
//                    });
//                });
        });
    </script>
</head>
<body>
<%@ include file="/common/nav.jsp" %>
<div class="container-fluid">
    <div class="row-fluid">
        <!--sidebar -->
        <div class="span2">
            <%@ include file="/common/sidebar.jsp" %>
        </div>
        <div class="span10 well">

            <form class="well form-inline" action="Test">
                <fieldset>
                    <legend>识别结果展示</legend>
                    <div class="control-group">
                        <div class="row-fluid">
                            <div class="span4">
                                <label class="text">服务器IP：</label>
                                <select class="input-medium" id="serverIp">
                                    <option>192.168.10.212</option>
                                    <option>192.168.10.213</option>
                                    <option>192.168.10.214</option>
                                    <option>192.168.10.215</option>
                                    <option>192.168.10.216</option>
                                </select>
                            </div>
                            <div class="span4">
                                <label class="text">服务器编号：</label>
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
                            </div>
                            <!--                                    <div class="span3">
                                                                    <label class="text">other：</label>
                                                                    <input type="text" name="test" class="input-small" placeholder="test">
                                                                </div>-->
                        </div>
                    </div>
                    <div class="control-group">
                        <div class="row-fluid">
                            <div class="span4">
                                <label class=" control-label">开始日期：</label>
                                <input type="text" class="input-medium form_date" size="16" data-date=""
                                       data-date-format="yyyy-mm-dd" placeholder="开始日期" readonly></div>
                            <div class="span4">
                                <label class="text">开始时间：</label>
                                <input type="text" class="input-medium form_time" size="16" data-date=""
                                       data-date-format="hh:ii" placeholder="开始时间" readonly></div>
                            <div class="span4">
                                <label class="text">结束日期：</label>
                                <input type="text" class="input-medium form_date" size="16" data-date=""
                                       data-date-format="yyyy-mm-dd" placeholder="结束日期" readonly></div>
                        </div>
                    </div>
                    <div class="row-fluid">
                        <div class="span4">
                            <label class="text">结束时间：</label>
                            <input type="text" class="input-medium form_time" size="16" data-date=""
                                   data-date-format="hh:ii" placeholder="结束时间" readonly></div>
                        <div class="span4">
                            <label class="text">统计类型：</label>
                            <select class="input-medium">
                                <option>按天统计</option>
                                <option>按月统计</option>
                            </select>

                        </div>
                        <div class="span4">
                            <button type="button" id="search" class="btn btn-info right">查询</button>
                        </div>
                    </div>
                </fieldset>
            </form>

            <!--                    <！-- 结果显示页面 -->
            <div id='jqxWidget' style="font-size: 13px; font-family: Verdana; float: left;" class="span10">
                <div id="jqxgrid" style="margin-left: 30px"></div>
            </div>
        </div>
    </div>

</div>
<%@ include file="/common/footer.jsp" %>
<!-- Le javascript
================================================== -->
<script src=""
${pageContext.request.contextPath}/resources/lib/jquery-1.8.1.min.js" type="text/javascript " charset="UTF-8"></script>
<!--
Placed
at
the
end
of
the
document
so
the
pages
load
faster -->
< script
src = ""${pageContext.request.contextPath} / resources / lib / bootstrap / js / bootstrap.js
"></script>
<!--添加日期组件 -->
<script type="text/javascript" src=""
${pageContext.request.contextPath}/resources/lib/datetimepicker/js/bootstrap-datetimepicker.min.js" charset="UTF-8"
></script>
<
script
type = "text/javascript"
src = ""${pageContext.request.contextPath} / resources / lib / datetimepicker / js / locales / bootstrap - datetimepicker.zh - CN.js
" charset="
UTF - 8
"></script>
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