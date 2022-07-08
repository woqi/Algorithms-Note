const x = { a: 100 }
const y = { a: 100 }
const z = x
const arr = [1, 1, 2, 3, '1', x, y, z]

const arr2 = [x, y, z]

// function uniq(arr) {
//   // TODO:
// }
function unique(arr) {
  const seen = new Map()
  return arr.filter(a => !seen.has(a) && seen.set(a, 1))
}
// let dd = unique(arr2)
//默写
function clone(data) {
  if (typeof data === 'symbol') {
    return Symbol().for(data.description)
  } else if (typeof data != 'object') {
    return data
  } else if (data instanceof Array) {
    return data.map(i => clone(i))
  } else if (data.constructor === Object) {
    let res = {}
    for (key in data) {
      res[key] = clone(data[key])
    }
    return res
  } else {
    return new data.constructor(data)
  }
}
function componse(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  )
}
const throttle = (fn, time) => {
  let t = null
  return (...args) => {
    if (t) {
      return
    }
    fn.call(undefined, ...args)
    t = setTimeout(() => {
      t = null
    }, time)
  }
}
const d = () => {
  console.log('q')
}
const d2 = throttle(d, 3 * 1000)

const debonce = (fn, time) => {
  let t = null
  return (...args) => {
    if (t) {
      clearTimeout(t)
    }
    t = setTimeout(() => {
      fn.call(undefined, ...args)
      t = null
    }, time)
  }
}
function twoSum(nums, target) {
  let map = new Map()
  for (let i = 0; i < nums.length; i++) {
    const n = nums[i]
    const n2 = target - n
    if(map.has(n2)){
      return [map.get(n2), i]
    }else{
      map.set(n,i)
    }
  }
}
//
