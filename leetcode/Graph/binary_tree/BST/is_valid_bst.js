/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * https://leetcode.com/problems/validate-binary-search-tree/description/
 * 98. Validate Binary Search Tree
 *
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
  let isValid = true
  let prev = null

  const DFS = node => {
    if (node == null || isValid == false) {
      return
    }

    DFS(node.left, node.val)
    if (prev != null && prev >= node.val) {
      isValid = false
    }
    prev = node.val
    DFS(node.right, node.val)
    return
  }

  DFS(root)
  return isValid
}
