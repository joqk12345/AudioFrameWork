<%-- 
    Document   : nav
    Created on : 2013-12-17, 12:49:55
    Author     : qiaokai
    RUNRUNRUN
--%>
<%@page contentType="text/html" pageEncoding="GB2312" %>

<div class="navbar">
    <div class="navbar-inner">
        <div class="container-fluid">
            <ul class="nav pull-right">

                <li id="fat-menu" class="dropdown">
                    <a href="#" id="drop3" role="button" class="dropdown-toggle" data-toggle="dropdown">
                        <i class="icon-user"></i> <span class="text-warning">thinkit</span>
                        <i class="icon-caret-down"></i>
                    </a>

                    <ul class="dropdown-menu">
                        <li><a tabindex="-1" href="#">����</a></li>
                        <li class="divider"></li>
                        <li><a tabindex="-1" href="${pageContext.request.contextPath}/quit.htm">�˳�</a></li>
                    </ul>
                </li>

            </ul>
            <a class="brand" href="${pageContext.request.contextPath}/index.htm"><span class="first text-warning"><em>�����ƶ�10086������������ϵͳ������Ŀ����ϵͳ</em></span>
                <!--                    <span class="second text-warning">Monitor</span>-->
            </a>
        </div>
    </div>
</div>