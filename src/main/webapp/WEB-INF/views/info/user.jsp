<%-- 
    Document   : a
    Created on : 2013-12-17, 11:35:23
    Author     : qiaokai
    RUNRUNRUN
--%>

<%@page contentType="text/html" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <%@ include file="/common/header.jsp" %>
    ${users}
    <script>
        $(document).ready(function () {
            $("#save").click(function () {
                $.get(
                        "InfoDispatcher",
                        {
                            method: "savaUser",
                            username: encodeURI($("#username").val()),
                            realname: encodeURI($("#realname").val()),
                            password: encodeURI($("#password").val()),
                            email: encodeURI($("#email").val())
                        },
                        function (data) {
                            //                                alert("Data Loaded: " + data);
                            $('#alertTest').modal({
                                backdrop: true,
                                keyboard: true,
                                show: true
                                //                            backdrop:'static'
                            });
                        }
                );
                $('#close').click(function () {
                    location.href = "users.jsp"//location.href实现客户端页面的跳转
                });

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
            <h1 class="page-title">编辑用户</h1>

            <div class="btn-toolbar">
                <button id="save" class="btn btn-primary"><i class="icon-save"></i> 保存</button>
                <a href="#myModal" data-toggle="modal" class="btn">删除</a>

                <div class="btn-group">
                </div>
            </div>
            <div class="well">
                <ul class="nav nav-tabs">
                    <li class="active"><a href="#home" data-toggle="tab">信息</a></li>
                    <li><a href="#profile" data-toggle="tab">密码</a></li>
                </ul>
                <div id="myTabContent" class="tab-content">
                    <div class="tab-pane active in" id="home">
                        <form id="tab" method="get">
                            <label>用户名</label>
                            <input type="text" value="" id="username" class="input-xlarge">
                            <label>真实姓名</label>
                            <input type="text" value="" id="realname" class="input-xlarge">
                            <label>邮箱</label>
                            <input type="text" value="" id="email" class="input-xlarge">
                            <label>密码</label>
                            <input type="password" value="" id="password" class="input-xlarge">
                        </form>
                    </div>
                    <div class="tab-pane fade" id="profile">
                        <form id="tab2">
                            <label>老密码</label>
                            <input type="password" class="input-xlarge">
                            <label>新密码</label>
                            <input type="password" class="input-xlarge">
                            <label>新密码确认</label>
                            <input type="password" class="input-xlarge">

                            <div>
                                <button class="btn btn-primary">更新</button>
                            </div>
                        </form>
                    </div>
                </div>

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

            <!--添加成功-->
            <div id="alertTest" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                 aria-hidden="true">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h3 id="myModalLabel">保存</h3>
                </div>
                <div class="modal-body">
                    <p>保存成功！</p>
                </div>
                <div class="modal-footer">
                    <button id="close" class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
                </div>
            </div>


        </div>
    </div>

</div>
<%@ include file="/common/footer.jsp" %>
<!-- Le javascript
================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
<script src="lib/bootstrap/js/bootstrap.js"></script>

</body>
</html>
