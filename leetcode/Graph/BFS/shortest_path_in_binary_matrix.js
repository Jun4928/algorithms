/**
 * https://leetcode.com/problems/shortest-path-in-binary-matrix/
 * 1091. Shortest Path in Binary Matrix
 * @param {number[][]} grid
 * @return {number}
 a clear path: a path from top-left cell to the bottom-right cell
 (0, 0) => (n - 1, n - 1)
 no clear path: -1

 all the visited cells of the path are 0
 8 - directionally connected
 starting point: (0, 0)
 */
var shortestPathBinaryMatrix = function (grid) {
  const end = grid.length - 1
  if (grid[0][0] === 1 || grid[end][end] === 1) {
    return -1
  }

  let queue = [[0, 0]]
  let seen = [...Array(grid.length)].map(_ => Array(grid.length).fill(false))
  seen[0][0] = true

  let level = 0
  const notSafe = (row, col) => row < 0 || col < 0 || row > end || col > end
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ]

  while (queue.length) {
    level += 1
    const nextQueue = []

    for (const [row, col] of queue) {
      if (row === end && col === end) {
        return level
      }

      for (const [dx, dy] of directions) {
        const x = row + dx
        const y = col + dy
        if (!notSafe(x, y) && !seen[x][y] && grid[x][y] === 0) {
          seen[x][y] = true
          nextQueue.push([x, y])
        }
      }
    }

    queue = nextQueue
  }

  return -1
}
