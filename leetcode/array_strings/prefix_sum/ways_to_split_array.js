/**
 *  url: https://leetcode.com/problems/number-of-ways-to-split-array/
 * # 2270 Number of Ways to Split Array
 *
 * @param {number[]} nums
 * @return {number}
 */
// var waysToSplitArray = function (nums) {
//   const prefixSum = nums.reduce((acc, val, idx) => {
//     acc.push((acc[idx - 1] ?? 0) + val)
//     return acc
//   }, [])

//   return nums
//     .slice(0, -1)
//     .map((_, idx) => {
//       const left = prefixSum[idx]
//       const right = prefixSum[nums.length - 1] - prefixSum[idx]
//       return left >= right
//     })
//     .reduce((acc, val) => (val == true ? acc + 1 : acc), 0)
// }

var waysToSplitArray = function (nums) {
  const total = nums.reduce((acc, val) => acc + val, 0)
  let leftSum = 0
  let rightSum = 0
  let result = 0

  for (let idx = 0; idx < nums.length - 1; idx++) {
    leftSum += nums[idx]
    rightSum = total - leftSum

    if (leftSum >= rightSum) {
      result += 1
    }
  }

  return result
}

module.exports = { waysToSplitArray }
