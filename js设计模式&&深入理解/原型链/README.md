
# js 原型 & 原型链


js 是基于原型的语言

> 题目1： 如何理解原型？

```
1. js一切都是对象，我们广义上说的对象Object其实可以理解为是引用类型，引用类型包括很多了，比如
数组、对象、函数、等，他们都具有对象特性。无论是js中已经有了的这些引用类型，还是我们自定义new 出来的
对象。他们都具有可扩展性，有一个属性是__proto__。

2. __proto__属性值是一个对象。被称为是原型对象。

3. 所有的函数都有一个prototype属性，这个属性值也是一个对象。

4. 所有的引用类型，__proto__属性值指向它的构造函数的prototype的属性值。

```


通过代码来演示一下：

```
// 自由扩展属性
var obj = {};
obj.a = 1;
var arr = [];
arr.b = 10;

function fn(){

}
fn.a = 100;
var f = new fn();
f.m = 10;

// __proto__
console.log(obj.__proto__);   Object().prototype
console.log(arr.__proto__);   Array().prototype
console.log(fn.__proto__);	  f() { [native code] }
console.log(f.__proto__);	  fn().prototype

// 函数的prototype
console.log(fn.prototype)


// // 要点四：引用类型的 __proto__ 属性值指向它的构造函数的 prototype 属性值
console.log(obj.__proto__ === Object.prototype) // true
console.log(f.__proto__ === fn.prototype) // true
```


**实例**

```
// 构造函数
function Foo(name, age) {
    this.name = name
}
Foo.prototype.alertName = function () {
    alert(this.name)
}
// 创建示例
var f = new Foo('zhangsan')
f.printName = function () {
    console.log(this.name)
}
// 测试
f.printName()
f.alertName()
```

当试图得到一个对象的某一个属性的时候，如果这个对象本身没有，那么就回去他的__proto__
（即他的构造函数的prototype）中去寻找。因此f.alertName就会找到Foo.prototype.alertName。

那么如何判断这个属性是不是对象本身的属性呢？使用hasOwnProperty，常用的地方是遍历一个对象的时候。

```
var item
for (item in f) {
    // 高级浏览器已经在 for in 中屏蔽了来自原型的属性，但是这里建议大家还是加上这个判断，保证程序的健壮性
    if (f.hasOwnProperty(item)) {
        console.log(item)
    }
}...
```

---------------

> 怎么理解原型链呢？

还是接着上面的示例，如果执行f.toString()时，又发生了什么？

```
// 省略 N 行

// 测试
f.printName()
f.alertName()
f.toString()
```
因为f本身没有toString()，并且f.__proto__（即Foo.prototype）中也没有toString。这个问题还是得拿出刚才那句话——当试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么会去它的__proto__（即它的构造函数的prototype）中寻找。...

如果在f.__proto__中没有找到toString，那么就继续去f.__proto__.__proto__中寻找，因为f.__proto__就是一个普通的对象而已嘛！

```
1. f.__proto__即Foo.prototype，没有找到toString，继续往上找

2. f.__proto__.__proto__即Foo.prototype.__proto__

3. Foo.prototype就是一个普通的对象，因此Foo.prototype.__proto__就是Object.prototype，在这里可以找到toString
 
4. 因此f.toString最终对应到了Object.prototype.toString

5. f.__proto__.__proto__.__proto__ 是NULL了

```

再来一个图，应该能更好的理解了

![](https://segmentfault.com/img/bVbe5YI?w=1092&h=431)

