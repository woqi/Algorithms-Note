
### DOM 事件模型

经历从上到下捕获阶段，再经历从下到上的冒泡阶段，
addEventLisener(type,listener,options) true 捕获,不传或者 false 冒泡，第三个参数传对象 capture:true 捕获阶段
捕获|冒泡不想继续捕获|冒泡，可以使用 event.stopPropagation()阻止，阻止传播

### 事件委托

```js
ul.addEventListener('click', function (e) {
  if (e.target.tagName.toLowerCase() === 'li') {
    fn() //执行某个函数
  }
})
```

