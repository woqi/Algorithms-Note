//测试文件
const MyPromise = require('./p3')
// const MyPromise = require('./p2')


// let p = new MyPromise((resolve, reject) => {
//   // setTimeout(() => {
//   resolve('chengg')
//   // reject('失败')
//   // }, 2000);
// })

// function other() {
//   return new MyPromise((res, rej) => {
//     res('other')
//   })
// }

// let p1 = p.then(val => {
//   console.log(val)
//   return p1
// })

// p1.then(
//   value => {
//     console.log('--', value) 
//   },
//   reason => {
//     //应报错
//     console.log('re---', reason.message)
//   }
// )

let p2 = new MyPromise((resolve, reject) => {
  resolve('p2')
})
//没有参数 MyPromise自适配一个value=>value.
p2.then().then().then(value => console.log('---',value))
// p2.then(value => console.log('---',value))


console.log('**')
// p.then(
//   val => {
//     console.log('第1次--', val)
//     return other()
//   }
// ).then(value=>{
//   console.log('第2次--', value)
// })

// p.then(
//   val => {
//     console.log('chengg--2', val)
//   },
//   reason => {
//     console.log('re---', reason)
//   }
// )
// p.then(
//   val => {
//     console.log('chengg--3', val)
//   },
//   reason => {
//     console.log('re---', reason)
//   }
// )
//
