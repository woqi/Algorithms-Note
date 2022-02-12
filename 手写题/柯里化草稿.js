let a = add2(2, 3)(1)
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
  console.log(fn)
  fn.toString = function () {
    return sum1
  }
  return fn
}

function add2() {
  let args = [].slice.call(arguments)
  let fn = function () {
    let fn_args = [].slice.call(arguments)
    return add2.apply(null, args.concat(fn_args))
  }
  fn.toString = function () {
    return args.reduce((a, b) => a + b)
  }
  return fn
}
function add3() {
  let args = [].slice.call(arguments)
  let fn = function () {
    let fn_args = [].slice.call(arguments)
    return add3.apply(null, args.concat(fn_args))
  }
  fn.toString = function () {
    return args.reduce((a, b) => a + b)
  }
  return fn
}
let ab = add3(2, 3)(1)
console.log('jij----', ab)
//
const my_instanceof = (a, b) => {
  let p = a
  while (p) {
    if (p === b.prototype) {
      return true
    }
    p = p.__proto__
  }
  return false
}
function clone(data){
  if(typeof data === 'symbol'){
    
  }
}
let obj = {
  name:'dsa',
  show:()=>{
    console.log('show',this)
  }
}