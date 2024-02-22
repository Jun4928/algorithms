/**
https://leetcode.com/problems/contains-duplicate/description/
217. Contains Duplicate
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function (nums) {
  return new Set(nums).size !== nums.length
}
