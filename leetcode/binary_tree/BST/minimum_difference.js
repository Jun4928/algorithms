/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * https://leetcode.com/problems/minimum-absolute-difference-in-bst/
 * 530. Minimum Absolute Difference in BST
 *
 * @param {TreeNode} root
 * @return {number}
 */
var getMinimumDifference = function (root) {
  const values = []
  const DFS = node => {
    if (node == null) {
      return
    }

    DFS(node.left)
    values.push(node.val)
    DFS(node.right)
    return
  }
  DFS(root)

  let minDiff = Infinity
  for (let i = 1; i < values.length; i++) {
    minDiff = Math.min(minDiff, values[i] - values[i - 1])
  }

  return minDiff
}

var getMinimumDifference = function (root) {
  let prev = null
  let minDiff = Infinity

  const DFS = node => {
    if (node == null) {
      return
    }

    DFS(node.left)

    // visit binary search using inorder: visit all values in sorted-order
    if (prev != null) {
      minDiff = Math.min(minDiff, node.val - prev)
    }
    prev = node.val

    DFS(node.right)
    return
  }

  DFS(root)

  return minDiff
}
