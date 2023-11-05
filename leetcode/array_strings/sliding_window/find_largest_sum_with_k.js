/**
 *
 * @param {number[]} nums
 * @param {number} k
 *
 * @return {number} the sum of the subarray
 */
function findLargestSumWithK(nums, k) {
  let curr = 0
  let left = 0
  let currentSum = 0
  let largestSum = 0

  for (let right = 0; right < nums.length; right++) {
    curr += 1
    currentSum += nums[right]

    while (curr > k) {
      curr -= 1
      currentSum -= nums[left]
      left++
    }

    largestSum = Math.max(largestSum, currentSum)
  }

  return largestSum
}

module.exports = { findLargestSumWithK }
