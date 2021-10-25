const a = { val: 'a' }
const b = { val: 'b' }
const c = { val: 'c' }
const d = { val: 'd' }

a.next = b
b.next = c
c.next = d

//遍历链表
let p = a
while (p) {
  console.log(p.val)
  p = p.next
}

//插入
const e = { val: 'e' }
c.next = e
e.next = d

//删除
c.next = d

var reverseList = function (head) {
  //反转链表
  let p1 = head,
    p2 = null
  while (p1) {
    const tmp = p1.next
    console.log('p1-val', p1.val, p2 && p2.val)
    p1.next = p2
    p2 = p1
    p1 = tmp
  }

  return p2
}

var addTwoNumbers = function (l1, l2) {
  //两数相加
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

var hasCycle = function (head) {
  let p1 = head //慢指针
  let p2 = head //快指针
  while (p1 && p2 && p2.next) {
    p1 = p1.next //走一步
    p2 = p2.next.next //走两步
    if (p1 === p2) {//两个指针是否重逢
      return true
    }
  }
  return false
}
