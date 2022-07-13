//heap
let nums = [1, 1, 1, 2, 2, 3],
  k = 2
//方法1
var topKFrequent1 = function (nums, k) {
  const map = new Map()
  nums.forEach(n => {
    map.set(n, map.has(n) ? map.get(n) + 1 : 1)
  })
  // console.log(Array.from(map))
  const list = Array.from(map).sort((a, b) => b[1] - a[1])
  // console.log('list', list)
  return list.slice(0, k).map(e => e[0])
}
// topKFrequent1(nums, k)
//

//方法2
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
const h = new minHeap()
h.insert(3)
h.insert(1)
h.insert(5)
// h.pop()

var topKFrequent = function (nums, k) {
  const map = new Map()
  nums.forEach(n => {
    map.set(n, map.has(n) ? map.get(n) + 1 : 1)
  })
  const h = new minHeap()
  map.forEach((value, key) => {
    //保证前k个高频元素在堆里
    h.insert({ value, key })
    if (h.size() > k) {
      h.pop() //删除最小元素
    }
  })
  // return h.heap.map(a => {
  //   // console.log('!!!---', a)
  //   return a.key
  // })
  return h.heap.map(a => a.key)
}

topKFrequent(nums, k)



//
