let myObject = {
  a: 1,
  b: 2,
  c: 3
}
// myObject.prototype.hehe = 'hehe'
// for (let key of myObject) {
// console.log(key + ': ' + myObject[key])
// }
//a:1 b:2 c:3

// const data = require('./mock')
// function search(arr, keyWorld) {
//   if (!keyWorld) return []
//   let result = []
//   for (let i = 0; i < arr.length; i++) {
//     if (keyWorld == arr[i].name) {
//       Object.getOwnPropertyNames(arr[i]).length > 0 ? result.push(arr[i]) : []
//     }
//   }
//   return result
// }
// let aaa = search(data.all_category, '通用空间')

function throttleAsync(funcs, max) {
  const ps = funcs
  const results = []
  let error = false
  function walk(start, r, j) {
    let callFs = ps.slice(start, start + max)
    let length = 0
    for (let i = start; i < start + callFs.length; i++) {
      ps[i]()
        .then(data => {
          length++
          results[i] = data
          if (length === callFs.length) {
            if (start + max < ps.length) {
              walk(start + max, r, j)
            } else {
              r(results)
            }
          }
        })
        .catch(e => {
          error = e
          j(e)
        })
    }
  }
  return new Promise((r, j) => {
    walk(0, r, j)
  }) // your code here
}
function throttlePromise2(funcs, max) {
  let results
  return new Promise((r, j) => {
    let queue = [...funcs],
      count = 0
    function fn() {
      while (count < max && queue.length > 0) {
        const first = queuq.shift()
        count++
        first()
          .then(res => {
            results.push(res)
            count--
            fn()
          })
          .catch(err => j(err))
      }
      if (results.length === funcs.length) {
        r(results)
      }
    }
    fn()
  })
}
function count(str) {
  const map = new Map()
  const result = []
  for (const c of str) {
    map.set(c, (map.get(c) || 0) + 1)
  }
  const max = Matn.max(...map.values())
  for (const [key, value] of map) {
    if (value === max) {
      result.push(key)
    }
  }
  return result.length === 1 ? result[0] : result
}

function myBind(asThis) {
  var that = this,
    args = [].slice.call(arguments, 1)
  if (typeof that != 'function') {
    throw new Error('bind需使用在函数上')
  }
  function resFn() {
    var args2 = [].slice.call(arguments)
    return that.apply(resFn.prototype.isPrototypeOf(this) ? this : asThis, args.concat(args2))
  }
  resFn.prototype = that.prototype
  return resFn
}

/*测试部分*/
Function.prototype.myBind = myBind
const person = {
  firstName: '毛蛋',
  lastName: '1号',
  fullName: function () {
    return this.firstName + ' ' + this.lastName
  }
}
const member = {
  firstName: '青蛙',
  lastName: '2号'
}
let fullName = person.fullName.myBind(member)
console.log('fullName---',fullName())

const fn12 = function (p1, p2) {
  this.p1 = p1
  this.p2 = p2
}
fn12.prototype.sayHi = function () { }
const fn2 = fn12.myBind(null, 'x', 'y')
const obj1 = new fn2()



//
