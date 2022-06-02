### 1. 前 k 个高频元素 347 //此题只能用堆才符合题目时间复杂度

```js
class minHeap {
  constructor() {
    this.heap = []
  }
  swap(i1, i2) {
    const temp = this.heap[i1] //临时存储
    this.heap[i1] = this.heap[i2]
    this.heap[i2] = temp
  }
  getParentIndex(i) {
    return (i - 1) >> 1 //二进制往右移 得到商
  }
  shiftUp(index) {
    //上移
    if (index == 0) {
      return
    } //到堆顶不要上移
    const parentIndex = (index - 1) >> 1
    //不停和父节点交换直到小于父节点
    if (this.heap[parentIndex] && this.heap[parentIndex].value > this.heap[index].value) {
      this.swap(parentIndex, index)
      this.shiftUp(parentIndex)
    }
  }
  insert(value) {
    this.heap.push(value)
    this.shiftUp(this.heap.length - 1)
  }
  shiftDown(i) {
    //下移
    const leftIndex = 2 * i + 1
    const rightIndex = 2 * i + 2
    if (this.heap[leftIndex] && this.heap[leftIndex].value < this.heap[i].value) {
      this.swap(leftIndex, i)
      this.shiftDown(leftIndex)
    }
    if (this.heap[rightIndex] && this.heap[rightIndex].value < this.heap[i].value) {
      this.swap(rightIndex, i)
      this.shiftDown(rightIndex)
    }
  }
  pop() {
    this.heap[0] = this.heap.pop()
    this.shiftDown(0)
  }
  getHeader() {
    return this.heap[0]
  }
  size() {
    return this.heap.length
  }
}
var topKFrequent = function (nums, k) {
  const map = new Map() //空间复杂度O(n)//可能等于数组长度
  nums.forEach(n => {
    //时间复杂度O(n)
    map.set(n, map.has(n) ? map.get(n) + 1 : 1)
  })
  const h = new minHeap() //空间复杂度O(k)
  map.forEach((value, key) => {
    //时间复杂度O(n)
    //保证前k个高频元素在堆里
    h.insert({ value, key }) //时间复杂度O(log k)
    if (h.size() > k) {
      h.pop() //删除最小元素 //时间复杂度O(log k)
    }
  })
  return h.heap.map(a => a.key)
}
//时间复杂度O(n log k)
//空间复杂度O(n)
```

```js
var topKFrequent = function (nums, k) {
  const map = new Map()
  nums.forEach(n => {
    //O(n)
    map.set(n, map.has(n) ? map.get(n) + 1 : 1)
  })

  // console.log(Array.from(map))
  const list = Array.from(map).sort((a, b) => b[1] - a[1]) //O(n log n)
  // console.log('list', list)
  return list.slice(0, k).map(e => e[0])
}
//时间复杂度超过O(n log n),不符合要求
```

### 2. 合并 K 个升序链表 23

新链表下一个节点一定是 k 个链表头中的最小节点

考虑选择使用最小堆

构建一个最小堆，并依次把链表头插入堆中 弹出堆顶接到输出的链表，并将堆顶所在链表的新立案表头插入堆中

新链表最小值在 k 个链表头中最小节点

```
[
  1->4->5,
  1->3->4,
  2->6
]
```

第一行 1 拿走，作为第一个节点，剩下第一行 4,5；第二行 1，3,4；第三行 2,6
第 2 个节点是新的链表 k 个链表头最小节点进入

```
[
  4->5,
  1->3->4,
  2->6
]//得出1
```

第 3 个节点在得到最小值 2

```
[
  4->5,
  3->4,
  2->6
]
```

第 4 个节点在得到最小值 3

```
[
  4->5,
  3->4,
  6
]
```

依次类推
第 5 个节点在得到最小值 4

```
[
  4->5,
  4,
  6
]
```

第 6 个节点在得到最小值 4

```
[
  5,
  4,
  6
]
```

第 7 个节点在得到最小值 5

```
[
  5,
  6
]
```

核心问题求头部链表最小值
对数组进行排序最小时间复杂度 O(nlogn)

[解答](./堆3-合并K个升序链表.js)

### 3. 翻转二叉树 226

//获取左右子树，递归左右子树，将翻转后的左右子树换位置放到根节点上

```js
var invertTree = function (root) {
  if (!root) {
    return null
  }
  return {
    val: root.val,
    left: invertTree(root.right),
    right: invertTree(root.left)
  }
}
```

### 4.旋转数组 189

```js
function shift(arr, k) {
  k %= arr.length
  if (k >= Math.floor(arr.length / 2)) {
    arr.push(...arr.splice(0, arr.length - k))
  } else {
    arr.unshift(...arr.splice(arr.length - k, k))
  }
  return arr
}
```

### 5.爬楼梯 70

定义子问题 f(n) = f(n-1) + f(n-2)
反复执行 从 2 循环到 n，执行上述公式

```js
//爬楼梯
var clibStairs = function (n) {
  if (n < 2) {
    return 1
  }
  const dp = [1, 1]
  for (let i = 2; i < n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[n]
}
//时间复杂度 o(n)
//空间复杂度 o(n)

//优化
var clibStairs2 = function (n) {
  if (n < 2) {
    return 1
  }
  let dp0 = 1
  let dp1 = 1
  for (let i = 2; i < n; i++) {
    const tmp = dp0
    dp0 = dp1
    dp1 = dp1 + tmp
  }
  return dp1
}
//时间复杂度 o(n)
//空间复杂度 o(n)
```

### 6.打家劫舍 198

```js
function rob(nums) {
  let len = nums.length
  if (len === 0) return
  const dp = new Array(len + 1)
  dp[0] = 0
  dp[1] = nums[0]
  for (let i = 2; i <= len; i++) {
    dp[i] = Math.max(dp[i - 2] + nums[i - 1], dp[i - 1])
  }
  return dp[len]
}
```

### 7.买卖股票的最佳时机 II 122

```js
var maxProfit = function (prices) {
  let profit = 0
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      profit += prices[i] - prices[i - 1]
    }
  }
  return profit
}
```

### 8.二叉树的最大深度 104

```js
const maxDepth = function (root) {
  let res = 0
  const dfs = (n, l) => {
    if (!n) {
      return
    }
    if (!n.left && !n.right) {
      res = Math.max(res, 1)
    }
    dfs(n.left, l + 1)
    dfs(n.right, l + 1)
  }
  dfs(root, 1)
  return res
}
```

### 9.二叉树层序遍历(层序遍历==广度遍历) 102

```js
var levelOrder = function (root) {
  if (!root) return []
  const q = [root]
  const res = []
  while (q.length) {
    let len = q.length
    res.push([])
    while (len--) {
      const n = q.shift()
      res[res.length - 1].push(n.val)
      if (n.left) q.push(n.left)
      if (n.right) q.push(n.right)
    }
  }
  return res
}
```

### 10. 718. 最长重复子数组

```js
//动态规划1维数组
function findLength(a,b){
  const m = a.lenght
  const n = b.length
  const dp = Array(n+1).fill(0)
  let res = 0
  for(let i = 1; i<=m; i++){
    for(let j = n; j>=1; j--){
      if(a[i-1] == b[j-1]){
        dp[j] = dp[j-1] + 1
      }else{
        dp[j] = 0
      }
    }
    res = Math.max(dp[j], res)
  }
  return res
}

```
