/**
https://leetcode.com/problems/reverse-only-letters/
917. Reverse Only Letters
 * @param {string} s
 * @return {string}
 */
var reverseOnlyLetters = function (s) {
  const ALPHABET = /[A-Z]|[a-z]/

  let r = [...s]
  let left = 0
  let right = r.length - 1
  while (left < right) {
    while (!ALPHABET.test(r[left])) {
      left++
    }

    while (!ALPHABET.test(r[right])) {
      right--
    }

    if (left >= right) {
      break
    }

    const tmp = r[right]
    r[right] = r[left]
    r[left] = tmp

    left++
    right--
  }

  return r.join(``)
}
