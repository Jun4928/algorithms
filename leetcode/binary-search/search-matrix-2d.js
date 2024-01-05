/**
https://leetcode.com/problems/search-a-2d-matrix/
74. Search a 2D Matrix
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  let left = 0
  let right = matrix.length - 1

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (matrix[mid].at(-1) === target) {
      return true
    }

    if (matrix[mid].at(-1) > target) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }

  const targetRow = matrix[left]
  if (targetRow == null) {
    return false
  }

  let l = 0
  let r = matrix[left].length - 1
  while (l <= r) {
    const mid = Math.floor((l + r) / 2)
    if (targetRow[mid] === target) {
      return true
    }

    if (targetRow[mid] > target) {
      r = mid - 1
    } else {
      l = mid + 1
    }
  }

  return false
}

var searchMatrix = function (matrix, target) {
  // let's consider this matrix as one single array
  const m = matrix.length
  const n = matrix[0].length
  let left = 0
  let right = m * n - 1

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    const row = Math.floor(mid / n)
    const col = mid % n

    if (matrix[row][col] === target) {
      return true
    }

    if (matrix[row][col] > target) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }

  return false
}
