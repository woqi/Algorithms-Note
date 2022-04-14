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
基于Proxy响应式系统
可以直接监控数组、对象
以前初始化需要对属性进行遍历递归，提高了初始化效率，内存占用变低
无法兼容ie
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

### vue响应式原理、你知道vue双向数据绑定原理
MVVM：数据变化视图更新，视图变化数据更新，
proxy 可以全面监听数据的变化，深度监听，可以知道数组变化
Object.defineProperty 无法监听数组修改，修改了数组的7个api

data通过observer转换为getter、setter的形式追踪变化，
watcher读取数据触发getter，将watcher添加到依赖中，
数据变化时会触发setter，
setter通知依赖，
依赖通知watcher，
watcher通知外部组件更新






