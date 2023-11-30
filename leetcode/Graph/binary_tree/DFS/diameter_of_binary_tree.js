/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * https://leetcode.com/problems/diameter-of-binary-tree/description/
 * 543. Diameter of Binary Tree
 *
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function (root) {
  let diameter = 0
  const DFS = node => {
    if (node == null) {
      return 0
    }

    const left = DFS(node.left)
    const right = DFS(node.right)
    diameter = Math.max(diameter, left + right)
    return Math.max(left, right) + 1
  }

  DFS(root)
  return diameter
}
