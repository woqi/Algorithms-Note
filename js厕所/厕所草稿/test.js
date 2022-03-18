function fn() {
  console.log('可以点击了')
}
//截流
const throttle = (fn, time) => {
  let cd = false
  return (...args) => {
    if (cd) return
    fn.call(undefined, ...args)
    cd = true
    setTimeout(() => {
      cd = false
    }, time)
  }
}
// throttle(fn,3000)

//构造函数继承
// function ADom(name) {
//   this.color = ['red', 'blue', 'green']
//   this.name = name
// }
// function BSub() {
//   ADom.call(this, 'haha')
//   this.age = 40
// }
// let ins1 = new BSub()
// let ins2 = new ADom()
// ins1.color.push('yellow')
// console.log('ins1--', ins1.color) //ins1-- (4) ['red', 'blue', 'green', 'yellow']
// console.log('ins1--', ins1.name) // haha
// console.log('ins1--', ins2.name)

//组合继承
// function SuperType(name) {
//   this.name = name
//   this.color = ['red', 'blue', 'green']
// }
// SuperType.prototype.sayName = function () {
//   console.log('SuperType-sayName', this.name)
// }
// function SubType(name, age) {
//   SuperType.call(this, name)
//   this.age = age
// }
// SubType.prototype = new SuperType()
// SubType.prototype.sayAge = function () {
//   console.log('SubType-sayAge', this.age)
// }
// let ins1 = new SubType('nick', 80)
// ins1.color.push('yingying')
// console.log(ins1.color)
// ins1.sayAge()
// ins1.sayName()

// let ins2 = new SubType('Bob', 22)
// console.log(ins2.color)
// ins2.sayAge()
// ins2.sayName()

//原型式继承
// function object(o){
//   function F(){}
//   F.prototype = o
//   return new F()
// }
// // Object.create() //第一个参数是要克隆的原型，第二个是要传入的对象
// let preson = {
//   name:'Nic',
//   friends:['She','Cou','Van']
// }
// let anoPerson = object(preson)// Object.create(preson)
// anoPerson.name = 'Gre'
// anoPerson.friends.push('Rob')
// let yetPerson = object(preson)// Object.create(preson)
// yetPerson.name = 'Lin'
// yetPerson.friends.push('Bar')
// console.log(preson.friends)//['She', 'Cou', 'Van', 'Rob', 'Bar']
//

//寄生式组合继承
// function inheritPro(subType,superType){
//   let prototype = Object.create(superType) // 保存父类
//   prototype.constructor = subType // 增强，constructor意思是你的上级是谁
//   subType.prototype = prototype
// }
// function SuperType(name){
//   this.name = name
//   this.colors = ['red', 'blue', 'green']
// }
// SuperType.prototype.sayName = function(){
//   console.log('SupTyper',this.name)
// }
// function SubType(name,age){
//   SuperType.call(this,name)
//   this.age = age
// }
// inheritPro(SubType,SuperType)
// SubType.prototype.sayAge = function(){
//   console.log('SubType',this.age)
// }
// new SuperType('lala')
//类继承
class Preson {}
const P2 = class {
  constructor() {
    console.log('===', this)
    // this.sayName = () => console.log('con', this)
  }
  sayAge() {
    console.log('20', this)
  }
}
let aa = new P2() //constructor上定义的this可以在aa这个实例下找到，aa.sayName直接使用

console.log('--', new P2()) //aa.prototype.sayAge()也可调用

// class A {}
// function B() {}
// class C extends A {}
// class D extends B {}
// let c = new C()
// let d = new D()
// c instanceof A //true
// d instanceof B //true
//

// function Animal(legs) {
//   this.legs = legs
// }
// Animal.prototype.kind = '动物'
// function Dog(name) {
//   Animal.call(this, 4)
//   this.name = name
// }
// var fn = function(){}
// fn.prototype = Animal.prototype
// Dog.prototype = new fn()

// class Animal{
//   constructor(legs){
//     this.legs = legs
//   }
// }
// class Dog extends Animal {
//   constructor(name){

//     this.name = name
//   }
// }
const d = () => {
  console.log('q')
}
//点击时候使用 截流
const throttle2 = (fn, time) => {
  let timer = null
  return (...args) => {
    if (timer) {
      return
    }
    fn.call(undefined, ...args)
    timer = setTimeout(() => {
      timer = null
    }, time)
  }
}
const d2 = throttle(d, 3 * 1000)

const f = () => {
  //回城过程中被攻击就会被打断
  console.log('回城')
}
//窗口拖动 防抖 回城被打断
const debonce = (fn, time) => {
  let timer = null
  return (...args) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.call(undefined, ...args)
      timer = null
    }, time)
  }
}
const tp = debonce(f, 3 * 1000)
