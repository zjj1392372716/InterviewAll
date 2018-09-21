
## HTML5图片拖拽上传

```html
<!-- 拖拽上传 -->
<div class="dragImage_wrapper">
	<p class="dragImage_tip">请把图片拖拽到下方哦</p>
	<div class="dragImage_show">
		<input type="file" name="dragImageFile" id="dragImageFile" multiple />
		<div class="dragImageBox">
			<!-- 图片插入位置  -->
		</div>
	</div>
</div>
```

```css
*{
	padding: 0px;
	margin: 0px;
}
.dragImage_wrapper{
	width: 500px;
	height: 400px;
	border: 1px solid #ddd;
	margin: 20px 0px 0px 20px;
	box-sizing: border-box;

}
.dragImage_tip{
	width: 100%;
	height: 40px;
	line-height: 40px;
	padding: 0px 10px;
	box-sizing: border-box;
	border-bottom: 1px solid #e4e3e3;
	color: #999;
}
.dragImage_show{
	width: 100%;
	height: 360px;
	padding:  10px;
	position: relative;
	box-sizing: border-box;
}
.dragImage_show input{
	position: absolute;
	width: 100%;
	left: 0px;
	top: 0px;
	height: 100%;
	font-size: 0;
	display: none;
}
.dragImage_show .dragImageBox{
	width: 100%;
	height: 100%;
	box-sizing: border-box;
}
.img_show_item{
	width: 30.4%;
	height: 80px;
	padding: 8px;
	display: inline-block;
	box-sizing: border-box;
	margin-right: 3%;
	border: 1px solid #999;
	border-radius: 4px;
	margin-bottom: 10px;
}
.img_show_item:nth-of-type(3n) {
	margin-right: 0px;
}
.img_show_item img{
	width: 100%;
	height: 100%;
}
```

**1.通过querySelector获取diagFile元素（只有将图片拖放到这个范围才有效），我们在为它添加drop、dragover与dragenter事件。**

**2.dragover是当某物体被拖动的对象在另一个对象容器范围内拖动的时候触发的事件，因此默认情况下，数据不能放到别的其他元素上，要实现该功能，必须使用e.preventDefault()来阻止默认事件**

**3.drog事件是选取文件放置到某一个目标区域内的时候触发的。同时我们也要阻止默认事件添加上诉的方法。并通过e.dataTransfer.files来获取拖拽文件的列表。**




```js
<script src="http://cdn.bootcss.com/jquery/2.1.4/jquery.min.js"></script>
<script type="text/javascript">
// 多图拖拽上传

const dragbox = document.querySelector('.dragImage_wrapper');
dragbox.addEventListener('dragover', function (e) {
		e.preventDefault(); // 必须阻止默认事件
}, false);
dragbox.addEventListener('drop', function (e) {
		e.preventDefault(); // 阻止默认事件
			var files = e.dataTransfer.files; //获取文件
			console.log(files); // 支持多张拖动上传，所以这里的files是一个file对象类数组
			// 如果上传图片，可以操作该数组。通过FormData上传
			appendFile(files, '.dragImageBox') // 预览
}, false);

function appendFile (files, listName) {
	for( file of files ) {
		let url = window.URL.createObjectURL(file);
		let liStr = '<div class="img_show_item">'
		+'<img src="'+url+'" alt="文件" />'
		+'</div>';
		$(listName).append(liStr);
	}
}
</script>
```

## 图片预览

**`FileReader`与`URL.createObjectURL`实现图片、视频上传预览**

> 之前做图片、视频上传预览常用的方案是先把文件上传到服务器，等服务器返回文件的地址后，再把该地址字符串赋给img或video的src属性，这才实现所谓的文件预览。实际上这只是文件“上传后再预览”，这既浪费了用户的时间，也浪费了不可轻视的流量。其实可以很轻松地实现“上传前预览”。实现方法有两种：`FileReader`和`URL.createObjectURL`。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>preview</title>
    <style>
        * {
            box-sizing: border-box;
        }
        .section {
            margin: 20px auto;
            width: 500px;
            border: 1px solid #666;
            text-align: center;
        }
        .preview {
            width: 100%;
            margin-top: 10px;
            padding: 10px;
            min-height: 100px;
            background-color: #999;
        }
        .preview img,
        .preview video {
            width: 100%;
        }
    </style>
    <script src="https://cdn.staticfile.org/jquery/3.2.1/jquery.min.js" type="text/javascript"></script>
</head>
<body>
    <div class="section">
        <p>方案1</p>
        <input class="upload" type="file" onchange=onUpload1(this.files[0])>
        <div class="preview preview1"></div>
    </div>

    <div class="section">
        <p>方案2</p>
        <input class="upload" type="file" onchange=onUpload2(this.files[0])>
        <div class="preview preview2"></div>
    </div>
    <script>
        function onUpload1 (file) {
            var fr = new FileReader();
            fr.readAsDataURL(file);  // 将文件读取为Data URL

            fr.onload = function(e) {
                var result = e.target.result;
                if (/image/g.test(file.type)) {
                    var img = $('<img src="' + result + '">');
                    $('.preview1').html('').append(img);
                } else if (/video/g.test(file.type)) {
                    var vidoe = $('<video controls src="' + result + '">');
                    $('.preview1').html('').append(vidoe);
                }
            }
        }

        function onUpload2 (file) {
            var blob = new Blob([file]), // 文件转化成二进制文件
                url = URL.createObjectURL(blob); //转化成url
            if (/image/g.test(file.type)) {
                var img = $('<img src="' + url + '">');
                img[0].onload = function(e) {
                    URL.revokeObjectURL(this.src);  // 释放createObjectURL创建的对象
                }
                $('.preview2').html('').append(img);
            } else if (/video/g.test(file.type)) {
                var video = $('<video controls src="' + url + '">');
                $('.preview2').html('').append(video);
                video[0].onload = function(e) {
                    URL.revokeObjectURL(this.src);  // 释放createObjectURL创建的对象
                }
            }
        }
    </script>
</body>
</html>

```


**可以看出FileReader和URL.createObjectURL都能完美的实现图片的预览，但对于视频的上传，FileReader就不行了，浏览器立马崩溃了。。。，然而URL.createObjectURL方法却完美实现。**

## 详解：怎样实现前端裁剪上传图片功能

[详解：怎样实现前端裁剪上传图片功能](https://zhuanlan.zhihu.com/p/23340867)
