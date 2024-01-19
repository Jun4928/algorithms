/**
 * https://leetcode.com/problems/house-robber/
 * 198. House Robber
 *
 * BOTTOM-UP
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  if (nums.length === 1) {
    return nums[0]
  }
  let memo = Array(nums.length).fill(-1)
  memo[0] = nums[0]
  memo[1] = Math.max(nums[0], nums[1])
  for (let i = 2; i < memo.length; i++) {
    memo[i] = Math.max(memo[i - 2] + nums[i], memo[i - 1])
  }

  return memo.at(-1)
}

/**
 * TOP-DOWN
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  let memo = Array(nums.length).fill(-1)
  const DP = curr => {
    if (curr < 0) {
      return 0
    }

    if (memo[curr] >= 0) {
      return memo[curr]
    }

    const result = Math.max(DP(curr - 2) + nums[curr], DP(curr - 1))
    memo[curr] = result
    return result
  }

  return DP(nums.length - 1)
}
