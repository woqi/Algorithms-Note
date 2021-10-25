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
  const q = [root]
  while (q.length > 0) {
    const n = q.shift() //剔除队头
    console.log(n.val)
    n.children.forEach(item => p.push(item))
  }
}

//
