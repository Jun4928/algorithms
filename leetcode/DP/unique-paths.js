/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  const rows = m
  const cols = n
  const directions = [
    [0, 1],
    [1, 0],
  ]
  const notSafe = (x, y) => x < 0 || y < 0 || x >= rows || y >= cols
  let memo = [...Array(rows)].map(_ => Array(cols).fill(-1))

  const DP = (row, col) => {
    if (notSafe(row, col)) {
      return 0
    }

    if (row === rows - 1 && col === cols - 1) {
      return 1
    }

    if (memo[row][col] !== -1) {
      return memo[row][col]
    }

    let ways = 0
    for (const [dx, dy] of directions) {
      ways += DP(row + dx, col + dy)
    }

    memo[row][col] = ways
    return memo[row][col]
  }

  return DP(0, 0)
}

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePathsIter = function (m, n) {
  const rows = m
  const cols = n
  let memo = [...Array(rows)].map(_ => Array(cols).fill(0))
  const directions = [
    [0, 1],
    [1, 0],
  ]
  const notSafe = (x, y) => x >= rows || y >= cols

  memo[rows - 1][cols - 1] = 1
  for (let row = rows - 1; row >= 0; row--) {
    for (let col = cols - 1; col >= 0; col--) {
      for (const [dx, dy] of directions) {
        const [x, y] = [row + dx, col + dy]
        memo[row][col] += notSafe(x, y) ? 0 : memo[x][y]
      }
    }
  }
}
