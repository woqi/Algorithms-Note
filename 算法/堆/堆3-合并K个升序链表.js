class minHeap {
  constructor() {
    this.heap = []
  }
  swap(i1, i2) {
    const temp = this.heap[i1] //临时存储
    this.heap[i1] = this.heap[i2]
    this.heap[i2] = temp
  }
  shiftUp(index) {
    if (index == 0) {
      return
    } //到堆顶不要上移
    const parentIndex = (index - 1) >> 1
    //不停和父节点交换直到小于父节点
    if (
      this.heap[parentIndex] &&
      this.heap[parentIndex].val > this.heap[index].val
    ) {
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
    if (this.heap[leftIndex] && this.heap[leftIndex].val < this.heap[i].val) {
      this.swap(leftIndex, i)
      this.shiftDown(leftIndex)
    }
    if (this.heap[rightIndex] && this.heap[rightIndex].val < this.heap[i].val) {
      this.swap(rightIndex, i)
      this.shiftDown(rightIndex)
    }
  }
  pop() {
    //是一个满足shiftDown条件就移出第一个的操作
    if (this.size() === 1) return this.heap.shift() //返回队头
    const top = this.heap[0]
    this.heap[0] = this.heap.pop() //最后一位放到第一位
    // console.log(this.heap[0])
    this.shiftDown(0)
    return top
  }
  getHeader() {
    return this.heap[0]
  }
  size() {
    return this.heap.length
  }
}
var mergeKLists = function (lists) {
  const res = new ListNode(0)
  const h = new minHeap()
  let p = res //指针
  lists.forEach(l => {
    if (l) h.insert(l) //相当于排序
  })
  console.log(h.heap)
  while (h.size()) {
    const n = h.pop() //得到堆顶
    p.next = n
    p = p.next //指针往下走
    if (n.next) h.insert(n.next) //最小节点的next插入堆里
  }

  return res.next //新链表返回next
}

var mergeKLists = function (lists) {
  return lists
    .reduce((p, n) => {
      while (n) {
        p.push(n), (n = n.next)
      }
      return p
    }, [])
    .sort((a, b) => a.val - b.val)
    .reduceRight((p, n) => {
      n.next = p
      return n
    }, null)
}
