/**
 * https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination/
 * 1293. Shortest Path in a Grid with Obstacles Elimination
 * 
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}

 m == grid.length
 n == grid[i].length
 1 <= m, n <= 40
 1 <= k <= m * n
 */
var shortestPath = function (grid, k) {
  const rows = grid.length
  const cols = grid[0].length
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ]
  const notSafe = (x, y) => x < 0 || y < 0 || x >= rows || y >= cols

  const getStateKey = (row, col, left) => `${row}-${col}-${left}`
  const seen = new Set()
  let queue = [[0, 0, k]]
  seen.add(getStateKey(0, 0, k))
  let level = 0

  while (queue.length) {
    const nextLevel = []
    for (let [currX, currY, left] of queue) {
      if (currX === rows - 1 && currY === cols - 1) {
        return level
      }

      for (const [dx, dy] of directions) {
        const x = currX + dx
        const y = currY + dy
        if (notSafe(x, y)) {
          continue
        }

        if (grid[x][y] === 0) {
          const state = getStateKey(x, y, left)
          if (!seen.has(state)) {
            seen.add(state)
            nextLevel.push([x, y, left])
          }
        } else if (left > 0) {
          const state = getStateKey(x, y, left - 1)
          if (!seen.has(state)) {
            seen.add(state)
            nextLevel.push([x, y, left - 1])
          }
        }
      }
    }

    queue = nextLevel
    level += 1
  }

  return -1
}
