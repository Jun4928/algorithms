/**
 * https://leetcode.com/problems/minimum-size-subarray-sum/
 * # 209. Minimum Size Subarray Sum
 *
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
// var minSubArrayLen = function (target, nums) {
//   let right = 0
//   let sum = 0
//   let minLength = nums.length + 1

//   for (let left = 0; left < nums.length; left++) {
//     while (sum < target) {
//       sum += nums[right]
//       right++
//     }

//     if (right > nums.length) {
//       break
//     }

//     minLength = Math.min(minLength, right - left)
//     sum -= nums[left]
//   }

//   return minLength === nums.length + 1 ? 0 : minLength
// }

var minSubArrayLen = function (target, nums) {
  let left = 0
  let sum = 0
  let minLength = Number.POSITIVE_INFINITY

  for (let right = 0; right < nums.length; right++) {
    sum += nums[right]

    // there are many valid situations
    while (sum >= target) {
      minLength = Math.min(minLength, right - left + 1)
      sum -= nums[left]
      left++
    }
  }

  return minLength === Number.POSITIVE_INFINITY ? 0 : minLength
}

module.exports = { minSubArrayLen }
