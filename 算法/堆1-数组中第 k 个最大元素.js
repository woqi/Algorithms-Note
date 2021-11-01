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
    if (index == 0) {
      return
    } //到堆顶不要上移
    const parentIndex = this.getParentIndex(index)
    //不停和父节点交换直到小于父节点
    if (this.heap[parentIndex] > this.heap[index]) {
      this.swap(parentIndex, index)
      this.shiftUp(parentIndex)
    }
  }
  insert(value) {
    this.heap.push(value)
    this.shiftUp(this.heap.length - 1)
  }
  shiftDown(i) {
    const leftIndex = 2 * i + 1
    const rightIndex = 2 * i + 2
    if (this.heap[leftIndex] < this.heap[i]) {
      this.swap(leftIndex, i)
      this.shiftDown(leftIndex)
    }
    if (this.heap[rightIndex] < this.heap[i]) {
      this.swap(rightIndex, i)
      this.shiftDown(rightIndex)
    }
  }
  pop() {//是一个满足shiftDown条件就移出第一个的操作
    this.heap[0] = this.heap.pop()
    // console.log(this.heap[0])
    this.shiftDown(0)
  }
  getHeader() {
    return this.heap[0]
  }
  size() {
    return this.heap.length
  }
}
var findKthLargest = function (nums, k) {
  const h = new minHeap()
  nums.forEach(n => {
    h.insert(n)

    if (h.size() > k) {
      h.pop()
    }
  })
  console.log('222---',h.heap);
  return h.getHeader()
}
findKthLargest([3,2,1,5,6,4] ,2)
// [3,2,1,5,6,4] 和 k = 2
//