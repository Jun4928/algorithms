/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
  const rows = grid.length
  const cols = grid[0].length
  const notSafe = (x, y) => x >= rows || y >= cols
  const directions = [
    [0, 1],
    [1, 0],
  ]

  let memo = [...Array(rows)].map(_ => Array(cols).fill(-1))
  memo[rows - 1][cols - 1] = grid[rows - 1][cols - 1]

  const DP = (row, col) => {
    if (notSafe(row, col)) {
      return null
    }

    if (memo[row][col] !== -1) {
      return memo[row][col]
    }

    let min = Infinity
    for (const [dx, dy] of directions) {
      const res = DP(row + dx, col + dy)
      if (res != null) {
        min = Math.min(min, grid[row][col] + res)
      }
    }

    memo[row][col] = min
    return memo[row][col]
  }

  return DP(0, 0)
}

/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSumIter = function (grid) {
  const rows = grid.length
  const cols = grid[0].length
  const notSafe = (x, y) => x >= rows || y >= cols
  const directions = [
    [0, 1],
    [1, 0],
  ]

  let memo = [...Array(rows)].map(_ => Array(cols).fill(Infinity))
  memo[rows - 1][cols - 1] = grid[rows - 1][cols - 1]

  for (let row = rows - 1; row >= 0; row--) {
    for (let col = cols - 1; col >= 0; col--) {
      for (const [dx, dy] of directions) {
        const [x, y] = [row + dx, col + dy]
        if (!notSafe(x, y)) {
          memo[row][col] = Math.min(memo[row][col], memo[x][y] + grid[row][col])
        }
      }
    }
  }

  return memo[0][0]
}
