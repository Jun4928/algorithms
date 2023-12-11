/**
 * https://leetcode.com/problems/minimum-number-of-vertices-to-reach-all-nodes/
 * 1557. Minimum Number of Vertices to Reach All Nodes
 *
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
var findSmallestSetOfVertices = function (n, edges) {
  const toSet = new Set(edges.map(([from, to]) => to))

  return Array(n)
    .fill(0)
    .map((v, idx) => v + idx)
    .filter(node => !toSet.has(node))
}
