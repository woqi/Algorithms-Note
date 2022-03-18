// let a = 123
// let b = function () {}
// let c = () => {}
// console.log(a.prototype, b.prototype, c.prototype)
// console.log(a.constructor, b.constructor, c.constructor)
// console.log(a.__proto__, b.__proto__, c.__proto__)
// console.log(a)

/* 查找最大数 */
let data = [29, 8, 17, 6,3,, 19, 27, 81, 2, -6]
function findMax1(arr) {
  return arr.reduce((pre,cur)=>{
    return Math.max(pre, cur)
  })

}

function findMax2(arr) {
  return Math.max(...arr)
}

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
  console.log('--',left)
  let leftMax = findMax(left)

  let right = arr.slice(c)
  let rightMax = findMax(right)
  //合并
  return leftMax > rightMax ? leftMax : rightMax
}
console.log(findMax1(data))
