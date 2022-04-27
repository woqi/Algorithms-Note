//草稿
class EventEmitter1 {
  constructor() {
    this.watcher = new Map()
  }
  subscribe(eventName, callback) {
    var watcher = this.watcher
    if (!watcher.has(eventName)) {
      watcher.set(eventName, [callback])
    } else {
      watcher.set(eventName, [...watcher.get(eventName), callback])
    }
    return {
      release: function () {
        watcher.get(eventName).map((item, index) => {
          if (item == callback) {
            watcher.get(eventName).splice(index, 1)
          } else {
            return item
          }
        })
      }
    }
  }
  emit(eventName, ...args) {
    if (this.watcher.has(eventName)) {
      this.watcher.get(eventName).forEach(call => {
        call.apply(this, args)
      })
    }
  }
}
class EventEmitter {
  constructor() {
    this.map = new Map()
  }
  subscribe(eventName, callback) {
    let map = this.map
    if (!map.has(eventName)) {
      map.set(eventName, [callback])
    } else {
      map.set(eventName, [...map.get(eventName), callback])
    }
    return {
      release: function () {
        map.get(eventName).map((item, idx) => {
          if (item === callback) {
            map.get(eventName).splice(idx, 1)
          } else {
            return item
          }
        })
      }
    }
  }
  emit(eventName, ...args) {
    let map = this.map
    if (map.has(eventName)) {
      map.get(eventName).forEach(e => {
        e.apply(this, args)
      })
    }
  }
}

function flat1(a) {
  let res = []
  let json = {}
  //拍平并去重
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
function flatt(a) {
  return a.reduce((pre, next) => {
    return pre.concat(Array.isArray(next) ? flatt(next) : next)
  }, [])
}
// console.log(flatt([1,2,[3,4,[5,6,[7,8,[9,10]]]]]))
//
function fn1() {
  return new Promise((res, rej) => {
    res('fn1~')
  })
}
function fn2() {
  return new Promise((res, rej) => {
    res('fn2~')
  })
}
function fn3() {
  return new Promise((res, rej) => {
    res('fn3~')
  })
}
function fn4() {
  return new Promise((res, rej) => {
    res('fn4~')
  })
}
function throttlePromises2(funcs, max) {
  let results = []
  return new Promise((resolve, reject) => {
    let count = 0,
      queue = [...funcs]
    function fn() {
      while (count < max && queue.length > 0) {
        const first = queue.shift()
        count++
        first()
          .then(res => {
            count--
            results.push(res)
            fn()
          })
          .catch(err => reject(err))
      }
      if (results.length === funcs.length) {
        resolve(results)
      }
    }
    fn()
  })
}
// throttlePromises2([fn1, fn2, fn3, fn4], 2).then(data => {
//   console.log('**-', data)
// })

function flatten1(arr) {
  var res = []
  for (var i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      res = res.concat(flatten(arr[i]))
    } else {
      res.push(arr[i])
    }
  }
  return res
}
function flatten2(arr) {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}
function flatten(arr) {
  return arr.reduce((pre, next) => {
    return pre.concat(Array.isArray(next) ? flatten(next) : next)
  }, [])
}
// flatten([1,[2],[3,[4]]])
// flatten([1,[2],[3,[4]]])
// flatten([1,[2],[3,[4]]])
console.time()
let hehe = flatten([1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]])
console.timeEnd()

//
