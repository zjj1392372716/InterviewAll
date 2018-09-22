
## 变量类型

JavaScript 是一种弱类型脚本语言，所谓弱类型指的是定义变量时，不需要什么类型，在程序运行过程中会自动判断类型。

### 一、ECMAScript 中定义了 6 种**原始类型**:

```js
Boolean
String
Number
Null
Undefined
Symbol(ES6)
```

> 原始类型不包含Object

> 题目：类型判断用到哪些方法？

**typeof**

```js
typeof "sss" ===> "string"
typeof 123 ===> "number"
typeof undefined ===> "undefined"
typeof NaN ===> "number"
typeof true ===> "boolean"

typeof function(){alert('111');}  ===> "function"
typeof null ===> "object"
typeof [1,2,3] ===> "object"
typeof new Date() ===> "object"
```

**instanceof**

用于实例对象和构造函数的对应。例如判断一个变量是否是数组，使用typeof无法判断，但可以使用`[1, 2] instanceof Array`来判断。因为，`[1, 2]`是数组，它的构造函数就是`Array`。同理：

```js
function Foo(name) {
	this.name = name
}

var foo = new Foo('zjj');

foo instanceof Foo  //true
```

```js
[1,2] instanceof Array === true
new String('213123') instanceof String === true
new Object() instanceof Object === true
new Array('1,2,3,5') instanceof === true

function () {} instanceof Function === true

// 一个构造器
function Person() {

}
// 一个构造函数
function Student() {

}
// 每一个构造函数都有一个prototype对象属性， 这个对象属性将会作为通过new Person()创建的对象的一个原型。
// 也就是当我们在new 一个对象的时候，这个对象的原型就指向了这个构造函数的prototype。
Student.prototype = new Person();

var bson = new Student();
bson instanceof Student // false
bson instanceof Person // true
```

**Object.prototype.toString.apply()**

判断基本数据类型和内置对象

```js

Object.prototype.toString.apply([]) == "[object Array]"
Object.prototype.toString.apply(function() {}) == "[object Function]"
Object.prototype.toString.apply(new Function) // "[object Function]"
Object.prototype.toString.apply(new Object);       // "[object Object]"
Object.prototype.toString.apply(new Date);         // "[object Date]"
Object.prototype.toString.apply(new Array);        // "[object Array]"
Object.prototype.toString.apply(new RegExp);       // "[object RegExp]"
Object.prototype.toString.apply(new ArrayBuffer);  // "[object ArrayBuffer]"
Object.prototype.toString.apply(Math);             // "[object Math]"
Object.prototype.toString.apply(JSON);             // "[object JSON]"

var promise = new Promise(function(resolve, reject) {
    resolve();
});
Object.prototype.toString.apply(promise);          // "[object Promise]"
Object.prototype.toString.apply(124)
// "[object Number]"
Object.prototype.toString.apply("222")
// "[object String]"
Object.prototype.toString.apply(true)
// "[object Boolean]"
Object.prototype.toString.apply(null)
// "[object Null]"
Object.prototype.toString.apply(null) === "[object Null]"   // 在IE6/7/8下存在有兼容性问题

```

### 二、值类型VS引用类型

有些人认为js中的类型应该称为是标签或者子类型。因为本身js的变量是在使用时才确定其类型的。 我们可以这么来定义： 对于语言引擎喝开发人员来说。类型是值的内部特性，它定义了值的行为，以区别与其他的值。


根据js中变量的类型传递方式可以分为**值类型**和**引用类型**

值类型变量包括 Boolean、String、Number、Undefined、Null，

引用类型包括Object类的所有，如：Date、Array、Function、等。


> 在参数传递方式上，值类型是按值传递，引用类型是按共享传递。

```js
// 值类型
var a = 10
var b = a
b = 20
console.log(a)  // 10
console.log(b)  // 20
```

```js
// 引用类型
var a = {x: 10, y: 20}
var b = a
b.x = 100
b.y = 200
console.log(a)  // {x: 100, y: 200}
console.log(b)  // {x: 100, y: 200}...

// 因为a和b都是引用类型，指向了同一个内存地址，即两者引用的是同一个值，因此b修改属性时，a的值随之改动。
```

再来看一个栗子

```js
function foo(a){
	a = a*10;
}

function bar(b) {
	b.value = 'new'
}

var a = 1;
var b = {value: 'old'}

foo(a);
bar(b);

```

> JS 中这种设计的原因是：按值传递的类型，复制一份存入栈内存，这类类型一般不占用太多内存，而且按值传递保证了其访问速度。按共享传递的类型，是复制其引用，而不是整个复制其值（C 语言中的指针），保证过大的对象等不会因为不停复制内容而造成内存的浪费。...

再来一个栗子

```js
var obj = {
	a: 1,
	b: [1,2,3]
}

var a = obj.a; // 值类型
var b = obj.b; // 引用类型

a = 2;
b.push(4);

console.log(a,b,obj);
// 2
// [1, 2, 3, 4]
// {a: 1, b: Array(4)}
```


### 三、js解析与执行过程

![](https://segmentfault.com/img/bVbe2UQ?w=1744&h=782)

**先来一个栗子**

```js
alert(a);  // 全局a为一个函数
function a(){ alter(2); } // 修改a的引用
alert(a);
var a = 1  // 修改a 的值
alert(a);
var a = 3;// 修改a 的值
alert(a);
function a(){ alter(4); }
alert(a);
a();
```

```js
- 第一个 alert(a)  弹出 function a(){ alter(4); } 函数体
- 第二个 alter(a)  弹出 function a(){ alter(4); } 函数体
- 第三个 alter(a)  弹出 1
- 第四个 alter(a)  弹出 3
- 第五个 alter(a)  弹出 3
- 最后一行报错 a is not a function
```

* 执行分析

```js

// 第1行，没有关键字 ， 不解析
// 第2行，遇到 function 关键字，解析到全局的头部
a = function a(){ alter(2); }
// 第3行，没有关键字 ， 不解析
// 第4行，遇到关键字 var ， 解析到全局的头部
a = undefined
// 第5行，没有关键字 ， 不解析
// 第6行，遇到关键字 var ， 解析到全局的头部
a = undefined
// 第8行，遇到 function 关键字，解析到全局的头部
a = function a(){ alter(4); }
// 第9行，没有关键字 ， 不解析
// 第10行，a() 函数调用
```

> function 优先与 var, 同名的后面覆盖前面的

> 因此，a = function a(){ alter(2); } 替换掉下面的2个 a = undefined ，a = function a(){ alter(4); } 又替换掉 a = function a(){ alter(2); } ,最终只剩下 a = function a(){ alter(4); }

**接下来我们进入正题哦**

### 3.1、 全局预处理和执行

#### 3.1.1、全局预处理阶段

-----------------

**实例0**

```js
var a = 5;
var b ;
function xxx(){
  // 用声明的方式创建的函数
}
var fun = function () {
  // 用函数表达式创建的函数
}
c = 5;  // 不会报错，但是也不会加入词法环境
```

> 假设全局我们创建了上诉的内容

* 首先js会创建一个词法环境对象`LexicalEnviroment`,全局下等同于我们的`window`；

```js
// 创建词法环境如下
LexicalEnviroment{
  a: undefined
  b: undefined
  xxx: 该函数的引用
  fun: undefined
}

// 这里有着变量提升的知识
```

-------------------------

**实例1**

```js
f(); // ff
g(); // 报错： g is not a function

function f(){
  console.log('ff');
}
var g = function() {
  //
}

// 【解析】
// 因为词法环境中f存在引用，g确实是undefined，因此当在为g赋值之前调用g会报错。
```

-------------------------

**实例2**

```js
console.log(a); // undefined
console.log(b); // 报错： b is not defined
var a = 1;
b = 4;

```

-------------------------

**实例3 变量重名**

```js
// 处理函数声明冲突 => 覆盖
alert(f);
var f = 0;
function f() {
  cosole.log('f');
}
// 执行结果： 弹出一个f函数的字符串


// 处理变量声明冲突  => 忽略
alert(f);
function f() {
  cosole.log('f');
}
var f = 0;
// 执行结果： 弹出一个f函数的字符串

// 【解析】
//  可见不是根据最后出现的覆盖前面的
```

-------------------------

####  3.1.2、全局执行阶段

**实例 4**

```js
alert(a);
alert(b);
alert(f);
alert(g);


var a = 5;
b = 6;
alert(b);
function f() {
  console.log('f');
}
var g = function () {
  console.log('g');
}
alert(g);

```

* 执行过程如下

```js
1. 构建词法环境
2. 词法环境如下
{
  f: function () {console.log('f')}
  a: undefined
  g: undefined
}
3. 开始执行
4. alert(a); // undefined
5. alert(b); // 报错： b is not defined
6. alert(f); // function () {console.log('f')}
7. alert(g); // undefined
8. a = 5;  b = 6                                  [window下的变量赋值]
9. alert(b); // 6
10. g = function () {console.log('g');}            [window下的变量赋值]
11. alert(g); // function () {console.log('g);}

// 最后的词法环境如下（window）
{
  f: function () {console.log('f')}
  a: 5
  g: function () {console.log('g');}
  b: 6
}
```

----------------

### 3.2、 函数预处理和执行

#### 3.2.1、函数预处理阶段 + 执行阶段


**实例 5**

```js
function f(a, b) {
  alert(a);
  alert(b);

  var b = 10;
  function a() {
    //
  }
}

f(1,2);
```

* 执行分析

```js
1. 1. 构建词法环境
2. 词法环境如下
{
  a: 最初是1， 因为冲突，最后变成了 函数的引用 function a() {// }
  b: 2

}
3. 开始执行
4. alert(a); // function a() {// }
5. alert(b); // 2

```
------------

**实例 6**

* 函数内部如果没有用var声明的变量，会成为最外部的词法环境的变量（也就是全局了）

```js

function a() {
  function b() {
    c = 100;
  }
  b();
}

a();

// window.c === 100
```

### 四、作用域

>  JavaScript是门动态语言，跟Java不一样，JavaScript可以随意定义全局变量和局部变量，变量会在该作用域下提升，而且JavaScript没有块级作用域。
>  全局变量就是定义在全局的变量了，局部变量是定义在函数里的变量，每一个函数都是一个作用域，当函数执行时会优先查找当前作用域，然后逐级向上。定义在
>  if 和 for 语句里的变量，在大括号外面也能访问到，这就是没有块级作用域。

![图片描述][1]

### 4.1、预处理 + 作用域解析

**JavaScript 的作用域只用两种，一个是全局的，一个是函数的，也称为 全局作用域 和 局部作用域 ；局部作用域 可以访问 全局作用域 。但是 全局作用域 不能访问 局部作用域**

有这样一段代码

```js
var a = 1;
function fn1(){
    alert(a);
    var a = 2;
}
fn1();
alert(a);
```
这里先揭晓答案：
```
第一个 alert(a) 弹出 undefined
第二个 alert(a) 弹出 1
```


**1. 预解析（预编译） 全局作用域 （全局词法环境）**

```js
// 全局词法环境
// 第1行，遇到 var 关键字，解析到全局的头部
a = undefined
// 第2行，遇到 function 关键字，解析到全局的头部
fn1 = function fn1(){
    alert(a);
    var a = 2;
}
// 第3行，没有遇到关键字，不解析
// 第4行，没有遇到关键字，不解析
```

**2. 开始执行代码**

```js
第1行，遇到表达式 a = 1, a 被赋值成 1
第6行，遇到函数调用 fn1() ,           ---- 开始 预解析（预编译） 局部-----
```


**3. 预解析（预编译） 局部作用域 (函数词法环境)**

```js
// 第3行，没有遇到关键字，不解析
// 第4行，遇到 var 关键字，解析到局部
a = undefined
```

**4. 开始执行 局部 代码**

```js
第3行，弹出 undefined
第4行，遇到表达式，把局部 a 改成 2
```

**5. 局部执行完成，继续执行全局**

```js
第7行，弹出 1 ，因为全局和局部是两个独立的作用域
```


------------------------------


### 4.2、作用域疑惑之处

**1. js没有块作用域**

**2. js不是动态作用域,js是静态作用域**

```js
function f(){
  alert(x);
}
function f1() {
  var x = 6;
  f();
}
function f2() {
  var x = 10;
  f();
}

f1();
// 执行会报错，因此js不是动态作用域哦
```

----------------

### 4.3、作用域链

```js
var a = 10;

function f() {
  var x = 100;
  function g () {
    //
  }
  g();
}
f();
```
* 作用域链解析

```js
1. 创建词法环境（window）
2. 加入 a 以及 f函数 ，这时候     【f.scope === window】
3. 进入f函数，创建f函数的词法环境  【f.le => f.scope】
4. 创建f 的词法环境
5. 添加x和 g函数 到f函数的词法环境 【g.scope === f.le】
6. 进入g函数，创建g函数的词法环境  【g.le => g.scope】
```

```js
g.le  ->  g->scope  ->  f.le  ->  f.scope  ->  window
```

----------------

### 4.4作用域的本质

```js
var a = 10;

function f() {
  var x = 100;
  function g () {
    //
    alert(a);
  }
  g();
}
f();
```

> 我们在g内部使用了变量a，想要找到a，
> 1. 首先在g的词法环境中查找，如果没找到
> 2. 到g.scope 也就是 f的词法环境中查找，如果依旧没找到
> 3. 到f.scope 也就是 全局词法环境中查找。
