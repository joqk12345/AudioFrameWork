<%-- 
    Document   : a
    Created on : 2013-12-17, 11:35:23
    Author     : qiaokai
    RUNRUNRUN
--%>

<%@page contentType="text/html" pageEncoding="GB2312" %>

<!DOCTYPE html>
<html>
<head>
    <%@ include file="/common/header.jsp" %>
    <%@ include file="/common/jqwidgets.jsp" %>

    <script type="text/javascript">
        $(document).ready(function () {
            // prepare the data

            var data = [
                {"month": "一月", "max": 60},
                {"month": "二月", "max": 5.9},
                {"month": "三月", "max": 9.8},
                {"month": "四月", "max": 13.9},
                {"month": "五月", "max": 18},
                {"month": "六月", "max": 22.2},
                {"month": "七月", "max": 25.3},
                {"month": "八月", "max": 24.4},
                {"month": "九月", "max": 20.8},
                {"month": "十月", "max": 14.9},
                {"month": "十一月", "max": 8.4},
                {"month": "十二月", "max": 4.5}
            ];

            //            var toolTipCustomFormatFn = function (value, itemIndex, serie, group, categoryValue, categoryAxis) {
            //                var dataItem = data[itemIndex];
            //                return '<DIV style="text-align:left"><b>Month: ' +
            //                        categoryValue + '</b><br />Min: ' +
            //                        dataItem.min + '°<br />Max: ' +
            //                        dataItem.max + '°<br />Average: ' +
            //                        dataItem.avg + '°</DIV>';
            //            };

            // prepare jqxChart settings
            var settings = {
                title: "访问次数",
                description: "按月统计访问量",
                enableAnimations: true,
                showLegend: true,
                padding: {left: 5, top: 5, right: 5, bottom: 5},
                titlePadding: {left: 90, top: 0, right: 0, bottom: 10},
                enableCrosshairs: true,
                source: data,
                categoryAxis: {
                    text: 'Category Axis',
                    textRotationAngle: 0,
                    dataField: 'month',
                    showTickMarks: true,
                    tickMarksInterval: 1,
                    tickMarksColor: '#2190c4',
                    unitInterval: 1,
                    showGridLines: true,
                    gridLinesInterval: 3,
                    gridLinesColor: '#888888'
                },
                colorScheme: 'scheme05',
                seriesGroups: [
                    {
                        type: 'rangecolumn',
                        columnsGapPercent: 100,
                        //                            toolTipFormatFunction: toolTipCustomFormatFn,
                        valueAxis: {
                            unitInterval: 5,
                            displayValueAxis: true,
                            description: '访问次数',
                            axisSize: 'auto',
                            tickMarksColor: '#888888',
                            minValue: 0,
                            maxValue: 80
                        },
                        series: [
                            {dataFieldTo: 'max', displayText: '访问量'}
                        ]
                    }

                ]
            };
            // setup the chart
            $('#jqxChart').jqxChart(settings);
        });
    </script>


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
            <%@ include file="/common/content.jsp" %>

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
