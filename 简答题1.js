//草稿本
function clone(data) {
  if (typeof data === 'symbol') {
    //symbol，symbol是非object的基本类型
    return Symbol().for(data.description)
  } else if (typeof data != 'object') {
    //基本类型
    return data
  } else if (data instanceof Array) {
    // Array
    return data.map(i => clone(i))
  } else if (data.constructor === Object) {
    //避免 new Date，处理json
    let res = {}
    for (let key in data) {
      res[key] = clone(data[key])
    }
    return res
  } else {
    //系统对象及自定义对象 类似于class
    return new data.constructor(data)
  }
}
let a = [
  { a: 12, b: 1 },
  { a: 6, b: 7 },
]
let b = clone(a)
// b[0].b++
// console.log('a---',a[0].b)
// console.log('b---',b[0].b )
//
class Vue2 {
  constructor(options) {
    const { data } = options
    const _data = data() //运行

    for (const key in _data) {
      Object.defineProperty(this, key, {
        get() {
          return _data[key]
        },
        set(newVal) {
          _data[key] = newVal
          console.log('可以渲染')
        },
      })
    }
  }
}
let vm = new Vue2({
  data() {
    return { a: 12, b: 5 }
  },
})

// console.log(vm.a)

class Vue3 {
  //Proxy自己是一个对象
  constructor(options) {
    //可以返回值,只能返回对象,意味着可以返回Proxy
    const { data } = options
    const _data = data()
    return new Proxy(_data, {
      get(obj, name) {
        // get中的参数是_data,name是某一个值
        return obj[name]
      },
      set(obj, name, value) {
        //value是新值
        obj[name] = value
      },
    })
  }
}

let vm2 = new Vue3({
  data() {
    return { a: 122, b: 456 }
  },
})
vm2.a++
console.log(vm2.a)
// v-model ==>@input + :value

//数据处理
let map = {}
function addSide(p1, p2) {
  map[p1] = map[p1] || []
  if (map[p1].indexOf(p2) === -1) {
    map[p1].push(p2)
  }
  map[p2] = map[p2] || []
  if (map[p2].indexOf(p1) === -1) {
    map[p2].push(p1)
  }
}
addSide('a', 'b')
addSide('a', 'e')

addSide('b', 'c')
addSide('b', 'e')

addSide('c', 'd')
addSide('c', 'g')

addSide('e', 'f')
addSide('e', 'h')

addSide('f', 'c')
addSide('f', 'e')
addSide('f', 'i')
addSide('f', 'g')

addSide('g', 'c')
addSide('g', 'f')

addSide('h', 'e')
addSide('h', 'i')

addSide('i', 'f')
// 深度优先遍历
function dfs(start) {
  //每个节点只能走一次
  let arr = [] //保存去过的节点
  search(start)
  function search(point) {
    arr.push(point)
    map[point].forEach(p2 => {
      if (arr.indexOf(p2) === -1) {
        search(p2)
      }
    })
  }
  return arr
}
// 广度优先
function bfs(start) {
  let arr = []
  let wait = [start]
  while (wait.length > 0) {
    let p = wait.shift()
    if (arr.indexOf(p) === -1) {
      arr.push(p)
      map[p].forEach(p2 => {
        wait.push(p2)
      })
    }
 
  }
  return arr
}
let dfsResult = dfs('a')
let bfsResult = bfs('a')

const str = '112'

function fn(value){
  let str = ''
  let arr = []
  for (let i = 0; i < value.length; i++) {
    str += value[i]
    arr.push(str)
  }
  return arr
}

// console.log('~~~',fn(str))



//
