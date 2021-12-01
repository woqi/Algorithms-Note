let map = new Map()
let set = new Set()
map.set('a', 123)
console.log(map.get('a'))
//

set.add('bb')
console.log(set.has('a'))

const arr = [0, 1, 0, 3, 0, 0, 0, 0, 0, 12]
// pushZero(arr)
// console.log('111',arr)
function pushZero(arr) {
  //1.看到0就交换,性能最低效率最差
  // for (let i = 0; i < arr.length - 1; i++) {
  //   if (arr[i] == 0 && arr[i + 1] != 0) {
  //     for (let j = i + 1; j > 0; j--) {
  //       if (arr[j - 1] != 0) break
  //       swap(j,j-1)
  //     }
  //   }
  // }
  // function swap(i1, i2) {
  //   let tmp = arr[i1]
  //   arr[i1] = arr[i2]
  //   arr[i2] = tmp
  // }
  //2.最长非零字符串
  let count = 0 //假设末尾有0
  for (let i = 0; i < arr.length - 1 - count; i++) {
    if (arr[i] === 0) {
      let c = 1
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] === 0) c++
        else break
      }
      let res = arr.splice(i, c)
      arr.push(...res)
      i-- //原地保持不动
      count += c
    }
  }
}
// Promise.myRace = arr => {
//   return new Promise((resolve, reject) => {
//     arr.forEach(p => p.then(resolve, reject))
//   })
// }
// Promise.myRace([
//   new Promise((resolve, reject) => {
//     setTimeout(() => resolve(1), 500)
//   }),
//   new Promise((resolve, reject) => {
//     setTimeout(() => reject(2), 700)
//   }),
//   new Promise((resolve, reject) => {
//     setTimeout(() => resolve(3), 1000)
//   }),
// ]).then(
//   res => {
//     console.log('success', res)
//   },
//   err => {
//     console.log('faild', err)
//   }
// )

// let p = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject(12)
//   }, 500)
// })
// p.finally(() => {
//   console.log('完成')
// })

let num1 = [1, 2, 2, 1],
  num2 = [7,2, 2, 3]
//解法1
let json = {}
num1.forEach(item => {
  json[item] = json[item] || 0
  json[item]++
})
let result = []
num2.forEach(i => {
  if (json[i] > 0) {
    result.push(i)
    json[i]--
  }
})
console.log('res---',result)

//解法2 o(n * m) 有bug
// let max = []
// for (let i = 0; i < num1.length; i++) {
//   let arr = []
//   for (let j = 0; j < num2.length; j++) {
//     if (num1[i + j] === num2[j]) {
//       arr.push(num2[j])
//     } else {
//       break
//     }
//   }
//   if (arr.length > max.length) {
//     max = arr
//   }
// }
// console.log('max', max)

//解法3
var intersection = function (nums1, nums2) {
  if (nums1.length > nums2.length) [nums1, nums2] = [nums2, nums1]
  let set = new Set(nums1)
  let res = new Set()
  for (let i = 0; i < nums2.length; i++) {
    if (set.has(nums2[i])) {
      res.add(nums2[i])
    }
  }
  return [...res]
}
