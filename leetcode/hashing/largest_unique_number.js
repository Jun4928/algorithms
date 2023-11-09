/**
 * url: https://leetcode.com/problems/largest-unique-number/description/
 * # 1133. Largest Unique Number
 *
 * @param {number[]} nums
 * @return {number}
 */
var largestUniqueNumber = function (nums) {
  const counter = nums.reduce((counter, curr) => {
    counter.set(curr, (counter.get(curr) ?? 0) + 1)
    return counter
  }, new Map())

  let max = -1
  for (const [num, freq] of counter.entries()) {
    if (freq === 1) {
      max = Math.max(max, num)
    }
  }

  return max
}

console.log(largestUniqueNumber([5, 7, 3, 9, 4, 9, 8, 3, 1])) // 8
console.log(largestUniqueNumber([9, 9, 8, 8])) // -1
