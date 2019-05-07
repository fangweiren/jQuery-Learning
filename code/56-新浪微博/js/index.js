$(function () {
    // 0.监听内容的实时输入
    $("body").delegate(".comment", "propertychange input", function () {
        // 判断是否输入了内容
        if ($(this).val().length > 0) {
            // 让按钮可用
            $(".send").prop("disabled", false);
        } else {
            // 让按钮不可用
            $(".send").prop("disabled", true);
        }
    });

    // 1.监听发布按钮的点击
    $(".send").click(function () {
        // 拿到用户输入的内容
        var $text = $(".comment").val();
        // 根据内容创建节点
        var $weibo = creatEle($text);
        // 插入微博
        $(".messageList").prepend($weibo);
        // 清空输入框内容
        $(".comment").val("");
    });

    // 2.监听顶点击
    $("body").delegate(".infoTop", "click", function () {
        $(this).text(parseInt($(this).text()) + 1);
    });

    // 3.监听踩点击
    $("body").delegate(".infoDown", "click", function () {
        $(this).text(parseInt($(this).text()) + 1);
    });

    // 4.监听删除点击
    $("body").delegate(".infoDel", "click", function () {
        $(this).parents(".info").remove();
    });

    // 创建节点函数
    function creatEle(text) {
        var $weibo = $("<div class='info'>\n" +
            "            <p class='infoText'>" + text + "</p>\n" +
            "            <p class='infoOperation'>\n" +
            "                <span class='infoTime'>" + getDate() + "</span>\n" +
            "                <span class='infoHandle'>\n" +
            "                    <a class='infoTop' href='javascript:;'>0</a>\n" +
            "                    <a class='infoDown' href='javascript:;'>0</a>\n" +
            "                    <a class='infoDel' href='javascript:;'>删除</a>\n" +
            "                </span>\n" +
            "            </p>\n" +
            "        </div>");

        return $weibo
    }
    
    // 生成时间的函数
    function getDate() {
        // 2018-11-20 10:07:23
        var date = new Date();
        var arr = [date.getFullYear() + "-",
                   date.getMonth() + 1 + "-",
                   date.getDate() + " ",
                   date.getHours() + ":",
                   date.getMinutes() + ":",
                   date.getSeconds()
        ];

        return arr.join("");
    }
});