function es5_curry(fn) {
  var args = [].slice.call(arguments)
  return function () {
    var new_args = [].slice.call(arguments)
    return fn.apply(null, args.concat(new_args))
  }
}
function curry(f) {
  const res = (...allArgs) => (allArgs.length >= f.length ? f(...allArgs) : (...args) => res(...allArgs, ...args))
  return res
}
/*记忆草稿 */
function cu(fn) {
  const res = (...args) => {
    if (args.length < fn.length) {
      return (...newArgs) => res(...args, ...newArgs)
    } else {
      return fn(...args)
    }
  }
  return res
}

const foo = cu((a, b, c, d) => {
  console.log(a, b, c, d)
})
// foo(1)(2, 3)(4) // 1 2 3 4
// const f = foo(1)(2)(3)
// f(5) // 1 2 3 5
//
function P() {
  this.name = 'P'
}

// let ap = new P()

// es6:
class Dog2 {
  // 放在a2.prototype.constructor.statue
  static statue = '跑'
  #kind = '狗' // 私有属性
  constructor(name) {
    //初始化
    this.name = name
    this.legNuymber = 4
  }
  say = function () {
    console.log(`汪,我是${this.name},我有${this.legsNumber}条腿`)
  }
  run = function () {
    console.log(`有${this.legsNumber}条腿跑起来`)
  }
}
// let a2 = new Dog2('xiao bai')

const bus = {
  //map队列
  map: {},
  on: (name, fn) => {
    bus.map[name] = bus.map[name] || []
    bus.map[name].push(fn)
  },
  emit: (name, data) => {
    const q = bus.map[name]
    if (!q) {
      return
    }
    //f(data)===f.call(null,data)
    q.map(f => f(data))
  },
  off: (name, fn) => {
    const q = bus.map[name]
    if (!q) {
      return
    }
    const idx = q.indexOf(fn)
    //短路法
    if (idx < 0) {
      return
    }
    q.splice(idx, 1)
  }
}
// bus.on('click', console.log)
// bus.off('click', console.log)
// bus.on('click')
// setTimeout(() => {
//   bus.emit('click', 'woqi')
// }, 3000)
//
// var b=10;
// (function b(){
// b=20;
// console.log(b)
// })()
// 1,2,3,6,9,8,7,4,5]
let matrix = [
  [1,2,3],
  [4,5,6],
  [7,8,9]
]
var spiralOrder = function (matrix) {
  if (matrix.length === 0) return []
  const res = []
  let top = 0,
    bottom = matrix.length - 1,
    left = 0,
    right = matrix[0].length - 1
    console.log(matrix[0][right])
  while (top < bottom && left < right) {
    for (let i = left; i < right; i++) res.push(matrix[top][i]) // 上层
    for (let i = top; i < bottom; i++) res.push(matrix[i][right]) // 右层
    for (let i = right; i > left; i--) res.push(matrix[bottom][i]) // 下层
    for (let i = bottom; i > top; i--) res.push(matrix[i][left]) // 左层
    right--
    top++
    bottom--
    left++ // 四个边界同时收缩，进入内层
  }
  if (top === bottom)
    // 剩下一行，从左到右依次添加
    for (let i = left; i <= right; i++) res.push(matrix[top][i])
  else if (left === right)
    // 剩下一列，从上到下依次添加
    for (let i = top; i <= bottom; i++) res.push(matrix[i][left])
  return res
}
let rrr = spiralOrder(matrix)
//