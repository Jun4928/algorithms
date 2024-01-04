/**
https://leetcode.com/problems/path-with-minimum-effort/
1631. Path With Minimum Effort
 * @param {number[][]} heights
 * @return {number}
 */

var minimumEffortPathBFSIterative = function (heights) {
  const rows = heights.length
  const cols = heights[0].length
  const notSafe = (row, col) => row < 0 || col < 0 || row >= rows || col >= cols
  const getKey = (row, col) => `${row}-${col}`

  const can = effort => {
    let queue = [[0, 0]]
    const seen = new Set(getKey(0, 0))
    while (queue.length) {
      let nextQueue = []
      for (const curr of queue) {
        const [row, col] = curr
        if (row === rows - 1 && col === cols - 1) {
          return true
        }

        const neighbors = [
          [row - 1, col],
          [row + 1, col],
          [row, col + 1],
          [row, col - 1],
        ]
        for (const [x, y] of neighbors) {
          if (!notSafe(x, y)) {
            const key = getKey(x, y)
            const diff = Math.abs(heights[row][col] - heights[x][y])
            if (!seen.has(key) && diff <= effort) {
              seen.add(key)
              nextQueue.push([x, y])
            }
          }
        }
      }

      queue = nextQueue
    }

    return false
  }

  let left = 0
  let right = 1000000
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (can(mid)) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }

  return left
}

/**
https://leetcode.com/problems/path-with-minimum-effort/
1631. Path With Minimum Effort
 * @param {number[][]} heights
 * @return {number}
 */
var minimumEffortPathDFSRecursive = function (heights) {
  const rows = heights.length
  const cols = heights[0].length

  const notSafe = (row, col) => row < 0 || col < 0 || row >= rows || col >= cols
  const directions = [
    [0, -1],
    [0, 1],
    [1, 0],
    [-1, 0],
  ]

  const can = effort => {
    let seen = [...Array(rows)].map(_ => Array(cols).fill(false))
    seen[0][0] = true

    const DFS = (row, col) => {
      if (row === rows - 1 && col === cols - 1) {
        console.log(row, col, effort)
        return true
      }

      const neighbors = directions.map(([dx, dy]) => [row + dx, col + dy])
      let result = false
      for (const neighbor of neighbors) {
        const [x, y] = neighbor
        if (!notSafe(x, y) && !seen[x][y]) {
          const diff = Math.abs(heights[row][col] - heights[x][y])
          if (diff <= effort) {
            seen[x][y] = true
            result = DFS(x, y) || result
          }
        }
      }

      return result
    }

    return DFS(0, 0)
  }

  let left = 0
  let right = 0
  for (const values of heights) {
    right = Math.max(right, ...values)
  }

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (can(mid)) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }

  return left
}

/**
https://leetcode.com/problems/path-with-minimum-effort/
1631. Path With Minimum Effort
 * @param {number[][]} heights
 * @return {number}
 */
var minimumEffortPathDFSIterative = function (heights) {
  const rows = heights.length
  const cols = heights[0].length

  const notSafe = (row, col) => row < 0 || col < 0 || row >= rows || col >= cols
  const directions = [
    [0, -1],
    [0, 1],
    [1, 0],
    [-1, 0],
  ]

  const can = effort => {
    let seen = [...Array(rows)].map(_ => Array(cols).fill(false))
    seen[0][0] = true

    let stack = [[0, 0]]
    while (stack.length) {
      const [currX, currY] = stack.pop()
      if (currX === rows - 1 && currY === cols - 1) {
        return true
      }

      for (const [dx, dy] of directions) {
        const x = currX + dx
        const y = currY + dy
        if (!notSafe(x, y) && !seen[x][y]) {
          const diff = Math.abs(heights[currX][currY] - heights[x][y])
          if (diff <= effort) {
            seen[x][y] = true
            stack.push([x, y])
          }
        }
      }
    }

    return false
  }

  let left = 0
  let right = 0
  for (const values of heights) {
    right = Math.max(right, ...values)
  }

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (can(mid)) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }

  return left
}
