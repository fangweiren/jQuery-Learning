## 初识 jQuery

### jQuery 是什么？
![](http://qiniuyun.iamnancy.top/jquery-logo-md.png)
jQuery 是一款优秀的 JavaScript 库，从命名可以看出 jQuery 最主要的用途是用来做查询(jQuery = js + Query)，正如 jQuery 官方 logo 副标题所说(write less, do more)使用 jQuery 能让我们对 HTML文档遍历和操作、事件处理、动画以及 Ajax 变得更加简单。

### 浏览器兼容
- 1.x：兼容ie678，但相对其他版本文件较大，官方只做 BUG 维护，功能不再新增，最终版本：1.12.4（2016年5月20日）。
- 2.x：不兼容ie678，相对 1.x 文件较小，官方只做 BUG 维护，功能不再新增，最终版本：2.2.4（2016年5月20日）。
- 3.x：不兼容ie678，只支持最新的浏览器，很多老的 jQuery 版本不支持这个版本，相对 1.x 文件较小，提供不包含 Ajax/动画 API 版本。

### 如何使用 jQuery
```
<script src="js/jquery-1.12.4.js"></script>
<script>
    // 1.原生 JS 的固定写法
    window.onload = function () {
        alert("hello world")
    };

    // 2.jQuery 的固定写法
    $(document).ready(function () {
        alert("hello world")
    })
</script>
```

## jQuery 入口函数
### jQuery 和 js 入口函数的区别
```
<script src="js/jquery-1.12.4.js"></script>
<script>
    window.onload = function () {
        // 1.通过原生 JS 入口函数可以拿到 DOM 元素
        var img = document.getElementsByTagName("img")[0];
        console.log(img);

        // 2.通过原生 JS 入口函数可以拿到 DOM 元素的宽高
        var width = window.getComputedStyle(img).width;
        console.log("onload", width);
    };

    /**
     * 原生 JS 和 jQuery 入口函数的加载模式不同
     * 原生 JS 会等到 DOM 元素加载完毕，并且图片也加载完毕才会执行
     * jQuery 会等到 DOM 元素加载完毕，但不会等到图片也加载完毕就会执行
     */
    $(document).ready(function () {
        // 1.通过 jQuery 入口函数可以拿到 DOM 元素
        var $img = $("img");
        console.log($img);

        // 2.通过 jQuery 入口函数不可以拿到 DOM 元素的宽高(注意清除缓存)
        var $width = $img.width();
        console.log("ready", $width);
    });


    /*
    输出结果：
    jQuery.fn.init [img, prevObject: jQuery.fn.init(1), context: document, selector: "img"]
    ready 0
      <img src="https://www.jquery123.com/assets/images/jquery-logo-md.png" alt="">
    onload 339.994px
    */


    /**
     * 原生 JS 如果编写了多个入口函数，后面编写的会覆盖前面编写的
     * jQuery 中编写多个入口函数，后面的不会覆盖前面
     */
    window.onload = function () {
        alert("hello china1")
    };

    window.onload = function () {
        alert("hello china2")
    };

    $(document).ready(function () {
        alert("hello china3")
    });

    $(document).ready(function () {
        alert("hello china4")
    });
</script>
```

### jQuery 入口函数的其他写法
```
<script src="js/jquery-1.12.4.js"></script>
<script>
    // 1.第一种写法
    $(document).ready(function () {
        // alert("hello world");
    });

    // 2.第二种写法
    jQuery(document).ready(function () {
        // alert("hello world");
    });

    // 3.第三种写法(推荐)
    $(function () {
        alert("hello world");
    });

    // 4.第四种写法
    jQuery(function () {
        alert("hello world");
    });
</script>
```

### jQuery 冲突问题
```
<script src="js/jquery-1.12.4.js"></script>
<script src="js/test.js"></script> // test.js 中使用了$造成冲突
<script>
    // 方法1.释放$的使用权
    // 注意：释放操作必须在编写其他 jQuery 代码之前
    //      释放之后就不能再使用$，改为使用 jQuery
    jQuery.noConflict();
    
    jQuery(function () {
        alert("hello world1");
    });

    // 方法2.自定义一个访问符号
    var nj = jQuery.noConflict();

    nj(function () {
        alert("hello world2");
    });
</script>
```
