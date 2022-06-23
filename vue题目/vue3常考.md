### Object.defineProperty 和 Proxy 区别
- proxy 
在目标对象上架设一层拦截，代理整个对象，颗粒度更大
有13种拦截方法
可以监听数组的变化
javascript引擎在解析时希望对象的结构越稳定越好
- Object.defineProperty 
直接操作对象的属性，颗粒度较小
无法监听数组修改，修改了数组的7个api

vue2响应式原理的弊端 
响应式过程需要递归，消耗较大
新加或删除属性无法监听
Map、Set、Class等无法响应
修改语法有限制

```js
let data = {foo:'hello'},vueObj = {}
Object.defineProperty(vueObj, 'foo', {
  //读取key值时，没法读取，因设置不允许迭代
  //你迭代读取他们的key值时，无法读取，
  //因为设置了不允许迭代，不会显示在对象键中
  enumerable: true,
  //防止被重新定义，设置为false将永远无法被修改
  configurable: false,
  //可赋值，但值不改变，不报错
  writable: false,
  get() {
    //覆盖取值行为，get返回任意值
    return data.foo
  },
  set(newValue) {
    //覆盖赋值行为
    if(newValue === data.foo){return}
    data.foo = newValue
    document.querySelector('#app').textContent = data.foo
  },
})
vueObj.foo = 'nihao' 
console.log(vueObj.foo)
/*----*/
let vueProxy = new Proxy(data,{
  get(target,key){
    return target[key]
  },
  set(target,key,newValue){
    if(target[key] === newValue){return}
    target[key] = newValue
    document.querySelector('#app').textContent = target[key]

  }
})
vueProxy.foo = 'nihao'
console.log(vueProxy.foo)
```
### vue3做了哪些优化？
虚拟dom重写，生成的虚拟dom信息更详细，
createComponentVNode(//增加第四个参数)
优化slots减少渲染次数，重新渲染父级和子集，确保实例正确的跟踪依赖关系，避免父子组件不必要的渲染
静态树提升，内存换时间，将静态的部分直接放入render，不予计算
静态属性提升，在下一次patch时发现属性跟上次一样不做patch
```js
<div id="foo" class="bar">{{text}}</div>
```
```js
const __props1 = {
  id:'foo',
  class:'bar'
}
render(){
  return h('div', __props1, this.text)
}
```
基于Proxy响应式系统，可以直接监控数组、对象
以前初始化需要对属性进行遍历递归，提高了初始化效率，内存占用变低，无法兼容ie
源代码更易维护，许多包被解耦，更加模块化，跨平台
通过摇树优化库的体积
更适应typeScript
composition Api 类似于hooks

### 连环问 composition Api
- 为什么用composition Api
模板数据来源清晰
命名空间明确
性能更好
更好的适配TypeScript

### vue响应式原理
data通过observer转换为getter、setter的形式追踪变化，
getter被读取时触发watcher，将watcher添加到依赖中，
**数据变化**时会触发setter，
setter通知依赖，
依赖通知watcher，
watcher通知外部组件更新

MVVM：数据变化视图更新，视图变化数据更新，
proxy 可以全面监听数据的变化，深度监听，可以知道数组变化
Object.defineProperty 无法监听数组修改，修改了数组的7个api，无法监听对象的新增与删除
vue的响应式是由Object.defineProperty、proxy完成的

### 双向数据绑定原理
vue的双向绑定是v-modle语法糖实现 
例如 input事件中`v-bind:value + v-on:input`
`v-bind:value` 数据更新 触发 视图更新
`v-on:input` 视图更新 触发 数据更新
附加：vue3与vue2区别是一个组件可以有多个v-model，vue2原有`.sync`完成该功能现已修改
#### 追问
1. v-bind怎么实现
通过Object.defineProperty API给data创建getter、setter，用于监听data变化，data变化改变ui
2. v-on怎么实现
通过template compiler给DOM添加事件监听，DOM input值改变引起data改变

#### 什么是单向数据流
数据更新引发视图更新
vue是单向数据流，不是双向绑定

### vue3为什么增加了creatApp
例子开发较大应用，团队A引入全局组件showDialog，团队B不需要，vue2无法做到A、B团队的vue实例相互隔离，所有vue实例共享一个vue构造函数对象，包含全局指令全局组件






