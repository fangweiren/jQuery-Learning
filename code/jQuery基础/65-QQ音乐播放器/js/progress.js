(function (window) {
    function Progress($progressBar, $progressLine, $progressDot) {
        return new Progress.prototype.init($progressBar, $progressLine, $progressDot);
    }

    Progress.prototype = {
        constructor: Progress,
        isMove: false,
        init: function ($progressBar, $progressLine, $progressDot) {
            this.$progressBar = $progressBar;
            this.$progressLine = $progressLine;
            this.$progressDot = $progressDot;
        },
        progressClick: function (callBack) {
            var $this = this;
            // 监听背景的点击
            this.$progressBar.click(function (event) {
                // 获取进度条原点到窗口的距离
                var normalLeft = $(this).offset().left;
                // 获取点击的位置到窗口的距离
                var eventLeft = event.pageX;
                // 设置前景的宽度
                $this.$progressLine.css("width", eventLeft - normalLeft);
                $this.$progressDot.css("left", eventLeft - normalLeft);
                // 计算进度条的比例
                var value = (eventLeft - normalLeft) / $(this).width();
                callBack(value);
            });
        },
        progressMove: function (callBack) {
            var $this = this;
            // 获取进度条原点到窗口的距离
            var normalLeft = this.$progressBar.offset().left;
            var barWidth = this.$progressBar.width();
            var eventLeft;

            // 1.监听鼠标的按下事件
            this.$progressBar.mousedown(function () {
                $this.isMove = true;
                // 2.监听鼠标的移动事件
                $(document).mousemove(function (event) {
                    // 获取点击的位置到窗口的距离
                    eventLeft = event.pageX;
                    var progressWidth = eventLeft - normalLeft;
                    // 边界处理
                    if (progressWidth >= 0 && progressWidth <= barWidth) {
                        // 设置前景的宽度
                        $this.$progressLine.css("width", progressWidth);
                        $this.$progressDot.css("left", progressWidth);
                    }
                });
            });
            // 3.监听鼠标的抬起事件
            $(document).mouseup(function () {
                // 移除移动事件
                $(document).off("mousemove");
                $this.isMove = false;
                // 计算进度条的比例
                var value = (eventLeft - normalLeft) / barWidth;
                callBack(value);
            });
        },
        setProgress: function (value) {
            // 如果鼠标拖拽进度条，直接返回
            if (this.isMove) return;
            if (value < 0 || value > 100) return;
            this.$progressLine.css({
                width: value + "%"
            });
            this.$progressDot.css({
                left: value + "%"
            });
        }
    };
    Progress.prototype.init.prototype = Progress.prototype;
    window.Progress = Progress;
})(window);
