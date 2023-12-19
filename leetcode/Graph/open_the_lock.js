/**
 * https://leetcode.com/problems/open-the-lock/
 * 752. Open the Lock
 *
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
var openLock = function (deadends, target) {
  const possibilities = [
    [0, 1],
    [1, 1],
    [2, 1],
    [3, 1],
    [0, -1],
    [1, -1],
    [2, -1],
    [3, -1],
  ]

  // mine was too slow
  //   const wheel = (num, way) => {
  //     const next = num + way
  //     if (next === 10) {
  //       return 0
  //     } else if (next === -1) {
  //       return 9
  //     }

  //     return next
  //   }

  //   const getPossibles = number => {
  //     const numbers = [...number]
  //     return possibilities.map(([position, way]) => {
  //       return numbers
  //         .map((v, idx) => (idx === position ? wheel(v, way) : v))
  //         .join('')
  //     })
  //   }

  const wheel = (num, way) => {
    return (Number(num) + way + 10) % 10
  }

  const getPossibles = number => {
    return possibilities.map(([idx, way]) => {
      return `${number.slice(0, idx)}${wheel(number[idx], way)}${number.slice(
        idx + 1
      )}`
    })
  }

  let seen = new Set(deadends)
  if (seen.has('0000')) {
    return -1
  }

  let queue = ['0000']
  seen.add('0000')
  let moves = 0

  while (queue.length) {
    const nextQueue = []

    for (const curr of queue) {
      if (curr === target) {
        return moves
      }

      const possibles = getPossibles(curr)
      for (const next of possibles) {
        if (!seen.has(next)) {
          seen.add(next)
          nextQueue.push(next)
        }
      }
    }

    queue = nextQueue
    moves += 1
  }

  return -1
}
