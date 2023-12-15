/**
 * https://leetcode.com/problems/01-matrix/description/?source=submission-noac
 * 542. 01 Matrix
 *
 * @param {number[][]} mat
 * @return {number[][]}
 */

// Runtime Error
var updateMatrix = function (mat) {
  const rows = mat.length
  const columns = mat[0].length
  const notSafe = (row, col) =>
    row < 0 || col < 0 || row >= rows || col >= columns
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ]

  let seen = [...Array(rows)].map(_ => Array(columns).fill(false))
  const BFS = (row, col) => {
    let queue = [[row, col]]
    let level = 0
    while (queue.length) {
      const nextQueue = []
      for (const [currX, currY] of queue) {
        for (const [dx, dy] of directions) {
          const x = currX + dx
          const y = currY + dy

          if (notSafe(x, y)) {
            continue
          }

          if (mat[x][y] === 0) {
            mat[row][col] = level + 1
            return
          }

          nextQueue.push([x, y])
        }
      }

      queue = nextQueue
      level += 1
    }
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      if (mat[row][col] !== 0) {
        BFS(row, col)
      }
    }
  }

  return mat
}

// optimized version BFS starts from 0
var updateMatrix = function (mat) {
  const rows = mat.length
  const columns = mat[0].length
  const notSafe = (row, col) =>
    row < 0 || col < 0 || row >= rows || col >= columns
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ]

  let seen = [...Array(rows)].map(_ => Array(columns).fill(false))
  let queue = []
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      if (mat[row][col] === 0) {
        seen[row][col] = true
        queue.push([row, col])
      }
    }
  }

  let level = 0
  while (queue.length) {
    const nextQueue = []
    for (const [currX, currY] of queue) {
      mat[currX][currY] = level

      for (const [dx, dy] of directions) {
        const x = currX + dx
        const y = currY + dy

        if (!notSafe(x, y) && !seen[x][y]) {
          seen[x][y] = true
          nextQueue.push([x, y])
        }
      }
    }

    queue = nextQueue
    level += 1
  }

  return mat
}
