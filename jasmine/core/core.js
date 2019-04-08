(function (W, n) {
    var doc = W.document,
    toString = Object.prototype.toString,
    hasOwn = Object.prototype.hasOwnProperty,
    push = Array.prototype.push,
    slice = Array.prototype.slice,
    indexOf = Array.prototype.indexOf,
	trim = String.prototype.trim,
    rootDom,
    idSelect = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
	class2type = {},
    class2typeArr = [],
    version = "1.7.17",
    N = function (select, obj) {
        return new N.fn.init(select, obj);
    };

    N.fn = N.prototype = {
        version: version,
        constructor: N,
        init: function (selector, context, flag) {
            var match, elem, ret;
            if (!selector) {
                return this;
            }

            if (selector.nodeType || selector === window) {
                this.context = this[0] = selector;
                this.length = 1;
                return this;
            }

            if (flag) {
                context = context || rootDom;
                return S.exec(selector, context);
            }

            if (typeof selector === "string") {
                if (!context || context.version) {
                    return (context || N(doc)).find(selector);
                } else {
                    return this.constructor(context).find(selector);
                }
            }

            if (selector.selector !== undefined) {
                this.selector = selector.selector;
                this.context = selector.context;
            }

            return N.makeArray(selector, this);
        },
        selector: "",
        length: 0,
        toArray: function () {
            return slice.call(this);
        },
        get: function (num) {
            return num == null ?
			this.toArray() :
			(num < 0 ? this[this.length + num] : this[num]);
        },
        pushStack: function (elems, name, selector) {
            var ret = N.array.merge(this.constructor(), elems);
            ret.prevObject = this;

            ret.context = this.context;

            if (name === "find") {
                ret.selector = this.selector + (this.selector ? " " : "") + selector;
            } else if (name) {
                ret.selector = this.selector + "." + name + "(" + selector + ")";
            }
            return ret;
        },
        each: function (callback, args) {
            return N.array.each(this, callback, args);
        },
        slice: function () {
            return this.pushStack(slice.apply(this, arguments),
			"slice", slice.call(arguments).join(","));
        },
        map: function (callback) {
            return this.pushStack(N.map(this, function (elem, i) {
                return callback.call(elem, i, elem);
            }));
        },
        push: push,
        sort: [].sort,
        splice: [].splice
    };
    N.fn.init.prototype = N.fn;

    N.extend = N.fn.extend = function () {
        var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[1] || {};
            i = 2;
        }
        if (typeof target !== "object" && !N.isFunction(target)) {
            target = {};
        }
        if (length === i) {
            target = this;
            --i;
        }

        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    if (target === copy) {
                        continue;
                    }
                    if (deep && copy && (N.isPlainObject(copy) || (copyIsArray = N.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && N.isArray(src) ? src : [];

                        } else {
                            clone = src && N.isPlainObject(src) ? src : {};
                        }
                        target[name] = N.extend(deep, clone, copy);
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    };

    var readyList = [], 	// DOM Ready函数队列
	isReadyBound, 	// 是否已绑定DOM Ready事件
	onDomReady;

    if (document.addEventListener) {
        onDomReady = function () {
            document.removeEventListener("DOMContentLoaded", onDomReady, false);
            domReadyNow();
        };
    } else if (document.attachEvent) {	// For IE Only
        onDomReady = function () {
            if ("complete" === document.readyState) {
                document.detachEvent("onreadystatechange", onDomReady);
                domReadyNow();
            }
        };
    }

    // DOM Ready检查 For IE
    function doScrollCheck() {
        if (N.isReady) { return; }

        try {
            document.documentElement.doScroll("left");
        } catch (e) {
            setTimeout(doScrollCheck, 1);
            return;
        }

        domReadyNow();
    }
    // DOM已就绪
    function domReadyNow() {
        if (!N.isReady) {
            if (!document.body) { return setTimeout(domReadyNow, 13); }

            N.isReady = true;

            if (readyList) {
                var i = -1, len = readyList.length;
                while (++i < len) {
                    readyList[i].call(document);
                }
                readyList = null;
            }
        }
    }
    // 绑定DOMReady事件
    function bindReady() {
        if (isReadyBound) { return; }

        if ("complete" === document.readyState) { return domReadyNow(); }

        if (document.addEventListener) {
            document.addEventListener("DOMContentLoaded", domReadyNow, false);
            window.addEventListener("load", domReadyNow, false);
        } else if (document.attachEvent) {
            document.attachEvent("onreadystatechange", domReadyNow);
            window.attachEvent("onload", domReadyNow);
            var isTopLevel;
            try {
                isTopLevel = window.frameElement == null;
            } catch (e) { }

            document.documentElement.doScroll && isTopLevel && doScrollCheck();
        }

        isReadyBound = true;
    }


    N.extend({
        version: version,
        makeArray: function (arr, results) {
            var type,
			ret = results || [];

            if (arr != null) {
                type = N.type(arr);

                if (arr.length == null || type === "string" || type === "function" || type === "regexp") {
                    push.call(ret, arr);
                } else {
                    N.array.merge(ret, arr);
                }
            }

            return ret;
        },
        isFunction: function (obj) {
            return N.type(obj) === "function";
        },
        isWindow: function( obj ) {
            return obj != null && obj == obj.window;
        },
        isArray: Array.isArray || function (obj) {
            return N.type(obj) === "array";
        },
        isNumeric: function (obj) {
            return !isNaN(parseFloat(obj)) && isFinite(obj);
        },
        isPlainObject: function (obj) {
            if (!obj || N.type(obj) !== "object" || obj.nodeType || N.isWindow(obj)) {
                return false;
            }

            try {
                if (obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                    return false;
                }
            } catch (e) {
                return false;
            }

            var key;
            for (key in obj) { }

            return key === undefined || hasOwn.call(obj, key);
        },
        type: function (obj) {
            return obj == null ?
			String(obj) :
			class2type[toString.call(obj)] || "object";
        },
        trace: function (msg) {
            if (typeof (console) != "undefined" && console.log) {
                console.log(msg)
            }
        },
        parseXML: function (data) {
            if (typeof data !== "string" || !data) {
                return null;
            }
            var xml, tmp;
            try {
                if (window.DOMParser) { // Standard
                    tmp = new DOMParser();
                    xml = tmp.parseFromString(data, "text/xml");
                } else { // IE
                    xml = new ActiveXObject("Microsoft.XMLDOM");
                    xml.async = "false";
                    xml.loadXML(data);
                }
            } catch (e) {
                xml = undefined;
            }
            if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
                NE.trace("Invalid XML: " + data);
            }
            return xml;
        },
        /// 在DOM就绪时执行指定函数
        /// @param {Function} 指定函数
        /// @param {Object} 当前对象
        ready: function (fn) {
            // 绑定事件
            bindReady();

            if (N.isReady) {
                fn.call(document);
            } else {
                readyList.push(fn);
            }

            return this;
        }
    });

    class2typeArr = "Boolean Number String Function Array Date RegExp Object".split(" ");
    for (var i = 0, len = class2typeArr.length; i < len; i++) {
        class2type["[object " + class2typeArr[i] + "]"] = class2typeArr[i].toLowerCase();
    }

    // 用于特性检查的元素
    var testElem = document.createElement("div");

    testElem.innerHTML = "<p class='TEST'></p>";

    // S选择器解析引擎
    var S = {
        SPACE: /\s*([\s>~+,])\s*/g, // 用于去空格
        ISSIMPLE: /^#?[\w\u00c0-\uFFFF_-]+$/,  // 判断是否简单选择器(只有id或tagname，不包括*)
        IMPLIEDALL: /([>\s~\+,]|^)([#\.\[:])/g,    // 用于补全选择器
        ATTRVALUES: /=(["'])([^'"]*)\1]/g,         // 用于替换引号括起来的属性值
        ATTR: /\[\s*([\w\u00c0-\uFFFF_-]+)\s*(?:(\S?\=)\s*(.*?))?\s*\]/g, // 用于替换属性选择器
        PSEUDOSEQ: /\(([^\(\)]*)\)$/g,     // 用于匹配伪类选择器最后的序号
        BEGINIDAPART: /^(?:\*#([\w\u00c0-\uFFFF_-]+))/,    // 用于分离开头的id选择器
        STANDARD: /^[>\s~\+:]/,    // 判断是否标准选择器(以空格、>、~或+开头)
        STREAM: /[#\.>\s\[\]:~\+]+|[^#\.>\s\[\]:~\+]+/g, // 用于把选择器表达式分离成操作符/操作数 数组
        ISINT: /^\d+$/, // 判断是否整数

        // 判断是否使用浏览器的querySelectorAll
        enableQuerySelector: testElem.querySelectorAll && testElem.querySelectorAll(".TEST").length > 0,

        tempAttrValues: [], // 临时记录引号/双引号间的属性值
        tempAttrs: [],  // 临时记录属性表达式

        idName: "NEUniqueId",
        id: 0,

        // 解析CSS选择器获取元素
        // @param {String} 选择器
        // @param {HTMLElement,Array,HTMLCollection} 上下文
        // @return {HTMLElement,Array,HTMLCollection} 匹配到的元素
        exec: function (selector, context, ret) {

            var result,     // 最后结果
                selectors,  // selector数组
                selCount,   // selector数组长度
                i, j,       // 循环变量
                temp,       // 临时搜索结果
                matchs,     // 操作符/操作数 数组
                streamLen,  // 操作符/操作数 数组长度
                token,      // 操作符
                filter,     // 操作数
                t = S;

            // 清除多余的空白
            selector = NE.string.trim(selector);

            if ("" === selector) { return []; }


            if (context.nodeType == 9) {
                if (selector === "body" && context.body) {
                    elem = context.body;

                    if (ret) ret.push(elem);
                    return elem;
                }
            }

            // 对简单选择符的优化操作
            if (t.ISSIMPLE.test(selector)) {
                if (0 === selector.indexOf("#") && typeof context.getElementById !== "undefined") {
                    //alert("simple id: " + selector);  // @debug
                    result = t.getElemById(context, selector.substr(1));
                    if (ret && result) push.apply(ret, [result], 0);
                    return result;
                } else if (typeof context.getElementsByTagName !== "undefined") {
                    //alert("simple tagname: " + selector); // @debug
                    result = context.getElementsByTagName(selector);
                    if (ret)for(var i=0;i<result.length;i++){
                        ret.push(result[i]);
                    }
                    return result;
                }
            }

            // 使用querySelectorAll
            if (t.enableQuerySelector) {
                var elem;

                if (NE.isArray(context)) {
                    NE.array.each(context, function (i, obj) {
                        push.apply(elem, S.exec(selector, obj), 0);
                    });
                }

                try {
                    result = slice.call(context.querySelectorAll(selector));
                    if (ret) push.apply(ret, result, 0);
                    return result;
                } catch (e) { }
            }

            // 转换成数组，统一处理
            context = context.nodeType ? [context] : slice.call(context);

            selectors = selector.replace(t.SPACE, "$1")     // 去空白
                            .replace(t.ATTRVALUES, t.analyzeAttrValues) // 替换属性值
                            .replace(t.ATTR, t.analyzeAttrs)    // 替换属性选择符
                            .replace(t.IMPLIEDALL, "$1*$2")     // 添加必要的"*"(例如.class1 => *.class1)
                            .split(",");    // 分离多个选择器
            selCount = selectors.length;

            i = -1; result = [];

            while (++i < selCount) {
                // 重置上下文
                temp = context;

                selector = selectors[i];

                if (t.BEGINIDAPART.test(selector)) {    // 优化以id选择器开头且上下文是document的情况
                    if (typeof context[0].getElementById !== "undefined") {
                        //alert("begin with id selector: " + RegExp.$1);    // @debug
                        temp = [t.getElemById(context[0], RegExp.$1)];
                        //alert("result: " + temp); // @debug
                        if (!temp[0]) {
                            continue;
                        }
                        selector = RegExp.rightContext;
                    } else {    // 上下文不是document, 恢复常规查找
                        selector = selectors[i];
                    }
                }

                // 处理后续的部分
                if (selector !== "") {
                    if (!t.STANDARD.test(selector)) {
                        selector = " " + selector;
                    }

                    // 分离换成字符串数组，从0开始双数是操作符，单数是操作数(例如 " *.class1" => [" ", "*", ".", "class1"])
                    matchs = selector.match(t.STREAM) || []; streamLen = matchs.length; j = 0;
                    //alert("stream: " + matchs);   // @debug
                    while (j < streamLen) {
                        token = matchs[j++]; filter = matchs[j++];
                        //alert(token + (this.operators[token] ? " is " : " is not ") + "exist");   // @debug
                        //alert("filter: " + filter);   // @debug
                        //alert("context: " + temp);    // @debug
                        temp = t.operators[token] ? t.operators[token](temp, filter) : [];
                        if (0 === temp.length) {
                            break;
                        }
                    }
                }

                N.array.merge(result, temp);
            }

            // 清空临时数组
            t.tempAttrValues.length = t.tempAttrs.length = 0;

            result = result.length > 1 ? t.unique(result) : result;

            if (ret) push.apply(ret, result, 0);

            return result;
        },

        // 属性替换处理函数
        analyzeAttrs: function ($1, $2, $3, $4) {
            return "[]" + (S.tempAttrs.push([$2, $3, $4]) - 1);
        },

        // 属性值替换处理函数
        analyzeAttrValues: function ($1, $2, $3) {
            return "=" + (S.tempAttrValues.push($3) - 1) + "]";
        },

        // 获取不重复的元素id
        // @param {HTMLElement} 元素
        // @return {Number} id
        generateId: function (elem) {
            var idName = this.idName, id;
            try {
                id = elem[idName] = elem[idName] || new Number(++this.id);
            } catch (e) {
                id = elem.getAttribute(idName);
                if (!id) {
                    id = new Number(++this.id);
                    elem.setAttribute(idName, id);
                }
            }
            return id.valueOf();
        },

        // 去除数组中的重复元素
        // @param {Array} 元素数组
        // @return {Array} 已去重复的元素数组
        unique: function (elems) {
            var result = [], i = 0, flags = {}, elem, id;
            while (elem = elems[i++]) {
                if (1 === elem.nodeType) {
                    id = this.generateId(elem);
                    if (!flags[id]) {
                        flags[id] = true;
                        result.push(elem);
                    }
                }
            }
            return result;
        },

        // 属性名映射
        attrMap: {
            "class": "className",
            "for": "htmlFor"
        },

        // 获取元素属性
        // @param {HTMLElement} 元素
        // @param {String} 属性名
        // @return {String} 属性值
        getAttribute: function (elem, attrName) {
            var trueName = this.attrMap[attrName] || attrName, attrValue = elem[trueName];
            if ("string" !== typeof attrValue) {
                if ("undefined" !== typeof elem.getAttributeNode) {
                    attrValue = elem.getAttributeNode(attrName);
                    attrValue = undefined == attrValue ? attrValue : attrValue.value;
                } else if (elem.attributes) {       // for IE5.5
                    attrValue = String(elem.attributes[attrName]);
                }
            }
            return null == attrValue ? "" : attrValue;
        },

        // 通过id获取元素
        // @param {HTMLElement} 上下文，一般是document
        // @param {String} id
        // @return {HTMLElement} 元素
        getElemById: function (context, id) {
            var result = context.getElementById(id);
            if (result && result.id !== id && context.all) {    // 修复IE下的id/name bug
                result = context.all[id];
                if (result) {
                    result.nodeType && (result = [result]);
                    for (var i = 0; i < result.length; i++) {
                        if (this.getAttribute(result[i], "id") === id) {
                            return result[i];
                        }
                    }
                }
            } else {
                return result;
            }
        },

        // 搜索指定位置的某标签名元素
        // @param {Array} 上下文
        // @param {String} 第一个元素相对位置
        // @param {String} 下一个元素相对位置
        // @param {String} 标签名
        // @param {Number} 最多进行多少次查找
        // @return {Array} 搜索结果
        getElemsByTagName: function (context, first, next, tagName, limit) {
            var result = [], i = -1, len = context.length, elem, counter, tagNameUpper;
            tagName !== "*" && (tagNameUpper = tagName.toUpperCase());

            while (++i < len) {
                elem = context[i][first]; counter = 0;
                while (elem && (!limit || counter < limit)) {
                    if (1 === elem.nodeType) {
                        (elem.nodeName.toUpperCase() === tagNameUpper || !tagNameUpper) && result.push(elem);
                        counter++;
                    }
                    elem = elem[next];
                }
            }

            return result;
        },

        // 根据指定顺序检查上下文父元素的第n个子元素是否该上下文元素
        // @param {Array} 上下文
        // @param {Number} 序号
        // @param {String} 第一个元素相对位置
        // @param {String} 下一个元素相对位置
        // @return {Array} 搜索结果
        checkElemPosition: function (context, seq, first, next) {
            var result = [];
            if (!isNaN(seq)) {
                var len = context.length, i = -1,
                    cache = {},     // 节点缓存
                    parent, id, current, child;

                while (++i < len) {
                    parent = context[i].parentNode;     // 找到父节点
                    id = this.generateId(parent);       // 为父节点生成一个id作为缓存键值

                    if (undefined === cache[id]) {  // 如果缓存中没有，则重新寻找父元素的第N个子元素
                        current = 0;            // 重置当前序号
                        child = parent[first];  // 第一个元素
                        while (child) {
                            1 === child.nodeType && current++;  // 序号加1
                            if (current < seq) {
                                child = child[next];    // 还没到指定序号，继续找
                            } else {
                                break;  // 已经到指定序号，中断循环
                            }
                        }
                        cache[id] = child || 0;     // 记下本次搜索结果
                    } else {
                        child = cache[id];
                    }
                    context[i] === child && result.push(context[i]);    // 搜索结果与节点相符
                }
            }
            return result;
        },

        // 获取特定位置的元素
        // @param {Array} 上下文
        // @param {Number} 第一个位置
        // @param {Number} 下一个位置递增量
        // @return {Array} 过滤结果
        getElemsByPosition: function (context, first, next) {
            var i = first, len = context.length, result = [];
            while (i >= 0 && i < len) {
                result.push(context[i]);
                i += next;
            }
            return result;
        },

        // 根据属性值过滤元素
        // @param {Array} 上下文
        // @param {Array} 属性数组
        // @return {Array} 过滤结果
        getElemsByAttribute: function (context, filter) {
            var result = [], elem, i = 0,
                check = this.attrOperators[filter[1] || ""],
                attrValue = "~=" === filter[1] ? " " + filter[2] + " " : filter[2];
            if (check) {
                while (elem = context[i++]) {
                    check(this.getAttribute(elem, filter[0]), attrValue) && result.push(elem);
                }
            }
            return result;
        },

        // 操作符
        operators: {

            // id选择符
            "#": function (context, id) {
                return S.getElemsByAttribute(context, ["id", "=", id]);
            },

            // 后代选择符
            " ": function (context, tagName) {
                var len = context.length;
                if (1 === len) {
                    return context[0].getElementsByTagName(tagName);
                } else {
                    var result = [], i = -1;
                    while (++i < len) {
                        N.array.merge(result, context[i].getElementsByTagName(tagName));
                    }
                    return result;
                }
            },

            // 类名选择器
            ".": function (context, className) {
                return S.getElemsByAttribute(context, ["class", "~=", className]);
            },

            // 子元素选择符
            ">": function (context, tagName) {
                return S.getElemsByTagName(context, "firstChild", "nextSibling", tagName);
            },

            // 同级元素选择符
            "+": function (context, tagName) {
                return S.getElemsByTagName(context, "nextSibling", "nextSibling", tagName, 1);
            },

            // 同级元素选择符
            "~": function (context, tagName) {
                return S.getElemsByTagName(context, "nextSibling", "nextSibling", tagName);
            },

            // 属性选择符
            "[]": function (context, filter) {
                filter = S.tempAttrs[filter];
                if (filter) {
                    if (S.ISINT.test(filter[2])) {
                        filter[2] = S.tempAttrValues[filter[2]];
                    }
                    return S.getElemsByAttribute(context, filter);
                } else {
                    return context;
                }
            },

            // 伪类选择符
            ":": function (context, filter) {
                var seq;
                if (S.PSEUDOSEQ.test(filter)) {
                    seq = parseInt(RegExp.$1);
                    filter = RegExp.leftContext;
                }
                return S.pseOperators[filter] ? S.pseOperators[filter](context, seq) : [];
            }
        },

        // 属性操作符
        attrOperators: {

            // 是否包含指定属性值
            "": function (value) { return value !== ""; },

            // 是否与指定属性值相等
            "=": function (value, input) { return input === value; },

            // 是否包含指定属性值
            "~=": function (value, input) { return (" " + value + " ").indexOf(input) >= 0; },

            // 是否与指定属性值不等
            "!=": function (value, input) { return input !== value; },

            // 属性值是否以某段字符串开头
            "^=": function (value, input) { return value.indexOf(input) === 0; },

            // 属性值是否以某段字符串结尾
            "$=": function (value, input) { return value.substr(value.length - input.length) === input; },

            // 属性值是否包含某段子字符串
            "*=": function (value, input) { return value.indexOf(input) >= 0; }
        },

        // 伪类选择符
        pseOperators: {

            // 获取第一个子元素
            "first-child": function (context) {
                return S.checkElemPosition(context, 1, "firstChild", "nextSibling");
            },

            // 获取第n个子元素
            "nth-child": function (context, seq) {
                return S.checkElemPosition(context, seq, "firstChild", "nextSibling");
            },

            // 获取最后一个子元素
            "last-child": function (context) {
                return S.checkElemPosition(context, 1, "lastChild", "previousSibling");
            },

            // 获取倒数第n个子元素
            "nth-last-child": function (context, seq) {
                return S.checkElemPosition(context, seq, "lastChild", "previousSibling");
            },

            // 获取第奇数个元素
            "odd": function (context) {
                return S.getElemsByPosition(context, 0, 2);
            },

            // 获取第偶数个元素
            "even": function (context) {
                return S.getElemsByPosition(context, 1, 2);
            },

            // 获取第N个元素前的元素
            "lt": function (context, seq) {
                return S.getElemsByPosition(context, seq - 1, -1);
            },

            // 获取第N个元素后的元素
            "gt": function (context, seq) {
                return S.getElemsByPosition(context, seq + 1, 1);
            }
        }
    };

    N.find = S.exec;
    N.$ = function (selector, context) {
        if (idSelect.test(selector)) {
            return doc.getElementById(selector.replace("#", ""));
        }
        return new N.fn.init(selector, context, true);
    };


    N.fn.extend({
        find: function (selector) {
            var i, l, length, n, r, ret,
            self = this;

            ret = this.pushStack("", "find", selector);

            for (i = 0, l = this.length; i < l; i++) {
                length = ret.length;
                N.find(selector, this[i], ret);

                if (i > 0) {
                    for (n = length; n < ret.length; n++) {
                        for (r = 0; r < length; r++) {
                            if (ret[r] === ret[n]) {
                                ret.splice(n--, 1);
                                break;
                            }
                        }
                    }
                }
            }

            return ret;
        }
    });


    rootDom = N(doc);

    if(W[n]){
        N.extend(W[n]);
    }
    W[n] = N;
})(window, "NE");