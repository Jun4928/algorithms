/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * https://leetcode.com/problems/count-good-nodes-in-binary-tree/
 * 1448. Count Good Nodes in Binary Tree
 *
 * @param {TreeNode} root
 * @return {number}
 */
var goodNodes = function (root) {
  let count = 0
  const DFS = (node, prevMax) => {
    if (node == null) {
      return
    }

    if (node.val >= prevMax) {
      count += 1
    }

    DFS(node.left, Math.max(prevMax, node.val))
    DFS(node.right, Math.max(prevMax, node.val))
    return
  }

  DFS(root, root.val)
  return count
}

var goodNodesWithStack = function (root) {
  if (root == null) {
    return 0
  }

  let count = 0
  const stack = [[root, root.val]]

  while (stack.length) {
    const [node, prevMax] = stack.pop()
    if (node.val >= prevMax) {
      count += 1
    }

    if (node.left) {
      stack.push([node.left, Math.max(prevMax, node.val)])
    }

    if (node.right) {
      stack.push([node.right, Math.max(prevMax, node.val)])
    }
  }

  return count
}
