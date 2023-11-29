/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * https://leetcode.com/problems/maximum-difference-between-node-and-ancestor/description/
 * 1026. Maximum Difference Between Node and Ancestor
 *
 * @param {TreeNode} root
 * @return {number}
 */
var maxAncestorDiff = function (root) {
  const DFS = (node, acc) => {
    if (node == null) {
      return null
    }

    const currentMax = Math.max(...acc.map(v => Math.abs(node.val - v)))
    const left = DFS(node.left, [...acc, node.val])
    const right = DFS(node.right, [...acc, node.val])
    return left && right
      ? Math.max(currentMax, left, right)
      : Math.max(currentMax, left || right)
  }

  return DFS(root, [])
}

// using accumulator max, min
// until reaches the end, track down the maximum and the minimum value
// return difference at the end
var maxAncestorDiff = function (root) {
  const DFS = (node, max, min) => {
    if (node == null) {
      return max - min
    }

    const currMax = Math.max(max, node.val)
    const currMin = Math.min(min, node.val)
    const left = DFS(node.left, currMax, currMin)
    const right = DFS(node.right, currMax, currMin)
    return Math.max(left, right)
  }

  return DFS(root, root.val, root.val)
}
