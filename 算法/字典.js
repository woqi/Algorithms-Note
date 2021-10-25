const m = new Map()
//增
m.set('a', 'a_value')
m.set('b', 'b_value')
m.set('c', 'c_value')

//删
// m.delete('b')
// m.clear() // 删除所有

//改
m.set('a', '123')

//交集
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

//两数之和
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

//无重复最长子串

// var lengthOfLongestSubstring = function (s) {
//   let l = 0 //左指针
//   let res = 0 //记录窗口大小
//   const map = new Map()
//   //右边指针放入循环
//   for (let r = 0; r < s.length; r++) {
//     //在窗口外部的重复字符不计入窗口,右边指针必须大于左指针，
//     //从左指针到有指针才是窗口
//     if (map.has(s[r]) && map.get(s[r]) >= l) {
//       l = map.get(s[r]) + 1
//     }
//     res = Math.max(res, r - l + 1) //max返回最大值，res是窗口大小
//     //如何知道字符重复没重复 放入字典里
//     map.set(s[r], r) // 放入s[r]（值）,r是位置
//   }
//   return res
// }
let str = "abcabcbba"
//Map优化
var lengthOfLongestSubstring = function(s) {
  let map = new Map(), max = 0
  for(let i = 0, j = 0; j < s.length; j++) {
      if(map.has(s[j])) {
          i = Math.max(map.get(s[j]) + 1, i)
      }
      max = Math.max(max, j - i + 1)
      map.set(s[j], j)
  }
  return max
};

console.log('~~',lengthOfLongestSubstring(str))