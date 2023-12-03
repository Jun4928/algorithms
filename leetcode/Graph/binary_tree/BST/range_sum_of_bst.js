/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * https://leetcode.com/problems/range-sum-of-bst/description/
 * 938. Range Sum of BST
 *
 * @param {TreeNode} root
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
var rangeSumBST = function (root, low, high) {
  const DFS = node => {
    let sum = 0
    if (node == null) {
      return sum
    }

    if (node.val >= low && node.val <= high) {
      sum += node.val
    }

    if (node.val > low) {
      sum += DFS(node.left)
    }

    if (node.val < high) {
      sum += DFS(node.right)
    }

    return sum
  }

  return DFS(root)
}

/**
 * my solution with rangeSum scope
 */
var rangeSumBST = function (root, low, high) {
  let rangeSum = 0

  const DFS = node => {
    if (node == null) {
      return
    }

    if (node.val >= low && node.val <= high) {
      rangeSum += node.val
    }

    if (node.val > low) {
      DFS(node.left)
    }

    if (node.val < high) {
      DFS(node.right)
    }

    return
  }

  DFS(root)
  return rangeSum
}
