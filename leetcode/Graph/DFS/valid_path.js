/**
 * https://leetcode.com/problems/find-if-path-exists-in-graph/description/
 * 1971. Find if Path Exists in Graph
 *
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} source
 * @param {number} destination
 * @return {boolean}
 */
var validPath = function (n, edges, source, destination) {
  const graph = new Map()
  for (const [a, b] of edges) {
    if (!graph.has(a)) {
      graph.set(a, [])
    }
    graph.get(a).push(b)

    if (!graph.has(b)) {
      graph.set(b, [])
    }
    graph.get(b).push(a)
  }

  let seen = Array(n).fill(false)
  const DFS = node => {
    if (seen[node]) {
      return
    }
    seen[node] = true

    const connected = graph.get(node) ?? []
    for (const next of connected) {
      DFS(next)
    }
  }

  DFS(source)
  return seen[destination]
}
