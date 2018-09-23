
## 理解 JS 作用域链与执行上下文

### 一、 变量提升

一道经典的面试题

```js
var a=1;
function foo(){
  a=10;
  return;
  function a(){ }
}
foo();
console.log(a);
```

```js
解析...

var a = undefined;
var foo = function() {
	// 内部解析后。。。
	var a = function() {}
	a = 10 // 这里只是更改了函数内部作用域内的a值

	return;
}
a = 1;

// 一下是执行和输出
foo();
console.log(a);  // 这里显全局的a
```

**在我们浏览器会先解析一遍我们的脚本，完成一个初始化的步骤（也就是预处理阶段），它遇到 var 变量时就会先初始化变量为 undefined 。这就是变量提升（hoisting ），它是指，浏览器在遇到 JS 执行环境的 初始化，引起的变量提前定义。**


---------------------

### 二、执行上下文

执行上下文，又称为执行环境（execution context）

```js
function add(x, y) {
    return x + y;
}

var result = add(1, 2);
```

这段代码也很简洁，但在 JavaScript 引擎内部发生的事情可并不简单。

正如，上一节，变量提升 所论述，JS 引擎会初始化我们声明 函数 和 变量 。

这里有三个时期：`初始化 执行上下文`、`运行 执行上下文`、`结束 执行上下文`。


**1初始化执行上下文**

![](https://user-gold-cdn.xitu.io/2018/4/1/1627ea21a29218f5?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

在函数未调用之前，已经有 add 函数的[[Scope]]属性所保存的 作用域链 里面已经有这些东西了。

当执行此函数时，会建立一个称为 执行上下文 (execution context) 的内部对象。

一个 执行上下文 定义了一个函数执行时的环境，每次调用函数，就会创建一个 执行上下文 ;

**2 运行执行上下文**

![](https://user-gold-cdn.xitu.io/2018/4/1/1627ea21a29218f5?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

**3 结束执行上下文阶段**

![](https://user-gold-cdn.xitu.io/2018/4/1/1627ea255d0e29f9?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)


> 管理多个执行上下文，其实是用的 上下文执行栈。执行上下文我需要单独拿出来好好学学

--------------

### 三、作用域链解析

> 每一个 javaScript 函数都表示为一个对象，更确切地说，是 Function 对象的一个实例。
Function 对象同其他对象一样，拥有可编程访问的属性。和一系列不能通过代码访问的 属性，而这些属性是提供给 JavaScript 引擎存取的内部属性。其中一个属性是 [[Scope]] ，由 ECMA-262标准第三版定义。
内部属性 [[Scope]] 包含了一个函数创建的作用域中对象的集合。
这个集合被称为函数的 作用域链，它能决定哪些数据能被访问到。
来源于：《 高性能JavaScript 》

通过下面方法可以看到这个[[scope]]

![](https://user-gold-cdn.xitu.io/2018/3/31/1627b7ed6cf26b10?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

[[Scope]] 属性下是一个数组，里面保存了，作用域链


* 看一个经典的栗子吧

```js
var testValue = 'outer';

function bar() {
  var testValue = 'inner';

  foo();

  console.log(bar.prototype)	// 编号 1

  function foo() {
    console.log(testValue);		// "inner"

    console.log(foo.prototype);	// 编号 2
  }
}

bar();
// result:
//
```
![](https://i.postimg.cc/6Qhf3Wqf/TT9_BXCUX_W_ECX7_XY52_R.png)

![](https://i.postimg.cc/h4XZCmfF/XU_YSJ38_N3_O51_HCQYXO_X.png)

![](https://i.postimg.cc/Z0kdH20q/NYAE_ZU0_2_Q1_3_V0_O8_CWB4.png)

Closure 就是闭包的意思 。

作用域链，是在 JS 引擎 完成 初始化执行上下文环境，已经确定了，这跟我们 变量提升 小节讲述得一样。

它保证着 JS 内部能正常查询 我们需要的变量！。

**作用域链的优缺点**

> 我们知道，如果作用域链越深， [0] => [1] => [2] => [...] => [n]，我们调用的是 全局变量，它永远在最后一个(这里是第 n 个)，这样的查找到我们需要的变量会引发多大的性能问题？JS 引擎查找变量时会耗费多少时间？
所以，这个故事告诉我们，尽量将 全局变量局部化 ，避免，作用域链的层层嵌套，所带来的性能问题。
