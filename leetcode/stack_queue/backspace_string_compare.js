/**
 * https://leetcode.com/problems/backspace-string-compare/
 * 844. Backspace String Compare
 *
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var backspaceCompare = function (s, t) {
  return buildString(s) === buildString(t)
}

function buildString(s) {
  const stack = []
  for (const char of s) {
    if (char === '#') {
      stack.pop()
    } else {
      stack.push(char)
    }
  }

  return stack.join(``)
}
