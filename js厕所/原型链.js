// const obj = {}
// Object.prototype.xxx = 'haha'
// const func = () => {}
// Function.prototype.yyy = 'adsdada'
// const arr = []
// console.log('dsadasd')

const my_instanceof = (A, B) => {
  let p = A //指针指向a
  while (p) {
    //遍历原型链
    if (p === B.prototype) {
      return true
    }
    p = p.__proto__
  }
  return false
}
//asdas

var foo = {},
  F = function () {}
Object.prototype.a = 'value a'
Function.prototype.b = 'value b'
console.log(foo.a) //a
console.log(foo.b) // undefined
console.log(F.a) // a
console.log(F.b) //b

const json = {
  a: { b: { c: 1 } },
  d: { e: 2 },
}
const path = ['d', 'e']
const pj = json
path.forEach(k => {
  p = p[k]
})
