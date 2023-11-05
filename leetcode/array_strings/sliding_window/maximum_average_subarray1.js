/**
 * url: https://leetcode.com/problems/maximum-average-subarray-i/
 * # 643 Maximum Average Subarray 1
 *
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage = function (nums, k) {
  let left = 0
  let size = 0
  let currentSum = 0
  let maximumAverage = Number.NEGATIVE_INFINITY

  for (let right = 0; right < nums.length; right++) {
    currentSum += nums[right]
    size++

    while (size > k) {
      currentSum -= nums[left]
      size--
      left++
    }

    if (size === k) {
      const currentAverage = (currentSum / k).toFixed(5)
      maximumAverage = Math.max(maximumAverage, currentAverage)
    }
  }

  return maximumAverage
}

module.exports = { findMaxAverage }
