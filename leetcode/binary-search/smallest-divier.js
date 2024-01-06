/**
https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/description/
1283. Find the Smallest Divisor Given a Threshold
 * @param {number[]} nums
 * @param {number} threshold
 * @return {number}
 */
var smallestDivisor = function (nums, threshold) {
  const can = divider => {
    let sum = 0
    for (const num of nums) {
      sum += Math.ceil(num / divider)
    }
    return sum <= threshold
  }

  let left = 1
  let right = Math.max(...nums)

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (can(mid)) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }

  return left
}
