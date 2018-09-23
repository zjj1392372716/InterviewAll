
## 执行上下文

在JavaScript的运行过程中，经常会遇到一些"奇怪"的行为，不理解为什么JavaScript会这么工作。

### 执行上下文

js有三种代码环境

```
global Code  最开始的默认环境
Function code 代码进入一个函数
Eval Code  使用eval()执行代码
```

**为了表示不同的运行环境，JavaScript中有一个执行上下文（Execution context，EC）的概念。也就是说，当JavaScript代码执行的时候，会进入不同的执行上下文，这些执行上下文就构成了一个执行上下文栈（Execution context stack，ECS）。**

栗子：

```js
var a = "global var";

function foo(){
    console.log(a);
}

function outerFunc(){
    var b = "var in outerFunc";
    console.log(b);

    function innerFunc(){
        var c = "var in innerFunc";
        console.log(c);
        foo();
    }

    innerFunc();
}


outerFunc()
```

代码首先进入Global Execution Context，然后依次进入outerFunc，innerFunc和foo的执行上下文，执行上下文栈就可以表示为：

![](https://images2015.cnblogs.com/blog/593627/201510/593627-20151025201151427-127726802.png)

当JavaScript代码执行的时候，第一个进入的总是默认的Global Execution Context，所以说它总是在ECS的最底部。

对于每个Execution Context都有三个重要的属性，变量对象（Variable object，VO），作用域链（Scope chain）和this。这三个属性跟代码运行的行为有很重要的关系，下面会一一介绍。

当然，除了这三个属性之外，根据实现的需要，Execution Context还可以有一些附加属性。

![](https://images2015.cnblogs.com/blog/593627/201510/593627-20151025201152849-1821016303.png)

### VO & AO

变量对象（Variable object，VO）它是一个与上下文相关的特殊对象，其中存储了在上下文中定义的变量和函数声明。也就是说，一般VO中会包含以下信息：

```
变量 (var, Variable Declaration);
函数声明 (Function Declaration, FD);
函数的形参
```

当代码运行的时候，如果试图寻找一个变量，就会首先从VO中查找，对于前面的栗子，Global Execution Context中的VO就可以表示如下：

![](https://images2015.cnblogs.com/blog/593627/201510/593627-20151025201154239-918576092.png)

* 对于VO，是有下面两种特殊情况的：

```
函数表达式（与函数声明相对）不包含在VO之中
没有使用var声明的变量,不在VO
```

### 活动对象AO

只有在全局上下文的变量对象允许通过VO间接访问，在函数执行上下文中，vo是不能被直接访问的。此时由激活对象(Activation Object,缩写为AO)扮演VO的角色。激活对象 是在进入函数上下文时刻被创建的，它通过函数的arguments属性初始化。

Arguments Objects 是函数上下文里的激活对象AO中的内部对象，它包括下列属性：

```
callee：指向当前函数的引用
length： 真正传递的参数的个数
properties-indexes：就是函数的参数值(按参数列表从左到右排列)
```

**如何区分AO和VO呢？**

> 对于VO和AO的关系可以理解为，VO在不同的Execution Context中会有不同的表现：当在Global Execution Context中，可以直接使用VO；但是，在函数Execution Context中，AO就会被创建。

当上面的例子开始执行outerFunc的时候，就会有一个outerFunc的AO被创建：

![](https://images2015.cnblogs.com/blog/593627/201510/593627-20151025201156317-195051519.png)

### 细看Execution Context

当一段代码执行的时候，js会创建Execution Context，其实就是会有两个阶段：

```
创建阶段
	创建 Scope
	创建VO/Ao
	设置this
激活执行阶段
	设置变量和函数的引用，然后解释执行代码

```

---------

**实例1**

```js
function foo(i) {
    var a = 'hello';
    var b = function privateB() {

    };
    function c() {

    }
}

foo(22);
```
对于上面的代码，在"创建阶段"，可以得到下面的Execution Context object：
```js
fooExecutionContext  = {
	scopeChan: {},
	variableObject: {
		arguments: {
			0: 22,
			length: 1
		},
		i: 22,
		c: point function() {},
		a: undefined,
		b: undefined
	},
	this: {}
}
```
在"激活/代码执行阶段"，Execution Context object就被更新为：

```js
fooExecutionContext  = {
	scopeChan: {},
	variableObject: {
		arguments: {
			0: 22,
			length: 1
		},
		i: 22,
		c: point function() {},
		a: 'hello',,
		b: pointer to function privateB()
	},
	this: {}
}
```
