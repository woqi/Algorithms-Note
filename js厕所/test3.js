function comp(f, g) {
  return function (value) {
    return f(g(value))
  }
}
function reverse(array) {
  return array.reverse()
}
function first(array) {
  return array[0]
}
//从右往左执行
const last = comp(first, reverse)
// console.log(last([1,2,3,4]))

//---es5
// function checkAge(min,age){
//   return age>=min
// }

// console.log(checkAge(18,20))
//---es6
// let checkAge = min => age => {
//   return age >= min
// }

// function checkAge(min) {
//   return function (age) {
//     return age >= min
//   }
// }
// let checkAge18 = checkAge(18)
// console.log('--', checkAge18(17))

//函数式编程的实例
// const Blog = {
//   index(post) {
//     return Views.index(post)
//   },
//   show(post) {
//     return Views.show(post)
//   },
//   create(post) {
//     return Db.create(post)
//   },
//   update(post) {
//     return Db.update(post)
//   }
// }
//优化
// const Blog2 = {
//   index：Views.index,
//   show： Views.show},
//   create：Db.create,
//   update： Db.update,
// }

function control(fn, num) {
  let lock = 1
  return function () {
    if (lock <= num) {
      fn.apply(this, arguments)
      lock++
    }
  }
}
let pay = control((money)=> {
  console.log('支付', money)
},3)
pay(5)
pay(5)
pay(5)
pay(5)
//
