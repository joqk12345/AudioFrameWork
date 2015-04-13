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
            <h1 class="page-title">服务器管理</h1>
            <!--                    <div class="btn-toolbar">
                                    <button class="btn btn-primary"><i class="icon-plus"></i>添加新操作菜单</button>
                                    <div class="btn-group">
                                    </div>
                                </div>-->
            <div class="well">
                <table class="table">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>服务器类型</th>
                        <th>IP地址</th>
                        <th>端口</th>
                        <th>CPU占有率</th>
                        <th>内存</th>
                        <th>内存占有率</th>
                        <th>虚拟内存</th>
                        <th>虚拟内存占有率</th>
                        <th>记录时间</th>
                        <th style="width: 26px;"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th>#</th>
                        <td>ADP_CLIENT</td>
                        <td>172.16.0.213</td>
                        <td>80</td>
                        <td>0.00%</td>
                        <td>51343360.00</td>
                        <td>56.65%</td>
                        <td>202125312.00</td>
                        <td>0.00%</td>
                        <td>2013年11月17日19:09</td>
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
