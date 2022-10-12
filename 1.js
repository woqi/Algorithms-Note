// var people = {
//   name:'wq',
//   getName:function(){
//     console.log(this.name)
//   }
// }
// // window.onload = function(){
// //   document.querySelector('#content').onclick = people.getName
// // }
// var bar = people.getName
// bar()
// /**
//  this取决于什么方式调用

//  绑定规则：
//  1.默认绑定
//  2.隐性绑定
//  3.显性绑定
//  4.new绑定
//  */
// // 1.默认绑定
// function foo(arg) {
//   var a = 1
//   console.log('a---',this?.a)
//   // console.log('arg---',arg)
// }
// var a = 10
// // foo( )
// var obj = {
//   a:10,
//   foo
// }
// // obj.foo()
// //2显性绑定
// // foo.call(null,'123')
// // foo.apply(null,['123'])
// var hehe = {a:10}
// // foo.bind(hehe)
// // foo()

// function foo2(){
//   console.log('---**-2-',this.a);
// }
// var obj = { a : 10 };

// foo2 = foo2.bind(obj);
// foo2();

function foo(some) {
  console.log('this---', this)
  this.a = some
}
var obj = {}
var b = foo.bind(obj)
b(2)
console.log('obj', obj)
