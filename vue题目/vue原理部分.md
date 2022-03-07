### 1.Object.defineProperty 和 Proxy 区别
proxy 可以全面监听数据的变化，深度监听，可以知道数组变化
Object.defineProperty 无法监听数组修改，修改了数组的7个api

```js
Object.defineProperty(obj, 'foo', {
  //读取key值时，没法读取，因设置不允许迭代
  //你迭代读取他们的key值时，无法读取，
  //因为设置了不允许迭代，不会显示在对象键中
  enumerable: false,
  //防止被重新定义，设置为false将永远无法被修改
  configurable: true,
  //可赋值，但值不改变，不报错
  writable: false,
  get() {
    //覆盖取值行为，get返回任意值
    return 'bar'
  },
  set(newValue) {
    //覆盖赋值行为
  },
})
```

