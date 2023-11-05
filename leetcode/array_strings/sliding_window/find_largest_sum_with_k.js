/**
 *
 * @param {number[]} nums
 * @param {number} k
 *
 * @return {number} the sum of the subarray
 */
function findLargestSumWithK(nums, k) {
  let size = 0
  let left = 0
  let currentSum = 0
  let largestSum = 0

  for (let right = 0; right < nums.length; right++) {
    size += 1
    currentSum += nums[right]

    while (size > k) {
      size -= 1
      currentSum -= nums[left]
      left++
    }

    if (size === k) {
      largestSum = Math.max(largestSum, currentSum)
    }
  }

  return largestSum
}

module.exports = { findLargestSumWithK }
