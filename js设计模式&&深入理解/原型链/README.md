
# js ԭ�� & ԭ����


js �ǻ���ԭ�͵�����

> ��Ŀ1�� ������ԭ�ͣ�

```
1. jsһ�ж��Ƕ������ǹ�����˵�Ķ���Object��ʵ�������Ϊ���������ͣ��������Ͱ����ܶ��ˣ�����
���顢���󡢺������ȣ����Ƕ����ж������ԡ�������js���Ѿ����˵���Щ�������ͣ����������Զ���new ������
�������Ƕ����п���չ�ԣ���һ��������__proto__��

2. __proto__����ֵ��һ�����󡣱���Ϊ��ԭ�Ͷ���

3. ���еĺ�������һ��prototype���ԣ��������ֵҲ��һ������

4. ���е��������ͣ�__proto__����ֵָ�����Ĺ��캯����prototype������ֵ��

```


ͨ����������ʾһ�£�

```
// ������չ����
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

// ������prototype
console.log(fn.prototype)


// // Ҫ���ģ��������͵� __proto__ ����ֵָ�����Ĺ��캯���� prototype ����ֵ
console.log(obj.__proto__ === Object.prototype) // true
console.log(f.__proto__ === fn.prototype) // true
```


**ʵ��**

```
// ���캯��
function Foo(name, age) {
    this.name = name
}
Foo.prototype.alertName = function () {
    alert(this.name)
}
// ����ʾ��
var f = new Foo('zhangsan')
f.printName = function () {
    console.log(this.name)
}
// ����
f.printName()
f.alertName()
```

����ͼ�õ�һ�������ĳһ�����Ե�ʱ��������������û�У���ô�ͻ�ȥ����__proto__
�������Ĺ��캯����prototype����ȥѰ�ҡ����f.alertName�ͻ��ҵ�Foo.prototype.alertName��

��ô����ж���������ǲ��Ƕ�����������أ�ʹ��hasOwnProperty�����õĵط��Ǳ���һ�������ʱ��

```
var item
for (item in f) {
    // �߼�������Ѿ��� for in ������������ԭ�͵����ԣ��������ｨ���һ��Ǽ�������жϣ���֤����Ľ�׳��
    if (f.hasOwnProperty(item)) {
        console.log(item)
    }
}...
```

---------------

> ��ô���ԭ�����أ�

���ǽ��������ʾ�������ִ��f.toString()ʱ���ַ�����ʲô��

```
// ʡ�� N ��

// ����
f.printName()
f.alertName()
f.toString()
```
��Ϊf����û��toString()������f.__proto__����Foo.prototype����Ҳû��toString��������⻹�ǵ��ó��ղ��Ǿ仰��������ͼ�õ�һ�������ĳ������ʱ��������������û��������ԣ���ô��ȥ����__proto__�������Ĺ��캯����prototype����Ѱ�ҡ�...

�����f.__proto__��û���ҵ�toString����ô�ͼ���ȥf.__proto__.__proto__��Ѱ�ң���Ϊf.__proto__����һ����ͨ�Ķ�������

```
1. f.__proto__��Foo.prototype��û���ҵ�toString������������

2. f.__proto__.__proto__��Foo.prototype.__proto__

3. Foo.prototype����һ����ͨ�Ķ������Foo.prototype.__proto__����Object.prototype������������ҵ�toString
 
4. ���f.toString���ն�Ӧ����Object.prototype.toString

5. f.__proto__.__proto__.__proto__ ��NULL��

```

����һ��ͼ��Ӧ���ܸ��õ������

![](https://segmentfault.com/img/bVbe5YI?w=1092&h=431)

