/**
https://leetcode.com/problems/partition-array-such-that-maximum-difference-is-k/
2294. Partition Array Such That Maximum Difference Is K

 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var partitionArray = function (nums, k) {
  nums.sort((a, b) => (a < b ? -1 : 1))

  let partitions = 1
  let recentMin = nums[0]
  for (const num of nums) {
    if (num - recentMin > k) {
      partitions += 1
      recentMin = num
    }
  }

  return partitions
}
