// for (let i = 0; i < array.length; i++) {
//   const element = array[i]
//   for (let j = 0; j < array.length; j++) {
//     const element = array[j]
//   }
// }
let arr = [
  { creditName: '123', supplierName: 'a' },
  { creditName: '123', supplierName: 'a' },
  { creditName: '456', supplierName: 'a' }
]

function work(arr) {
  let s1 = new Set(),
    s2 = new Set()
  for (let i = 0; i < arr.length; i++) {
    if (s1.has(arr[i].creditName) && s2.has(arr[i].supplierName)) {
      arr[i].validateCreditName = true
    } else {
      s1.add(arr[i].creditName)
      s2.add(arr[i].supplierName)
    }
  }
}
function work1(arr) {
  const res = arr
  for (let i = 0; i < res.length; i++) {
    for (let j = i + 1; j < res.length; j++) {
      if (res[j].creditName === res[i].creditName && res[j].supplierName === res[i].supplierName) {
        res[i].validateCreditName = true
      }
    }
  }
  return res
}
function work2(arr) {
  const res = arr
  res.reduce((pre, curr, index, arrs) => {
    if (pre?.creditName === curr?.creditName && pre?.supplierName === curr?.supplierName) {
      arrs[index].validateCreditName = true
    }
  }, res[0])
  return res
}
// let hehe = work2(arr)
// console.log('---', work2(arr))
const findLength = (A, B) => {
  const m = A.length
  const n = B.length
  const dp = new Array(n + 1).fill(0)
  let res = 0
  for (let i = 1; i <= m; i++) {
    for (let j = n; j >= 1; j--) {
      if (A[i - 1] == B[j - 1]) {
        dp[j] = dp[j - 1] + 1
      } else {
        dp[j] = 0
      }
      res = Math.max(dp[j], res)
    }
  }
  console.log('dp',dp)
  return res
}

let nums1 = [1, 2, 3, 2, 1],
  nums2 = [3, 2, 1, 4, 7]
let res2 = findLength(nums1, nums2)
//
