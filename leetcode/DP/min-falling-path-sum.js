/**
https://leetcode.com/problems/minimum-falling-path-sum/
931. Minimum Falling Path Sum
 * @param {number[][]} matrix
 * @return {number}
 */
var minFallingPathSum = function (matrix) {
  const rows = matrix.length
  const cols = matrix[0].length
  const notSafe = (x, y) => x >= rows || y >= cols || x < 0 || y < 0
  const directions = [
    [1, -1],
    [1, 0],
    [1, 1],
  ]

  let memo = [...Array(rows)].map(_ => Array(cols).fill(null))
  const DP = (row, col) => {
    if (row === rows - 1) {
      memo[row][col] = matrix[row][col]
      return memo[row][col]
    }

    if (memo[row][col] !== null) {
      return memo[row][col]
    }

    let min = Infinity
    for (const [dx, dy] of directions) {
      const [x, y] = [row + dx, col + dy]
      if (!notSafe(x, y)) {
        min = Math.min(min, DP(x, y) + matrix[row][col])
      }
    }

    memo[row][col] = min
    return memo[row][col]
  }

  let min = Infinity
  for (let col = 0; col < cols; col++) {
    min = Math.min(min, DP(0, col))
  }

  return min
}
