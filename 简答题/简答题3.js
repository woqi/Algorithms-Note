//草稿
const arr = [10, 2, 3]
// console.log(arr instanceof Array);
class MyArray extends Array {}
let arr2 = new MyArray()
arr2.push(7, 8, 9)
// console.log(arr2)

let arr3 = arr.sort((a, b) => {
  if (a < b) {
    return -344
  } else if (a > b) {
    return 0.23
  } else {
    return 0
  }
})
//简写arr.sort((a, b) =>a-b)原因
// console.log(arr3)

let arr1 = [1, 2]
class Myarr extends Array {}
let arr4 = new Myarr()
// console.log(Object.prototype.toString.call(arr4)) //[object Array]
// console.log(arr4 instanceof Array)//true
// console.log(arr4 instanceof Object)//true
// console.log(Array.isArray(arr4)) //true

arr1.constructor === Array //true
arr2.constructor === Array //false

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
// (async()=>{
//   console.log(11);
//   await sleep(2000)
//   console.log(22);
// })()

let arr5 = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10]
//拍平 升序 去重
let res = []
let json = {}
flat1(arr5)
function flat1(a) {
  for (let i = 0; i < a.length; i++) {
    if (typeof a[i] == 'number') {
      // if(!res.includes(a[i])){//低性能版
      //   res.push(a[i])
      // }
      if (!json[a[i]]) {
        //高性能
        res.push(a[i])
        json[a[i]] = true
      }
    } else {
      flat1(a[i])
    }
  }
}
//手写排序 冒泡
for (let i = 0; i < res.length; i++) {
  for (let j = i; j > 0; j--) {
    if (res[j] < res[j - 1]) {
      //基础版
      // let tmp = res[j]
      // res[j] = res[j - 1]
      // res[j - 1] = tmp

      //炫技版本
      res[j] += res[j - 1]
      res[j - 1] = res[j] - res[j - 1]
    }
  }
}
console.log(res)

//
