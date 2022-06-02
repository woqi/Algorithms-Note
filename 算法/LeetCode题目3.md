### 1. 路径总和 112

```js
var hasPathSum = function (root, sum) {
  if (!root) return false
  let res = false
  //dfs
  const dfs = (n, s) => {
    //
    if(!n.left&&!n.right&& s === sum){
      return res = true
    }
    if (n.left) dfs(n.left, s + n.left.val )
    if (n.right) dfs(n.right, s + n.right.val )
  }
  dfs(root, root.val)
  return res
}
//时间 o(n) //空间 o(n)
```
