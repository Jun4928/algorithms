/**
 * https://leetcode.com/problems/simplify-path/description/
 * 71. Simplify Path
 *
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function (path) {
  const split = path.split(`/`)
  const stack = []

  split.forEach(command => {
    if (command === `..`) {
      stack.pop()
    } else if (command.length && command !== '.') {
      stack.push(command)
    }
  })

  return `/${stack.join(`/`)}`
}
