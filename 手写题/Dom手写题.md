
### DOM 事件模型

经历从**上到下捕获阶段**，再经历**从下到上的冒泡阶段**，
addEventLisener(type,listener,options) true 捕获,不传或者 false 冒泡，第三个参数传对象 capture:true 捕获阶段
捕获|冒泡不想继续捕获|冒泡，可以使用 event.stopPropagation()阻止，阻止传播

### 事件委托
好处：节省监听器，动态监听
坏处：无法知道当前元素有哪些事件监听，调试复杂不易确定监听，控制台有一个addEventListener
```js
/*1*/
ul.addEventListener('click', function (e) {
  if (e.target.tagName.toLowerCase() === 'li') {
    fn() //执行某个函数
  }
})
/*2*/
function delegate(element, eventType, selector, fn) {
  element.addEventListener(eventType, e => {
    let el = e.target
    while (!el.matches(selector)) {
      if (element === el) {
        el = null
        break
      }
      el = el.parentNode //点击的不是element就看父级
    }
    el && fn.call(el, e, el)
  })
  return element
}

```

5个苦咖啡
5个奶提子
2个白桃冰球
3个光明绿豆
3个雀巢q次方
3个方糕
3个小布丁
3个东北大板