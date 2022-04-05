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

### 2.常问块级元素行内元素

### 3.box-sizing
box-sizing:content-box; width实际为content + padding + border
box-sizing:border-box; width实际为content
border-box是ie提出的，更好用，都是用来指定宽度的
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
.son-cell {
  /*  */
}
```

- 2.  father：relative
      son: margin: 负 son-width/2px; top: 50%; left: 50%;
- 3.  father：relative
      son: transform: translate(-50%,-50%); top: 50%; left: 50%;
- 4.  father：relative
      son: absolute, margin:auto, top:0; bottom:0; left:0; right:0;
- 5.  father: display:flex; justify-content:center; align-items:center;

### 5.清除浮动
1.  content:''; display:block; clear:both;
2. 父元素 overflow:hidden;

### 6. 0.5px边
svg画0.5px
width: 0.5px
transform: linear-gradient(0deg, #fff, #000) 
box-shadow: 0 0.5px 0 #000; //android兼容好
width:1px;     transform: scaleY(0.5); 