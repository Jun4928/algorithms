/**
 * https://leetcode.com/problems/missing-number/description/
 * # 268. Missing Number
 *
 * @param {number[]} nums
 * @return {number}
 */

// Time: O(n)
// Space: O(n)
// var missingNumber = function (nums) {
//   const numbers = new Set(nums)
//   for (let idx = 0; idx <= nums.length; idx++) {
//     if (numbers.has(idx)) {
//       continue
//     }

//     return idx
//   }

//   throw TypeError('MUST BE MISSING')
// }

// Time: O(n)
// Space: O(n)
// var missingNumber = function (nums) {
//   let total = Array.from({ length: nums.length })
//     .map((_, i) => i + 1)
//     .reduce((a, b) => a + b, 0)

//   for (const num of nums) {
//     total -= num
//   }

//   return total
// }

// Time: O(n)
// Space: Gauss' Formula
var missingNumber = function (nums) {
  let total = (nums.length * (nums.length + 1)) / 2
  for (const num of nums) {
    total -= num
  }

  return total
}

module.exports = { missingNumber }
