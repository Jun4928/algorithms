/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/description/
 * 863. All Nodes Distance K in Binary Tree
 *
 * @param {TreeNode} root
 * @param {TreeNode} target
 * @param {number} k
 * @return {number[]}
 */
var distanceK = function (root, target, k) {
  const graph = new Map()
  const DFS = (node, parent) => {
    if (node == null) {
      return
    }

    const curr = node.val
    if (parent != null) {
      if (!graph.has(curr)) {
        graph.set(curr, [])
      }
      graph.get(curr).push(parent)

      if (!graph.has(parent)) {
        graph.set(parent, [])
      }
      graph.get(parent).push(curr)
    }

    DFS(node.left, curr)
    DFS(node.right, curr)
  }
  DFS(root, null)

  const seen = new Set([target.val])
  let queue = [target.val]
  let level = 0
  while (queue.length) {
    if (level === k) {
      return queue
    }

    level += 1
    const nextLevel = []
    for (const node of queue) {
      const connected = graph.get(node) ?? []
      for (const next of connected) {
        if (!seen.has(next)) {
          seen.add(next)
          nextLevel.push(next)
        }
      }
    }
    queue = nextLevel
  }

  return []
}
