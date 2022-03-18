const tree1 = {
  val: 'a',
  children: [
    {
      val: 'b',
      children: [
        {
          val: 'd',
          children: []
        },
        {
          val: 'e',
          children: []
        }
      ]
    },
    {
      val: 'c',
      children: [
        {
          val: 'f',
          children: []
        },
        {
          val: 'g',
          children: []
        }
      ]
    }
  ]
}
const tree = [
  {
    id: '1',
    children: [
      {
        id: '1-1',
        children: [
          {
            id: '1-1-1',
            children: null
          },
          {
            id: '1-1-2',
            children: null
          }
        ]
      },
      {
        id: '1-2',
        children: null
      }
    ]
  },
  {
    id: '2',
    children: [
      {
        id: '2-1',
        children: null
      },
      {
        id: '2-2',
        children: null
      }
    ]
  }
]

const bfs = tree => {
  let node,
    list = [...tree]
  const result = []
  while ((node = list.shift())) {
    result.push(node)
    if (node.children) list.push(...node.children)
  }
  return result
}
const result = bfs(tree)
console.log('result--', result)

const preorder = root => {
  if (!root) {
    return
  }
  let res = []
  const stack = [...root]
  while (stack.length) {
    let n = stack.pop() 
    res.unshift(n)
    if (n.children) stack.push(...n.children)
  }
  return res
}
let res = preorder(tree)
console.log('res--', res)
//

