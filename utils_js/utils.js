(function(window){

    'use strict';
    /*
        Meils 的工具函数库

        【目录】
        1、 trim()          去除字符串中的空格（空白）
        2、 getByClass()    通过 className 来获取 DOM
        3、 replaceStr()    字符串替换
        4、 changeCase()    字母大小写切换
        5、 factorial()     某一个数的阶层
        6、 myBrowser()     判断浏览器类型
        7、 getRandomInt    产生某一范围的随机数,包括边界值
        8、 shuffle()       洗牌法，将数组打乱顺序
				9、 bindEvent()     事件绑定 和 事件委托
    */
    function define_library() {
        var Library = {};
        var author = "Meils";
        /**
         * 【1】去除字符串中的空格（空白）
         * @param {字符串} str
         * @param {操作类型 1-所有空格  2-前后空格  3-前空格 4-后空格 } type
         */
        Library.trim = function(str, type) {
            switch(type) {
                case 1: return str.replace(/\s+/g, "");
                case 2: return str.replace(/(^\s*)|(\s*$)/g, "");
                case 3: return str.replace(/(^\s*)/g, "");
                case 4: return str.replace(/(\s*$)/g, "");
                default: return str;
            }
        }
        /**
         * 【2】通过 className 来获取 DOM
         * @param {父级Dom} parent
         * @param {查找的class值} className
         */
        Library.getByClass = function(parent, className) {
            if(parent.getElementsByClassName) {
                return parent.getElementsByClassName(className);
            } else {
                var result = [];
                var elems = parent.getElementsByTagName("*");
                var reg = /'\\b'+className+'\\b'/;
                for(var i = 0; i< elems.length; i++) {
                    if(reg.test(elems[i].className)) {
                        result.push(elems[i]);
                    }
                }
                return result;
            }
        }
        /**
         * 【3】字符串替换
         * @param {初始字符串} str
         * @param {需要查找的子字符串} strFind
         * @param {替换为的字符串} strReplace
         */
        Library.replaceStr = function(str, strFind, strReplace) {
            var reg = new RegExp(strFind, "g");
            return str.replace(reg, strReplace);
        }
        /**
         * 【4】字母大小写切换
         * @param {源字符串} str
         * @param {操作类型 1-首字母大写 2-首字母小写 3-大小写转换 4-全部大写 5-全部小写} type
         */
        Library.changeCase = function(str, type) {
            // 大写转小写小写转大写
            function toggleCase(str) {
                var result = "";
                str.split("").forEach(function(item) {
                    if(/^([a-z]+)/.test(item)) {
                        result += item.toUpperCase();
                    } else if(/^[A-Z]+/.test(item)) {
                        result += item.toLowerCase();
                    } else {
                        result += item;
                    }
                })
                return result;
            }
            switch(type) {
                case 1: return str.replace(/^(\w)(\w+)/, function(v, v1, v2) {
                    return v1.toUpperCase() + v2.toLowerCase();
                });
                case 2: return str.replace(/^(\w)(\w+)/, function(v, v1, v2) {
                    return v1.toLowerCase() + v2.toUpperCase();
                });
                case 3: return toggleCase(str);
                case 4: return str.toUpperCase();
                case 5: return str.toLowerCase();
                default: return str;
            }
        }
        /**
         * 【5】计算某一个数的阶乘 5！ = 120
         * @param {数值} n
         */
        Library.factorial = function(n) {
            if( n === 0) {
                return 1;
            } else {
                return n * this.factorial(n-1);
            }
        }

        /**
         * 【6】判断浏览器类型
         * @param {Navigator对象的userAgent属性} userAgent
         */
        Library.myBrowser = function(userAgent) {
            var result={
                  isIE6: /msie 6.0/.test(UserAgent), // IE6
                  isIE7: /msie 7.0/.test(UserAgent), // IE7
                  isIE8: /msie 8.0/.test(UserAgent), // IE8
                  isIE9: /msie 9.0/.test(UserAgent), // IE9
                  isIE10: /msie 10.0/.test(UserAgent), // IE10
                  isIE11: /msie 11.0/.test(UserAgent), // IE11
                  isLB: /lbbrowser/.test(UserAgent), // 猎豹浏览器
                  isUc: /ucweb/.test(UserAgent), // UC浏览器
                  is360: /360se/.test(UserAgent), // 360浏览器
                  isBaidu: /bidubrowser/.test(UserAgent), // 百度浏览
                  isSougou: /metasr/.test(UserAgent), // 搜狗浏览器
                  isChrome: /chrome/.test(UserAgent),
                  //Chrome浏览器
                  isFirefox: /firefox/.test(UserAgent), // 火狐浏览器
                  isOpera: /opera/.test(UserAgent), // Opera浏览器
                  isSafiri: /safari/.test(UserAgent) && !/chrome/.test
             (UserAgent), // safire浏览器
                  isQQ: /qqbrowser/.test(UserAgent)//qq浏览器
            };

            return result;
        }
        /**
         * 【7】产生随机数（包括有边界的数）
         * @param {左边界} min
         * @param {有边界} max
         */
        Library.getRandomInt = function(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min)
        }

        /**
         * 【8】洗牌法，将数组打乱顺序
         * @param {源数组} arr
         */
        Library.shuffle = function(arr) {
            // 洗牌法，将数组打乱顺序
            var _arr = arr.slice() // 缓冲
            for(var i = 0; i < _arr.length; i++) {
                var j = this.getRandomInt(0, i) // 借助了上一个函数

                var t = _arr[i]
                _arr[i] = _arr[j]
                _arr[j] = t
            }

            return _arr
        }
				/**
				 * 【9】事件绑定 和 事件委托
				 * @param  {[dom对象]}   elem     [DOM元素]
				 * @param  {[字符串]}   type     [绑定的事件类型]
				 * @param  {[字符串]}   selector [可选，事件委托的时候用]
				 * @param  {Function} fn       [回调函数]
				 * @return {[type]}            [无]
				 */
				// 这样处理，可接收两种调用方式 bindEvent(div1, 'click', 'a', function () {...}) 和 bindEvent(div1, 'click', function () {...}) 这两种
				Library.bindEvent = function(elem, type, selector, fn) {
					if(fn == null) {
						fn = selector;
						selector = null;
					}

					elem.addEventListener(type, function(e) {
						var target
						if(selector) {
							target = e.target
							if(target.matches(selector)){
								fn.call(target, e);
							}
						} else {
							fn(e);
						}
					})
				}

        return Library;
    }

    if(typeof Library == "undefined") {
        window.Library = define_library();
    } else {
        console.error('Library is already define');
    }
})(window);
