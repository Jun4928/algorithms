/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * https://leetcode.com/problems/path-sum/
 * 112. Path Sum
 *
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {
  const DFS = (node, sum) => {
    if (node == null) {
      return false
    }

    // ending condition is when both children all null, the node is a leaf
    if (!node.left && !node.right) {
      return sum + node.val === targetSum
    }

    const left = DFS(node.left, sum + node.val)
    const right = DFS(node.right, sum + node.val)
    return left || right
  }

  return DFS(root, 0)
}

var hasPathSumWithStack = function (root, targetSum) {
  if (root == null) {
    return false
  }

  const stack = [[root, 0]]
  while (stack.length) {
    const [node, sum] = stack.pop()
    if (!node.left && !node.right) {
      if (sum + node.val === targetSum) {
        return true
      }
    }

    if (node.left) {
      stack.push([node.left, sum + node.val])
    }

    if (node.right) {
      stack.push([node.right, sum + node.val])
    }
  }

  return false
}
