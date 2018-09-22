## undefined && undeclared

```js
var a;
typeof a; // "undefined"
var b = 32;
b = a;
typeof b;  //"undefined"


// ===============

typeof c // "undefined"

c  // 未声明所以报错了
// VM418:1 Uncaught ReferenceError: c is not defined
    // at <anonymous>:1:1
```

我们通常认为声明未赋值的变量为undefined，相反在作用域中没有声明过的变量应该是undeclared（未声明）.

这里的`undefined`和 `is not defined`是两码事。typeof对于这两种情况的处理是一样的。

```js
var a ;

typeof a; //"undefined"
typeof b; //"undefined"
```

造成上诉现象的原因是typeof的一种特殊安全防范机制。

> 案例一: 我们在调试模式下会加载一个文件，这个文件存在一个全局的变量`DEBUG`,我们怎么判断它是否存在呢？

```js
// 错误做法
if(DEBUG) {
	//
}

// 正确做法
if(typeof DEBUG != "undefined") {
	//
}
```

> 案例二 :如果存在某一个方法，那么就用存在的这个方法，如果不存在那么就用自己新定义的。

```js

function doSome() {
	var helper = typeof FeatureXYZ != "undefined" ? FeatureXYZ : function () {
		// my FeatureXYZ
	}
	var val = helper();
}

doSome();
```

```js
// 或者也可以使用一种依赖注入的设计模式
function doSome(FeatureXYZ) {
	var helper = FeatureXYZ ||
			function () { /**/ }
	var val = helper();
}

```

**总结**

> js 将 undefined 和 undeclared  混为一谈，并且typeof对他们的处理效果是相同的。然而针对typeof 的安全防范机制，来检查undeclared的变量，有时候还是一个不错的办法。
