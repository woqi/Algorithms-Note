1. 前k个高频元素 347 //此题只能用堆才符合题目时间复杂度
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
  shiftUp(index) {//上移
    if (index == 0) {
      return
    } //到堆顶不要上移
    const parentIndex = (index - 1) >> 1
    //不停和父节点交换直到小于父节点
    if (
      this.heap[parentIndex] &&
      this.heap[parentIndex].value > this.heap[index].value
    ) {
      this.swap(parentIndex, index)
      this.shiftUp(parentIndex)
    }
  }
  insert(value) {
    this.heap.push(value)
    this.shiftUp(this.heap.length - 1)
  }
  shiftDown(i) { //下移
    const leftIndex = 2 * i + 1
    const rightIndex = 2 * i + 2
    if (
      this.heap[leftIndex] &&
      this.heap[leftIndex].value < this.heap[i].value
    ) {
      this.swap(leftIndex, i)
      this.shiftDown(leftIndex)
    }
    if (
      this.heap[rightIndex] &&
      this.heap[rightIndex].value < this.heap[i].value
    ) {
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
  const map = new Map()//空间复杂度O(n)//可能等于数组长度
  nums.forEach(n => { //时间复杂度O(n)
    map.set(n, map.has(n) ? map.get(n) + 1 : 1)
  })
  const h = new minHeap()//空间复杂度O(k)
  map.forEach((value, key) => {//时间复杂度O(n)
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
  nums.forEach(n => {//O(n)
    map.set(n, map.has(n) ? map.get(n) + 1 : 1)
  })

  // console.log(Array.from(map))
  const list = Array.from(map).sort((a, b) => b[1] - a[1])//O(n log n)
  // console.log('list', list)
  return list.slice(0, k).map(e => e[0])
}
//时间复杂度超过O(n log n),不符合要求

```


2. 合并K个升序链表 23

新链表下一个节点一定是k个链表头中的最小节点

考虑选择使用最小堆

构建一个最小堆，并依次把链表头插入堆中 弹出堆顶接到输出的链表，并将堆顶所在链表的新立案表头插入堆中

新链表最小值在k个链表头中最小节点
```
[
  1->4->5,
  1->3->4,
  2->6
]
```
第一行1拿走，作为第一个节点，剩下第一行4,5；第二行1，3,4；第三行2,6
第2个节点是新的链表k个链表头最小节点进入
```
[
  4->5,
  1->3->4,
  2->6
]//得出1
```
第3个节点在得到最小值2
```
[
  4->5,
  3->4,
  2->6
]
```
第4个节点在得到最小值3
```
[
  4->5,
  3->4,
  6
]
```
依次类推
第5个节点在得到最小值4
```
[
  4->5,
  4,
  6
]
```
第6个节点在得到最小值4
```
[
  5,
  4,
  6
]
```
第7个节点在得到最小值5
```
[
  5,
  6
]
```
核心问题求头部链表最小值
对数组进行排序最小时间复杂度O(nlogn)

[解答](./堆3-合并K个升序链表.js)

3. 翻转二叉树 226

//获取左右子树，递归左右子树，将翻转后的左右子树换位置放到根节点上

```js
var invertTree = function(root) {
  if (!root) { return null }
  return {
      val: root.val,
      left: invertTree(root.right),
      right: invertTree(root.left)
  }
}

```

4.旋转数组 189
