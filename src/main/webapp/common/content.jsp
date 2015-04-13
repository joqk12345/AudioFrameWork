<%-- 
    Document   : content
    Created on : 2013-12-17, 13:01:05
    Author     : qiaokai
    RUNRUNRUN
--%>

<%@page contentType="text/html" pageEncoding="UTF-8" %>

<!-- <div class="stats">
<p class="stat"><span class="number">53</span>报警</p>
<p class="stat"><span class="number">27</span>阀值</p>
<p class="stat"><span class="number">15</span>信息</p>
</div>
<h1 class="page-title">控制台</h1>-->

<div class="row-fluid">
    <div class="block">
        <p class="block-heading" data-toggle="collapse" data-target="#chart-container">性能统计图</p>

        <div id="chart-container" class="block-body collapse in">
            <!--
            <div id="line-chart"></div>
            -->
            <div id='jqxChart' style="width:900px; height:350px"></div>
            <script>
                //                                var lineChartData = {
                //                                    labels: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                //                                    datasets: [
                //                                        {
                //                                            fillColor: "rgba(151,187,205,0.5)",
                //                                            strokeColor: "rgba(151,187,205,1)",
                //                                            pointColor: "rgba(151,187,205,1)",
                //                                            pointStrokeColor: "#fff",
                //                                            data: [28, 48, 40, 19, 96, 27, 100, 15, 108, 84, 23, 185]
                //                                        }
                //                                    ]
                //                                };
                //                                var myLine = new Chart(document.getElementById("canvas").getContext("2d")).Line(lineChartData);
            </script>
        </div>
    </div>
</div>

<div class="row-fluid">
    <div class="block span6">
        <div class="block-heading" data-toggle="collapse" data-target="#tablewidget">用户信息</div>
        <div id="tablewidget" class="block-body collapse in">
            <table class="table">
                <thead>
                <tr>
                    <th>姓 名</th>
                    <th>用户名</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>淘宝</td>
                    <td>taobao_test</td>
                </tr>
                <tr>
                    <td>李亮</td>
                    <td>liliang</td>
                </tr>
                <tr>
                    <td>王岳阳</td>
                    <td>wangyueyang</td>
                </tr>
                <tr>
                    <td>石国辉</td>
                    <td>shiguohui</td>
                </tr>
                </tbody>
            </table>
            <p><a href="users.html">More...</a></p>
        </div>
    </div>
    <div class="block span6">
        <div class="block-heading" data-toggle="collapse" data-target="#widget2container">历史用户信息<span
                class="label label-warning">+10</span></div>
        <div id="widget2container" class="block-body collapse in">
            <table class="table">
                <tbody>
                <tr>
                    <td>
                        <p><i class="icon-user"></i> 王振涛</p>
                    </td>
                    <!--                                        <td>
                                                                <p>Amount: $1,247</p>
                                                            </td>-->
                    <td>
                        <p>Date: 7/19/2012</p>
                        <a href="#">查看详情</a>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p><i class="icon-user"></i> 胡幼佳</p>
                    </td>
                    <!--                                        <td>
                                                                <p>Amount: $2,793</p>
                                                            </td>-->
                    <td>
                        <p>Date: 7/12/2012</p>
                        <a href="#">查看详情</a>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p><i class="icon-user"></i> 张侃</p>
                    </td>
                    <!--                                        <td>
                                                                <p>Amount: $2,349</p>
                                                            </td>-->
                    <td>
                        <p>Date: 3/10/2012</p>
                        <a href="#">查看详情</a>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p><i class="icon-user"></i> 李天亮</p>
                    </td>
                    <!--                                        <td>
                                                                <p>Amount: $1,192</p>
                                                            </td>-->
                    <td>
                        <p>Date: 1/19/2012</p>
                        <a href="#">查看详情</a>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
