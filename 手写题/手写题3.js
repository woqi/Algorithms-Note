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
  console.log('res---',res)
  let fnadd = res.filter(ele => ele.id === id)[0]
  return fnadd ? fnadd.name : '找不到符合该id的地址'
}

let flatAdd2 = function (tree, id) {
  let node,
    list = [...tree]
  const res = []
  while (node = list.shift()) {
    res.push(node)
    if(node.children) list.push(...node.children)
  }
  return res
}

let bb = flatAdd(address, 13)
let cc = flatAdd2(address, 13)

//
