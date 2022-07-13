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
### 2 在排序数组中查找元素的第一个和最后一个位置 34
```js
//二分查找
var searchRange = function(nums, target) {
  if (!nums) return [-1, -1]
  let left = 0,
    right = nums.length - 1
  while (left < right) {
    let mid = Math.floor((left + right) / 2)
    if (nums[mid] >= target) {
      right = mid
    } else {
      left = mid + 1
    }
  }
  if (nums[right] !== target) return [-1, -1]
  let res = right,
    RLeft = 0,
    RRight = nums.length - 1
  while (RLeft < RRight) {
    let mid = Math.floor((RLeft + RRight + 1) / 2)
    if (nums[mid] <= target) {
      RLeft = mid
    }else{
      RRight = mid -1
    }
  }
  return [res,RRight]
}
```