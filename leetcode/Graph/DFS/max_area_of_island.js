/**
 * https://leetcode.com/problems/max-area-of-island/description/
 * 695. Max Area of Island
 *
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function (grid) {
  const rows = grid.length
  const columns = grid[0].length

  let seen = [...Array(rows)].map(_ => Array(columns).fill(false))
  const DFS = (row, col) => {
    const notSafe = row < 0 || col < 0 || row >= rows || col >= columns
    if (notSafe || seen[row][col] || grid[row][col] === 0) {
      return 0
    }
    seen[row][col] = true

    const n = DFS(row + 1, col)
    const s = DFS(row - 1, col)
    const e = DFS(row, col + 1)
    const w = DFS(row, col - 1)
    return n + s + e + w + 1
  }

  let max = 0
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      if (grid[row][col] === 1) {
        max = Math.max(max, DFS(row, col))
      }
    }
  }

  return max
}
