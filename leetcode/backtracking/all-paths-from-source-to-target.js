/**
https://leetcode.com/problems/all-paths-from-source-to-target/description/
797. All Paths From Source to Target

 * @param {number[][]} graph
 * @return {number[][]}
 */
var allPathsSourceTarget = function (graph) {
  const answer = []
  const N = graph.length
  const DFS = (path, node) => {
    if (node === N - 1) {
      answer.push([...path])
      return
    }

    const neighbors = graph[node]
    for (const node of neighbors) {
      path.push(node)
      DFS(path, node)
      path.pop(node)
    }
  }

  DFS([0], 0)
  return answer
}

/**
 * Time: O(2^N * N)
 *   - 2*N-1 - 1 possible paths
 *   - for each path, there could be at most N - 2 intermediate nodes
 *   - O(N) to build each path
 * Space: O(N) function call stack
 *
 *
 */
