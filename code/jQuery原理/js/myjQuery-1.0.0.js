(function (window, undefined) {
    var myjQuery = function () {
        return new myjQuery.prototype.init();
    };
    myjQuery.prototype = {
        constructor: myjQuery
    };

    myjQuery.prototype.init.prototype = myjQuery.prototype;
    window.myjQuery = window.$ = myjQuery;
})(window);