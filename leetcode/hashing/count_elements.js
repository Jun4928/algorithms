/**
 * https://leetcode.com/problems/counting-elements/description/
 * # 1426. Counting Elements
 *
 * @param {number[]} arr
 * @return {number}
 */
var countElements = function (arr) {
  const elements = new Set(arr)
  let count = 0
  for (const num of arr) {
    if (elements.has(num + 1)) {
      count += 1
    }
  }

  return count
}

module.exports = { countElements }
