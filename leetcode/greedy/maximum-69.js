/**
https://leetcode.com/problems/maximum-69-number/description/
1323. Maximum 69 Number

 * @param {number} num
 * @return {number}
 */
var maximum69Number = function (num) {
  let numbers = [...String(num)]

  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] === '6') {
      numbers[i] = 9
      break
    }
  }

  return Number(numbers.join(``))
}

/**
 * L digits
 * Time: O(L)
 * Space: O(L)
 *
 */
