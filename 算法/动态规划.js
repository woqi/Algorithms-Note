//爬楼梯
var clibStairs = function (n) {
  if (n < 2) {
    return 1
  }
  const dp = [1, 1]
  for (let i = 2; i < n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[n]
}
//时间复杂度 o(n)
//空间复杂度 o(n)

//优化
var clibStairs2 = function (n) {
  if (n < 2) {
    return 1
  }
  let dp0 = 1
  let dp1 = 1
  for (let i = 2; i < n; i++) {
    const tmp = dp0
    dp0 = dp1
    dp1 = dp1 + tmp
  }
  return dp1
}
//时间复杂度 o(n)
//空间复杂度 o(n)

