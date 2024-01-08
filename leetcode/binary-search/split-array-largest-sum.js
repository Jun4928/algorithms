/**
  https://leetcode.com/problems/split-array-largest-sum/editorial/
  410. Split Array Largest Sum
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var splitArray = function (nums, k) {
  const can = largestSum => {
    let sum = 0
    let split = 0
    for (const num of nums) {
      sum += num

      // when current sum is over largestSum, split the array
      if (sum > largestSum) {
        sum = num
        split += 1
      }
    }

    // NUMBER_OF_SUB-ARRAYS = split + 1
    return split + 1 <= k
  }

  // the maximum is value of array is the smallest possible answer
  let left = Math.max(...nums)
  // the sum of the array is the biggest possible answer
  let right = nums.reduce((a, b) => a + b, 0)
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (can(mid)) {
      // see if the mid is can meet the condition
      right = mid - 1
    } else {
      left = mid + 1
    }
  }

  return left
}

/**
 *
 * Time: O(N * logS)
 *   - binary search logS, S is the sum of integers
 *   - each iteration in the can function
 * Space: O(1), no additional spaces for another data structure
 */
