//扁平数组转树形
var data = [
  { id: 0, parentId: null, text: '第一级文字' },
  { id: 1, parentId: 0, text: '第二级文字' },

  { id: 2, parentId: 0, text: '第三级文字' },
  { id: 3, parentId: null, text: '第四级文字' },
  { id: 4, parentId: null, text: '第五级文字' },
  { id: 5, parentId: 3, text: '第六级文字' },
  { id: 6, parentId: 3, text: '第七级文字' }
]

//最终结果：
/*
let arr = [
  {
    id: 0,
    parentId: null,
    text: '第一级文字',
    childen: [
      { id: 1, parentId: 0, text: '第二级文字' },
      { id: 2, parentId: 0, text: '第三级文字' }
    ]
  },
  {
    id: 3,
    parentId: null,
    text: '第四级文字',
    childen: [
      { id: 5, parentId: 3, text: '第六级文字' },
      { id: 6, parentId: 3, text: '第七级文字' }
    ]
  },
  { id: 4, parentId: null, text: '第五级文字' }
]
*/

let createTree = function (data) {
  let map = new Map(),
    result = []
  data.forEach(item => {
    map.set(item.id, item)
    console.log('--', map)
  })
  data.forEach(item => {
    let { parentId } = item,
      parent
    if (parentId === null) {
      result.push(item)
      console.log('res--', result)
      return
    }
    parent = map.get(parentId)
    console.log('parent--', parent)
    // if()
    parent.children ? parent.children.push(item) : (parent.children = [item])
  })
  return result
}
// let aa = createTree(data)

const address = [
  {
    id: 1,
    name: '北京市',
    children: [
      {
        id: 11,
        name: '海淀区',
        children: [
          {
            id: 111,
            name: '中关村'
          }
        ]
      },
      {
        id: 12,
        name: '朝阳区'
      }
    ]
  },
  {
    id: 2,
    name: '河北省'
  }
]
let flatAdd = function (tree, id) {
  let res = []
  const fn = function (data) {
    for (let i = 0; i < data.length; i++) {
      let item = data[i]
      res.push({
        id: item.id,
        name: item.name
      })
      if (item.children?.length) {
        fn(item.children)
      }
    }
  }
  fn(tree)
  console.log('res---', res)
  let fnadd = res.filter(ele => ele.id === id)[0]
  return fnadd ? fnadd.name : '找不到符合该id的地址'
}

let flatAdd2 = function (tree, id) {
  let node,
    list = [...tree]
  const res = []
  while ((node = list.shift())) {
    res.push(node)
    if (node.children) list.push(...node.children)
  }
  return res
}

// let bb = flatAdd(address, 13)
// let cc = flatAdd2(address, 13)

let obj = {
  a: {
    b: { aa: { m0: '2' } },
    c: { bb: { m1: '2' } },
    d: { cc: { m2: '2' } }
  }
}
/*遍历输出  ['m0', 'm1', 'm2', 'aa', 'bb', 'cc', 'b', 'c', 'd', 'a'] */

function output(obj) {
  const q = []
  const res = []
  function bfs(obj) {
    Object.keys(obj)
      .reverse()
      .forEach(key => {
        res.push(key)
        if (typeof obj[key] === 'object') {
          q.push(obj[key])
        }
      })
    while (q.length) {
      bfs(q.shift())
    }
    return res
  }
  return bfs(obj).reverse()
}
// console.log('--**/--', output(obj))

function walk(obj) {
  let result = []
  let queue = []
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      queue.push({
        key,
        value: obj[key]
      })
    }
  }
  while (queue.length) {
    let length = queue.length
    let currentResult = []
    while (length) {
      const current = queue.shift()
      const currentKey = current.key
      const currentValue = current.value
      currentResult.push(currentKey)
      length--
      if (typeof currentValue === 'object') {
        for (let key in currentValue) {
          if (currentValue.hasOwnProperty(key)) {
            queue.push({
              key,
              value: currentValue[key]
            })
          }
        }
      }
    }
    result.push(currentResult)
  }
  let formatResult = []
  result.reverse().forEach(item => {
    formatResult = [...formatResult, ...item]
  })
  return formatResult
}

console.log('--**/--', walk(obj))

//

// 多叉树广度优先遍历
// 将对象解构
const deconstructionObj = obj => {
  const result = []
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      const element = {
        [prop]: obj[prop]
      }
      result.unshift(element)
    }
  }
  return result
}
const reverseTraversal = obj => {
  //  循环解构对象
  let result = []
  const tmp = [obj]
  let node
  while ((node = tmp.shift())) {
    console.log('node节点--', node)
    for (const key in node) {
      result.push(key)
      if (Object.prototype.hasOwnProperty.call(node, key)) {
        const childNode = node[key]
        console.log('子节点--', childNode)
        if (typeof childNode === 'object') {
          console.log('子节点数组--', deconstructionObj(childNode))
          tmp.push(...deconstructionObj(childNode))
        }
      }
    }
  }
  //    先进先出，得到多叉树广度遍历结果，再将广度遍历（广度遍历从根节点开始，一层一层向下遍历）结果翻转顺序，
  //    那么就是从底至上，从子节点往上展示顺序
  return result.reverse()
}

const result = reverseTraversal(obj)

console.log('遍历结果--', result)

const exceptResult = ['m0', 'm1', 'm2', 'aa', 'bb', 'cc', 'b', 'c', 'd', 'a']

//
