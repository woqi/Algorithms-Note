let p = new Promise((resolve, reject) => {
  reject('55')
})

p.then(res => {
  console.log('success', res)
}).catch(err => {
  console.log('fail', err)
})

let a = {},
  b = '123',
  c = 123
a[b] = 'b'
console.log('//b', a[b]) //b

async function show() {
  console.log(12)
  let data = await request()
  console.log(data)
}
async function show() {
  console.log(12)
  request().then(data => console.log(data))
}
async function show2() {
  console.log(12)
  let data1 = await request('/data1')
  let data2 = await request('/data2')
  let data3 = await request('/data3')
  console.log(data1, data2, data3)
  return 55
}
function show2() {
  return new Promise((resolve, reject)=>{
    console.log(12)
    request('/data1').then(data1=>{
      request('/data2').then(data2=>{
        request('/data3').then(data3=>{
          console.log(data1, data2, data3)
          resolve(55)
        })
      })
    })
  })
}
