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

## jQuery 核心函数
```
<script src="js/jquery-1.12.4.js"></script>
<script>
    // $(); 代表调用 jQuery 的核心函数

    // 1.接收一个函数
    $(function () {
        alert("hello world");

        // 2.接收一个字符串
        // 2.1 接收一个字符串选择器
        // 返回一个 jQuery 对象，对象中保存了找到的 DOM 元素
        var $box1 = $(".box1");
        var $box2 = $("#box2");
        console.log($box1);
        console.log($box2);

        // 2.2 接收一个字符串代码片段
        // 返回一个 jQuery 对象，对象中保存创建的 DOM 元素
        var $p = $("<p>我是段落</p>");
        console.log($p);
        $box1.append($p);

        // 3.接收一个 DOM 元素
        // 会被包装成 jQuery 对象返回。
        var span = document.getElementsByTagName("span")[0];
        console.log(span);
        var $span = $("span");
        console.log($span);
    });
</script>
```

### jQuery 对象
```
<script src="js/jquery-1.12.4.js"></script>
<script>
    $(function () {
        /**
         * 1.什么是 jQuery 对象？
         * jQuery 对象是一个伪数组
         *
         * 2.什么是伪数组？
         * 有 0 到 length-1 的属性，并且有 length 属性
         */
        $div = $("div");
        console.log($div);

        /* 输出结果
        jQuery.fn.init(3) [div, div, div, prevObject: jQuery.fn.init(1), context: document, selector: "div"]
        0: div
        1: div
        2: div
        context: document
        length: 3
        prevObject: jQuery.fn.init [document, context: document]
        selector: "div"
        __proto__: Object(0)
        */
    });
</script>
```

## jQuery 静态方法
### jQuery 静态方法和实例方法
```
<script>
    // 1.定义一个类
    function AClass() {
    }

    // 2.给这个类添加一个静态方法
    // 直接添加给类的就是静态方法
    AClass.staticMethod = function () {
        alert("staticMethod");
    };

    // 静态方法通过类名调用
    AClass.staticMethod();

    // 3.给这个类添加一个实例方法
    AClass.prototype.instanceMethod = function () {
        alert("instanceMethod");
    };

    // 实例方法通过类的实例调用
    var a = new AClass();
    a.instanceMethod();
</script>
```

### jQuery-each 方法
```
<script src="js/jquery-1.12.4.js"></script>
<script>
    var arr = [1, 3, 5, 7, 9];
    var obj = {0:1, 1:3, 2:5, 3:7, 4:11, length:5};
    /**
     * 第一个参数：value
     * 第二个参数：index
     * 注意点：原生的 forEach 方法只能遍历数组，不能遍历伪数组
     */
    arr.forEach(function (value, index) {
        // console.log(index, value);
    });

    // obj.forEach(function (value, index) {
    //     console.log(index, value);
    // });
    /*Uncaught TypeError: obj.forEach is not a function*/

    /**
     * 1.利用 jQuery 的 each 静态方法遍历数组
     * 第一个参数：index
     * 第二个参数：value
     */
    $.each(arr, function (index, value) {
        console.log(index, value);
    });

    // jQuery 的 each 方法遍历伪数组
    $.each(obj, function (index, value) {
        console.log(index, value);
    })
</script>
```

### jQuery-map 方法
```
<script src="js/jquery-1.12.4.js"></script>
<script>
    var arr = [1, 3, 5, 7, 9];
    var obj = {0:1, 1:3, 2:5, 3:7, 4:11, length:5};
    // 1.利用原生 JS 的 map 方法遍历
    arr.map(function (value, index, array) {
        console.log(index, value, array);
    });

    // 不能遍历伪数组(报错)
    // obj.map(function (value, index, array) {
    //     console.log(index, value, array);
    // })


    /**
     * 第一个参数：要遍历的数组
     * 第二个参数：每遍历一个元素之后执行的回调函数
     * 回调函数的参数：
     *     第一个参数：遍历到的元素
     *     第二个参数：遍历到的索引
     * 注意点：和 jQuery 中的 each 静态方法一样，map 静态方法也可以遍历伪数组
     */
    $.map(arr, function (value, index) {
        console.log(index, value);
    });

    var res = $.map(obj, function (value, index) {
        console.log(index, value);
    });

    var res2 = $.each(obj, function (index, value) {
        console.log(index, value);
    });


    /**
     * jQuery 中的 each 静态方法和 map 静态方法的区别：
     * each 静态方法默认的返回值就是遍历的对象
     * map 静态方法默认的返回值是一个空数组
     *
     *
     * each 静态方法不支持在回调函数中对遍历的数组进行处理
     * map 静态方法可以在回调函数中通过 return 对遍历的数组进行处理，然后生成新的数组返回
     */
    console.log(res);
    console.log(res2);
</script>
```

### jQuery 中的其它静态方法
```
<script src="js/jquery-1.12.4.js"></script>
<script>
    var str = "    hello    ";
    var arr = [1, 3, 5, 7, 9];
    var arrlike = {0:1, 1:3, 2:5, 3:7, 4:11, length:5};
    var obj = {"name": "fwr", "age": 33};
    var fn = function () {};
    var w = window;
    /**
     * $.trim();
     * 作用：去除字符串两端的空格
     * 参数：string
     * 返回值：新的 string
     */
    var res = $.trim(str);

    console.log("----" + str + "----");
    console.log("----" + res + "----");

    /**
     * $.isWindow();
     * 作用：判断传入的对象是否是 window 对象
     * 返回值：true/false
     */


    /**
     * $.isArray();
     * 作用：判断传入的对象是否是真数组
     * 返回值：true/false
     */
    res = $.isArray(arr);
    console.log(res);
    res2 = $.isArray(arrlike);
    console.log(res2);


    /**
     * $.isFunction();
     * 作用：判断传入的对象是否是一个函数
     * 返回值：true/false
     */
    var res = $.isFunction(w);
    console.log(res);
</script>
```

### jQuery-holdReady 方法
```
<script src="js/jquery-1.12.4.js"></script>
<script>
    /**
     * $.holdReady(true);
     * 作用：暂停 ready 执行
     */
    $.holdReady(true);
    $(document).ready(function () {
        alert("ready")
    });
</script>
</head>
<body>
<button>恢复ready事件</button>
<script>
    var btn = document.getElementsByTagName("button")[0];
    btn.onclick = function () {
        // alert("btn");
        $.holdReady(false); // 恢复 ready 执行
    }
</script>
```

## jQuery 选择器
### jQuery 内容选择器
```
<script src="js/jquery-1.12.4.js"></script>
<script>
    $(function () {
        // :empty 作用：找到既没有文本内容也没有子元素的指定元素
        var $div = $("div:empty");
        console.log($div);

        // :parent 作用：找到有文本内容或有子元素的指定元素
        var $div = $("div:parent");
        console.log($div);

        // :contains(text) 作用：找到包含指定文本内容的指定元素
        var $div = $("div:contains('我是div')");
        console.log($div);

        // :has(selector) 作用：找到包含指定子元素内容的指定元素
        var $div = $("div:has('p')");
        console.log($div);
    });
</script>
```

## jQuery 属性
### jQuery 属性和属性节点
```
<script src="js/jquery-1.12.4.js"></script>
<script>
    $(function () {
        /**
         * 1.什么是属性？
         * 对象身上保存的变量就是属性。
         * =============================
         * 2.如何操作属性？
         * 赋值：对象.属性名称 = 值
         * 获取：对象.属性名称
         * --------another---------
         * 赋值：对象["属性名称"] = 值
         * 获取：对象["属性名称"]
         * =============================
         * 3.什么是属性节点？
         * <span name="sp"></span>
         * 在 HTML 标签中添加的属性就是属性节点。
         * =============================
         * 4.如何操作属性节点？
         * DOM元素.setAttribute("属性名称", "值");
         * DOM元素.getAttribute("属性名称")；
         * =============================
         * 5.属性和属性节点有什么区别？
         * 任何对象都有属性，但是只有 DOM 对象才有属性节点。
         */

        // 操作属性
        function Person() {

        }

        var p = new Person();
        p.name = "Lily";
        console.log(p.name);
        p["age"] = 19;
        console.log(p["age"]);
        console.log(p);

        // 操作属性节点
        var span = document.getElementsByTagName("span")[0];
        span.setAttribute("name", "Lily");
        console.log(span.getAttribute("name"));
    });
</script>
```

### jQuery attr 方法
```
<script src="js/jquery-1.12.4.js"></script>
<script>
    $(function () {
        /**
         * attr(name|pro|key,val|fn)
         * 作用：获取或设置属性节点的值。
         * 可以传递一个参数，也可以传递两个参数
         * 如果传递一个参数，代表获取属性节点的值
         * 如果传递两个参数，代表设置属性节点的值
         *
         * 注意点：
         * 传递一个参数：无论找到多少个元素，都只会返回第一个元素指定的属性节点的值
         * 传递两个参数：找到多少个元素，就设置多少个元素；如果设置的属性节点不存在，系统会自动新增
         *
         * removeAttr(name)
         * 作用：删除属性节点
         *
         * 注意点：会删除所有找到元素的属性节点
         */

        console.log($("span").attr("class")); // span1
        $("span").attr("class", "box"); // 两个 span 的 class 属性都变为 class="box"

        // $("span").removeAttr("class");
        $("span").removeAttr("class name"); // 删除 class 和 name 属性节点
    });
</script>
```

### jQuery prop 方法
```
<script src="js/jquery-1.12.4.js"></script>
<script>
    $(function () {
        /**
         * prop 方法
         * 特点与 attr 方法一致
         * removeProp 方法
         * 特点与 removeAttr 方法一致
         */

        $("span").eq(0).prop("demo", "hello");
        $("span").eq(1).prop("demo", "world");
        console.log($("span").prop("demo"));

        $("span").removeProp("demo");

        /* 注意点：prop 方法不仅能够操作属性，还能操作属性节点

        官方推荐在操作属性节点时，具有 true 和 false 两个属性的属性节点，如 checked，selected 或者 disabled 使用 prop()，
        其他的使用 attr()
        */

        console.log($("span").prop("class"));
        $("span").prop("class", "box");


        console.log($("input").prop("checked")); // true/false
        console.log($("input").attr("checked")); // checked/undefined
    });
</script>
```

### attr 和 prop 方法练习
```
<script src="js/jquery-1.12.4.js"></script>
<script>
    $(function () {
        // 1.给按钮添加点击事件
        var btn = document.getElementsByTagName("button")[0];
        btn.onclick = function () {
            // 2.获取输入框输入的内容
            var input = document.getElementsByTagName("input")[0];
            var text = input.value;
            // 3.修改 img 的 src 属性节点的值
            $("img").attr("src", text); // 推荐使用
            // $("img").prop("src", text);
            // 4.运行，在输入框输入：https://img.alicdn.com/tfs/TB1_uT8a5ERMeJjSspiXXbZLFXa-143-59.png
        }

    });
</script>
```

### jQuery 类操作相关方法
```
<script src="js/jquery-1.12.4.js"></script>
<script>
    $(function () {
        /**
         * 1.addClass(class|fn)
         * 作用：添加一个类
         * 如果要添加多个，多个类名之间用空格隔开
         *
         * 2.removeClass([class|fn])
         * 作用：删除一个类
         * 如果要删除多个，多个类名之间用空格隔开
         *
         * 3.toggleClass(class|fn[,sw])
         * 作用：如果存在（不存在）就删除（添加）一个类。(切换类)
         */
        var btns = document.getElementsByTagName("button");
        btns[0].onclick = function () {
            $("div").addClass("class1 class2");
        };

        btns[1].onclick = function () {
            $("div").removeClass("class2");
        };

        btns[2].onclick = function () {
            $("div").toggleClass("class1 class2");
        };
    });
</script>
```

### jQuery HTML 代码/文本/值相关操作
```
<script src="js/jquery-1.12.4.js"></script>
<script>
    $(function () {
        /*
        1.html([val|fn])
        与原生 JS 中的 innerHTML 一样

        2.text([val|fn])
        与原生 JS 中的 innerText 一样

        3.val([val|fn|arr])
         */
        var btns = document.getElementsByTagName("button");
        btns[0].onclick = function () {
            $("div").html("<p>我是MT<span>我是提莫</span></p>");
        };

        btns[1].onclick = function () {
            console.log($("div").html());
        };

        btns[2].onclick = function () {
            $("div").text("<p>我是MT<span>你是谁</span></p>");
        };

        btns[3].onclick = function () {
            console.log($("div").text());
        };

        btns[4].onclick = function () {
            $("input").val("请输入内容");
        };

        btns[5].onclick = function () {
            console.log($("input").val());
        };
    });
</script>
```

## jQuery CSS 操作
### jQuery CSS 方法
```
<script src="js/jquery-1.12.4.js"></script>
<script>
    $(function () {
        // 1.逐个设置
        // $("div").css("width", "100px");
        // $("div").css("height", "100px");
        // $("div").css("background", "red");

        // 2.链式设置
        // 注意点：链式操作如果大于3步，建议分开
        // $("div").css("width", "100px").css("height", "100px").css("background", "blue");

        // 3.批量设置
        $("div").css({
            width: "100px",
            height: "100px",
            background: "yellow"
        });

        // 4.获取 CSS 样式值
        console.log($("div").css("width"));
    });
</script>
```

### jQuery 尺寸和位置操作
```
<script src="js/jquery-1.12.4.js"></script>
<script>
    $(function () {
        var btns = document.getElementsByTagName("button");
        // 监听获取
        btns[0].onclick = function () {
            // 获取元素的宽度
            // console.log($(".father").width());

            // offset([coordinates])
            // 作用：获取元素距离窗口的偏移位
            console.log($(".son").offset().left);

            // position()
            // 作用：获取元素距离定位元素的偏移位
            console.log($(".son").position().left);
        };

        // 监听设置
        btns[1].onclick = function () {
            // 设置元素的宽度
            // $(".father").width("500px")

            // 设置元素距离窗口的偏移位
            $(".son").offset({
                left: 10
            });

            /* 注意点：position 方法只能获取不能设置，下面代码无效
            $(".son").position({
                left: 10
            })
            */
        }
    });
</script>
```

### jQuery scrollTop 方法
```
<script src="js/jquery-1.12.4.js"></script>
<script>
    $(function () {
        var btns = document.getElementsByTagName("button");

        btns[0].onclick = function () {
            // 获取元素滚动的偏移位
            // console.log($(".scroll").scrollTop());
            // 获取网页滚动的偏移位
            console.log($("html").scrollTop() + $("body").scrollTop()); // 注意点：不同浏览器兼容性写法
        };

        btns[1].onclick = function () {
            // 设置元素滚动的偏移位
            // $(".scroll").scrollTop(300);
            // 设置网页滚动的偏移位
            $("html, body").scrollTop(300); // 不同浏览器兼容性写法
        }
    });
</script>
```

## jQuery 事件
### jQuery 事件绑定
```
<script src="js/jquery-1.12.4.js"></script>
<script>
    $(function () {
        /**
         * jQuery 中两种事件绑定方式
         * 1.eventName(fn);
         * 部分事件 jQuery 没有实现，所以不能添加
         *
         * 2.on(eventName, fn);
         * 所有 js 事件都可添加
         */
        // 第一种方式
        $("button").click(function () {
            alert("hello world")
        });

        // 第二种方式
        $("button").on("click", function () {
            alert("hello Lily")
        })
    });
</script>
```

### jQuery 事件解绑
```
<script src="js/jquery-1.12.4.js"></script>
<script>
    $(function () {
        function test1() {
            alert("hello world")
        }
        function test2() {
            alert("hello Lily")
        }
        $("button").click(test1);

        $("button").click(test2);

        $("button").mouseleave(function () {
            alert("hello Tom")
        });

        $("button").mouseenter(function () {
            alert("hello David")
        });

        // off 方法如果不传递参数，会移除所有事件
        // $("button").off();

        // off 方法如果传递一个参数，会移除所有指定类型的事件
        // $("button").off("click");

        // off 方法如果传递两个参数，会移除所有指定类型的指定事件
        $("button").off("click", test1);
    });
</script>
```

### jQuery 事件冒泡和默认行为
```
<script src="js/jquery-1.12.4.js"></script>
<script>
    $(function () {
        /**
         * 1.什么是事件冒泡？
         * 2.如何阻止事件冒泡？
         * 3.什么是默认行为？
         * 4.如何阻止默认行为？
         */
        $(".son").click(function (event) {
            alert("son");
            // 阻止事件冒泡两种方式
            // return false;
            event.stopPropagation();
        });

        $(".father").click(function () {
            alert("father")
        });

        // 默认点击 a 标签会跳转到百度
        $("a").click(function (event) {
            alert("弹出注册框");
            // 阻止默认行为两种方式
            // return false;
            event.preventDefault();
        });
    });
</script>
```

### jQuery 事件自动触发
```
<script src="js/jquery-1.12.4.js"></script>
<script>
    $(function () {
        $(".son").click(function () {
            alert("son");
        });

        $(".father").click(function () {
            alert("father")
        });

        $("input[type='submit']").click(function () {
            alert("submit");
        });

        // $(".father").trigger("click");
        // $(".father").triggerHandler("click");

        /**
         * trigger：如果利用 trigger 自动触发事件，会触发事件冒泡
         * triggerHandler：如果利用 triggerHandler 自动触发事件，不会触发事件冒泡
         */
        // $(".son").trigger("click");
        // $(".son").triggerHandler("click");

        /**
         * trigger：如果利用 trigger 自动触发事件，会触发默认行为
         * triggerHandler：如果利用 triggerHandler 自动触发事件，不会触发默认行为
         */
        // $("input[type='submit']").trigger("click");
        $("input[type='submit']").triggerHandler("click");
    });
</script>
```
