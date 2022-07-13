function swap(arr, i, j) {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}
class MaxHeap {
  constructor() {
    this.data = []
  }
  queue(val) {
    this.data.push(val)
    this.drillUp()
  }
  dequeue() {
    let temp = this.data[0]
    let last = this.data.pop() //最后一个
    if (this.data.length) {
      this.data[0] = last
      this.drillDown()
    }
    return temp
  }
  drillUp() {
    let i = this.data.length - 1
    while (i > 0) {
      let parent = this.parentNode(i)
      console.log('parent---', parent)
      if (this.data[parent] > this.data[i]) break
      swap(this.data, parent, i)
      i = parent
    }
  }
  drillDown() {
    let i = 0
    let node = this.data[0]
    let len = this.data.length
    while (true) {
      let leftParent = this.leftParent(i)
      let swapNum = null
      if (leftParent < len && node < this.data[leftParent]) {
        swapNum = leftParent
      }
      let rightParent = this.rightParent(i)
      if (rightParent < len && this.data[rightParent] > (swapNum != null ? this.data[swapNum] : node)) {
        swapNum = rightParent
      }
      if (swapNum != null) {
        swap(this.data, swapNum, i)
        i = swapNum
      } else {
        break
      }
    }
  }
  leftParent(x) {
    //左子节点
    return 2 * x + 1
  }
  rightParent(x) {
    //右子节点
    return 2 * x + 2
  }
  parentNode(i) {
    //算父级索引
    return Math.floor((i + 1) / 2) - 1
  }
}

function topK(arr, k) {
  // your code here
  let res = []
  let len = arr.length
  if (!len) return arr
  let maxHeap = new MaxHeap()
  for (let i = 0; i < arr.length; i++) {
    maxHeap.queue(arr[i])
  }
  console.log('maxHeap', maxHeap)
  console.log('~!!!!!!----', maxHeap.dequeue())
  //
  while (k > 0 && maxHeap.data.length) {
    res.push(maxHeap.dequeue())
    k--
  }
  return res
}
let max = topK([1, 3, 2, 3], 1)
//** */
// 原地建堆
function buildHeap(items, heapSize) {
  while (heapSize < items.length - 1) {
    heapSize++
    heapify(items, heapSize)
  }
}
function heapify(items, i) {
  // 自下而上式堆化
  while (Math.floor(i / 2) > 0 && items[i] > items[Math.floor(i / 2)]) {
    swap(items, i, Math.floor(i / 2)) // 交换
    i = Math.floor(i / 2)
  }
}
function swap(items, i, j) {
  let temp = items[i]
  items[i] = items[j]
  items[j] = temp
}

// 测试
var items = [, 5, 2, 3, 4, 1]
// 初始有效序列长度为 1
buildHeap(items, 1)
console.log(items)
// [empty, 1, 2, 3, 5, 4]

//
