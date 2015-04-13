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

    <script>
        $(document).ready(function () {

            $("#add").click(function () {

                location.href = "role.jsp"//location.href实现客户端页面的跳转
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
            <h1 class="page-title">角色管理</h1>

            <div class="btn-toolbar">
                <button id="add" class="btn btn-primary"><i class="icon-plus"></i>添加角色</button>
                <div class="btn-group">
                </div>
            </div>
            <div class="well">
                <table class="table">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>名称</th>
                        <th>类别</th>
                        <th>时间</th>
                        <th style="width: 26px;"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>主管</td>
                        <td>admin</td>
                        <td>2013年12月27日</td>
                        <td>
                            <a href="#"><i class="icon-pencil"></i></a>
                            <a href="#myModal" role="button" data-toggle="modal"><i class="icon-remove"></i></a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div class="modal small hide fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                 aria-hidden="true">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h3 id="myModalLabel">Delete Confirmation</h3>
                </div>
                <div class="modal-body">
                    <p class="error-text"><i class="icon-warning-sign modal-icon"></i>Are you sure you want to delete
                        the user?</p>
                </div>
                <div class="modal-footer">
                    <button class="btn" data-dismiss="modal" aria-hidden="true">Cancel</button>
                    <button class="btn btn-danger" data-dismiss="modal">Delete</button>
                </div>
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
