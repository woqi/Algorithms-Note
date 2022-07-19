### react的周期函数
static getDerivedStateFromProps(nextProps, prevState) {} // 静态函数，无法使用 this
componentDidMount 组件被挂载后触发
componentDidUpdate 组件更新后触发
shouldComponentUpdate 组件是否需要更新
componentWillUnmount 组件将要销毁触发
#### 如何用hooks去模拟react类的周期函数
```js
//componentDidMount
const useMount = (fn: () => void) => {

  useEffect(() => {
    fn?.();
  }, []);
};
//componentWillUnmount
const useUnmount = (fn: () => void) => {

  const ref = useRef(fn);
  ref.current = fn;
  useEffect(
    () => () => {
      fn?.()
    },
    [],
  );
};
```
### 讲讲react函数组件
useContext是context的hook实现，可以不用redux管理全局一些状态，一般把全局状态放在provider中
回调配合useReducer挂载dispatch
https://mp.weixin.qq.com/s/Bdv9Kx9zFqm76OVXjPKq9Q
https://juejin.cn/post/6944863057000529933#heading-25

### 如何用useRef去获取父组件的真实dom
```js
const Index =()=>{
  const myRef = useRef(null)
  return <div ref={may}>hehe</div>
}
```
### 在hooks中，如何使逻辑只执行一次
仅第一次render后执行，提供空数组作为依赖项`useEffect(()=>{},[])`
### diff算法的实现逻辑
**Diff 算法是一种对比算法**，对比两者都是新旧虚拟 DOM，对比哪个虚拟 Dom 做出了更改，并更新这个虚拟节点对应的真实节点，不用更新其他数据没有发生改变的节点，提高效率。
Dom diff 对比两颗虚拟Dom树，组件变化，render新虚拟Dom，diff算法对比新旧虚拟Dom后得到patch，React用patch更新真实Dom
- 过程：
1.对比两棵树根节点，标签类型改变，将丢掉整颗树，删除对应真实Dom树创建新Dom树
2.根节点没变，查看属性是否改变
 2.1 属性没变，保留对应真实节点
 2.2 属性改变，只更新该节点属性，不创建新节点，更新style时，多个css属性只有一个改变，则更细化的更新改变部分
3.子节点对比过程同根节点
```
ul
li key=b b
li key=c c
--->变为
ul
li  a
li key=b b
li key=c c
```
react对比b-a,新建a删除b，对比c-b，同旁。加key，只添加a
### 在生成一个list dom的时候，key的作用是什么
react利用key来识别组件，它是一种身份标识标识
#### 可以用index去当做list的key吗
不建议
上面实例中在数组重新排序后，key对应的实例都没有销毁，而是重新更新。具体更新过程我们拿key=0的元素来说明， 数组重新排序后：
组件重新render得到新的虚拟dom；
新老两个虚拟dom进行diff，新老版的都有key=0的组件，react认为同一个组件，则只可能更新组件；
然后比较其children，发现内容的文本内容不同（由a--->c)，而input组件并没有变化，这时触发组件的componentWillReceiveProps方法，从而更新其子组件文本内容;

因为组件的children中input组件没有变化，其又与父组件传入的任props没有关联，所以input组件不会更新(即其componentWillReceiveProps方法不会被执行)，导致用户输入的值不会变化。

这就是index作为key存在的问题，所以不要使用index作为key。
#### 如果生成的list dom列表不做任何修改，可以使用index去做key吗
受控&非受控 是问题的关键
在前后两个例子中，我们都用了索引做 key ，左侧的id一直是能够根据实际情况进行更新的。而在Input组件这里，受控状态下的Input组件，是能够正确更新的，而在非受控状态下的Input组件，从被删掉的位置开始，后续的所有值都发生了错乱。接下来我们从react如何进行更新的角度来分析，为什么会出现这样的差异。
非受控组件不会因为数据变化引发UI变化
key相同，若组件属性有所变化，则react只更新组件对应的属性；没有变化则不更新。
key值不同，则react先销毁该组件，再去创建
https://juejin.cn/post/6990159289251790885
### 讲讲redux的单项数据流
Redux 提供了一个叫 store 的统一仓储库，组件通过 dispatch 将 state 直接传入 store，不用通过其他的组件。并且组件通过 subscribe 从 store 获取到 state 的改变。使用了 Redux，所有的 组件都可以从 store 中获取到所需的 state，他们也能从 store 获 取到 state 的改变。
原理是context + provider实现
**如何使用**
createStore创建store
```js
import {createStore} from 'redux'
const store = createStore(reducer)
//reducer
const reducer = (state,action){
switch (action.type) {
  case 'ADD':
    return ...state,state.count++
    break;

  default:
    break;
}
}
//获取store中内容
store.getState()
//监听store变化
store.subscribe(()=>console.log(store.getState()))
//修改store中的state
store.dispatch({type:'ADD'})
//实际生产配合react-redux使用
```

#### redux有个中间件，他会负责判断action的type吗
中间件的本质是柯里化
**middleware**
middleware 接受 2 个参数，Store 的 getState 函数和 dispatch 函数，分别获得 store 和 action，最终返回一个函数。该 函数会被传入 next 的下一个 middleware 的 dispatch 方法，并返 回一个接收 action 的新函数，这个函数可以直接调用 next （action），或者在其他需要的时刻调用，甚至根本不去调用它。调 用链中最后一个 middleware 会接受真实的 store 的 dispatch 方 法作为 next 参数，并借此结束调用链。所以，middleware 的函数 签名是（{ getState，dispatch })=> next => action。
```js
function _compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)))//双箭头函数还需复习
}
//applyMiddleware实现
export default function applyMiddleware(...middlewars) {
  return createStore => reducer => {
    const store = createStore(reducer)
    let dispatch = store.dispatch //初始值的dispatch

    const midApi = {
      getState: store.getState,
      dispatch: action => dispatch(action)
    }
    //返回store，同时加强dispatch
    const middlewareChain = middlewars.map(middlewar => middlewar(midApi))

    dispatch = _compose(...middlewareChain)(store.dispatch)
    return {
      ...store,
      //返回了加强版的dispatch
      dispatch
    }
  }
}
```
**thunk**
```js
function thunk(dispatch, getState) {
  return next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState)
    }
    return next(action)
  }
}
```
#### 讲讲redux的异步逻辑
异步请求有了结果才会触发action进入到reducer，修改store中的state。
#### 讲讲有哪些异步的中间件
redux-thunk使用简单，直接在action里面进行异步操作，虽然简单但是在action里面写异步逻辑感觉有点混乱。
```js
import { getTodoByIdType } from "../types";

// 请求API
const getTodoById = async (payload) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${payload}`
  );
  const response = await res.json();
  return response;
};

// 同步action，设置state
export const getTodoByIdAction = (payload) => {
  return {
    type: getTodoByIdType,
    payload,
  };
};

// 异步请求，有了结果再触发同步action设置state
export const getTodoByIdThunkAction = (payload) => {
  return async (dispatch) => {
    const response = await getTodoById(payload);
    dispatch(getTodoByIdAction(response));
  };
};

```

redux-promise隐藏了异步操作的具体细节，并且只需要一个action就能完成异步操作，相对redux-thunk来说更加简单。
```js
import { getTodoByIdType } from "../types";

// 请求API
const getTodoById = async (payload) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${payload}`
  );
  const response = await res.json();
  return response;
};

// 直接将异步请求设置成payload
// 当异步有了结果会自动触发该action，然后进入到reducer更新state
export const getTodoByIdPromiseAction = (payload) => {
  return {
    type: getTodoByIdType,
    payload: getTodoById(payload),
  };
};
/*上面的例子，当我们在React组件dispatch(getTodoByIdThunkAction(1))后会进入到getTodoByIdThunkAction方法，进行异步请求，当请求返回结果后再触发同步action即getTodoByIdAction进入到相应reducer更新state。
每个异步操作相当于需要两个action，一个进行异步请求一个触发reducer更新state。
*/ 
```
redux-saga，把异步操作单独分离出来放在saga文件中。当我们提交普通action的时候，如果匹配到了saga文件中的监听器就会被拦截下来，然后调用saga里配置的方法进行异步操作。如果没匹配上就走提交普通action的逻辑。总体来说逻辑较为清晰，但是使用成本增加。

### 讲讲webpack
1. 从配置文件与 Shell 语句中读取与合并参数，得出最终参数
2. 用该参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译，
3. 根据 entry 配置找出全部入口文件，
4. 根据文件类型和 loader 配置，使用对应 loader 对文件进行转换处理，解析文件 AST 语法树，找出文件依赖关系，递归编译依赖模块，递归完得到每个文件最终结果
5. 根据 entry 配置生成 chunk 代码块
6. 输出所有 chunk 到 output

### ES6新特性
let const 解构赋值 symbol Set WeakSet Map WeakMap class async Object.keys()，Object.values()，Object.entries() Object.is()(对比是否相等) 箭头函数 
#### undefined、null区别
undefined 表示不存在这个值。当声明的变量还未被初始化时
变量被声明了，但没有赋值时，就等于undefined。
调用函数时，应该提供的参数没有提供，该参数等于undefined。
对象没有赋值的属性，该属性的值为undefined。
函数没有返回值时，默认返回undefined
null 表示一个对象被定义了，值为“空值”
null : 是一个对象(空对象, 没有任何属性和方法)
例如作为函数的参数，表示该函数的参数不是对象；
#### Set、Map、WeakSet 和 WeakMap 的区别
json: 只能用字符串做 key
Map：字典，用任何数据做 key，强调映射
Set：集合，强调 key 是否存在，add()添加，has()是否有，更节约空间，不需要 value，只有 key 就可以
Set、Map 底层数据结构相同，没有太大计算速度上的差距
WeakSet：
weak 弱的意思，没有引用就会被回收，Weak 类不添加硬记数，不影响回收，
数据必须要保存的时候使用 Map，缓存可以使用 Weak 类数据
WeakMap：
题外话：传统 c 语言没有垃圾回收，自己垃圾回收
`int*arr = malloc(SIZEOF(int)*100)`
此时需要手动回收这 100 的位置
`free(arr)`
高级语言 Java、Python、JavaScript，有 GC，可以自动回收这些数据，如何判断数据是否失效，是依据引用记数
### 箭头函数与function函数有哪些区别
箭头函数 this 由定义者决定
普通函数 this 由调用者决定
普通函数可以作为构造函数来使用时因为 this 是可变的
箭头函数 this 不可变
this 在构造的过程中需要被指向一个全新的实例
### 讲讲promise
- 解决了
回调嵌套
链式操作减低了编码难度
代码可读性明显增强
- 状态
promise对象仅有三种状态
pending（进行中）
fulfilled（已成功）
rejected（已失败）
- 特点
对象的状态不受外界影响，只有异步操作的结果，可以决定当前是哪一种状态
一旦状态改变（从pending变为fulfilled和从pending变为rejected），就不会再变，任何时候都可以得到这个结果
#### promise中，Slove动作之前的代码是同步的，还是异步的
Promise本身是同步的,但是then()是异步的
构造同步， then 异步。
同步-->微任务-->宏任务
https://zhuanlan.zhihu.com/p/355143116
### Input Type=Fail 在各种浏览器下的兼容情况
### 数组方法
arr.push(...items) —— 从尾端添加元素，
arr.pop() —— 从尾端提取元素，
arr.shift() —— 从首端提取元素，
arr.unshift(...items) —— 从首端添加元素。
arr.splice(start[, deleteCount, elem1, ..., elemN])
它从索引 start 开始修改 arr：删除 deleteCount 个元素并在当前位置插入 elem1, ..., elemN。最后返
arr.includes 
### 数组去重
```js
function uniq(a) {
  let map = new Map()
  for (let i = 0; i < a.length; i++) {
    let number = a[i]
    if (number === undefined) {
      continue
    }
    if (map.has(number)) {
      continue
    }
    map.set(number, true)
  }
  return [...map.keys()]
}
const unique = arr => {
  return Array.from(new Set(arr))
}
const unique = arr => {
  let res = [];
  arr.forEach(item => {
      if (!res.includes(item)) res.push(item); 
  })
  return res;
} 

```
#### 如何优化算法达到无序去重和有序去重
### 如何获取对象
Object.keys()
#### 对象排序
Object.keys(objs).sort()可以获取到排好序的keys
#### 怎么给对象赋值，创建一个对象有几种方法，每种方法的优缺点，如何调用对象中的方法
`. || []`
.赋值只能适用于字段名没有特殊符号如：-、空格等，
但是[]可以用于任何情况
### 原型链
询问这个概念涉及很多可以举例说明么？
- 第一步说 原型：假设有普通对象 x={}，x 有隐藏属性叫`__proto__`,`x.__proto__=== Object.prototype`
- 第二步说 原型链：假设有普通对象 a=[]，a 有隐藏属性叫`__proto__`,`a.__proto__=== Array.prototype`
  Array.prototype 也有隐藏属性`__proto__`，`Array.prototype.__proto__=== Object.prototype`
  链条：`a--->Array.prototype--->Object.prototype`
  a=[]
  b= Array.prototype
  c=Object.prototype
  `a.__proto__ = b; b.__proto__ = c;`**随即连环问如何设置原型**
- 连环问到第三步，原型链解决了什么问题，解决了在 es5 继承，但是不支持私有属性**随即连环问如何实现继承**

#### 如何设置原型
逻辑：`a.__?__= f`
es5: `a = new F()`**随即连环问 new 做了什么** a 是 F 的实例，F 是构造函数
es6: `a=Object.create(F)`

#### new 的时候会发生以下几件事情
创建临时对象
将临时对象的`__proto__`指向构造函数
将构造函数的this绑定到临时对象上
执行构造函数
返回临时对象
--以下不看--
假设 `let newPerson = new Person|| let newPerson2= new Person()`不传参就不加括号 
1.内存中创建了一个新对象 
2.新对象 newPerson 内部的 Prototype 被赋值为构造函数 Person 的 Prototype 属性 
3.构造函数上的 this 被绑定到新对象
4.执行构造函数内部代码，若构造函数没有返回值，则返回新对象newPerson

#### `__proto__` 、prototype、constructor 区别
`__proto__、constructor`是对象属性
`prototype`是函数属性

`__proto__`告知公用属性有哪些，
`prototype` 定义好共有属性
函数的`constructor`都等于函数本身，对象的`constructor`等于
让该函数所实例化的对象都可以找到公用属性和方法
`function Dog(){} Dog.prototype.constructor = Dog //true`
任意函数的`constructor`都等于函数本身


```js
let obj = {
  toString: window.Object.prototype.toString
}
obj.toString()
```
### 闭包

- 概念
  闭包 = 函数 + 函数能够访问的自由变量
  自由变量是指在函数中使用的，但既不是函数参数也不是函数的局部变量的变量，变量在函数外部
- 解决了：
  避免污染全局环境、提供对局部变量的间接访问`count+1`不能`count-=1`
  维持变量，使其不被垃圾回收
  简单好用
  但是低版本浏览器使用不当会导致制内存泄漏

```js
//面试官只喜欢看这个答案
const x = (function () {
  var count
  return function add() {
    count += 1
  }
})()
//本质只是立即执行函数包裹的闭包
```

引用了另一个函数作用域的变量

```js
function fn(fnArg) {
  return function (obj1) {
    let value = obj1[fnArg] //此处是闭包
  }
}
```

内部匿名函数包含 fn 的作用域链

### JS的数据类型
string、number、boolean、undefined、null、bigint、symbol、object

表示对象为空使用 null，不存在的对象
非对象使用 undefined，声明，未赋值

bigint 出现原因
js number 默认为双精度浮点数，精度有限，位数有限
`123456n`表 bigint
但是 bigint 只支持整数

symbol 实现什么场景 做库的时候使用
### JS中的this
### type of的几种数据类型的输出
```js
console.log(typeof 2);               // number
console.log(typeof true);            // boolean
console.log(typeof 'str');           // string
console.log(typeof undefined);       // undefined
console.log(typeof []);              // object 
console.log(typeof {});              // object
console.log(typeof function(){});    // function
console.log(typeof null);            // object
```
其中数组、对象、null 都会被判断为 object，其他判断都正确。
### JavaScript严格模式与非严格模式的区别
- 严格模式
1. 变量必须声明才能使用
2. 禁止使用with语句
3. 创建eval作用域（正常模式下，js有两种变量作用域，全局作用域和局部作用域，正常模式下eval语句作用域取决于它处于全局作用域还是函数作用域，严格模式下eval语句本身就是作用域，不能够生成全局变量，所生成的变量只能用于eval内部）
4. 禁止this关键字指向全局对象(严格模式下全局作用域中定义的函数中的this为undefined)。例如：

 function f(){
   return !this; //返回的是false，因为this指向的是全局对象，!对象 == false
 }
 function f(){
   "use strict"
   return !this; //返回的是true，因为严格模式下，this的值为undefined，!undefined == true
 }
8. 严格模式下，对禁止扩展的对象添加新属性，会报错

"use strict";

var o = {};

Object.preventExtensions(o);//禁止o对象有拓展属性

o.v = 1; //报错
13. 不准对arguments赋值
https://segmentfault.com/a/1190000015798019
### 如何去封装一个组件，举个例子
```js
import React, { useState, useEffect } from 'react'
export default () => {
  const [positionX, setPositionX] = useState(0)
  const [positionY, setPositionY] = useState(0)
  const getMousePosition = (e) => {
    setPositionX(e.clientX)
    setPositionY(e.clientY)
  }
  useEffect(() => {
    document.addEventListener('mousemove', getMousePosition)
    return () => {
      document.removeEventListener('mousemove', getMousePosition)
    };
  });
  return {
    positionX: positionX,
    positionY: positionY
  }
}
//index
import React, {
  useState,
  useEffect
} from 'react'
import useMousePosition from '../hooks/useMouse'
export default () => {
  const mousePosition = useMousePosition()
  return(
    <div>
      <span>鼠标的横坐标{mousePosition.positionX}</span>
      <span>鼠标的纵坐标{mousePosition.positionY}</span>
    </div>
  )
}
```
### 一个form表单怎么上传
```js
<form>
    <input type="text" name="email_or_mobile" />
    <input type="password" name="password" />
    <input type="checkbox" name="remember_me" checked />
    <button type="submit">提交</button>
</form>
```
### 前端优化
### 代码压缩之后只有一行，怎么进行调试
Prettier-Code- formatter
### 事件冒泡
事件冒泡，就是元素自身的事件被触发后，如果父元素有相同的事件，如 onclick 事 件，那么元素本身的触发状态就会传递，也就是冒到父元素，父元素的相同事件也会 一级一级根据嵌套关系向外触发，直到 document/window，冒泡过程结束
### 项目中的问题
### 算法
#### 字符串反转
```js
function reverseWords(str){
  return str.split("").reverse().join("").split(" ").reverse().join(" ");
}
function reverseWords(str){
  return str
    .split(' ')
    .map( word => word.split('').reverse().join('') )
    .join(' ');
}
function reverseWords(str){
  let out='',a_word = ''
  for (const c of str) {
    if(c!=' '){
      a_word = c + a_word
    }else{
      out = out + a_word
      a_word = ''
      out = out + ' '
    }
  }
  out = out + a_word
  return out
}
```
#### 选择排序的复杂度 o(n*n)
#### 快速排序
#### 哈希问题

### CSS如何居中
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
### 盒模型
box-sizing: content-box 元素宽度为content + padding + border
box-sizing: border-box 元素实际宽度为 content，ie提出，更好用
选择器布局之类的用法
### scss的函数 变量 用法之类
变量$开头 @function 
### canvas和svg的区别
canvas 画位图，笔刷绘制的2d图形，canvas需要用库支持事件及分层
svg 矢量图，标签构成的2d图形，支持分层和事件，节点过多渲染慢
### 块级元素与行内元素的区别
块级元素包含块级与行内，占据一整行，可设置上下左右外边距，宽度默认占据整行
行内元素只包含行内和文本，占据自身宽度空间，无法设置上下内边距，宽度自适应大小
#### 有哪些块级元素行内元素
块级：div,h1~h6,p,hr,form,ul,dl,ol,pre,table,li,dd,dt,tr,td,th
行内：em,strong,span,a,br,img,button,input,lable,select, br,textarea,code,script
### window与document区别

DOM 是为了操作文档出现的 API，document 是其的一个对象；
BOM 是为了操作浏览器出现的 API，window 是其的一个对象。

### 英文自我介绍
Good afternoon, my name is XXXX. It’s really a great honor to have this opportunity for a interview, I would like to answer whatever you may raise, and I hope I can make a good performance today. Now I will introduce myself briefly. I am graduated from Shenyang Agricultural University, Institute of Science and Technology，and my major is XXXX. I have been working in XXXX for more than three years as Front-end Enginer. I am mainly responsible for the development of the business system during the project team. I have completed some middle and back office system independently. Moreover I have experience in mobile websit and the WeChat small program development. The technologies I mainly use include Vue, Webpack, React, Node, Less, SASS and so on. And I think I’m a good team player, I am honest, positive and hardworking. So I also sincerely hope your company can choose me. I will try my best and not let you down.

### 没有回答好的点
this部分应答到new绑定 > 显式绑定 > 隐式绑定 
对象的this指向，答谁调用this指向谁面试官存疑
object如何深度冻结
生产环境如何跨域
hoc再背一遍
key 从原理上查查资料