
## 一、选择器的权重与优先级


CSS 选择器有很多，不同的选择器的权重和优先级不一样，对于一个元素，如果存在多个选择器，那么就需要根据权重来计算其优先级。

权重可以分为四级:

```js
1. 代表内联样式  style= “color： red;” 权重为1000

2. 代表ID选择器 #content  权重为100

3. 代表类、伪类选择器和属性选择器 .content :hover [attr] 权重为 10

4. 代表元素选择器和伪元素选择器 div p 权重为 1

5. 通用选择器（*）、子选择器（>）和相邻同胞选择器（+）并不在这四个等级中，所以他们的权值都为 0
```

**权重越高，优先级越高，相同权重的选择器又遵循后定义的覆盖之前的原则。**


> 复合选择器的权重计算：
 
将基本选择器的权重相加之和，就是权重大小，值越大，权重越高

```
#box ul li a.cur  {color:red;}

#box li .cur {color:green;}

#box ul li a.cur   权重是  100+1+1+1+10 = 113

#box li .cur 权重是  100+1+10  = 111   

那么后面的样式就会被前面的样式层叠掉,那么最终a的颜色是red

```

**注意**

```
！important 权重永远 最高

继承获取的样式权重永远 最低
```



```html
<html>
  <head>
   <style type="text/css">
      #redP p {
          // 1000 + 1
          color:#F00;
      }

      #redP .red em {
          // 1000 + 10 + 1
          color:#00F;

      }

      #redP p span em {
          // 1000 + 1 + 1 + 1
          color:#FF0;
      }
   </style>
  </head>
  <body>
     <divid="redP">
        <pclass="red">red
          <span><em>em red</em></span>
       </p>
        <p>red</p>
     </div>
  </body>
</html>


// em显示为蓝色
```

```
//
<html>
 <head>
   <style type="text/css">
    #redP p{

       color:#00f !important;
       color:#f00;
    }
   </style>
 </head>
 <body>
    <divid="redP">
      <p>color</p>
      <p>color</p>
    </div>
 </body>
</html>

// 最终呈现为蓝色
```

**多重样式**

如果外部样式、内部样式和内联样式同时应用于同一个元素，就是使多重样式的情况。

优先级为：（外部样式）External style sheet <（内部样式）Internal style sheet <（内联样式）Inline style

* 有一个例外 (就是如果外部样式放在内部样式的后面，则外部样式将覆盖内部样式。)
```
<head>
   <style type="text/css">

     h3{color:green;}
   </style>

   <!-- 外部样式 style.css -->
   <linkrel="stylesheet"type="text/css"href="style.css"/>
   <!-- 设置：h3{color:blue} -->
</head>
<body>
    <h3>welcome sojson.com</h3>
</body>
```

-----------------

## 二、盒子模型

![](https://user-gold-cdn.xitu.io/2018/2/23/161c106628765b93?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

>如上图，真正的内容就是这些文字，文字外围有 10px 的内边距，5px 的边框，10px 的外边距。看到盒子了吧？

> 题目：盒子模型的宽度如何计算

**1、标准盒子模型**

![](https://img-blog.csdn.net/20180324150509906?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3p3a2trazE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

> 在标准的盒子模型中，width指content部分的宽度

**2、IE盒子模型**

![](https://img-blog.csdn.net/20180324150533356?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3p3a2trazE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

> 在IE盒子模型中，width表示content+padding+border这三个部分的宽度


默认正是W3C标准盒模型。而这里盒模型的选取更倾向于项目和开发者的习惯，并没有绝对的好坏之分。


**box-sizing的使用**

如果想要切换盒模型也很简单，这里需要借助css3的box-sizing属性

```
box-sizing: content-box 	是W3C盒子模型 (默认)
box-sizing: border-box 		是IE盒子模型
```


> **大名鼎鼎的 Bootstrap 也把box-sizing:border-box加入到它的*选择器中，我们为什么不这样做呢？**


## 三、纵向margin重叠

这里提到 margin，就不得不提一下 margin 的这一特性——纵向重叠。
如<p>的纵向 margin 是 16px，那么两个<p>之间纵向的距离是多少？
—— 按常理来说应该是 16 + 16 = 32px，但是答案仍然是 16px。
因为纵向的 margin 是会重叠的，如果两者不一样大的话，大的会把小的“吃掉”。...


## 四、浮动float

float 被设计出来的初衷是用于文字环绕效果，即一个图片一段文字，图片float:left之后，文字会环绕图片。

```
<div>
    <img src="image/1.png" style="float:left">
    一段文字一段文字一段文字一段文字一段文字一段文字一段文字一段文字一段文字
</div>
```

> 题目：为何 float 会导致父元素塌陷？

* 破坏性

![](https://user-gold-cdn.xitu.io/2018/2/23/161c106660020bd4?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

float 的破坏性 —— float 破坏了父标签的原本结构，使得父标签出现了坍塌现象。
导致这一现象的最根本原因在于：被设置了 float 的元素会脱离文档流。
其根本原因在于 float 的设计初衷是解决文字环绕图片的问题。

* 包裹性

![](https://user-gold-cdn.xitu.io/2018/2/28/161db8f617bc8f2e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)


如上图，普通的 div 如果没有设置宽度，它会撑满整个屏幕，在之前的盒子模型那一节也讲到过。
而如果给 div 增加float:left之后，它突然变得紧凑了，宽度发生了变化，把内容中的三个字包裹了——这就是包裹性。为 div 设置了 float 之后，其宽度会自动调整为包裹住内容宽度，而不是撑满整个父容器。...

注意，此时 div 虽然体现了包裹性，但是它的 display 样式是没有变化的，还是display: block。

* 清空格

float 还有一个大家可能不是很熟悉的特性——清空格。按照惯例，咱还是先举例子说明。

```css
<div style="border: 2px solid blue; padding:3px;">
    <img src="image/1.png"/>
    <img src="image/2.png"/>
    <img src="image/3.png"/>
    <img src="image/4.png"/>
</div>
```

![](https://user-gold-cdn.xitu.io/2018/2/28/161db8f617bf4874?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

加上float:left之后：

![](https://user-gold-cdn.xitu.io/2018/2/28/161db8f644302e40?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

上面第一张图中，正常的 img 中间是会有空格的，因为多个 img 标签会有换行，而浏览器识别换行为空格，这也是很正常的。第二张图中，为 img 增加了float:left的样式，这就使得 img 之间没有了空格，4 个 img 紧紧挨着。...


> 题目：手写 clearfix

```css
.clearfix:after{
	content: '';
	display: table;
	clear: both;
}
.clearfix{
	*zoom: 1; /* 兼容 IE 低版本 */
}
```

```
<div class="clearfix">
    <img src="image/1.png" style="float: left"/>
    <img src="image/2.png" style="float: left"/>
</div>...
```

## 五、面试常谈的两种布局

事实上，圣杯布局其实和双飞翼布局是一回事。它们实现的都是三栏布局，两边的盒子宽度固定，中间盒子自适应，也就是我们常说的固比固布局。它们实现的效果是一样的，差别在于其实现的思想。

圣杯布局的出现是来自于a list part上的一篇文章In Search of the Holy Grail。
比起双飞翼布局，它的起源不是源于对页面的形象表达。在西方，圣杯是表达“渴求之物”的意思。
而双飞翼布局则是源于淘宝的UED，可以说是灵感来自于页面渲染。一起来看看淘宝的头部实现：

![](https://upload-images.jianshu.io/upload_images/1747023-4b4ebc49181a2e4f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000/format/webp)

* 圣杯布局

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
	<head>
		<meta charset="utf-8">
		<title></title>
		<style>
		*{
			padding: 0px;
			margin: 0px;
		}
			header, footer{
				width: 100%;
				height: 100px;
				background: gray;
				text-align: center;
				line-height: 100px;
			}
			.clearfix:after{
				content: "";
				display: table;
				clear:both;
			}
			.clearfix{
				*zoom: 1;
			}
			.content{
				padding: 0px 200px;
			}
			.contentItem{
				height: 300px;
				line-height: 300px;
				color: #fff;
				font-size: 30px;
				float: left;
				text-align: center;
			}
			.main{
				width: 100%;
				background: pink;
			}
			.left{
				width: 200px;
				background: red;
				margin-left: -100%;
				position: relative;
				left: -200px;
			}
			.right{
				width: 200px;
				background: purple;
				margin-left: -200px;
				position: relative;
				left: 200px;
			}
		</style>
	</head>
	<body>
		<header>
			header
		</header>
		<div class="content clearfix">
			<div class="main contentItem">
				main
			</div>
			<div class="left contentItem">
				left
			</div>
			<div class="right contentItem">
				right
			</div>
		</div>
		<footer>
			footer
		</footer>
	</body>
</html>

```

* 双飞翼布局

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>双飞翼布局</title>
    <style>
        * {
            padding: 0;
            margin: 0;
        }
        header,
        footer {
            text-align: center;
            width: 100%;
            background-color: #bbbbbb;
        }
        .text {
            text-align: center;
            line-height: 200px;
            font-size: 40px;
            color: #fff;
        }
        .bd {
            overflow: hidden;
        }
        .main {
            float: left;
            width: 100%;
            height: 200px;
            background-color: #ddd;
        }
        .main-content {
            margin: 0 200px;
        }

        .left {
            float: left;
            width: 200px;
            height: 200px;
            background-color: #da4242;
            /* 产生布局效果的属性 */
            margin-left: -100%;
        }
        .right {
            float: left;
            width: 200px;
            height: 200px;
            background-color: #4ddef1;
            /* 产生布局效果的属性 */
            margin-left: -200px;
        }

    </style>
</head>

<body>
    <header>双飞翼布局</header>
    <div class="bd">
        <div class="main text">
            <div class="main-content">main</div>
        </div>
        <div class="left text">
            left
        </div>
        <div class="right text">
            right
        </div>
    </div>
    <footer>footer</footer>
</body>

</html>

```

这两种布局效果是一样的，实现方式存在一定的区别。

![](https://user-gold-cdn.xitu.io/2018/2/18/161a4d99cdc355a0?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

圣杯布局是中间栏为两边腾开位置。

![](https://user-gold-cdn.xitu.io/2018/2/18/161a4d9a904190bd?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

双飞翼布局则是中间栏不变，将内容部分为两边腾开位置


## 六、flex布局

布局的传统解决方案基于盒子模型，依赖 display 属性 + position 属性 + float 属性。它对于那些特殊布局非常不方便，比如，垂直居中（下文会专门讲解）就不容易实现。在目前主流的移动端页面中，使用 flex 布局能更好地完成需求，因此 flex 布局的知识是必须要掌握的。

**设计原理**

设置了`display: flex`的元素，我们称为`“容器”`（flex container），其所有的子节点我们称为`“成员”``（flex item）`。容器默认存在两根轴：`水平的主轴`（main axis）和`垂直的交叉轴`（cross axis）。主轴的开始位置（与边框的交叉点）叫做 `main start`，结束位置叫做` main end`；交叉轴的开始位置叫做` cross start`，结束位置叫做`cross end`。项目默认沿主轴排列。单个项目占据的主轴空间叫做` main size`，占据的交叉轴空间叫做 `cross size`。

![](https://user-gold-cdn.xitu.io/2018/2/23/161c1066ba95ed28?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

**设置主轴的方向**

`flex-direction` 可决定主轴的方向，有四个可选值：

```
row（默认值）：主轴为水平方向，起点在左端。
row-reverse：主轴为水平方向，起点在右端。
column：主轴为垂直方向，起点在上沿。
column-reverse：主轴为垂直方向，起点在下沿。
```
![](https://user-gold-cdn.xitu.io/2018/2/23/161c1066cc8d122c?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

**设置主轴的对齐方式**

`justify-content`属性定义了项目在主轴上的对齐方式，值如下：

```
flex-start（默认值）：向主轴开始方向对齐。
flex-end：向主轴结束方向对齐。
center： 居中。
space-between：两端对齐，项目之间的间隔都相等。
space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍
```

![](https://user-gold-cdn.xitu.io/2018/2/23/161c1066ccd09d05?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

**设置交叉轴的对齐方式**

`align-items`属性定义项目在交叉轴上如何对齐，值如下：

```
flex-start：交叉轴的起点对齐。
flex-end：交叉轴的终点对齐。
center：交叉轴的中点对齐。
baseline: 项目的第一行文字的基线对齐。
stretch（默认值）：如果项目未设置高度或设为 auto，将占满整个容器的高度。
```
![](https://user-gold-cdn.xitu.io/2018/2/23/161c1066d1feaa64?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> 题目：如何实现水平居中？


**水平居中**

inline元素可以使用text-align:center;

```
.container {
   text-align: center;
}
```

block 元素可使用margin: auto;，PC 时代的很多网站都这么搞。

```
.container {
    text-align: center;
}
.item {
    width: 1000px;
    margin: auto;
}
```
绝对定位元素可结合left和margin实现，但是必须知道宽度。

```
.container {
    position: relative;
    width: 500px;
}
.item {
    width: 300px;
    height: 100px;
    position: absolute;
    left: 50%;
    margin: -150px;
}
```

**垂直居中**

inline 元素可设置line-height的值等于height值，如单行文字垂直居中：

```
.container {
   height: 50px;
   line-height: 50px;
}
```
绝对定位元素，可结合left和margin实现，但是必须知道尺寸

优点：兼容性好
缺点：需要提前知道尺寸
```
.container {
    position: relative;
    height: 200px;
}
.item {
    width: 80px;
    height: 40px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -20px;
    margin-left: -40px;
}...
```

绝对定位可结合transform实现居中。

```
.container {
    position: relative;
    height: 200px;
}
.item {
    width: 80px;
    height: 40px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: blue;
}
```

绝对定位结合margin: auto，不需要提前知道尺寸，兼容性好。

```
.container {
    position: relative;
    height: 300px;
}
.item {
    width: 100px;
    height: 50px;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}...
```

### 七、HTML语义化

所谓语义化就是：

```
1. 让人（写程序、读程序）更易懂一些
2. 让机器（浏览器、搜索引擎）更易懂一些
```


HTML符合XML标准，但是又和XML不一样，HTML不允许自定义标签名，HTML有自己的标签名。HTML为何要定义自己的标签名呢，就是为了语义化了。

拿搜索引擎来说，爬虫下载到我们网页的 HTML 代码，它如何更好地去理解网页的内容呢？—— 就是根据 HTML 既定的标签。h1标签就代表是标题；p里面的就是段落详细内容，权重肯定没有标题高；ul里面就是列表；strong就是加粗的强调的内容 …… 如果我们不按照 HTML 语义化来写，全部都用<div>标签，那搜索引擎将很难理解我们网页的内容。...


为了加强HTML的语义化，HTML5之后推出了 `header` `article` `footer` `section` `nav` 等的语义化标签。。因此，书写 HTML 时，语义化是非常重要的，否则 W3C 也没必要辛辛苦苦制定出这些标准来。


## 八、CSS动画

> CSS 的transition和animation有何区别？

首先transition和animation都可以做动效，从语义上来理解，transition是过渡，由一个状态过渡到另一个状态，比如高度100px过渡到200px；而animation是动画，即更专业做动效的，animation有帧的概念，可以设置关键帧keyframe，一个动画可以由多个关键帧多个状态过渡组成，另外animation也包含上面提到的多个属性。


## 九、重绘与回流

重绘和回流是面试题经常考的题目，也是性能优化当中应该注意的点

* 重绘：指的是当页面中的元素不脱离文档流，而简单地进行样式的变化，比如修改颜色、背景等，浏览器重新绘制样式

* 回流：指的是处于文档流中 DOM 的尺寸大小、位置或者某些属性发生变化时，导致浏览器重新渲染部分或全部文档的情况

相比之下，`回流要比重绘消耗性能开支更大`。另外，一些属性的读取也会引起回流，比如读取某个 DOM 的高度和宽度，或者使用getComputedStyle方法。在写代码的时候要避免回流和重绘。比如在笔试中可能会遇见下面的题目

> 题目：找出下面代码的优化点，并且优化它

```
var data = ['string1', 'string2', 'string3'];
for(var i = 0; i < data.length; i++){
    var dom = document.getElementById('list');
    dom.innerHTML += '<li>' + data[i] + '</li>';
}
```
上面的代码在循环中每次都获取dom，然后对其内部的 HTML 进行累加li，每次都会操作 DOM 结构，可以改成使用documentFragment或者先遍历组成 HTML 的字符串，最后操作一次innerHTML。


**DocumentFragment（优化方案）**

DocumentFragment节点不属于DOM树，是一个虚拟的节点，他有一个属性特别有用。 当请求把一个 DocumentFragment 节点插入文档树时，插入的不是 DocumentFragment，而是它包裹的那些元素。 这使得 DocumentFragment 成了有用的占位符，暂时存放那些一次插入文档的节点。

一个栗子：

```js

var D = document.createDocumentFragment();


for(var i = 0; i < 10; i++) {
	var spanNode = document.createElement('span');
	spanNode.innerHTML = 'number'+i;
	D.appendChild(spanNode);
}

document.body.appendChild(D);

```
