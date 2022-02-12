let arr = [9,6,4,2,3,5,7,0,1]

// var missingNumber = function (nums) {
//   const n = nums.length
//   let total = Math.floor((n * (n + 1)) / 2)
//   let arrSum = 0
//   for (let i = 0; i < n; i++) {
//     arrSum += nums[i]
//   }
//   return total - arrSum
// }
var missingNumber = function (nums) {
  let xor = 0
  const n = nums.length
  for (let i = 0; i < n; i++) {
    xor ^= nums[i]
    console.log('diyic',xor)
  }
  for (let i = 0; i <= n; i++) {
    xor ^= i

    console.log(xor)
  }
  return xor
}
// var missingNumber = function (nums) {
//   const set = new Set()
//   const n = nums.length
//   for (let i = 0; i < n; i++) {
//     set.add(nums[i])
//   }
//   let missing = -1
//   for (let i = 0; i <= n; i++) {
//     if (!set.has(i)) {
//       missing = i
//       break
//     }
//   }
//   return missing
// }

let hehe = missingNumber(arr)
//
