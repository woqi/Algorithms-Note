### vue生命周期
- beforeCreate 
在实例初始化之后、进行数据侦听和事件/侦听器的配置之前同步调用。
- created
在实例创建完成后被立即同步调用。在这一步中，实例已完成对选项的处理，意味着以下内容已被配置完毕：数据侦听、计算属性、方法、事件/侦听器的回调函数。然而，挂载阶段还没开始，且 $el property 目前尚不可用。
ssr会导致created中函数执行两次

- beforeMount
在挂载开始之前被调用：相关的 render 函数首次被调用。
该钩子在服务器端渲染期间不被调用。
- mounted
在实例挂载完成后被调用，这时候传递给 app.mount 的元素已经被新创建的 vm.$el 替换了。如果根实例被挂载到了一个文档内的元素上，当 mounted 被调用时， vm.$el 也会在文档内。 注意 mounted 不会保证所有的子组件也都被挂载完成。如果你希望等待整个视图都渲染完毕，可以在 mounted 内部使用 vm.$nextTick：
mounted() {
  this.$nextTick(function () {
    // 仅在整个视图都被渲染之后才会运行的代码
  })
}

- beforeUpdate
在数据发生改变后，DOM 被更新之前被调用。这里适合在现有 DOM 将要被更新之前访问它，比如移除手动添加的事件监听器。
该钩子在服务器端渲染期间不被调用，因为只有初次渲染会在服务器端进行。
- updated
在数据更改导致的虚拟 DOM 重新渲染和更新完毕之后被调用。
当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态。如果要相应状态改变，通常最好使用计算属性或侦听器取而代之。

注意，updated 不会保证所有的子组件也都被重新渲染完毕。如果你希望等待整个视图都渲染完毕，可以在 updated 内部使用 vm.$nextTick：

- activated vue2/3
被 keep-alive 缓存的组件激活时调用
该钩子在服务器端渲染期间不被调用。
- deactivated vue2/3
被 keep-alive 缓存的组件失活时调用。掩盖时调用
该钩子在服务器端渲染期间不被调用。

- beforeDestroy vue2 / beforeUnmount vue3
在卸载组件实例之前调用。在这个阶段，实例仍然是完全正常的。
- destroyed vue2 / unmounted vue3
卸载组件实例后调用。调用此钩子时，组件实例的所有指令都被解除绑定，所有事件侦听器都被移除，所有子组件实例被卸载

- errorCaptured
在捕获一个来自后代组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回 false 以阻止该错误继续向上传播。

- renderTracked 
跟踪虚拟 DOM 重新渲染时调用。钩子接收 debugger event 作为参数。此事件告诉你哪个操作跟踪了组件以及该操作的目标对象和键。

- renderTriggered
当虚拟 DOM 重新渲染被触发时调用。和 renderTracked 类似，接收 debugger event 作为参数。此事件告诉你是什么操作触发了重新渲染，以及该操作的目标对象和键。

### vue Router
官方路由，适用于单页面应用
router-link：点击跳转
router-view：路由视图
嵌套路由：路由添加Childen属性子路由嵌套在父路由中

#### 后续追问vue两种路由模式
**hash模式**
- 原理
使用window.location.hash属性及窗口的onhashchange事件，
可以实现监听浏览器地址hash值变化
解析`#`后的字符，称之为散列值、锚点，用于做页面跳转定位。
散列值不会被发送到服务器，不会引起页面重新加载
通过location.hash获取hash值，在浏览器地址栏会有反应
触发onhashchange场景：前进后退，浏览器url改变，只改变url哈希部分
vue router4：createWebHashHistory()
**history模式**
- 原理
window.history指向history，表当前窗口浏览器会话历史，
history中pushState()和replaceState()实现前端路由，这两种方法应用于浏览器历史记录栈，通过两种方法改变url不会导致页面刷新
url改变触发popstate事件
前后端一起配合的路由，nginx配合是将所有请求都重定向到index
vue router4：createWebHistory()

- 差异
1.history和hash都是利用浏览器的两种特性实现前端路由，history是利用浏览历史记录栈的API实现，hash是监听location对象hash值变化事件来实现
2.history的url没有'#'号，hash反之
3.history修改的url可以是同域的任意url，hash是同文档的url
4.相同的url，history会触发添加到浏览器历史记录栈中，hash不会触发。
5.hash仅将url作为参数传递给后端，后端通过'#'截断，
6.history需要后端支持，后端未覆盖的路由地址则返回404，前端的 URL 必须和实际向后端发起请求的 URL 一致,
例如请求http://www.abc.com/book/id 缺乏/book/id后端返回404
hash仅‘#’符号之前的内容会被包含在请求中
``

#### 追问导航守卫
路由设置钩子 
- 全局进入、离开、解析路由三个时期都做了什么
router.beforeEach 进入
router.beforeResolve 解析
router.afterEach 离开
- 路由独享 router.beforeEnter
- 组件内的守卫
beforeRouteEnter 路由验证前被调用组件实例并未创建 通过next回调访问组件实例
beforeRouteUpdate 路由改变 组件被复用调用 
beforeRouteLeave 离开渲染该组件
- 实际执行顺序
失活组件beforeRouteLeave --> 全局beforeEach --> 重用的组件里调用 beforeRouteUpdate --> 路由独享beforeEnter --> 激活的组件里调用 beforeRouteEnter --> 全局beforeResolve --> 全局afterEach

#### 追问路由懒加载
import('路由')

### vue如何实现双向绑定
1. v-model / .sync 实现，由v-bind + v-on:input构成
v-bind: data-->UI
v-on: UI-->data
2. 这两个单向绑定如何实现呢
v-model通过Object.defineProperty API给data创建getter、setter，用于监听data改变，data改变导致UI改变，
v-on通过template compiler给DOM添加事件监听，DOM input值改变就会修改data
**25k+ compiler如何实现**

### 