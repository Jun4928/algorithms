/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/description/
 * 103. Binary Tree Zigzag Level Order Traversal
 *
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function (root) {
  if (root == null) {
    return []
  }

  let queue = [root]
  let reverse = false
  let answer = []

  while (queue.length) {
    let nextLevel = []
    let curr = []

    for (const node of queue) {
      if (reverse) {
        curr.unshift(node.val)
      } else {
        curr.push(node.val)
      }

      if (node.left) {
        nextLevel.push(node.left)
      }

      if (node.right) {
        nextLevel.push(node.right)
      }
    }

    queue = nextLevel
    reverse = !reverse
  }

  return answer
}
