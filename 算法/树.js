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

//
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

// module.exports = bt;

//先序遍历
const preorder = root => {
  console.log(root.val)
  if (root != null) {
    if (root.left) {
      preorder(root.left)
    }
    if (root.right) {
      preorder(root.right)
    }
  }
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
