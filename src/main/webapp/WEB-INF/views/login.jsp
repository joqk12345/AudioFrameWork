<%-- 
    Document   : a
    Created on : 2013-12-17, 11:35:23
    Author     : qiaokai
    RUNRUNRUN
--%>

<%@page contentType="text/html" pageEncoding="GB2312" %>

<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=GB2312">
    <title>�����ƶ�10086������������ϵͳ������Ŀ����ϵͳ</title>
    <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <link rel="stylesheet" type="text/css"
          href="${pageContext.request.contextPath}/resources/lib/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" type="text/css"
          href="${pageContext.request.contextPath}/resources/lib/bootstrap/css/bootstrap-responsive.css">
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/stylesheets/theme.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/lib/font-awesome/css/font-awesome.css">

    <script src="${pageContext.request.contextPath}/resources/lib/jquery-1.8.1.min.js" type="text/javascript"></script>
    <link rel="shortcut icon" href="../assets/ico/favicon.ico">
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="../assets/ico/apple-touch-icon-144-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="../assets/ico/apple-touch-icon-114-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="../assets/ico/apple-touch-icon-72-precomposed.png">
    <link rel="apple-touch-icon-precomposed" href="../assets/ico/apple-touch-icon-57-precomposed.png">
    <script>
        //            $(document).ready(function() {
        //                //�����û�����
        //                $("#login").click(function() {
        ////                    alert("���");
        //                    $.post(
        //                            "LoginServlet",
        //                            {
        //                                uname: $("#uname").val(),
        //                                passwd: $("#passwd").val()
        //                            },
        //                    function(data) {
        ////                        alert("Data Loaded: " + data);
        //                    });
        //
        //                });
        //
        //            });
    </script>


</head>
<body>
<div class="navbar">
    <div class="navbar-inner">
        <div class="container-fluid">
            <ul class="nav pull-right">

            </ul>
            <a class="brand" href="index.html"><span
                    class="first text-warning"><em>�����ƶ�10086������������ϵͳ������Ŀ����ϵͳ</em></span> <span
                    class="second text-warning"></span></a>
        </div>
    </div>
</div>
<div class="container-fluid">
    <div class="row-fluid">
        <div class="dialog span4">
            <div class="block">
                <div class="block-heading">��½</div>
                <div class="block-body">
                    <form action="login" method="post">
                        <label>�û�����</label>
                        <input type="text" id="uname" name="uname" class="span12">
                        <label>���룺</label>
                        <input type="password" id="passwd" name="passwd" class="span12">
                        <button type="submit" id="login" class="btn btn-primary pull-right">��½</button>
                        <label class="remember-me"><input type="checkbox"> ��ס����</label>

                        <div class="clearfix"></div>
                    </form>
                </div>
            </div>
            <!--                    <p class="pull-right" style=""><a href="http://www.thinkit.com" target="blank">Theme by �п�����</a></p>-->
            <p><a href="reset-password.html">��������</a></p>
        </div>

    </div>
</div>
<footer>
    <hr>
    <!-- Purchase a site license to remove this link from the footer: http://www.portnine.com/bootstrap-themes -->
    <!--            <p class="pull-right">A <a href="http://www.thinkit.com/" target="_blank">���ϵͳ</a> by <a href="http://www.thinkit.com" target="_blank">
                        �п�����</a></p>-->
    <p>&copy; 2014
        <!--                <a href="http://www.thinkit.com">thinkit</a>-->
    </p>
</footer>
<!-- Le javascript
================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
<script src="${pageContext.request.contextPath}/resources/lib/bootstrap/js/bootstrap.js"></script>

</body>
</html>
