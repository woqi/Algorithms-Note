## leetcode 题

由于不想翻太久 md，每个 md 放置十道题目

1.删除链表中节点

思路 无法直接获取被删除节点的上一个节点，
但是可以将被删除节点转移到下一个节点后直接删除下一个节点

```js
var deleteNode = function (node) {
  node.val = node.next.val
  node.next = node.next.next
}
//因为没有循环，时间复杂度为 o(1)
//没有矩阵，空间复杂度也为 O(1)
```

2.反转链表，题号 206

思路 反转两个节点：n+1.next = n
此时可以双指针遍历链表 重复以上操作
`[1,2,3,4...]`
双指针意思是
`1.next = 2.val`
`2.next = 1.val`
1 指向 2,2 指向 1
双指针一前一后遍历链表，反转双指针

```js
var reverseList = function (head) {
  let p1 = head,
    p2 = null
  while (p1) {
    const tmp = p1.next
    p2 = p1
    p1 = tmp
  }
  return p2
}
//有循环，时间复杂度为 o(n)
//没有矩阵，空间复杂度也为 O(1)
```

3.两数相加 2
解题思路遍历两个被相加的链表，建立空链表，模拟相加操作，将个位数追加到新链表上，十位数留到下一个去相加

```js
//教程
var addTwoNumbers = function (l1, l2) {
  const l3 = new ListNode(0) //新建链表
  let p1 = l1 //指针指向l1头部
  let p2 = l2
  let p3 = l3
  let carry = 0 //记录十位数上的数字

  while (p1 || p2) {
    //p1或者p2有值 就继续遍历链表
    const v1 = p1 ? p1.val : 0
    const v2 = p2 ? p2.val : 0
    const val = v1 + v2 + carry
    carry = Math.floor(val / 10)
    p3.next = new ListNode(val % 10) //取余

    if (p1) p1 = p1.next
    if (p2) p2 = p2.next
    p3 = p3.next
  }
  if (carry) {
    //存在carry就放到末尾
    p3.next = new ListNode(carry)
  }
  return l3.next
}
//时间复杂度o(n),n是两个链表的长度最大值
//空间复杂度，有ListNode，就是最长链表+1，或两者最大值，则为o(n)
```

```js
//之前自己写的
var addTwoNumbers = function (l1, l2) {
  let p1 = l1
  let p2 = l2
  let carry = 0
  const dummy = new ListNode()
  let pointer = dummy
  while (p1 || p2 || carry) {
    const num1 = p1 ? p1.val : 0
    const num2 = p2 ? p2.val : 0
    const sum = num1 + num2 + carry
    if (sum > 9) {
      pointer.next = new ListNode(sum % 10)
      carry = 1
    } else {
      pointer.next = new ListNode(sum)
      carry = 0
    }
    if (p1) p1 = p1.next
    if (p2) p2 = p2.next
    pointer = pointer.next
  }
  return dummy.next
}
```

4. 删除排序链表中的重复元素，题号 83

思路：因为链表是有序的，所以重复元素一定相邻，
遍历链表发现当前元素和下一个元素相同就删除下一个元素,
遍历结束后，返回原链表头部

```js
var deleteDuplicates = function (head) {
  let p = head
  while (p && p.next) {
    if (p.val === p.next.val) {
      p.next = p.next.next
    } else {
      p = p.next //链表往下走
    }
  }
  return head
}
//时间复杂度：O(n)，其中 nn 是链表的长度。
//空间复杂度：O(1)。
```

5. 环形链表，题号 141
   解题思路：有一快一慢两个指针遍历链表，指针可以相逢，说明有环，返回 true，两个指针不相逢就说明没有环，返回 false

```js
var hasCycle = function (head) {
  let p1 = head //慢指针
  let p2 = head //快指针
  while (p1 && p2 && p2.next) {
    p1 = p1.next //走一步
    p2 = p2.next.next //走两步
    if (p1 === p2) {
      //两个指针是否重逢
      return true
    }
  }
  return false
}
//有while循环，时间复杂度 O(n)
//空间复杂度：O(1)。因无线性增长结构，矩阵，列表
```

6. 两个数组的交集 题号 349
   两种解法一个是 Set 一个是 Map

```js
// Set很慢，内存消耗很多
var intersection = function (nums1, nums2) {
  let res = new Set([...nums1].filter(x => new Set(nums2).has(x)))
  console.log([...res])
  return [...res]
}
```
```js
var intersection = function (nums1, nums2) {
  if (nums1.length > nums2.length) [nums1, nums2] = [nums2, nums1]
  let set = new Set(nums1)
  let res = new Set()
  for (let i = 0; i < nums2.length; i++) {
    if (set.has(nums2[i])) {
      res.add(nums2[i])
    }
  }
  return [...res]
}
```

Map 解题思路，新建立一个字典，遍历 nums1，填充字典，遍历 nums2，遇到字典值就选出，并从字典里删除

```js
var intersection = function (nums1, nums2) {
  const map = new Map()
  nums1.forEach(n => {
    map.set(n, true) //代表这个值在字典里存在
  })
  let res = []
  nums2.forEach(n => {
    if (map.get(n)) {
      res.push(n)
      map.delete(n)
    }
  })
  return res
}
//时间复杂度O(n+m)
//空间复杂度指临时变量内存消耗 O(m)
```

7. 接雨水 题号 42
   方法 1：双指针

```js
var trap = function (height) {
  if (!height) return

  let left = 0,
    right = height.length - 1 //位置记录
  let maxLeft = 0,
    maxRight = 0 //假设初始最大值
  let rain = 0
  while (left < right) {
    if (height[left] < height[right]) {
      height[left] >= maxLeft
        ? (maxLeft = height[left])
        : (rain += maxLeft - height[left])
      left++
    } else {
      height[right] >= maxRight
        ? (maxRight = height[right])
        : (rain += maxRight - height[right])
      right--
    }
  }
  return rain
}
```

8.两数之和 题目 1
思路：nums 去相亲者，target 匹配的条件，字典建立一个介绍所储存相亲者的数字和下标

```js
var twoSum = function (nums, target) {
  let map = new Map()
  for (let i = 0; i < nums.length; i++) {
    const n = nums[i]
    const n2 = target - n // 符合匹配条件的选手
    if (map.has(n2)) {
      return [map.get(n2), i] // 返回符合条件对象的下标，自身下标
    } else {
      map.set(n, i)
    }
  }
}
//时间复杂度 O(n)
//空间复杂度 O(n)//线性
```

另一种解法时间换空间 二分查找

9. 无重复字符的最长子串 3
   解题思路 双指针维护一个滑动窗口，剪切子串，向右移，遇到重复就将左指针移动到重复字符的下一位，记录所有窗口长度，返回最大值

```js
var lengthOfLongestSubstring = function (s) {
  let map = new Map(),
    max = 0
  for (let i = 0, j = 0; j < s.length; j++) {
    if (map.has(s[j])) {
      i = Math.max(map.get(s[j]) + 1, i)
    }
    max = Math.max(max, j - i + 1)
    map.set(s[j], j)
  }
  return max
}
```

[解题注释](./字典.js)

10 数组中第 k 个最大元素 题号 215
实际是将k这一位放在最小堆的堆顶

```js
//解法1//小堆顶
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
var findKthLargest = function (nums, k) {
  const h = new minHeap()
  nums.forEach(n => {
    h.insert(n)
    if (h.size() > k) {
      h.pop()
    }
  })
  return h.getHeader()
}
```
```js
//解法2//js自带 最快
var findKthLargest = function (nums, k) {
  nums.sort((a, b) => b - a).slice(0, k)
  return nums[k - 1]
}
//解法3
//大堆顶好难，不会
```


