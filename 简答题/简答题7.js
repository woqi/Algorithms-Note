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

// Promise.myall([
//   new Promise(a=>setTimeout(()=>a(1),500)),
//   new Promise(a=>setTimeout(()=>a(2),600)),
//   new Promise(a=>setTimeout(()=>a(3),100)),
//   new Promise((a,b)=>setTimeout(()=>b('baocuo'),1700)),
//   new Promise(a=>setTimeout(()=>a(5),300))
// ]).then(arr=>{
//   console.log(arr)
// },err=>{
//   console.log(err)
// })
let arr = [-1, -100, 3, 99],
  k = 7
// shift(arr, k)
// console.log(arr)

function shift(arr, k) {
  k %= arr.length
  if (k >= Math.floor(arr.length / 2)) {
    arr.push(...arr.splice(0, arr.length - k))
  } else {
    arr.unshift(...arr.splice(arr.length - k, k))
  }
  return arr
}
// [3,99,-1,-100]

// for (let i = 0; i < 10; i++) {
//   setTimeout(() => {
//     console.log(i)
//   }, 1000)
// }

// for (var i = 0; i < 10; i++) {
//   (function(j){
//     setTimeout(() => {
//       console.log(j)
//     }, 1000)
//   })(i)
// }
// for (var i = 0; i < 10; i++) {
//   (function(i){
//     setTimeout(() => {
//       console.log(i)
//     }, 1000)
//   })(i)
// }

// for (var i = 0; i < 10; i++) {
//   setTimeout(((i)=>() => {
//     console.log(i)
//   })(i), 1000)
// }


