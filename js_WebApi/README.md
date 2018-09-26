
## 一、DOM

> DOM和HTML的区别和联系

讲DOM要先从HTML讲起，讲HTML要先从XML讲起。XML是一种可扩展的标记语言，所谓可扩展，就是它可以描述任何结构化的数据。它允许你自定义标签，但是HTML虽然跟其有类似，但是还是有很大的不同。HTML是超文本标记语言，它不允许去自定义标签，W3C维护下它自己有自己既定的一套标签规则。为什么要定这些规则，这其实是出于对语义化的考虑，为了让浏览器能够更好的解析，所以必须对标签的名字、层级、和属性，进行标准化处理。同时这也能方便搜索引擎能够更好的识别。HTML5在语义化上做了更多的突破。

浏览器要把这个文档中的 HTML 按照标准渲染成一个页面，此时浏览器就需要将这堆代码处理成自己能理解的东西，也得处理成 JS 能理解的东西，因为还得允许 JS 修改页面内容呢。

基于这些需求，浏览器会将HTML转换为DOM。我们可以理解DOM树其实就是js能识别的一种结构。（一个普通的js对象或者数组）

![](https://user-gold-cdn.xitu.io/2018/2/23/161c1050cf00d5bd?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

**获取dom**

```js
document.getElementById('div');

document.getElementsByTagName('div');

document.getElementsByClassName('container');

document.querySelectorAll('.active');
```

> 题目：property 和 attribute 的区别是什么？

**property**

DOM 节点就是一个 JS 对象，它符合之前讲述的对象的特征 —— 可扩展属性，因为 DOM 节点本质上也是一个 JS 对象。因此，如下代码所示，p可以有style属性，有className nodeName nodeType属性。注意，这些都是 JS 范畴的属性，符合 JS 语法标准的.

```js
var pList = document.querySelectorAll('p');
var p = pList[0];

console.log(p.style.width);
p.style.width = '100px';
console.log(p.className);
p.className = 'active';

console.log(p.nodeName);
console.log(p.nodeType);
```

**attribute**

property 的获取和修改，是直接改变 JS 对象，而 attribute 是直接改变 HTML 的属性，两种有很大的区别。attribute 就是对 HTML 属性的 get 和 set，和 DOM 节点的 JS 范畴的 property 没有关系。

```js
var pList = document.querySelectorAll('p');
var p = pList[0];

p.getAttribute('data-name');
p.setAttribute('data-name', 'zjj');
p.getAttribute('style');
p.setAttribute('style', 'font-size: 30px');
```
* 注意： get 和 set attribute 时，还会触发 DOM 的查询或者重绘、重排，频繁操作会影响页面性能。


> DOM操作的基本API有哪些

**新增节点**

```js
var div1 = document.getElementById('div1')

var p = document.createElement('p');
p.innerHTML = 'p is ,,,';
div1.appendChild(p);

// 移动已有节点。注意，这里是“移动”，并不是拷贝
var p2 = document.getElementById('p2')
div1.appendChild(p2)
```

**获取父元素**

```js
var div1 = document.getElementById('div1')
var parent = div1.parentElement
```

**获取子元素**

```js
var div1 = document.getElementById('div1')

var child = div1.childNodes;
```

**删除元素**

```js
var div1 = document.getElementById('div1')
var child = div1.childNodes
div1.removeChild(child[0])
```

## 二、事件

**事件绑定**

```js
var btn = document.getElementById('btn');

btn.addEventListener('click', function(event) {
	event.preventDefault(); // 阻止默认事件
	event.stopPropagation(); // 阻止冒泡
})
```

为了编写简单的事件绑定，可以编写通用的事件绑定函数。这里虽然比较简单，但是会随着后文的讲解，来继续完善和丰富这个函数.

```js
//通用的事件绑定函数
function bindEvent(elem, type, fn) {
	elem.addEventListener(type, fn);
}

var a = document.getElementById('app');
bindEvent(a, 'click', function(e) {
	e.preventDefault(); // 阻止默认事件
	e.stopPropagation(); // 阻止冒泡
})
```

**最后，如果面试被问到 IE 低版本兼容性问题，我劝你果断放弃这份工作机会。现在互联网流量都在 App 上， IE 占比越来越少，再去为 IE 浪费青春不值得，要尽量去做 App 相关的工作。**

> 题目：什么是事件冒泡？

**事件冒泡**

```html
<body>
    <div id="div1">
        <p id="p1">激活</p>
        <p id="p2">取消</p>
        <p id="p3">取消</p>
        <p id="p4">取消</p>
    </div>
    <div id="div2">
        <p id="p5">取消</p>
        <p id="p6">取消</p>
    </div>
</body>
```
要求点击p1时候进入激活状态，点击其他任何<p>都取消激活状态，如何实现？

```js
var body = document.body
bindEvent(body, 'click', function (e) {
    // 所有 p 的点击都会冒泡到 body 上，因为 DOM 结构中 body 是 p 的上级节点，事件会沿着 DOM 树向上冒泡
    alert('取消')
})

var p1 = document.getElementById('p1')
bindEvent(p1, 'click', function (e) {
    e.stopPropagation() // 阻止冒泡
    alert('激活')
})
```

> 题目：如何使用事件代理？有何好处？

我们设定一种场景，如下代码，一个<div>中包含了若干个<a>，而且还能继续增加。那如何快捷方便地为所有<a>绑定事件呢？

```html
<div id="div1">
    <a href="#">a1</a>
    <a href="#">a2</a>
    <a href="#">a3</a>
    <a href="#">a4</a>
</div>
<button>点击增加一个 a 标签</button>
```

```js
var div = document.getElementById('#div1');

div.addEventListener('click', function(e) {
	var target = e.target;

	if(e.nodeName == 'A') {
		console.log(target.innerHTML);
	}
})
```

我们现在完善一下之前写的通用事件绑定函数，加上事件代理。

```js
function bindEvent(elem, type, selector, fn) {
	// 这样处理，可接收两种调用方式 bindEvent(div1, 'click', 'a', function () {...}) 和 bindEvent(div1, 'click', function () {...}) 这两种

	if(fn == null) {
		fn = selector;
		selector = null;
	}

	elm.addEventListener(type, function(e) {
		var target
		if(selector) {
			// 获取触发事件的元素，即 e.target
			target = e.target
			if(target.matches(selector)) {
				fn.call(target, e);
			}
		} else {
			fn(e);
		}
	})

}
```

```js
// 使用代理，bindEvent 多一个 'a' 参数
var div1 = document.getElementById('div1')
bindEvent(div1, 'click', 'a', function (e) {
    console.log(this.innerHTML)
})

// 不使用代理
var a = document.getElementById('a1')
bindEvent(div1, 'click', function (e) {
    console.log(a.innerHTML)
})
```
