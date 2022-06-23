const x = { a: 100 }
const y = { a: 100 }
const z = x
const arr = [1, 1, 2, 3, '1', x, y, z]

const arr2 = [x, y, z]

// function uniq(arr) {
//   // TODO:
// }
function unique(arr) {
  const seen = new Map()
  return arr.filter(a => !seen.has(a) && seen.set(a, 1))
}
let dd = unique(arr2)
//默写
function clone(data) {
  if (typeof data === 'symbol') {
    return Symbol().for(data.description)
  }else if(typeof data != 'object'){
    return data
  }else if(data instanceof Array){
    return data.map(i=>clone(i))
  }
  else if(data.constructor === Object){
    let res = {}
    for(key in data){
      res[key] = clone(data[key])
    }
    return res
  }else{
    return new data.constructor(data)
  }
}
function componse(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  )
}
const throttle = (fn,time)=>{
  let t = null
  return (...args) =>{
    if(t){return}
    fn.call(undefined,...args)
    t = setTimeout(()=>{
      t = null
    },time)
  }
}



//
