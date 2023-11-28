/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * https://leetcode.com/problems/minimum-depth-of-binary-tree/description/
 * 111. Minimum Depth of Binary Tree
 *
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function (root) {
  const DFS = (node, level) => {
    if (node == null) {
      return null
    }

    if (node.left == null && node.right == null) {
      return level
    }

    const left = DFS(node.left, level + 1)
    const right = DFS(node.right, level + 1)
    return left && right ? Math.min(left, right) : left || right
  }

  return DFS(root, 1)
}
