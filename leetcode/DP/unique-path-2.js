/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
  const rows = obstacleGrid.length
  const cols = obstacleGrid[0].length
  const notSafe = (x, y) => x >= rows || y >= cols
  const directions = [
    [0, 1],
    [1, 0],
  ]

  let memo = [...Array(rows)].map(_ => Array(cols).fill(-1))
  const DP = (row, col) => {
    if (row === rows - 1 && col === cols - 1) {
      return 1
    }

    if (memo[row][col] !== -1) {
      return memo[row][col]
    }

    let ways = 0
    for (const [dx, dy] of directions) {
      const [x, y] = [row + dx, col + dy]
      if (!notSafe(x, y) && obstacleGrid[x][y] === 0) {
        ways += DP(x, y)
      }
    }

    memo[row][col] = ways
    return memo[row][col]
  }

  if (obstacleGrid[0][0] === 1) {
    return 0
  }

  return DP(0, 0)
}
