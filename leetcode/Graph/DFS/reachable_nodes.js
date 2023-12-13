/**
 * https://leetcode.com/problems/reachable-nodes-with-restrictions/description/
 * 2368. Reachable Nodes With Restrictions
 *
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} restricted
 * @return {number}
 */
var reachableNodes = function (n, edges, restricted) {
  const graph = new Map()
  for (let node = 0; node < n; node++) {
    graph.set(node, [])
  }
  for (const [a, b] of edges) {
    graph.get(a).push(b)
    graph.get(b).push(a)
  }

  const forbidden = new Set(restricted)
  let seen = Array(n).fill(false)

  let reachable = 0
  const DFS = node => {
    if (seen[node] || forbidden.has(node)) {
      return
    }
    seen[node] = true
    reachable += 1

    for (const child of graph.get(node)) {
      DFS(child)
    }
  }

  DFS(0)
  return reachable
}
