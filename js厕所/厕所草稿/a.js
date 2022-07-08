function merger(a, b) {
  if(!a && !b && !Array.isArray(a) && !Array.isArray(b)){return}
  return a.concat(b).sort((i,k)=>i-k)
}
let aa = merger([1, 2, 100, 5, 5], [2, 2, 2, 5, 0])
let bb = merger([], [])
//
// let arr = [11, 22, 33]
// Array.prototype.haha = '数组'
// arr.prototype.yaya = '数组'

// for (let i = 0; i < arr.length; i++) {
//   console.log(arr[i])
//   if (i >= 1) {
//     break
//   }
// }

// arr.forEach(ele => {
//   console.log('ele---',ele)
// })

// for (const key in arr) {
// if (Object.hasOwnProperty.call(arr, key)) {

// console.log(arr[key])
// }
// }
