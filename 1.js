const obj = {
  a: '1',
  b: {
    c: '2',
    d: {
      e: '3',
      f: {
        g: '4'
      }
    }
  }
}

Object.freeze(obj)
obj.a = '11'
obj.b.d.e = '33'

// console.log( Object.isFrozen(obj.b.d.e))

let a = { a: '1', b: { c: '2', d: { e: '1' } } }
let b = { a: '1', b: { c: '2', d: { e: '1' } } }
console.log(Object.is(a,b))


