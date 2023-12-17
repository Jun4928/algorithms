/**
 * https://leetcode.com/problems/nearest-exit-from-entrance-in-maze/description/
 * 1926. Nearest Exit from Entrance in Maze
 * 
 * @param {character[][]} maze
 * @param {number[]} entrance
 * @return {number}

 4 directions, safe zone
 shortest path to the exit, exit is an empty cell at the border
 */
var nearestExit = function (maze, entrance) {
  const rows = maze.length
  const cols = maze[0].length
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ]
  const EMPTY = '.'

  const notSafe = (row, col) => row < 0 || col < 0 || row >= rows || col >= cols
  const isExit = (row, col) =>
    row === 0 || col === 0 || row === rows - 1 || col === cols - 1
  const isNotEntrance = (row, col) => row !== entrance[0] || col !== entrance[1]

  let queue = [entrance]
  let seen = [...Array(rows)].map(_ => Array(cols).fill(false))
  seen[entrance[0]][entrance[1]] = true

  let level = 0
  while (queue.length) {
    const nextQueue = []

    for (const [currX, currY] of queue) {
      if (isExit(currX, currY) && isNotEntrance(currX, currY)) {
        return level
      }

      for (const [dx, dy] of directions) {
        const x = currX + dx
        const y = currY + dy
        if (!notSafe(x, y) && !seen[x][y] && maze[x][y] === EMPTY) {
          seen[x][y] = true
          nextQueue.push([x, y])
        }
      }
    }

    queue = nextQueue
    level += 1
  }

  return -1
}
