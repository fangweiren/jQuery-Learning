$(function () {
    // 0.自定义滚动条
    $(".content_list").mCustomScrollbar();

    var $audio = $("audio");
    var player = new Player($audio);
    // 1.加载歌曲列表
    getPlayList();

    function getPlayList() {
        $.ajax({
            url: "./source/musiclist.json",
            dataType: "json",
            success: function (data) {
                player.musicList = data;
                // 4.1 遍历获取到的数据，创建每一条数据
                var $musicList = $(".content_list ul");
                $.each(data, function (index, ele) {
                    var $item = createMusicItem(index, ele);
                    $musicList.append($item);
                })
            },
            error: function (e) {
                console.log(e);
            }
        });
    }


    // 2.初始化事件监听
    initEvents();

    function initEvents() {
        // 1.监听歌曲的移入移出事件
        $(".content_list").delegate(".list_music", "mouseenter", function () {
            // 显示子菜单
            $(this).find(".list_menu").stop().fadeIn(100);
            $(this).find(".list_time a").stop().fadeIn(100);
            // 隐藏时长
            $(this).find(".list_time span").stop().fadeOut(100);
        });
        $(".content_list").delegate(".list_music", "mouseleave", function () {
            // 隐藏子菜单
            $(this).find(".list_menu").stop().fadeOut(100);
            $(this).find(".list_time a").stop().fadeOut(100);
            // 显示时长
            $(this).find(".list_time span").stop().fadeIn(100);
        });

        // 2.监听复选框的点击事件
        $(".content_list").delegate(".list_check", "click", function () {
            $(this).toggleClass("list_checked");
        });

        // 5.子菜单播放按钮的监听
        var $musicPlay = $(".music_play");
        $(".content_list").delegate(".list_menu_play", "click", function () {
            var $item = $(this).parents(".list_music");
            // 5.1 切换播放图标
            $(this).toggleClass("list_menu_play2");
            // 5.2 复原其它的播放图标
            $item.siblings().find(".list_menu_play").removeClass("list_menu_play2");
            // 5.3 同步底部播放按钮
            if ($(this).attr("class").indexOf("list_menu_play2") != -1) {
                // 当前子菜单播放按钮是播放状态
                $musicPlay.addClass("music_play2");
                // 让文字高亮
                $item.find("div").css("color", "#fff");
                // 排他思想
                $item.siblings().find("div").css("color", "rgba(255, 255, 255, 0.5)");

            } else {
                // 当前子菜单播放按钮是暂停状态
                $musicPlay.removeClass("music_play2");
                // 让文字不高亮
                $item.find("div").css("color", "rgba(255, 255, 255, 0.5)");
            }

            // 5.4 切换序号的状态
            $item.find(".list_number").toggleClass("list_number2");
            $item.siblings().find(".list_number").removeClass("list_number2");

            // 5.5 播放
            player.playMusic($item.get(0).index, $item.get(0).music);
        });
    }


    /**
     * 创建一条音乐
     * @param index
     * @param music
     */
    function createMusicItem(index, music) {
        var $item = $("<li class='list_music'>\n" +
            "                        <div class='list_check'><i></i></div>\n" +
            "                        <div class='list_number'> " + (index + 1) + " </div>\n" +
            "                        <div class='list_name'>" + music.name + "" +
            "                            <div class='list_menu'>\n" +
            "                                <a class='list_menu_play' href='javascript:;' title='播放'></a>\n" +
            "                                <a href='javascript:;' title='添加'></a>\n" +
            "                                <a href='javascript:;' title='下载'></a>\n" +
            "                                <a href='javascript:;' title='分享'></a>\n" +
            "                            </div>\n" +
            "                        </div>\n" +
            "                        <div class='list_singer'>" + music.singer + "</div>\n" +
            "                        <div class='list_time'>\n" +
            "                            <span>" + music.time + "</span>\n" +
            "                            <a href='javascript:;' title='删除'></a>\n" +
            "                        </div>\n" +
            "                    </li>");

        $item.get(0).index = index;
        $item.get(0).music = music;
        return $item;
    }
});
