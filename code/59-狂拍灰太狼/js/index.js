$(function () {
    // 1.监听游戏规则的点击
    $(".rules").click(function () {
        $(".rule").stop().fadeIn(1000);
    });

    // 2.监听关闭按钮的点击
    $(".rule>a").click(function () {
        $(".rule").stop().fadeOut(1000);
    });

    // 3.监听开始游戏按钮的点击
    $(".start").click(function () {
        $(this).stop().fadeOut(100);

        // 调用处理进度条的方法
        progressHandler();

        // 调用处理灰太狼动画的方法
        startWolfAnimation();
    });

    // 4.监听重新开始按钮的点击
    $(".restart").click(function () {
        $(".mask").stop().fadeOut(100);

        // 调用处理进度条的方法
        progressHandler();

        // 调用处理灰太狼动画的方法
        $(".score").text(0);
        startWolfAnimation();
    });


    /**
     * 处理进度条方法
     */
    function progressHandler() {
        // 设置进度条宽度(为重新开始游戏准备)
        $(".progress").css({
            width: 180
        });

        // 开启定时器
        var timer = setInterval(function () {
            // 拿到进度条当前的宽度
            var progressWidth = $(".progress").width();
            // 减少当前的宽度
            progressWidth -= 3;
            // 重新给进度条赋值宽度
            $(".progress").css({
                width: progressWidth
            });
            // 监听进度条是否走完
            if (progressWidth <= 0) {
                // 关闭定时器
                clearInterval(timer);
                // 显示重新开始界面
                $(".mask").stop().fadeIn(100);
                // 停止灰太狼动画
                stopWolfAnimation();
            }
        }, 300);
    }

    /**
     * 处理灰太狼动画的方法
     */
    var wolfTimer = null;

    function startWolfAnimation() {
        // 1.定义两个数组保存所有灰太狼和小灰灰的图片路径
        var wolf_1 = ['./images/h0.png', './images/h1.png', './images/h2.png', './images/h3.png', './images/h4.png',
            './images/h5.png', './images/h6.png', './images/h7.png', './images/h8.png', './images/h9.png'];
        var wolf_2 = ['./images/x0.png', './images/x1.png', './images/x2.png', './images/x3.png', './images/x4.png',
            './images/x5.png', './images/x6.png', './images/x7.png', './images/x8.png', './images/x9.png'];

        // 2.定义一个数组保存所有可能出现的位置
        var arrPos = [
            {left: "100px", top: "115px"},
            {left: "20px", top: "160px"},
            {left: "190px", top: "142px"},
            {left: "105px", top: "193px"},
            {left: "19px", top: "221px"},
            {left: "202px", top: "212px"},
            {left: "120px", top: "275px"},
            {left: "30px", top: "295px"},
            {left: "209px", top: "297px"}
        ];

        // 3.创建一个图片
        var $wolfImage = $("<img class='wolfImage' src=''>");
        /*
        随机获取图片的位置
        生成任意值到任意值的随机数
        Math.floor(Math.random()*(max-min+1)+min);
         */
        var posIndex = Math.floor(Math.random() * 8);

        // 4. 设置图片显示的位置
        $wolfImage.css({
            position: "absolute",
            left: arrPos[posIndex].left,
            top: arrPos[posIndex].top
        });

        // 随机获取数组类型
        var wolfType = Math.round(Math.random()) == 0 ? wolf_1 : wolf_2;

        // 5.设置图片的内容
        window.wolfIndex = 0; // 定义全部变量
        window.wolfIndexEnd = 5;
        wolfTimer = setInterval(function () {
            if(wolfIndex > wolfIndexEnd){
                $wolfImage.remove();
                clearInterval(wolfTimer);
                startWolfAnimation()
            }
            $wolfImage.attr("src", wolfType[wolfIndex]);
            wolfIndex++;
        }, 200);

        // 6.将图片添加到界面上
        $(".container").append($wolfImage);

        // 7.调用处理游戏规则的方法
        gameRules($wolfImage);
    }

    /**
     * 停止灰太狼动画
     */
    function stopWolfAnimation() {
        $(".wolfImage").remove();
        clearInterval(wolfTimer);
    }

    function gameRules($wolfImage) {
        $wolfImage.one("click", function () { // 为每一个匹配元素的特定事件（像click）绑定一个一次性的事件处理函数。
            // 修改索引
            window.wolfIndex = 5;
            window.wolfIndexEnd = 9;

            // 拿到当前点击图片的地址
            var $src = $(this).attr("src");
            // 根据图片地址判断是否是灰太狼
            var flag = $src.indexOf("h") >= 0;
            if(flag){ // 如果是灰太狼 +10 分
                $(".score").text(parseInt($(".score").text()) + 10)
            }else { // 如果是小灰灰 -10 分
                $(".score").text(parseInt($(".score").text()) - 10)
            }
        });
    }
});