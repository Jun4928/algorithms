/**
 * https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/description/
 * 323. Number of Connected Components in an Undirected Graph
 *
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var countComponents = function (n, edges) {
  const graph = new Map()
  for (let i = 0; i < n; i++) {
    graph.set(i, [])
  }
  for (const [a, b] of edges) {
    graph.get(a).push(b)
    graph.get(b).push(a)
  }

  let seen = Array(n).fill(false)
  const DFS = node => {
    if (seen[node]) {
      return
    }
    seen[node] = true

    for (const next of graph.get(node)) {
      DFS(next)
    }
  }

  let connected = 0
  for (let i = 0; i < n; i++) {
    if (!seen[i]) {
      connected += 1
      DFS(i)
    }
  }

  return connected
}
