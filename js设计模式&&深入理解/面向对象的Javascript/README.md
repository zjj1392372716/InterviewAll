# 面向对象的JAVASCRIPT

## 1.1动态语言类型和鸭子类型

### 1.1.1 动态语言类型

**编程语言类型**

```
按照数据类型可以将编程语言类型分为两类：

1. 静态类型语言
2. 动态类型语言
```

**静态类型语言(c、c++)**

```
1. 编译的时候就确定了变量类型是否匹配
2. 声明一个变量时，必须指定相应的数据类型
3. 迫使程序员依照强契约来编写程序，这些细节会使得程序员分散精力，而使得不能更好思考逻辑
```

**动态类型语言（python、js）**

```
1. 变量时弱类型的，变量被赋值时，才会确定其类型
2. 代码少、较简洁，更多的精力能处理业务逻辑
3. js就是一门动态类型语言
```

### 1.1.2 鸭子类型

> 如果它走路像鸭子。叫声像鸭子，那么就可以把它当作鸭子，即使它本身并不是鸭子。

![](https://images2018.cnblogs.com/blog/1152050/201808/1152050-20180801113037858-1016805123.png)

其知道我们关注的应该时对象的行为，并不是关注对象本身，也就是我们应该关注`HAS-A`,而不是关注`IS-A`;

```js
// 无需检查动物的类型，只需保证它们拥有duckSinging方法，无论它是猫狗
<script>
    var duck = {
      duckSinging: function () {
        console.log('嘎嘎嘎');
      }
    }

    var chicken = {
      duckSinging: function () {
        console.log('嘎嘎嘎');
      }
    }

    var joinArr = [];

    function join(animal) {
      if (animal && typeof animal.duckSinging === 'function') {
        joinArr.push(animal);
        console.log('新加入一个成员');
      }
    }

    join(duck);
    join(chicken);
  </script>
```

利用鸭子类型的思想，我们不必借助超类型的帮助，就能轻松地在动态类型语言中实现一个原则：“面向接口编程，而不是面向实现编程”。

* 我们将伪数组转换为数组的方法也是鸭子类型：

```js
var arr = Array.prototype.slice.apply({0: "a",1: "b", 2: "c", length: 3})
console.log(Array.isArray(arr));    //true
```

## 1.2 多态

> 多态： 同一个操作作用与不同的对象上的时候，可以产生不同的解释和不同的运行结果。

```
比如说，同样是动物，一只鸭子、一只鸡，当主任发出叫的命令的时候，鸭子会“嘎嘎嘎”，鸡呢会“咕咕咕”。这就是多态的一种表现。
```

**js对象的多态**

```js
// 鸡鸭狗，根据命令，做出不同的动作
<script>
    function makeSound (animal) {
      animal.sound();
    }

    function Duck() {

    }

    Duck.prototype.sound = function() {
      console.log('嘎嘎嘎');
    }

    var checken = function() {

    }

    checken.prototype.sound = function() {
      console.log('咕咕咕');
    }

    makeSound(new Duck());
    makeSound(new checken());
    

    var Dog = function() {

    }

    Dog.prototype.sound = function() {
      console.log('汪汪汪');
    }

    makeSound(new Dog());
  </script>
```

**如果是静态类型语言，类型检查是表现多态性所无法绕过去的一个问题，但是js是一门动态类型语言，并不需要进行类型检查，因此实现起来更为简单一些。**

类比于我们的静态类型语言，比如java，java中的多态是通过继承与同一个父类，借助于父类的类型来实现多态的。所以由于js天生就是动态类型语言，并不做类型检查，因此，js对象的多态性是与生俱来的。

因此针对上诉例子，当某一种动物是否发出声音，并不取决于它是否是某一种类型的对象，而是取决于是否含有sound方法。所以js种并不需要诸如java等通过转型来实现多态。

**多态的优点**

> 多态最根本的好处在于，你不需要询问对象是什么类型，而后根据得到的答案来调用相应哒方法。而是你只管询问即可，其他一切自动执行。

* 再来一个例子

```js
    function googleMap() {

    }
    googleMap.prototype.show = function() {
      console.log('谷歌地图...');
    }

    function baiduMap() {

    }
    baiduMap.prototype.show = function() {
      console.log('百度地图...');
    }

    function renderMap(map) {
      if(map.show instanceof Function) {
        map.show();
      }
    }

    renderMap(new googleMap());
```