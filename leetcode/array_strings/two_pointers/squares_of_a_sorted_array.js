/**
 * url: https://leetcode.com/problems/squares-of-a-sorted-array/
 *
 * # 977 Squares of a Sorted Array
 *
 * sorted in non-decreasing order!
 *
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
  let l = 0 // absolute biggest
  let r = nums.length - 1 // absolute biggest
  const result = nums.map(n => 0)

  // from the last, which is the biggest
  for (let i = nums.length - 1; i >= 0; i--) {
    // if either of them is bigger, match it to the result index
    if (Math.abs(nums[l]) < Math.abs(nums[r])) {
      result[i] = nums[r] ** 2
      r--
    } else {
      result[i] = nums[l] ** 2
      l++
    }
  }

  return result
}

module.exports = { sortedSquares }
