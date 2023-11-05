/**
 * url: https://leetcode.com/problems/max-consecutive-ones-iii/
 *
 * # 1004 Max Consecutive Ones III
 * you can flip at most k 0's
 *
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var longestOnes = function (nums, k) {
  let left = 0
  let zeros = 0
  let longest = 0

  for (let right = 0; right < nums.length; right++) {
    if (nums[right] === 0) {
      zeros += 1
    }

    // while this sub-array is invalid
    while (zeros > k) {
      if (nums[left] === 0) {
        zeros -= 1
      }

      left++
    }

    longest = Math.max(longest, right - left + 1)
  }

  return longest
}

module.exports = { longestOnes }
