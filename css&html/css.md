### 1.bfc 是什么
块级格式上下文
- 常见触发
  浮动
  绝对定位
  变成 inline block 行内元素
  overflow 值不为 visible
  display：flex
- 解决了
  清除浮动
  防止垂直 margin 合并

### 2.常见的块级元素行内元素
● 行内元素有：a b span img input select strong
● 块级元素有：div ul ol li dl dt dd h1 h2 h3 h4… p
● 空元素：<br> <hr> <img> <input> <link> <meta>
● 行内元素不可以设置宽高，不独占一行
● 块级元素可以设置宽高，独占一行
### 3.box-sizing
box-sizing:content-box; width 实际为 content + padding + border
box-sizing:border-box; width 实际为 content
border-box 是 ie 提出的，更好用，都是用来指定宽度的

### 4.垂直居中
- 1.

```html
<!-- 1.1 -->
<table>
  <tr>
    <td></td>
  </tr>
</table>
```
```css
/* 1.2 */
.father {
  display: table;
}
.son {
  display: table-cell;
  vertical-align: middle;
}
```
- 2.  father：relative
      son: margin: 负 son-width/2px; top: 50%; left: 50%;
- 3.  father：relative
      son: transform: translate(-50%,-50%); top: 50%; left: 50%;
- 4.  father：relative
      son: absolute, margin:auto, top:0; bottom:0; left:0; right:0;
- 5.  father: display:flex; justify-content:center; align-items:center;

### 2.垂直居中
```css
/*flex*/
.parent {
  height: 600px;
  border: 3px solid red;

  display: flex;
  justify-content: center;
  align-items: center;
}
.child {
  border: 3px solid green;
  width: 300px;
}
```
```css
/*absolute\margin auto\top bottom left right 0*/
.parent {
  height: 600px;
  border: 1px solid red;
  position: relative;
}
.child {
  border: 1px solid green;
  position: absolute;
  width: 300px;
  height: 200px;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
```
```css
/*margin-top 为child高度的一半\top 50%*/
.parent {
  height: 600px;
  border: 1px solid red;
  position: relative;
}
.child {
  border: 1px solid green;
  width: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -150px;
  height: 100px;
  margin-top: -50px;
}
```
```css
/*translate*/
.parent {
  height: 600px;
  border: 1px solid red;
  position: relative;
}
.child {
  border: 1px solid green;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```
```css
/*inline-block*/
.parent {
  border: 3px solid red;
  height: 600px;
  text-align: center;
}

.child {
  border: 3px solid black;
  display: inline-block;
  width: 300px;
  vertical-align: middle;
}

.parent::before {
  content: '';
  outline: 3px solid red;
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
.parent::after {
  content: '';
  outline: 3px solid red;
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
```

### 5.清除浮动
1.  content:''; display:block; clear:both;
2.  父元素 overflow:hidden;

### 6. 0.5px 边
svg 画 0.5px
width: 0.5px
transform: linear-gradient(0deg, #fff, #000)
box-shadow: 0 0.5px 0 #000; //android 兼容好
width:1px; transform: scaleY(0.5);
