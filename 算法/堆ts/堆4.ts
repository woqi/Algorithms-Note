//小顶堆，同时支持返回数字、字符串两种类型，通过类的泛型实现
class MinHeap {
  public list: number[] = [2, 3, 4, 5, 6, 77, 0.2, -0.2]
  add(num: number) {
    this.list.push(num)
  }
  min() {
    let minNum = this.list[0]
    for (let i = 0; i < this.list.length; i++) {
      if (minNum > this.list[i]) {
        minNum = this.list[i]
      }
    }
    return minNum
  }
}
class MinHeap2<T> {
  public list: T[] = []
  add(num: T): void {
    this.list.push(num)
  }
  min(): T {
    let minNum = this.list[0]
    for (let i = 0; i < this.list.length; i++) {
      if (minNum > this.list[i]) {
        minNum = this.list[i]
      }
    }
    return minNum
  }
}
let m = new MinHeap2();
[2, 3, 4, 5, 6, '77', 0.2, '-0.2'].forEach(e => {
  m.add(e)
})

console.log(m.min())
