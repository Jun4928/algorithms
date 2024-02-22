/**
https://leetcode.com/problems/path-crossing/description/
1496. Path Crossing
 * @param {string} path
 * @return {boolean}
 */
var isPathCrossing = function (path) {
  const seen = new Set()
  const directions = {
    N: [0, 1],
    S: [0, -1],
    E: [1, 0],
    W: [-1, 0],
  }

  const key = ([x, y]) => `${x}-${y}`
  let curr = [0, 0]
  seen.add(key(curr))
  for (const p of path) {
    const direction = directions[p]
    curr = [curr[0] - direction[0], curr[1] - direction[1]]
    if (seen.has(key(curr))) {
      return true
    }

    seen.add(key(curr))
  }

  return false
}
