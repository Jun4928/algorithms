/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
  const differences = new Map()
  differences.set(0, 1)

  let curr = 0
  let result = 0
  for (const num of nums) {
    curr += num
    const diff = curr - k
    result += differences.get(diff) ?? 0
    differences.set(curr, (differences.get(curr) ?? 0) + 1)
  }

  return result
}

console.log(subarraySum([1, 1, 1], 2)) // 2
// [1, 2, 3]
console.log(subarraySum([1, 2, 3], 3)) // 2
// [1, 3, 6]

console.log(subarraySum([1, 2, 3], 1)) // 1

console.log(subarraySum([1], 0)) // 0
// [1]

console.log(subarraySum([-1, -1, 1], 0)) // 1
// [-1, -2, -1]
