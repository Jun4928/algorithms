/**
 * https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/
 * 1438. Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit
 *
 * @param {number[]} nums
 * @param {number} limit
 * @return {number}
 *
 * longest non-empty subarray,
 * the absolute difference between any tow elements of the subarray
 * is less than or equal to limit
 *
 * 1 <= nums[i] <= 10^9
 */
var longestSubarrayWrong = function (nums, limit) {
  const maxDeque = []
  const minDeque = []
  let maximumSize = -1

  let left = 0
  for (let idx = 0; idx < nums.length; idx++) {
    // maintain decreasing order
    while (maxDeque.length && nums[maxDeque[maxDeque.length - 1]] < nums[idx]) {
      maxDeque.pop()
    }
    maxDeque.push(idx)

    // maintain increasing order
    while (minDeque.length && nums[minDeque[minDeque.length - 1]] > nums[idx]) {
      minDeque.pop()
    }
    minDeque.push(idx)

    // invalid condition, reduce the window size
    while (nums[maxDeque[0]] - nums[minDeque[0]] > limit) {
      //   if (minDeque[0] < maxDeque[0]) {
      //     minDeque.shift()
      //   } else {
      //     maxDeque.shift()
      //   }
      // I should have just checked if the max and min index is the same
      // as left pointer
      if (maxDeque[0] === left) {
        maxDeque.shift()
      }
      if (minDeque[0] === left) {
        minDeque.shift()
      }

      left++
    }

    maximumSize = Math.max(maximumSize, idx - left + 1)
  }

  return maximumSize
}

var longestSubarray = function (nums, limit) {
  const maxDeque = []
  const minDeque = []
  let maximumSize = -1

  let left = 0
  for (let right = 0; right < nums.length; right++) {
    // maintain decreasing order
    while (maxDeque.length && maxDeque[maxDeque.length - 1] < nums[right]) {
      maxDeque.pop()
    }
    maxDeque.push(nums[right])

    // maintain increasing order
    while (minDeque.length && minDeque[minDeque.length - 1] > nums[right]) {
      minDeque.pop()
    }
    minDeque.push(nums[right])

    while (maxDeque[0] - minDeque[0] > limit) {
      if (minDeque[0] === nums[left]) {
        minDeque.shift()
      }
      if (maxDeque[0] === nums[left]) {
        maxDeque.shift()
      }
      left++
    }

    maximumSize = Math.max(maximumSize, right - left + 1)
  }

  return maximumSize
}

console.log(longestSubarray([8, 2, 4, 7], 4)) // 2
console.log(longestSubarray([10, 1, 2, 4, 7, 2], 5)) // 4
console.log(longestSubarray([4, 2, 2, 2, 4, 4, 2, 2], 0)) // 3
console.log(longestSubarray([1, 5, 6, 7, 8, 10, 6, 5, 6], 4)) // 5
console.log(longestSubarray([4, 10, 2, 6, 1], 10)) // 5
