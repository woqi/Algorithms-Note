### 实现 pipe()
https://bigfrontend.dev/zh/problem/what-is-composition-create-a-pipe

```js
const times = y => x => x * y
const plus = y => x => x + y
const subtract = y => x => x - y
const divide = y => x => x / y
//测试用例
pipe([times(2), times(3)])(1) // x * 2 * 3
pipe([times(2), plus(3), times(4)]) // (x * 2 + 3) * 4
pipe([])(1)
pipe([times(2)])(1)
pipe([times(2), times(3)])(2)
pipe([times(2), times(3), plus(4)])(2)
// (x * 2 - 3) / 4
pipe([times(2), subtract(3), divide(4)])(2)
const pipe = fn => x => fn.reduce((a, b) => b(a), x)
```

### 实现 clearAllTimeout
https://bigfrontend.dev/zh/problem/implement-clearAllTimeout

```js
setTimeout(console.log(1), 3000)
setTimeout(console.log(2), 3000)
setTimeout(console.log(3), 3000)
// 3个方法都是设定在3秒以后
clearAllTimeout()
// 所有方法的timer都被取消掉了
function clearAllTimeout() {
  let id = setTimeout(null, 0)
  while (id >= 0) {
    window.clearTimeout(id)
    id--
  }
}
```

### 实现 Event Emitter
https://bigfrontend.dev/zh/problem/create-an-Event-Emitter
```js
//测试用例
const emitter = new Emitter()
const sub1  = emitter.subscribe('event1', callback1)
const sub2 = emitter.subscribe('event2', callback2)
// 同一个callback可以重复订阅同一个事件
const sub3 = emitter.subscribe('event1', callback1)
emitter.emit('event1', 1, 2)
// callback1 会被调用两次
sub1.release()
sub3.release()
// 现在即使'event1'被触发, 
// callback1 也不会被调用
class EventEmitter {
  constructor() {
    this.map = new Map()
  }
  subscribe(eventName, callback) {
    let map = this.map
    if (!map.has(eventName)) {
      map.set(eventName, [callback])
    } else {
      map.set(eventName, [...map.get(eventName), callback])
    }
    return {release:function(){
      map.get(eventName).map((item,idx)=>{
        if(item===callback){
          map.get(eventName).splice(idx,1)
        }else{
          return item
        }
      })
    }}
  }
  emit(eventName, ...args) {
    let map = this.map
    if(map.has(eventName)){
      map.get(eventName).forEach(e=>{
        e.apply(this,args)
      })
    }
  }
}
```


### 实现Array.flat()
```js
//测试用例
flat([1,[2],[3,[4]]])  
flat([1,[2],[3,[4]]], 1)  
flat([1,[2],[3,[4]], 2)  
flat([1,2,[3,4,[5,6,[7,8,[9,10]]]]], Infinity)   
```

### Promise reject的时候自动retry 
https://bigfrontend.dev/zh/problem/retry-promise-on-rejection
```js
/**
 * @param {() => Promise<any>} fetcher
 * @param {number} count
 * @return {Promise<any>}
 */
function (fetcher, count){
  return fetcher().catch(err=>{
    if(count===0){
      throw err
    }else{
      return fetchWithAutoRetry(fetcher,count-1)
    }
  })
}
```
### Promise 截流 92
https://bigfrontend.dev/zh/problem/throttle-Promises

```js
function throttlePromises(funcs, max) {
  let results = []
  return new Promise((resolve, reject) => {
    let count = 0,
      queue = [...funcs]
    function fn() {
      while (count < max && queue.length > 0) {
        const first = queue.shift()
        count ++ 
        first().then(res=>{
          count --
          results.push(res)
          fn()
        }).catch(err=>reject(err))
      }
      if (results.length === funcs.length) {
        resolve(results)
      }
    }
    fn()
  })
}
/*测试*/
throttlePromises([fn1, fn2, fn3, fn4], 2).then(data => {
  console.log('**-', data)
})
```