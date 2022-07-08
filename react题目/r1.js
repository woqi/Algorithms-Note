let a = {
  tag: 'div',
  props: {
    id: 'x'
  },
  children: [
    {
      tag: 'span',
      props: {
        className: 'span'
      },
      children: ['hi']
    }
  ]
}
class R {
  constructor() {
    this.name = 'RR'
  }
  static printName() {
    console.log('R---', this.name)
    return this.name
  }
}
class T extends R {
  constructor(name) {
    super(name)
  }
  static copyFn() {
    return super.printName()
  }
}
let aa = T.copyFn()

class Cat {
  constructor(name) {
    this.name = name
  }

  speak() {
    console.log(this.name + ' makes a noise.')
  }
}

class Lion extends Cat {
  speak() {
    super.speak()
    console.log(this.name + ' roars.')
  }
}
let bb = new Lion('lion')
bb.speak()
//

Function.prototype.mybind = function (thisArg) {
  let fn = this
  thisArg = thisArg || window
  return function (...rest) {
    fn.apply(thisArg, [...args, ...rest])
  }
}
function a(m, n) {
  console.log('this是谁--', this)
  console.log(m + n)
}
let fn = a.mybind({ a: 1 })
fn(3, 4)
