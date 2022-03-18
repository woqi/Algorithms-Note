const tree = {
  val: 'a',
  children: [
    {
      val: 'b',
      children: [
        {
          val: 'd',
          children: [],
        },
        {
          val: 'e',
          children: [],
        },
      ],
    },
    {
      val: 'c',
      children: [
        {
          val: 'f',
          children: [],
        },
        {
          val: 'g',
          children: [],
        },
      ],
    },
  ],
}

const dfs = root => {
  //深度
  console.log(root.val)
  root.children.forEach(dfs)
}
// dfs(tree)

const bfs = root => {
  //广度优先遍历
  const q = [root]
  while (q.length > 0) {
    const n = q.shift() //队头c出队
    console.log(n.val)
    n.children.forEach(item => q.push(item))
  }
}
// bfs(tree)

//二叉树部分
const bt = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4,
      left: null,
      right: null,
    },
    right: {
      val: 5,
      left: null,
      right: null,
    },
  },
  right: {
    val: 3,
    left: {
      val: 6,
      left: null,
      right: null,
    },
    right: {
      val: 7,
      left: null,
      right: null,
    },
  },
}

//递归版
//先序遍历
const preorder = root => {
  if (!root) {
    return
  }
  console.log(root.val)
  preorder(root.left)
  preorder(root.right)
}
// preorder(bt)//1245367
//中序遍历
const inorder = root => {
  if (!root) {
    return
  }
  inorder(root.left)
  console.log(root.val)
  inorder(root.right)
}
// inorder(bt) //4251637
const postorder = root => {
  if (!root) {
    return
  }
  postorder(root.left)
  postorder(root.right)
  console.log(root.val)
}
// postorder(bt)//4526731

//非递归版 面试官很贱喜欢考复杂的
const preorder_not_recursion = root => {
  if (!root) {
    return
  }
  const stack = [root]
  while (stack.length) {
    const n = stack.pop() //第一个
    console.log(n.val)
    if (n.right) stack.push(n.right)
    if (n.left) stack.push(n.left)
  }
}
// preorder_not_recursion(bt) //1245367

const inorder_not_recursion = root => {
  console.log('~~')
  if (!root) {
    return
  }
  const stack = []
  let p = root
  while (stack.length || p) {
    while (p) {
      stack.push(p)
      p = p.left
    }
    const n = stack.pop() //返回栈顶
    console.log('~~', n.val)
    p = n.right
  }
}
// inorder_not_recursion(bt) //4251637

const postorder_not_recursion = root => {
  if (!root) {
    return
  }
  const stack = [root]
  const outputStack = []
  while (stack.length) {
    const n = stack.pop() //第一个
    outputStack.push(n)
    if (n.left) stack.push(n.left)
    if (n.right) stack.push(n.right)
  }
  while (outputStack.length) {
    const n = outputStack.pop()
    console.log(n.val);
  }
}
postorder_not_recursion(bt) //4526731
//
