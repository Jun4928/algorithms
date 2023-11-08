/**
 * https://leetcode.com/problems/count-number-of-nice-subarrays/
 * # 1248. Count Number of Nice Subarrays
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numberOfSubarrays = function (nums, k) {
  // if sub-array has K odd numbers, count it

  const oddMap = new Map()
  oddMap.set(0, 1) // empty sub-array

  let currOdds = 0
  let result = 0

  for (const num of nums) {
    currOdds += isOdd(num) ? 1 : 0
    const diff = currOdds - k
    result += oddMap.get(diff) ?? 0
    oddMap.set(currOdds, (oddMap.get(currOdds) ?? 0) + 1)
  }

  return result
}

function isOdd(num) {
  return num % 2 === 1
}

// console.log(numberOfSubarrays([1, 1, 2, 1, 1], 3)) // 2 [1, 1, 2, 1], [1, 2, 1, 1]
console.log(numberOfSubarrays([1, 1, 2, 1, 1], 1)) // 6 [1] [1] [1, 2] [2, 1] [1] [1]
// console.log(numberOfSubarrays([2, 4, 6], 1)) // 0 no odd numbers
// console.log(numberOfSubarrays([2, 2, 2, 1, 2, 2, 1, 2, 2, 2], 2)) // 16
