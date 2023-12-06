/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * https://leetcode.com/problems/maximum-depth-of-binary-tree/description/
 * 104. Maximum Depth of Binary Tree
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
  const DFS = subtree => {
    if (subtree == null) {
      return 0
    }

    const left = DFS(subtree.left) + 1
    const right = DFS(subtree.right) + 1

    return Math.max(left, right)
  }

  return DFS(root)
}

var maxDepthRecursive = function (root) {
  if (root == null) {
    return 0
  }

  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
}

var maxDepthWithStack = function (root) {
  if (root == null) {
    return 0
  }

  let maxDepth = 0
  const stack = [{ node: root, depth: 1 }]
  while (stack.length) {
    const { node, depth } = stack.pop()
    maxDepth = Math.max(maxDepth, depth)

    if (node.right) {
      stack.push({ node: node.right, depth: depth + 1 })
    }

    if (node.left) {
      stack.push({ node: node.left, depth: depth + 1 })
    }
  }

  return maxDepth
}
