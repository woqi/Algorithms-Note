### promise

**默认处于**
pending---fulfilled
pending---rejected

### 实现 promise

```js
const Pending = 'pending'
const Fulfilled = 'fulfilled'
const Rejected = 'rejected'
class MyPromise {
  constructor(executor) {
    executor(this.resolve, this.reject)
  }
  status = Pending
  value = undefined
  reason = undefined
  successCallback = []
  failCallback = []
  resolve = value => {
    if (this.status !== Pending) return
    this.status = Fulfilled
    this.value = value
    while (this.successCallback.length) this.successCallback.shift()(this.value)
  }
  reject = reason => {
    if (this.status !== Pending) return
    this.status = Rejected
    this.reason = reason
    while (this.failCallback.length) this.failCallback.shift()(this.reason)
  }
  then(successCallback, failCallback) {
    successCallback = successCallback ? successCallback : v => v
    failCallback = failCallback
      ? failCallback
      : r => {
          throw r
        }
    let proimis2 = new MyPromise((resolve, reject) => {
      if (this.status === Fulfilled) {
        setTimeout(() => {
          let x = successCallback(this.value)
          resolvePromise(proimis2, x, resolve, reject)
        }, 0)
      } else if (this.status === Rejected) {
        setTimeout(() => {
          let x = failCallback(this.reason)
          resolvePromise(proimis2, x, resolve, reject)
        }, 0)
      } else {
        this.successCallback.push(() => {
          setTimeout(() => {
            let x = successCallback(this.value)
            resolvePromise(proimis2, x, resolve, reject)
          }, 0)
        })
        this.failCallback.push(() => {
          setTimeout(() => {
            let x = failCallback(this.value)
            resolvePromise(proimis2, x, resolve, reject)
          }, 0)
        })
      }
    })
    return proimis2
  }
  catch(errCallback) {
    return this.then(null, errCallback)
  }
}
function resolvePromise(proimis2, x, resolve, reject) {
  if (proimis2 === x) {
    return reject(new TypeError('Chaining cycle detected for MyPromise #<MyPromise>'))
  }
  if (x instanceof MyPromise) {
    x.then(resolve, reject)
  } else {
    resolve(x)
  }
}
module.exports = MyPromise
```

### race

```js
Promise.myRace = arr => {
  return new Promise((resolve, reject) => {
    arr.forEach(p => p.then(resolve, reject))
  })
}
```

### all（结合事件循环）

```js
Promise.myall = promises => {
  let complete = 0
  let result = []
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(res => {
        complete++
        result[i] = res
        if (complete == promises.length) {
          resolve(result)
        }
      }, reject)
    }
  })
}
```

### 如何取消 promise
