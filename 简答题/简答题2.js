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
  // console.log(data1, data2, data3)
  return 55
}
function show2() {
  return new Promise((resolve, reject) => {
    console.log(12)
    request('/data1').then(data1 => {
      request('/data2').then(data2 => {
        request('/data3').then(data3 => {
          console.log(data1, data2, data3)
          resolve(55)
        })
      })
    })
  })
}
// var a = {},
//   b = '123',
//   c = 123
// a[b] = 'b'
// a[c] = 'c'
// console.log(a[b])

let json = {}
json[111] = 'adsa'

for (let key in json) {
  console.log(typeof key)
}
let map = new Map()
map.set('1', 'dd')
map.set(1, 'dd')
// console.log('m~~~~~~~~~',map)

// var a = {},
//   b = Symbol('123'),
//   c = Symbol('123')
// a[b] = 'b'
// a[c] = 'c'
// console.log(a[b])

// var a = {},
//   b = {key:'123'},
//   c = {key:'456'}
// a[b] = 'b'
// a[c] = 'c'
// console.log(a[b])

//两数之和

let nums = [2, 7, 11, 15],
  target = 13
function Two(nums, target) {
  const obj = {}
  for (let i = 0; i < nums.length; i++) {
    let a = nums[i]
    let b = target - a
    if (obj[b] != undefined) {
      return [obj[b], i]
    } else {
      obj[a] = i
    }
  }
  return null
}
//时间复杂度和空间复杂度都是O(n)
console.log('~~~~', Two(nums, target))

let arr1 = []
for (let i = 0; i <= 9; i++) {
  arr1.push(i + '')
  arr1.push(i + '' + i)
}
let arr2 = [...arr1]
for (let i = 1; i <= 9; i++) {
  arr1.forEach(item => {
    arr2.push(i+item+i)
  })
}

console.log('arr---', arr2) 

//
