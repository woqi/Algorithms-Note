//heap
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
    console.log('@@----',this.heap)
    console.log(this.heap.length - 1)
    this.shiftUp(this.heap.length - 1)
  }
  pop(){
    this.heap[0] = this.heap.pop()
  }
}
const h = new minHeap()
h.insert(3)
h.insert(1)
h.insert(5)

//

