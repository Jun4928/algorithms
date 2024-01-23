/**
https://leetcode.com/problems/climbing-stairs/
70. Climbing Stairs
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  let memo = Array(n).fill(-1)
  const DP = steps => {
    if (steps <= 0) {
      return 1
    }

    if (memo[steps] > -1) {
      return memo[steps]
    }

    memo[steps] = DP(steps - 1) + DP(steps - 2)
    return memo[steps]
  }

  return DP(n - 1)
}
