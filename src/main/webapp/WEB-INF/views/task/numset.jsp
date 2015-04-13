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

    <!--        <script>
                 $(document).ready(function(){

    //                 alert("hello");
                         $.getJSON(
                            "IndexDataServlet",
                            {
    //                            serverIp: $("#serverIp").val(),
    //                            reqChartType:encodeURI($("#reqChartType").val())
                            },
    //                        contentType: "application/x-www-form-urlencoded; charset=utf-8",
                            function(data1,status) {
                                $.each(data1,function(index){
                                        var lineChartData = {
    //                                         labels: ["0-2", "2-4","4-6", "6-8", "8-10", "10-12","12-14","14-16","16-18","18-20","20-22","22-24"],
                                                labels: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                                             datasets: [
                                                 {
    //                                                 fillColor: "rgba(220,220,220,0.5)",
    //                                                 strokeColor: "rgba(220,220,220,1)",
    //                                                 pointColor: "rgba(220,220,220,1)",
    //                                                 pointStrokeColor: "#fff",
                                                      fillColor: "rgba(151,187,205,0.5)",
                                                      strokeColor: "rgba(151,187,205,1)",
                                                      pointColor: "rgba(151,187,205,1)",
                                                      pointStrokeColor: "#fff",
                                                     data: [
                                                            parseInt(data1[index].one),parseInt(data1[index].two),parseInt(data1[index].three),parseInt(data1[index].four),parseInt(data1[index].five),parseInt(data1[index].six),parseInt(data1[index].seven),parseInt(data1[index].eight),parseInt(data1[index].nine),parseInt(data1[index].ten),parseInt(data1[index].eleven),parseInt(data1[index].twelve)
    //                                                        ,+data1[index].two+,+data1[index].three,data1[index].four,data1[index].five,data1[index].six,data1[index].seven+,data1[index].eight,data1[index].nine, data1[index].ten,data1[index].eleven, data1[index].twelve
                                                           ]
                                                 }
                                             ]
                                         };
                                     var c = jQuery( "#canvas" ) [0],
                                     cxt = c.getContext( "2d" );
                                    var myLine = new Chart (cxt).Line(lineChartData);
                               });
                           });
                 });
            </script>-->
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
            <%@ include file="/common/demo/num.jsp" %>

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
