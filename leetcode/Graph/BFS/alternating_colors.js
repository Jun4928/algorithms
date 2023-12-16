/**
 * https://leetcode.com/problems/shortest-path-with-alternating-colors/description/
 * 1129. Shortest Path with Alternating Colors
 *
 * @param {number} n
 * @param {number[][]} redEdges
 * @param {number[][]} blueEdges
 * @return {number[]}
 */
var shortestAlternatingPaths = function (n, redEdges, blueEdges) {
  const reds = new Map()
  for (const [from, to] of redEdges) {
    if (!reds.has(from)) {
      reds.set(from, [])
    }
    reds.get(from).push(to)
  }
  const blues = new Map()
  for (const [from, to] of blueEdges) {
    if (!blues.has(from)) {
      blues.set(from, [])
    }
    blues.get(from).push(to)
  }

  const RED = `r`
  const BLUE = `b`
  let answer = Array(n).fill(-1)
  const getState = (node, color) => `${node}-${color}`
  let queue = [
    [0, RED],
    [0, BLUE],
  ]
  const seen = new Set(queue.map(([n, color]) => getState(n, color)))

  let level = 0
  while (queue.length) {
    const nextQueue = []

    for (const [curr, color] of queue) {
      answer[curr] = answer[curr] === -1 ? level : Math.min(answer[curr], level)

      if (color === RED) {
        for (const node of blues.get(curr) ?? []) {
          const state = getState(node, BLUE)
          if (!seen.has(state)) {
            seen.add(state)
            nextQueue.push([node, BLUE])
          }
        }
      } else if (color === BLUE) {
        for (const node of reds.get(curr) ?? []) {
          const state = getState(node, RED)
          if (!seen.has(state)) {
            seen.add(state)
            nextQueue.push([node, RED])
          }
        }
      }
    }

    queue = nextQueue
    level += 1
  }

  return answer
}
