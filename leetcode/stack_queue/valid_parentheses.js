/**
 * https://leetcode.com/problems/valid-parentheses/
 * 20. Valid Parentheses
 *
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const stack = []
  const match = new Map([
    ['(', ')'],
    ['{', '}'],
    ['[', ']'],
  ])

  for (const character of s) {
    if (match.has(character)) {
      stack.push(character)
    } else {
      const top = stack.pop()
      if (match.get(top) !== character) {
        return false
      }
    }
  }

  return stack.length === 0
}
