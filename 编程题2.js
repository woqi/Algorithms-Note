//草稿本
let s = 1234
// console.log(numberReverse(s))
function init(s) {
  const next = parseInt(s / 10)
  return next == 0 ? `${s}` : `${s % 10}${init(next)}`
}
//
function fun(num) {
  let num1 = num / 10
  let num2 = num % 10
  if (num1 < 1) {
    return num
  } else {
    num1 = Math.floor(num1)
    return `${num2}${fun(num1)}`
  }
}
// let a = fun(12345)
// console.log(a)
// console.log(typeof a)
function numberReverse(num) {
  const str = num.toString()
  return str.length === 1
    ? str
    : numberReverse(str.substring(1)) + str.substring(0, 1)
}
let s1 = 'hahahaah'
let s2 = 'aa'
const myfind = (S, T) => S.search(T)
console.log(myfind(s1, s2))

// 0.0476bnb ---》3871610000
// 31.34usdt ---》 4026590000

function clone(data) {
  if (typeof data === 'symbol') {//symbol，symbol是非object的基本类型
    return Symbol().for(data.description)
  } else if (typeof data != 'object') {//基本类型 
    return data
  } else if (data instanceof Array) {// Array
    data.map(i => clone(i))
    return [...data]
  } else if (data.constructor === Object) {//避免 new Date，处理json
    let res = {}
    for(let key in data){
      res[key] = clone(data[key])
    }    
    return res
  } else {
    //系统对象及自定义对象 类似于class
    return new data.constructor(data)
  }
}
let a = [{a:12,b:2},{a:6,b:7}]
let b = clone(a)
b[0].b++
console.log(a)
console.log(b)
//
class Preson {
  constructor(name, age) {
    //为了深克隆
    if (arguments.length === 1 && arguments[0] instanceof Preson) {
      let p = arguments[0]
      this.name = p.name
      this.age = p.age
    } else {
      this.name = name
      this.age = age
    }
  }
}
// let p1 = new Preson('hehe', 20)
// let p2 = new Preson(p1)
// p2.age = 30
// console.log(p1)
// console.log(p2)
