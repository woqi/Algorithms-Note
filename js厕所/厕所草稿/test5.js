//浏览器中任务微任务题目
//1
// Promise.resolve() //先执行
//   .then(() => {
//     console.log(0)
//     return Promise.resolve(4) //坑
//   })
//   .then(res => {
//     console.log(res)
//   })

// Promise.resolve()
//   .then(() => {
//     console.log(1)
//   })
//   .then(() => {
//     console.log(2)
//   })
//   .then(() => {
//     console.log(3)
//   })
//   .then(() => {
//     console.log(5)
//   })
//   .then(() => {
//     console.log(6)
//   })
//0123456
/*
  next = [0,4]
  */
//2
// async function async1() {
//   console.log(1)//--
//   async2().then(() => {
//     console.log(2)
//   })
// }
// async function async2() {
//   console.log(3)
// }
// console.log(4)//--
// setTimeout(() => { //--
//   console.log(5)
// }, 0)
// async1()
// new Promise(resolve => {
//   console.log(6)
//   resolve()
// }).then(() => {
//   console.log(7)
// })
// console.log(8)//--
//4 1 3 6 8 2 7 5

//3
console.log('script start');

setTimeout(()=>{
    console.log('setTimeout')
},0);

Promise.resolve()
.then(()=>console.log('promise1'))
.then(()=>console.log('promise2'))

console.log('script end')

// ----
console.log('script start')

async function async1() {   
  await async2()
  console.log(0)//?
}
async function async2() {
  console.log(1)
}

async1()

setTimeout(function() {
  console.log(2)
}, 0)

new Promise(resolve => {
  console.log(3)
  resolve()
})
  .then(function() {
    console.log(4)
  })
  .then(function() {
    console.log(5)
  })

console.log('script end') 
//script start
//1
//0
//3
//script end
//4
//5
//2

/*p1   p2*/