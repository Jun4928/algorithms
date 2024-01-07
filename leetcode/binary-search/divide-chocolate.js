/**
https://leetcode.com/problems/divide-chocolate/description/
1231. Divide Chocolate
 * @param {number[]} sweetness
 * @param {number} k
 * @return {number}
 */
var maximizeSweetness = function (sweetness, k) {
  const people = k + 1
  const can = minSweet => {
    let sum = 0
    let piece = 0

    for (const sweet of sweetness) {
      sum += sweet
      // when sum more than minSweet, divide the piece
      if (sum >= minSweet) {
        piece += 1
        sum = 0
      }
    }

    return piece >= people // piece would be more than the people
  }

  // minSweet should more than the min value
  let left = Math.min(...sweetness)
  // minSweet should less than the maximum sweet with a piece
  let right = Math.floor(sweetness.reduce((a, b) => a + b, 0) / people)
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (can(mid)) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  return right
}

/**
 * How to divide chocolate into pieces that meet two conditions
 * - reach at the end of the bar
 * - everyone has a pice with sweetness no less than minSweet
 *
 */
