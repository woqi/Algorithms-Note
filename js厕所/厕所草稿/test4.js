/*
实现一个函数someFunc输入([12,23,34])后，
3秒后连续打印出12，23,34
*/
function someFunc(arr = []) {
  if (!arr) {
    return
  }
  arr.forEach(e => {
    setTimeout(() => console.log('打印--', e), 3000)
  })
}
// someFunc([12,23,34])

/*
实现一个函数someFunc输入([12,23,34])后，
3秒后连续打印出12，
6秒后打印出23
9秒后打印出34
*/

//解法1
function someFunc2(arr = []) {
  if (!arr) {
    return
  }
  for (let i = 0; i < arr.length; i++) {
    const e = arr[i]
    !(function () {
      setTimeout(function () {
        console.log('--', e)
      }, (i + 1) * 3000)
    })()
  }
}
// someFunc2([12, 23, 34])
//解法2
function someFunc3(arr) {
  let n = 0
  function loop() {
    setTimeout(() => {
      console.log('--', arr[n])
      n++
      if (n > arr.length) {
        return
      } else {
        loop()
      }
    }, 3000)
  }
  loop()
}
// 可删
// someFunc3([12, 23, 34])

/*
sum(1,2,3)
sum(1)(2)(3)
sum(1,2)(3)//6
*/ 
function sum(){
function fn(){return 'fn-qaq'}
fn.toString = function(){
  return 'fn.toString'
}
return fn
}
// let a = sum(1)(2)(3) //6
let b = sum()
console.log('b-',b())

//
