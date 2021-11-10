//1.柯里化
function argsSum(args) {
  return args.reduce((pre, cur) => {
    return pre + cur
  })
}
function add(...args1) {
  let sum1 = argsSum(args1)
  let fn = function (...args2) {
    let sum2 = argsSum(args2)
    return add(sum1 + sum2)
  }
  fn.toString = function () {
    return sum1
  }
  return fn
}

//set基础操作
let mySet = new Set()
mySet.add(1)
mySet.add(3)
mySet.add(3) //无效
mySet.add('123')
let obj = { a: 'sdasa', b: 'sdadsads' } //内容相同、两个地址
mySet.add(obj)
mySet.add({ a: 'sdasa', b: 'sdadsads' }) //内容相同、两个地址

const has = mySet.has({ a: 'sdasa', b: 'sdadsads' })
// mySet.delete('') //删除

for (let [key, value] of mySet.entries()) {
  // console.log('item-values', key, value)
}
//entries()、keys()、values()

//set转array
const myArr1 = [...mySet]
const myArr2 = Array.from(mySet)

//array转set
const mySet2 = new Set([1, 2, 3, 4])

//交集
const intersection = new Set([...mySet].filter(x => mySet2.has(x)))

//差集
//输出的是mySet2没有的值
const difference = new Set([...mySet].filter(x => !mySet2.has(x)))

//不允许用循环遍历该数组
let datas = [29, 8, 17, 6, 3, 19, 27, 81, 2, -6]
function interation(arr) {
  if (arr.length <= 1) return arr
  let n = arr[0]
  return [...interation(arr.slice(1)), n]
}
// console.log(interation(datas))

//归并排序法查找最大数
let data = [29, 8, 17, 6, , 3, 19, 27, 81, 2, -6]
function findMax(arr) {
  //终止条件
  if (arr.length === 0) {
    return undefined
  } else if (arr.length === 1) {
    return arr[0]
  }
  //划分
  let c = Math.floor(arr.length / 2)
  let left = arr.slice(0, c)
  let leftMax = findMax(left)

  let right = arr.slice(c)
  let rightMax = findMax(right)
  // if (leftMax > rightMax) {
  //   return leftMax
  // } else {
  //   return rightMax
  // }
  //合并
  return leftMax > rightMax ? leftMax : rightMax
}
// console.log(findMax(data))

//旋转数组
function myShift(arr, k) {
  k %= arr.length
  if (k >= Math.floor(arr.length / 2)) {
    arr.push(...arr.splice(0, arr.length - k))
  } else {
    arr.unshift(...arr.splice(arr.length - k, k))
  }
  return arr
}
// console.log('!!', myShift([-1,-100,3,99], 2))

//1-10000间所有对称数
//思路1，暴力法，最少时间解决问题
function isSymmetry(n) {
  return n.toString() === n.toString().split('').reverse().join('')
}
let arr = []
for (let i = 1; i <= 10000; i++) {
  if (isSymmetry(i)) arr.push(i)
}
// console.log(arr);//198个

//思路2，如果一个数原本是对称的，在两边加相同的东西依然对称
//内核，1-9，两位数,往这两种两边加方法
//性能更高
let arr1 = [] //确定的对称数
for (let i = 0; i <= 9; i++) {
  arr1.push(i + '')
  arr1.push(i + '' + i)
}
//装东西
let arr2 = [...arr1]
for (let i = 1; i <= 9; i++) {
  arr1.forEach(item => {
    arr2.push(i + item + i)
  })
}
arr2.shift()
arr2.shift()
// console.log('arr---', arr2) //基本对称数//198

let a1 = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2']
let a2 = ['A', 'B', 'C', 'D']
//合并为
// let res = ['A1', 'A2', 'A', 'B1', 'B2', 'B', 'C1', 'C2', 'C', 'D1', 'D2', 'D']
let res1 = []
while (a1.length || a2.length) {
  if (a1.length == 0) {
    res1 = [...res1, ...a2]
    break
  }
  if (a2.length == 0) {
    res1 = [...res1, ...a1]
    break
  }
  if (a2[0] == a1[0][0]) {
    res1.push(a1.shift())
  } else {
    res1.push(a2.shift())
  }
}
console.log('--', res1)
