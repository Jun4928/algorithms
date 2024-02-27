/**
https://leetcode.com/problems/length-of-longest-subarray-with-at-most-k-frequency/description/
2958. Length of Longest Subarray With at Most K Frequency
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxSubarrayLength = function (nums, k) {
  const m = new Map()

  let longest = 0
  let left = 0
  for (let right = 0; right < nums.length; right++) {
    m.set(nums[right], (m.get(nums[right]) ?? 0) + 1)

    while (m.get(nums[right]) > k) {
      m.set(nums[left], m.get(nums[left]) - 1)
      left++
    }

    longest = Math.max(longest, right - left + 1)
  }

  return longest
}
