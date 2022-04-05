
### 地址题
```js
var a = {x:1} //地址 #111
var b = a // #111
a.x = a = {x:2} // #111.x = a = #222--->#111.x = #222 ,{x:2}地址时#222
console.log(a.x) // 在找#222.x的值 //2 
console.log(b.x) // b.x #111.x = #222 //{x:2}
```
### 有条件的创造函数，考点刁钻，js未定义行为，答案不唯一
```js
var a = 0
if(true){
  a = 1
  function a(){return 3}
  a = 2
  console.log(a) 
}
  console.log(a) 
/*chrome、edge、Firefox 输出2 1
 Safari 2 2*/
```