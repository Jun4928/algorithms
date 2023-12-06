/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * https://leetcode.com/problems/same-tree/
 * 100. Same Tree
 *
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
  const DFS = (a, b) => {
    if (a == null && b == null) {
      return true
    }

    if (a == null || b == null) {
      return false
    }

    const left = DFS(a.left, b.left)
    const right = DFS(a.right, b.right)
    return left && right && a.val === b.val
  }

  return DFS(p, q)
}

var isSameTreeWithStack = function (p, q) {
  const stack = [[p, q]]
  while (stack.length) {
    const [a, b] = stack.pop()
    if (a == null && b == null) {
      continue
    }

    if (a == null || b == null) {
      return false
    }

    if (a.val !== b.val) {
      return false
    }

    stack.push([a.left, b.left])
    stack.push([a.right, b.right])
  }

  return true
}
