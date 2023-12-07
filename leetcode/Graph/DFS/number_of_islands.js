/**
 * https://leetcode.com/problems/number-of-islands/description/
 * 200. Number of Islands
 *
 * @param {character[][]} grid
 * @return {number}
 *
 */
var numIslands = function (grid) {
  const LAND = '1'
  const WATER = '0'
  const rows = grid.length
  const columns = grid[0].length

  let seen = [...Array(rows)].map(_ => Array(columns).fill(false))
  const DFS = (i, j) => {
    const notSafe = (i, j) => i < 0 || i >= rows || j < 0 || j >= columns
    if (notSafe(i, j) || grid[i][j] === WATER || seen[i][j] == true) {
      return
    }

    seen[i][j] = true
    const directions = [
      [i - 1, j],
      [i, j - 1],
      [i + 1, j],
      [i, j + 1],
    ]
    for (const [i, j] of directions) {
      DFS(i, j)
    }
  }

  let lands = 0
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (grid[i][j] === LAND && seen[i][j] == false) {
        lands += 1
        DFS(i, j)
      }
    }
  }

  return lands
}

/**
 *
 * it's the same solution as the above,
 * but, the key is just use the grid!
 * if the land has been visited, just mark as visited!
 * */
var numIslands = function (grid) {
  const LAND = '1'
  const WATER = '0'
  const VISITED = '-1'

  const rows = grid.length
  const columns = grid[0].length

  const DFS = (i, j) => {
    const notSafe = (i, j) => i < 0 || i >= rows || j < 0 || j >= columns
    // not safe, water, visited just end the search
    if (notSafe(i, j) || grid[i][j] === WATER || grid[i][j] === VISITED) {
      return
    }

    grid[i][j] = VISITED // mark the current point as VISITED
    DFS(i - 1, j)
    DFS(i, j - 1)
    DFS(i + 1, j)
    DFS(i, j + 1)
  }

  let lands = 0
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      // when reaches land start the search
      if (grid[i][j] === LAND) {
        lands += 1
        DFS(i, j)
      }
    }
  }

  return lands
}
