(function (window, undefined) {
    var myjQuery = function (selector) {
        return new myjQuery.prototype.init(selector);
    };
    myjQuery.prototype = {
        constructor: myjQuery,
        init: function (selector) {
            /*
             1.传入 '' null undefined NaN 0 false, 返回空的 jQuery 对象
             2.字符串:
             代码片段:会将创建好的 DOM 元素存储到 jQuery 对象中返回
             选择器:会将找到的所有元素存储到 jQuery 对象中返回
             3.数组:
             会将数组中存储的元素依次存储到 jQuery 对象中立返回
             4.除上述类型以外的:
             会将传入的数据存储到 jQuery 对象中返回
            */
            // 0.去除字符串两端的空格
            selector = myjQuery.trim(selector);

            // 1.传入 '' null undefined NaN 0 false, 返回空的 jQuery 对象
            if (!selector) {
                return this;
            }
            // 2.字符串
            else if (myjQuery.isString(selector)) {
                // 2.1 判断是否是代码片段
                if (myjQuery.isHTML(selector)) {
                    // 1.根据代码片段创建所有的元素
                    var temp = document.createElement("div");
                    temp.innerHTML = selector;
                    /*
                    // 2.将创建好的一级元素添加到 jQuery 中
                    for (var i = 0; i < temp.children.length; i++) {
                        this[i] = temp.children[i]
                    }
                    // 3.给 jQuery 对象添加 length 属性
                    this.length = temp.children.length;
                    */
                    [].push.apply(this, temp.children);
                    // 4.返回加工好的 this(jQuery)
                    // return this;
                }
                // 2.2 判断是否是选择器
                else {
                    // 1.根据传入的选择器找到对应的元素
                    var res = document.querySelectorAll(selector);
                    // 2.将找到的元素添加到 myjQuery 上
                    [].push.apply(this, res);
                    // 3.返回加工好的 this
                    // return this;
                }
            }
            // 3.数组
            // else if (typeof selector === "object" && "length" in selector && selector !== window) {
            else if (myjQuery.isArray(selector)) {
                /*
                // 3.1 真数组
                if (({}).toString.apply(selector) === "[object Array]") {
                    [].push.apply(this, selector);
                    return this;
                }
                // 3.1 伪数组
                else {
                    // 将自定义的伪数组转换为真数组
                    var arr = [].slice.call(selector);
                    // 将真数组转换为伪数组
                    [].push.apply(this, arr);
                    return this;
                }
                */
                // 将自定义的伪数组转换为真数组
                var arr = [].slice.call(selector);
                // 将真数组转换为伪数组
                [].push.apply(this, arr);
                // return this;
            }
            // 4.除上述类型以外
            else {
                this[0] = selector;
                this.length = 1;
                // return this;
            }
            return this;
        }
    };

    myjQuery.isString = function (str) {
        return typeof str === "string"
    };
    myjQuery.isHTML = function (str) {
        return str.charAt(0) === "<" && str.charAt(str.length - 1) === ">" && str.length >= 3
    };
    myjQuery.trim = function (str) {
        if (!myjQuery.isString(str)) {
            return str;
        }
        // 判断是否支持 trim 方法
        if (str.trim) {
            return str.trim();
        } else {
            return str.replace(/^\s+|\s+$/g, "")
        }
    };
    myjQuery.isObject = function (sele) {
        return typeof sele === "object";
    };
    myjQuery.isWindow = function (sele) {
        return sele === window;
    };
    myjQuery.isArray = function (sele) {
        if (myjQuery.isObject(sele) && !myjQuery.isWindow(sele) && "length" in sele) {
            return true;
        }
        return false;
    };
    myjQuery.prototype.init.prototype = myjQuery.prototype;
    window.myjQuery = window.$ = myjQuery;
})(window);
