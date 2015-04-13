<%-- 
    Document   : dataexport
    Created on : 2013-12-26, 20:08:55
    Author     : qiaokai
    RUNRUNRUN
--%>

<%@page contentType="text/html" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<head>

    <%@ include file="/common/header.jsp" %>
    <%@ include file="/common/jqwidgets.jsp" %>
    <script>
        $(document).ready(function () {



            //检索关键词功能
            $("#search").click(function () {
                alert(" 开始检索关键词");
                var content = $("#keywordList").val();
                var form = $("<form>");
                form.attr('style', 'display:none');
                form.attr('target', '');
                form.attr('method', 'post');
                form.attr('action', 'keywordRetrieve.do');
                var input1 = $('<input>');
                input1.attr('type', 'hidden');
                input1.attr('name', 'json');
                input1.attr('value', content);
                $('body').append(form);
                form.append(input1);
                form.submit();
                form.remove();

            });
        });
    </script>
</head>
<body class='default'>
<%@ include file="/common/nav.jsp" %>
<div class="container-fluid">

    <div class="row-fluid">
        <!--sidebar -->
        <div class="span2">
            <%@ include file="/common/sidebar.jsp" %>
        </div>

        <div class="span10 well">

            <div class="container-fluid">
                <div class="row-fluid">
                    <form class="well form-inline" action="#">
                        <fieldset>
                            <legend>关键词结果导出查询</legend>
                            <div class="control-group">
                                <div class="row-fluid">
                                    <!--                                        <div class="span3">
                                                                                <label class=" control-label">话单名称：</label>
                                                                                <input type="text" id="wavPath" name="wavPath" class="input-medium" placeholder="test">
                                                                            </div>-->
                                    <div class="span8">
                                        <label class=" control-label">关键词列表：</label>
                                        <!--<input type="text" id="keyword" name="keyword" class="input-medium" placeholder="关键词列表">-->
                                        <textarea rows="7" name="keywordList" id="keywordList"></textarea>
                                        <em><span>若多个关键词以逗号<span class="text-error">","</span>分隔</span></em>
                                    </div>
                                    <!--                                        <div class="span3">
                                                                                <label class=" control-label">出现次数：</label>
                                                                                <input type="text" id="kNum" name="kNum" class="input-medium" placeholder="test">
                                                                            </div>-->
                                    <div class="span4">
                                        <button type="button" id="search" class="btn btn-info right">检出关键词</button>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
            <!--                <div class="container-fluid">
                                <div class="row-fluid">
                                    用于jqgrid显示的
                                    <div id='jqxWidget'>
                                        <div id="jqxgrid"></div>
                                        <div style="margin-top: 30px;">
                                            <div id="cellbegineditevent"></div>
                                            <div style="margin-top: 10px;" id="cellendeditevent"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>-->
        </div>
    </div>


</div>


<%@ include file="/common/footer.jsp" %>

<script src="${pageContext.request.contextPath}/resources/lib/bootstrap/js/bootstrap.js"></script>
<!--添加日期组件 -->
<script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/lib/datetimepicker/js/bootstrap-datetimepicker.min.js"
        charset="UTF-8"></script>
<script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/lib/datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js"
        charset="UTF-8"></script>
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
