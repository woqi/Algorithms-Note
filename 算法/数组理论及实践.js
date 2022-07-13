/**
 * 数组下标从0开始
 * 内存空间地址连续
 * 删除、添加会移动其他元素位置
 * 数组不能删除只能覆盖
 */
//二分查找，704，给n个升序有序整型数组，搜索nums中是否存在target，有则返回下标
function search(nums, target) {
  let left = 0,
    right = nums.length - 1
  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2)
    if (nums[mid] > target) {
      right = mid - 1
    } else if (nums[mid] < target) {
      left = mid + 1
    } else {
      return mid
    }
  }
  return -1
}
// 二分查找，32
function binarySearch(nums, target) {
  if (!nums) return [-1, -1]
  let left = 0,
    right = nums.length - 1
  while (left < right) {
    let mid = Math.floor((left + right) / 2)
    if (nums[mid] >= target) {
      right = mid
    } else {
      left = mid + 1
    }
  }
  if (nums[right] !== target) return [-1, -1]
  let res = right,
    RLeft = 0,
    RRight = nums.length - 1
  while (RLeft < RRight) {
    let mid = Math.floor((RLeft + RRight + 1) / 2)
    if (nums[mid] <= target) {
      RLeft = mid
    }else{
      RRight = mid -1
    }
  }
  return [res,RRight]
}
 