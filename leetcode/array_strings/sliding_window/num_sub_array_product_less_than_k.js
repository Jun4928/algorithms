/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numSubarrayProductLessThanK = function (nums, k) {
  if (k <= 1) {
    return 0
  }

  let left = 0
  let curr = 1
  let result = 0

  for (let right = 0; right < nums.length; right++) {
    curr *= nums[right]

    while (curr >= k) {
      curr /= nums[left]
      left++
    }

    result += right - left + 1
  }

  return result
}

module.exports = { numSubarrayProductLessThanK }
