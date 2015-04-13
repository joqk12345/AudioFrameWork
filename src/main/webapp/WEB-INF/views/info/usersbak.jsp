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
    ${users}
    <script>
        $(document).ready(function () {
            //    alert("hello");
            //开始加载页面的时候 访问查询接口

            $.get(
                    "InfoDispatcher",
                    {
                        method: "listUser"
                    },
                    function (data) {
                        //                                alert("Data Loaded: " + data);
                    }
            );
            //添加用户的动作
            $("#add").click(function () {
                location.href = "user.jsp"//location.href实现客户端页面的跳转
            });


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
        <div class="span10">
            <h1 class="page-title">用户管理</h1>

            <div class="btn-toolbar">
                <button id="add" class="btn btn-primary"><i class="icon-plus"></i>添加用户</button>
                <button id="import" class="btn">导入用户</button>
                <button id="export" class="btn">导出用户</button>
                <div class="btn-group">
                </div>
            </div>
            <div class="well">
                <table class="table">
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>用户名</th>
                        <th>真实姓名</th>
                        <th>注册时间</th>
                        <th style="width: 26px;"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>2</td>
                        <td>陈浩</td>
                        <td>chen</td>
                        <td>chenghao</td>
                        <td>
                            <a href="user"><i class="icon-pencil"></i></a>
                            <a href="#myModal" role="button" data-toggle="modal"><i class="icon-remove"></i></a>
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>李学林</td>
                        <td>lee</td>
                        <td>xulinli</td>
                        <td>
                            <a href="user"><i class="icon-pencil"></i></a>
                            <a href="#myModal" role="button" data-toggle="modal"><i class="icon-remove"></i></a>
                        </td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>张楠</td>
                        <td>nannan</td>
                        <td>zhangnan</td>
                        <td>
                            <a href="user"><i class="icon-pencil"></i></a>
                            <a href="#myModal" role="button" data-toggle="modal"><i class="icon-remove"></i></a>
                        </td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>贺天举</td>
                        <td>ju</td>
                        <td>tianjuhe</td>
                        <td>
                            <a href="user"><i class="icon-pencil"></i></a>
                            <a href="#myModal" role="button" data-toggle="modal"><i class="icon-remove"></i></a>
                        </td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>李德森</td>
                        <td>sen</td>
                        <td>desen</td>
                        <td>
                            <a href="user"><i class="icon-pencil"></i></a>
                            <a href="#myModal" role="button" data-toggle="modal"><i class="icon-remove"></i></a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="pagination">
                <ul>
                    <li><a href="#">Prev</a></li>
                    <li><a href="#">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#">4</a></li>
                    <li><a href="#">Next</a></li>
                </ul>
            </div>

            <div class="modal small hide fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                 aria-hidden="true">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h3 id="myModalLabel">确认删除</h3>
                </div>
                <div class="modal-body">
                    <p class="error-text"><i class="icon-warning-sign modal-icon"></i>确认删除该用户?</p>
                </div>
                <div class="modal-footer">
                    <button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>
                    <button class="btn btn-danger" data-dismiss="modal">删除</button>
                </div>
            </div>


            <div class="alert alert-block hide" id="warning-block">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                <h4>Warning!</h4>Best check yo self, you're not...
            </div>


        </div>
    </div>
    <%@ include file="/common/footer.jsp" %>
    <!-- Le javascript
================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="${pageContext.request.contextPath}/resources/lib/bootstrap/js/bootstrap.js"></script>

</body>
</html>
