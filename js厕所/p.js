class Promise2 {
  //禁止用户手动改，私有变量
  #status = 'pending'
  constructor(fn) {
    //拿到立即调用
    this.q = []

    const resolve = data => {
      this.#status = 'fulfilled'
      // 拿取第一个
      const f1f2 = this.q.shift()
      if (!f1f2 || !f1f2[0]) return
      //返回值x
      const x = f1f2[0].call(undefined, data)
      if (x instanceof Promise2) {
        x.then(
          data => {
            //成功调用下一个f1
            resolve(data)
          },
          reson => {
            //失败调用调用下一个f2
            reject(reson)
          }
        )
      } else {
        //调用下一个f1
        resolve(x)
      }
      // if (x !== null && (typeof x === "object" || typeof x === "function")) {}
    }

    const reject = data => {
      this.#status = 'rejected'
      const f1f2 = this.q.shift()
      if (!f1f2 || !f1f2[1]) return
      const x = f1f2[1].call(undefined, data)
      if (x instanceof Promise2) {
        x.then(
          data => {
            resolve(data)
          },
          reson => {
            reject(reson)
          }
        )
      } else {
        resolve(x)
      }
    }
    fn.call(undefined, resolve, reject)
  }
  then(f1, f2) {
    this.q.push([f1, f2])
  }
}

//测试
const p = new Promise2((resolve, reject) => {
  setTimeout(function () {
    reject('lala')
  }, 2000)
})
p.then(
  data => {
    console.log('then--', data)
  },
  reson => {
    console.log('err--', reson)
  }
)
.then(
  function f3() {
    console.log('f3')
  },
  function f4() {
    console.log('f4')
  }
)

// const p = new Promise2((resolve, reject) => {
//   resolve('成功')
//   reject('失败')
// })
// p.then(a, b)

// const t = Promise.resolve(1)
//   .then(
//     function f1() {
//       console.log('f1')
//       return Promise.reject(1)
//     },
//     function f2(r) {
//       console.log('f2')
//       return Promise.reject(2)
//     }
//   )
//   .then(
//     function f3() {
//       console.log('f3')
//     },
//     function f4() {
//       console.log('f4')
//     }
//   )
// f1,f4
