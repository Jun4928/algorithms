/**
 * https://leetcode.com/problems/jump-game-iii/description/
 * 1306. Jump Game III
 *
 * @param {number[]} arr
 * @param {number} start
 * @return {boolean}
 */
var canReach = function (arr, start) {
  const notSafe = idx => idx < 0 || idx >= arr.length
  const directions = idx => [idx + arr[idx], idx - arr[idx]]

  let queue = [start]
  const seen = new Set(queue)
  while (queue.length) {
    const nextQueue = []

    for (const currIdx of queue) {
      if (arr[currIdx] === 0) {
        return true
      }

      for (const nextIdx of directions(currIdx)) {
        if (!seen.has(nextIdx) && !notSafe(nextIdx)) {
          seen.add(nextIdx)
          nextQueue.push(nextIdx)
        }
      }
    }

    queue = nextQueue
  }

  return false
}
