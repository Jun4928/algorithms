/**
 * https://leetcode.com/problems/max-sum-of-a-pair-with-equal-sum-of-digits/
 * 2342. Max Sum of a Pair With Equal Sum of Digits
 *
 * @param {number[]} nums
 * @return {number}
 */
var maximumSum = function (nums) {
  let maxSum = Number.NEGATIVE_INFINITY
  const maxMap = new Map()

  nums.forEach(num => {
    const key = sumOfDigits(num)
    if (maxMap.has(key)) {
      const maxNum = maxMap.get(key)
      maxSum = Math.max(maxSum, maxNum + num)
      maxMap.set(key, Math.max(maxNum, num))
    } else {
      maxMap.set(key, num)
    }
  })

  return maxSum === Number.NEGATIVE_INFINITY ? -1 : maxSum
}

function sumOfDigits(number) {
  let sum = 0
  while (number > 0) {
    sum += number % 10
    number = Math.floor(number / 10)
  }

  return sum
}

// console.log(maximumSum([18, 43, 36, 13, 7])) // 54
// console.log(maximumSum([10, 12, 19, 14])) // -1
// console.log(
//   maximumSum([
//     279, 169, 463, 252, 94, 455, 423, 315, 288, 64, 494, 337, 409, 283, 283,
//     477, 248, 8, 89, 166, 188, 186, 128,
//   ])
// ) // 872

console.log(
  maximumSum([
    229, 398, 269, 317, 420, 464, 491, 218, 439, 153, 482, 169, 411, 93, 147,
    50, 347, 210, 251, 366, 401,
  ])
) // 973
