//随机生成长度为10的整数类型数组
// 例如`[2,10,3,4,5,11,10,11,20]`将其排列成一个新数组，要求新数组形式如下`[[2,3,4,5],[10,11],[20]]`

//随机生成一个长度为 10 的整数类型的数组，例如 [2, 10, 3, 4, 5, 11, 10, 11, 20]，将其排列成一个新数组，要求新数组形式如下，例如 [[2, 3, 4, 5], [10, 11], [20]]
// let arr = new Array(10)
// arr = arr.fill(0).map(_ => Math.floor(Math.random() * 100+ 1))
// let arr = [19, 68, 6, 65, 65, 58, 73, 100, 94, 95]
let arr = [2, 10, 3, 4, 5, 11, 10, 11, 20]

//疑问
function fn(arr) {
  const map = new Map()
  arr.sort((a, b) => a - b)
  arr.forEach(item => {
    let n = Math.floor(item / 10)
    const f = map.get(n)
    if (!f) {
      map.set(n, [item])
      // console.log('map---',map)
    } else {
      //去重是放在这里还是在一开始就去重 如何减少时间与空间复杂度呢
      f.push(item)
      map.set(n, f)
    }
  })
  console.log('dier---', Array.from(map.values()))
}

console.time()
let aaa = fn3(arr)
console.timeEnd()

//解法1
function runjs(arr) {
  arr.sort((a, b) => a - b)
  let newArr = [...new Set(arr)]
  const map = new Map()
  newArr.forEach(item => {
    let n = Math.floor(item / 10)
    const f = map.get(n)
    if (!f) {
      map.set(n, [item])
    } else {
      f.push(item)
      map.set(n, f)
    }
  })
  return Array.from(map.values())
}
//解法2
function fn3(arr) {
  let json = {}
  arr.forEach(item => {
    let n = Math.floor(item / 10)
    if (!json[n]) {
      json[n] = {}
    }
    json[n][item] = true
  })
  let result = []
  for (const k1 in json) {
    let narr = []
    for (const k2 in json[k1]) {
      narr.push(k2)
    }
    narr.sort()//obj key是字符串
    result.push(narr.map(Number))
  }
  console.log('~~', result)
}

//分而治之报错
function runmy(arr) {
  const map = {}
  const insetNum = (list, num) => {
    if (list[list.length - 1] <= num) {
      list.push(num)
      return
    }
    let low = 0
    let hight = list.length - 1
    let index = 0
    while (low <= hight) {
      index = Math.floor((hight + low) / 2)
      if (num < list[hight]) {
        hight = index - 1
      } else if (nums > list[low]) {
        low = index + 1
      } else {
        break
      }
    }
    list.splice(index, 0, num)
  }
  arr.forEach(num => {
    const index = Math.floor(num / 10)
    map[index] ? insetNum(map[index], num) : (map[index] = [num])
  })
  return Object.values(map)
}

//
