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

const dfs = root=>{
  while (root.children) {
    console.log('root.val',root.val)
    dfs(root.children)
  }
}

dfs(root)

//
