(function (window) {
    function Lyric(path) {
        return new Lyric.prototype.init(path);
    }

    Lyric.prototype = {
        constructor: Lyric,
        init: function (path) {
            this.path = path;
        },
        times: [],
        lyrics: [],
        loadLyric: function (callBack) {
            var $this = this;
            $.ajax({
                url: $this.path,
                dataType: "text",
                success: function (data) {
                    $this.parseLyric(data);
                    callBack();
                },
                error: function (e) {
                    console.log(e);
                }
            });
        },
        parseLyric: function (data) {
            var $this = this;
            var array = data.split("\n");
            // 遍历取出每一行歌词
            $.each(array, function (index, ele) {
                // 处理歌词
                var lrc = ele.split("]")[1];
                // 排除空字符串(没有歌词的)
                if (lrc.length == 1) return true;
                $this.lyrics.push(lrc);

                //匹配时间
                var timeReg = /\[(\d*:\d*\.\d*)\]/;
                var res = timeReg.exec(ele);
                if (res == null) return true;
                var timeStr = res[1]; // 00:00.92
                var res2 = timeStr.split(":");
                var min = parseInt(res2[0]) * 60;
                var sec = parseFloat(res2[1]);
                var time = parseFloat(Number(min + sec).toFixed(2));
                $this.times.push(time);
            });
        }
    };
    Lyric.prototype.init.prototype = Lyric.prototype;
    window.Lyric = Lyric;
})(window);