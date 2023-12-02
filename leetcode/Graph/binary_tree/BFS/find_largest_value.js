/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * https://leetcode.com/problems/find-largest-value-in-each-tree-row/description/
 * 515. Find Largest Value in Each Tree Row
 *
 * @param {TreeNode} root
 * @return {number[]}
 */
var largestValues = function (root) {
  if (root == null) {
    return []
  }

  let answer = []
  let queue = [root]

  while (queue.length) {
    let nextLevel = []
    let sameLevelMax = Number.NEGATIVE_INFINITY
    for (const node of queue) {
      sameLevelMax = Math.max(sameLevelMax, node.val)

      if (node.left) {
        nextLevel.push(node.left)
      }

      if (node.left) {
        nextLevel.push(node.right)
      }
    }

    queue = nextLevel
    answer.push(sameLevelMax)
  }

  return answer
}
