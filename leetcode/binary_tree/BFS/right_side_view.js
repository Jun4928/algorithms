/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * https://leetcode.com/problems/binary-tree-right-side-view/
 * 199. Binary Tree Right Side View
 *
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function (root) {
  let queue = [root]
  let level = 0
  let map = new Map()

  while (queue.length) {
    let nextQueue = []
    for (const node of queue) {
      map.set(level, node.val)

      if (node.left) {
        nextQueue.push(node.left)
      }

      if (node.right) {
        nextQueue.push(node.right)
      }
    }

    queue = nextQueue
    level += 1
  }

  return [...map.entries()].sort(([a], [b]) => a - b).map(([_, v]) => v)
}

var rightSideView = function (root) {
  if (root == null) {
    return []
  }

  let queue = [root]
  let answer = []

  while (queue.length) {
    let nextQueue = []
    answer.push(queue[queue.length - 1].val) // the most right side

    for (const node of queue) {
      if (node.left) {
        nextQueue.push(node.left)
      }

      if (node.right) {
        nextQueue.push(node.right)
      }
    }

    queue = nextQueue
  }

  return answer
}
