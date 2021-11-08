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
  console.log('item-values', key, value)
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

//性能更高
let arr = [] //确定的对称数
for (let i = 0; i <= 9; i++) {
  arr.push(i + '')
  arr.push(i + '' + i)
}
//装东西
let arr2 = [...arr]
for (let i = 1; i <= 9; i++) {
  arr.forEach(item=>{
    arr2.push(i+item+i)
  })
}
arr2.shift()
arr2.shift()
console.log('arr---', arr2) //基本对称数


//
