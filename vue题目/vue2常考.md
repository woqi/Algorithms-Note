### vue 生命周期

- beforeCreate
  在实例初始化之后、进行数据侦听和事件/侦听器的配置之前同步调用。
- created
  在实例创建完成后被立即同步调用。在这一步中，实例已完成对选项的处理，意味着以下内容已被配置完毕：数据侦听、计算属性、方法、事件/侦听器的回调函数。然而，挂载阶段还没开始，且 $el property 目前尚不可用。
  ssr 会导致 created 中函数执行两次

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

### vue 如何实现双向绑定

1. v-model / .sync 实现，由 v-bind + v-on:input 构成
   v-bind: data-->UI
   v-on: UI-->data
   不同标签生成不同事件及属性
2. 这两个单向绑定如何实现呢
   v-model 通过 Object.defineProperty API 给 data 创建 getter、setter，用于监听 data 改变，data 改变导致 UI 改变，
   v-on 通过 template compiler 给 DOM 添加事件监听，DOM input 值改变就会修改 data
   **25k+ compiler 如何实现**

### 通信

父子：props
子父：子 this.$emit
爷孙： 1.两次父子通信实现
2.provid + inject
任意：
使用 eventBus = new Vue(),事件多难以维护
vuex、pinia

#### 追问子组件能否修改父组件传来的 props

不能直接改 props，会报只读。

例子：子组件接受到父组件的 counter，若想实现点击子组件 counter+1 这个行为，
**vue2 第一种方法**
子组件`this.$emit('events-name')`，在父组件中`<child @events-name="handleAdd"/>`，本质上是由父组件中`handleAdd`函数去操作父组件的 counter
**vue2 第二种方法**
子组件`this.$emit('events-name',counter + 1)`
父组件`handleAdd(v){ this.counter = v } <child @events-name="handleAdd"/>`
**第三种方法**

```js
//fu
<Cpage v-bind:count.sync="count" />  //vue2
<Cpage v-model="count" />  //vue3
//zi
<div @click="handleCount">{{}}</div>
props:{
  count:Number //vue2
  modelValue: Number //vue3
}
handleCount(){
  this.$emit('update:count', this.count + 1) // vue2
  this.$emit('update:modelValue', this.modelValue + 1) // vue3
}
```

### Vue 的父组件和子组件生命周期钩子执行顺序是什么

渲染
父 beforeCreate-->父 created-->父 beforeMount-->子 beforeCreate-->子 created-->子 beforeMount-->子 mounted-->父 mounted

子组件更新
父 beforeUpdate->子 beforeUpdate->子 updated->父 updated

销毁
父 beforeDestroy->子 beforeDestroy->子 destroyed->父 destroyed

#### 衍生问题 Vue a 页面到 b 页面生命周期执行顺序是什么

a-beforeCreated
a-created
a-beforeMount
a-mounted//完成后页面出现跳转按钮
b-beforeCreate
b-created
b-beforeMount
a-beforeDestroy
a-destroyed
b-mounted

### key 的作用
尽可能的复用 DOM 元素
### computed原理
- 是什么
是计算属性
`computed{name:function(){}}`
- 解决了
适用于多个值影响一个值
计算属性具有缓存性，值改变页面重新渲染，值没改变页面不重新渲染
- 怎么做
vue2底层由watch实现
vue初始化computed中数据时会涉及Dep、Watch两个对象，Dep用于依赖收集，有个属性维护多个watch对象，更新数据循环调用每个Watch，Watch主要用于更新，watch.dirty确定是否有缓存
vue3 底层由effect实现

### watch原理
- 是什么
侦听器
`watch{name:function(newVal,oldVal){}}`
调用computed内部函数时不需要加`()`
- 解决了
适用于一个值引起多个值变化的情况
适用于异步操作或开销较大的状况
- 怎么做


### nextTick

DOM 被更新完后立即调用

#### 追问如何实现 nextTick

将传入的回调函数包装成异步任务，异步任务分微任务和宏任务
nextTick 提供四种异步方法 //3这个版本vue还是这个源码
Promise.then、MutationObserver、setImmediate、setTimeout(fn,0)

```js
var callbacks = []
var pending = false
function nextTick(cb, ctx) {
  var _resolve
  //将传入的回调函数放入数组中，后面遍历执行回调
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  //当前没有在pending的回调，就执行timerFunc函数选择当前环境优先支持的异步方法
  if (!pending) {
    pending = true
    timerFunc()
  }
  //判断当前环境优先支持异步方法，优先选择微任务
  //如果没有传入回调，并且当前环境支持promise，就染回promise，返回在promise.then中的DOM已经更新好了
  //setTimeout产生4ms延迟，setImmediate在主线程执行完成后立刻执行，setImmediate在IE10和node中支持
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve
    })
  }
  let timerFunc
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    // 支持 promise
    const p = Promise.resolve()
    timerFunc = () => {
      // 用 promise.then 把 flushCallbacks 函数包裹成一个异步微任务
      p.then(flushCallbacks)
      if (isIOS) setTimeout(noop)
    }
    // 标记当前 nextTick 使用的微任务
    isUsingMicroTask = true

    // 如果不支持 promise，就判断是否支持 MutationObserver
    // 不是IE环境，并且原生支持 MutationObserver，那也是一个微任务
  } else if (!isIE && 
  typeof MutationObserver !== 'undefined' && (isNative(MutationObserver) || MutationObserver.toString() === '[object MutationObserverConstructor]')) {
    let counter = 1
    // new 一个 MutationObserver 类
    const observer = new MutationObserver(flushCallbacks)
    // 创建一个文本节点
    const textNode = document.createTextNode(String(counter))
    // 监听这个文本节点，当数据发生变化就执行 flushCallbacks
    observer.observe(textNode, { characterData: true })
    timerFunc = () => {
      counter = (counter + 1) % 2
      textNode.data = String(counter) // 数据更新
    }
    isUsingMicroTask = true // 标记当前 nextTick 使用的微任务

    // 判断当前环境是否原生支持 setImmediate
  } else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
    timerFunc = () => {
      setImmediate(flushCallbacks)
    }
  } else {
    // 以上三种都不支持就选择 setTimeout
    timerFunc = () => {
      setTimeout(flushCallbacks, 0)
    }
  }
}
//
//任务优先级 Promise---> MutationObserver---> setImmediate---> setTimeout
```

### vue2 为什么需要使用 vm.$set

vue2 使用 object.defineProperty()数据劫持，只有 getter||setter 无法监听属性的修改删除，需要初始化对象，无法拦截对象多层嵌套，数组长度发送变化时候无法监听

#### 追问 vue2 缺陷

数组 push()，pop()，shift()，unshift()，splice()，sort()，reverse()方法无法触发视图更新
对象新增属性及删除属性无法触发视图更新

#### 追问 vue3 又做了哪些优化

使用了 proxy api 13 种监听操作弥补了 object.defineProperty()的不足

### vue Router

官方路由，适用于单页面应用
router-link：点击跳转
router-view：路由视图
嵌套路由：路由添加 Childen 属性子路由嵌套在父路由中

#### 后续追问 vue 两种路由模式

**hash 模式**

- 原理
  使用 window.location.hash 属性及窗口的 onhashchange 事件，
  可以实现监听浏览器地址 hash 值变化
  解析`#`后的字符，称之为散列值、锚点，用于做页面跳转定位。
  散列值不会被发送到服务器，不会引起页面重新加载
  通过 location.hash 获取 hash 值，在浏览器地址栏会有反应
  触发 onhashchange 场景：前进后退，浏览器 url 改变，只改变 url 哈希部分
  vue router4：createWebHashHistory()
  **history 模式**
- 原理
  window.history 指向 history，表当前窗口浏览器会话历史，
  history 中 pushState()和 replaceState()实现前端路由，这两种方法应用于浏览器历史记录栈，通过两种方法改变 url 不会导致页面刷新
  url 改变触发 popstate 事件
  前后端一起配合的路由，nginx 配合是将所有请求都重定向到 index
  vue router4：createWebHistory()

- 差异
  1.history 和 hash 都是利用浏览器的两种特性实现前端路由，history 是利用浏览历史记录栈的 API 实现，hash 是监听 location 对象 hash 值变化事件来实现
  2.history 的 url 没有'#'号，hash 反之
  3.history 修改的 url 可以是同域的任意 url，hash 是同文档的 url 4.相同的 url，history 会触发添加到浏览器历史记录栈中，hash 不会触发。
  5.hash 仅将 url 作为参数传递给后端，后端通过'#'截断，
  6.history 需要后端支持，后端未覆盖的路由地址则返回 404，前端的 URL 必须和实际向后端发起请求的 URL 一致,
  例如请求http://www.abc.com/book/id 缺乏/book/id 后端返回 404
  hash 仅‘#’符号之前的内容会被包含在请求中
#### $route和$router的区别
$route是“路由信息对象”，跳转的路由对象，包括path，params，hash，query，fullPath，matched，name等路由信息参数。
而$router是“路由实例”对象包括了路由的跳转方法，钩子函数等
#### 路由几种传参
- query方法传入的参数使用this.$route.query接受
1.query传参可以使用path,也可以使用name;
2.query相当于get请求，参数拼接在路由的后面；
3.query是拼接在路由后面的，因此有没有没关系；

- params方式传入的参数使用this.$route.params接受
1.params是路由的一部分，因此使用params传参，路由上必须写对应的参数；
2.进行路由跳转的时候要传值，否则会跳转页面失败；
3.params只能使用name来传参；
4.params相当于post请求，参数对用来说是不可见的

#### 如何实现登录控制
```js
router.beforeEach((to,from,next)=>{
  if(to.path==='login')return next()
  if(未登录)return next('/login')
  next()
})
```

#### 追问导航守卫
路由设置钩子

- 全局进入、离开、解析路由三个时期都做了什么
  router.beforeEach(to,from,next) 进入 
  to即将要进入的目标，
  from正要离开的路由，
  next 必须调用，否则不能进入路由，next(false)取消进入，next('/goods') || next({path:''}) || next({name:''})
  ```js
  if(登录 || to.name === 'login'){ next() } // 登录，或者将要前往login页面的时候，就允许进入路由
  ```

  router.beforeResolve 解析
  router.afterEach 离开
- 路由独享 router.beforeEnter
- 组件内的守卫
  beforeRouteEnter 路由验证前被调用组件实例并未创建 通过 next 回调访问组件实例
  beforeRouteUpdate 路由改变 组件被复用调用，可访问组件实例
  beforeRouteLeave 离开渲染该组件，可访问组件实例
- 实际执行顺序
  失活组件 beforeRouteLeave --> 全局 beforeEach --> 重用的组件里调用 beforeRouteUpdate --> 路由独享 beforeEnter --> 激活的组件里调用 beforeRouteEnter --> 全局 beforeResolve --> 全局 afterEach

#### 追问路由懒加载

import('路由')

### vuex如何使用
new Vue中注入vuex，
```js
//mutation-types.js
export const ADD = 'ADD'
//store.js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    add(state, n = 1) {
      state.count += n
    },
    [ADD](state){}
  },
  actions:{
    syncAdd({state}){
      setTimeout(()=>{ 
          state.count ++ 
      },1000)
    }
  },
  getters:{//类似计算属性
    doubleCount(state){
      return state.count * 2
    }
  }
})
```
state: this.$store.state.xxx\mapState
getters: this.$store.getters.xxx\mapGetters
Mutation: this.$store.commit('xxx',可选)\mapMutation
Actions: this.$store.dispatch('aaa')\mapActions
module: 需写namespaces

#### vuex是通过什么方式提供响应式数据的
`new Vue({})`
#### getters如何实现
```js
/*store.getters实现*/
const MyStore = function (options) {
  const { state = {}, mutations = {}, getters = {} } = options
  const computed = {}
  const store = this
  store.getters = {}
  for (let [key, fn] of Object.entries(getters)) {
    computed[key] = function () {
      return fn(store.state, store.getters)
    }
    Object.defineProperties(store.getters, key, {
      get: function () {
        return store._vm[key] // 拿的computed中数据
      }
    })
  }
  this._vm = new Vue({
    data: {
      $$state: state
    },
    computed
  })
}
```

#### beforeCreate中混入$store

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

### 自定义指令
在需要对DOM元素进行底层操作时用到
```js
app.directive('zidingyi',{//全局自定义指令
  bind//初始化
  inserted(el,binding){ //挂载后自动执行
  //el 接收的dom元素，binding传入的值
    //xxx
  }
  update//vnode更细后使用
})
//vue3生命周期改了
```
### vue2的坑点（外包爱问）
vue2对初学者更友好 mixin 层级数据来源不清晰
table组件数据量过大存在卡顿，需要做虚拟滚动

 