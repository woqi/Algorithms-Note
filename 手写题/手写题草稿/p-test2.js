function throttlePromises(funcs, max) {
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
/*测试*/
throttlePromises([fn1, fn2, fn3, fn4], 2).then(data => {
  console.log('**-', data)
})
/*add(1)(2)(3)
add(1,2,3)*/
function add() {
  let args = [].slice.call(arguments)
  let fn = function () {
    let fn_args = [].slice.call(arguments)
    return add.apply(null, args.concat(fn_args))
  }
  fn.toString = function () {
    return args.reduce((a,b)=>a+b)
  }
  return fn
}
let aaa = add(1)(2)(3)
//
let num = 0
function addNum() {
  return num++
}
// addNum()


//
