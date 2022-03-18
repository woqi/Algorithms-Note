console.log('aaa')
new Promise(resolve => {
  setTimeout(() => {
    console.log('0000')
    resolve('1111')
  })
}).then(res => {
  console.log(res)
})
setTimeout(() => console.log('bbb'), 1000)
const start = new Date()
while (new Date() - start < 3000) {}
console.log('ccc')
setTimeout(() => {
  console.log('ddd')
}, 0)
new Promise((resolve, reject) => {
  console.log('eee')
  throw new Error('error')
})
  .then(() => console.log('fff'))
  .then(() => console.log('ggg'))
  .catch(() => console.log('hhh'))
console.log('iii')
let a = [[1,2]]


//数组带children是这种格式么

let arr = [{
  name:'1',
  children:[{
    name:'1.1'
  }]
}]
