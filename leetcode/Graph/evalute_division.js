/**
 * https://leetcode.com/problems/evaluate-division/description/
 * 399. Evaluate Division
 *
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
var calcEquation = function (equations, values, queries) {
  const graph = new Map()
  const characters = new Set()
  equations.forEach(([a, b], idx) => {
    const value = values[idx]
    if (!graph.has(a)) {
      graph.set(a, [])
    }
    graph.get(a).push([b, value])

    if (!graph.has(b)) {
      graph.set(b, [])
    }
    graph.get(b).push([a, 1 / value])

    characters.add(a)
    characters.add(b)
  })

  const DFS = (c, d, acc, seen) => {
    const neighbors = graph.get(c)
    let answer = -1
    for (const [next, value] of neighbors) {
      if (next === d) {
        return acc * value
      } else if (!seen.has(next)) {
        seen.add(next)
        answer = Math.max(answer, DFS(next, d, value * acc, seen))
      }
    }
    return answer
  }

  return queries.map(([c, d]) => {
    if (!characters.has(c) || !characters.has(d)) {
      return -1
    } else if (c === d) {
      return 1
    }

    return DFS(c, d, 1, new Set([c]))
  })
}
