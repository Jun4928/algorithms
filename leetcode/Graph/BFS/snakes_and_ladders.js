/**
 * https://leetcode.com/problems/snakes-and-ladders/description/
 * 909. Snakes and Ladders
 *
 * @param {number[][]} board
 * @return {number}
 */
var snakesAndLadders = function (board) {
  const n = board.length
  const toBoard = num => {
    const share = Math.floor(num / n)
    const remainder = num % n

    const row = remainder === 0 ? n - share : n - share - 1
    const col = remainder === 0 ? n - 1 : remainder - 1
    return (n - row) % 2 === 1 ? [row, col] : [row, -col - 1]
  }

  let queue = [1]
  let moves = 0
  let seen = new Set()

  while (queue.length) {
    const nextQueue = []

    for (const curr of queue) {
      if (curr === n * n) {
        return moves
      }

      const from = curr + 1
      const nextRange = Array(6)
        .fill(0)
        .map((v, idx) => idx + from)
        .filter(v => v <= n * n)

      nextRange.forEach(num => {
        const [row, col] = toBoard(num)
        const value = board.at(row).at(col)
        const next = value === -1 ? num : value

        if (!seen.has(next)) {
          seen.add(next)
          nextQueue.push(next)
        }
      })
    }

    queue = nextQueue
    moves += 1
  }

  return -1
}
