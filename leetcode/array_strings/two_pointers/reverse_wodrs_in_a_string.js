/**
 * url: https://leetcode.com/problems/reverse-words-in-a-string-iii/
 * # 577 Reverse Words in a String III
 *
 *
 * @param {string} s
 * @return {string}
 */
// var reverseWords = function (s) {
//   return s
//     .split(' ')
//     .map(w => {
//       return Array.from(w).reverse().join('')
//     })
//     .join(' ')
// }

var reverseWords = function (s) {
  return s.split(' ').map(reverseString).join(' ')
}

// using two pointer
function reverseString(s) {
  let left = 0
  let right = s.length - 1
  let reversed = Array.from(s)

  while (left < right) {
    const tmp = reversed[right]
    reversed[right] = reversed[left]
    reversed[left] = tmp

    left++
    right--
  }

  return reversed.join('')
}

module.exports = { reverseWords }
