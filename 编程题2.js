//草稿本
let s = 1234
// console.log(numberReverse(s)) 
function init(s){
  const next = parseInt(s/10)
  return next == 0 ? `${s}`:`${s%10}${init(next)}`
}
// 
function fun(num){
  let num1 = num / 10;
  let num2 = num % 10;
  if(num1<1){
      return num;
  }else{
      num1 = Math.floor(num1)
      return `${num2}${fun(num1)}`
  }
}
var a = fun(12345)
// console.log(a)
// console.log(typeof a)


function numberReverse(num) {
  const str = num.toString()
  return str.length === 1 ? str : numberReverse(str.substring(1)) + str.substring(0, 1)
}

let s1 = 'hahahaah'
let s2 = 'aa'

const myfind = (S, T) => S.search(T)
console.log(myfind(s1,s2))

