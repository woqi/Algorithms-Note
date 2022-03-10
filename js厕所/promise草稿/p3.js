const Pending = 'pending'
const Fulfilled = 'fulfilled'
const Rejected = 'rejected'
class MyPromise {
  //executor指回调函数
  constructor(executor) {
    executor(this.resolve, this.reject)
  }
  status = Pending

  //成功后的值
  value = undefined

  //失败原因
  reason = undefined

  //成功回调
  successCallback = []

  //失败回调
  failCallback = []

  //用箭头函数为了this指向MyPromise
  resolve = value => {
    //状态为等待才可以继续执行
    if (this.status !== Pending) return
    this.status = Fulfilled

    //保存成功后的值
    this.value = value
    //成功回调是否存在，存在就调用
    // this.successCallback && this.successCallback(this.value)

    while (this.successCallback.length) this.successCallback.shift()(this.value)
  }

  reject = reason => {
    if (this.status !== Pending) return
    this.status = Rejected

    //保存失败原因
    this.reason = reason

    //失败回调是否存在，存在就调用
    // this.failCallback && this.failCallback(this.reason)

    //处理链式调用
    while (this.failCallback.length) this.failCallback.shift()(this.reason)
  }

  //then，做状态判断，成功调用成功回调函数，反之亦然
  //then成功回调有参数表成功后的值，then失败回调有一个参数表失败原因
  then(successCallback, failCallback) {
    successCallback = successCallback ? successCallback : v => v
    failCallback = failCallback ? failCallback : r => {throw r}

    let proimis2 = new MyPromise((resolve, reject) => {
      if (this.status === Fulfilled) {
        //想拿到proimis2的执行结果只能放入下一次宏任务
        setTimeout(() => {
          let x = successCallback(this.value)

          //判断x的值是普通值还是promise对象
          //普通的话直接调用resolve
          //promise对象的话，查看promise对象返回结果，
          //再根据promise对象返回结果决定调用reolve还是reject
          //此时需要把这部分逻辑抽离出去
          resolvePromise(proimis2, x, resolve, reject)
        }, 0)
      } else if (this.status === Rejected) {
        setTimeout(() => {
          let x = failCallback(this.reason)
          resolvePromise(proimis2, x, resolve, reject)
        },0)
      } else {
        //Pending,存储失败及成功回调
        this.successCallback.push(()=>{
          setTimeout(() => {
            let x = successCallback(this.value)
            resolvePromise(proimis2, x, resolve, reject)
          }, 0)
        })

        this.failCallback.push(()=>{
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
    return this.then(null,errCallback)
  }
}
function resolvePromise(proimis2, x, resolve, reject) {
  if (proimis2 === x) {
    return reject(new TypeError('Chaining cycle detected for MyPromise #<MyPromise>'))
  }
  if (x instanceof MyPromise) {
    // x.then(
    //   value => resolve(value),
    //   reason => reject(reason)
    // )
    //简化
    x.then(resolve, reject)
  } else {
    resolve(x)
  }
}

module.exports = MyPromise
