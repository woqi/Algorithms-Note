const tree = [
  {
    id: '1',
    children: [
      {
        id: '2',
        children: [
          {
            id: '4',
            children: [{ id: '8' }]
          },
          { id: '5' },
          {
            id: '6',
            children: [{ id: '9' }]
          }
        ]
      },
      {
        id: '3',
        children: [{ id: '7' }]
      }
    ]
  }
]

// 示例：fn(tree, '1', 'id') // [2，3，4，5，6，7，8，9]
// 示例：fn(tree, '2', 'id') // [4，5，6，8，9]
// 示例：fn(tree, '6', 'id') //  [9]
// 示例：fn(tree, '7', 'id') // '当前节点下无子节点'

function fn(tree, id, key) {
  const res = []
  const resQueue = []
  const findQueue = [...tree]
  while (findQueue.length) {
    const node = findQueue.shift()
    console.log(node)
    if(node[key] ===id){
      node.children && resQueue.push(...node.children)
      break
    }else{
      console.log(findQueue)
      node.children && findQueue.push(...node.children)
    }
  }
  while(resQueue.length){
    const node = resQueue.shift()
    res.push(node[key])
    node.children && resQueue.push(...node.children)
  }
  return res.length ? res : '当前节点下无子节点'
}
fn(tree, '1', 'id')
function findNode(tree, id, key) {
  const res = []
  const findQueue = [...tree]
  const resQueue = []
  while (findQueue.length) {
    const node = findQueue.shift()
    if (node[key] === id) {
      node.children && resQueue.push(...node.children)
      break
    } else {
      node.children && findQueue.push(...node.children)
    }
  }
  while (resQueue.length) {
    const node = resQueue.shift()
    res.push(node[key])
    node.children && resQueue.push(...node.children)
  }

  return res.length ? res : '当前节点下无子节点'
}
// let aa = findNode(tree, '1', 'id')
//
