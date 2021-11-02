const arr = [77, 8, 9, 0, 3, 4, 5, 7]

Array.prototype.bubbleSort = function () {
  //冒泡
  for (let i = 0; i < this.length - 1; i++) {
    for (let j = 0; j < this.length - 1 - i; j++) {
      // console.log(this[j], this[j + 1])
      if (this[j] > this[j + 1]) {
        const temp = this[j]
        this[j] = this[j + 1]
        this[j + 1] = temp
      }
    }
  }
}
// arr.bubbleSort()
//时间复杂度O(n^2)

Array.prototype.quickSort = function () {
  //快排
  const rec = arr => {
    if (arr.length <= 1) {
      return arr
    }
    const left = []
    const right = []
    const mid = arr[0] //基准
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < mid) {
        left.push(arr[i])
      } else {
        right.push(arr[i])
      }
    }
    return [...rec(left), mid, ...rec(right)]
  }
  const res = rec(this)
  res.forEach((n, i) => {
    this[i] = n
  })
}
// arr.quickSort()
//时间复杂度O(NlogN)
//劈成两半的都是O(logn),分区操作时间复杂度是O(n)

//归并排序
Array.prototype.mergeSort = function () {
  const rec = arr => {
    if (arr.length <= 1) {
      return arr
    }
    const mid = Math.floor(arr.length / 2)
    const left = arr.slice(0, mid)
    const right = arr.slice(mid, arr.length)
    const oL = rec(left)
    const oR = rec(right)
    const res = []
    while (oL.length || oR.length) {
      if (oL.length && oR.length) {
        res.push(oL[0] < oR[0] ? oL.shift() : oR.shift())
      }else if(oL.length){
        res.push(oL.shift())
      }else if(oR.length){
        res.push(oR.shift())
      }
    }
    return res
  }
  const res = rec(this)
  res.forEach((n, i) => {
    this[i] = n
  })
}


arr.mergeSort()
//时间复杂度o(logn)
// console.log(arr.mergeSort());


//