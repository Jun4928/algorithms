/**
 * https://leetcode.com/problems/make-the-string-great/description/
 * 1544. Make The String Great
 *
 * @param {string} s
 * @return {string}
 */
var makeGood = function (s) {
  const stack = []

  //   const decideBadCase = (a, b) => {
  //     const lower = /[a-z]/
  //     const upper = /[A-Z]/

  //     if (lower.test(a)) {
  //       return a.toUpperCase() === b
  //     } else if (upper.test(a)) {
  //       return a.toLowerCase() === b
  //     }
  //   }

  const decideBadCase = (a, b) => {
    return Math.abs(a.charCodeAt(0) - b.charCodeAt(0)) === 32
  }

  for (const char of s) {
    const peak = stack[stack.length - 1] ?? ''
    if (decideBadCase(peak, char)) {
      stack.pop()
    } else {
      stack.push(char)
    }
  }

  return stack.join(``)
}
