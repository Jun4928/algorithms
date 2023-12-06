/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * https://leetcode.com/problems/deepest-leaves-sum/description/
 * 1302. Deepest Leaves Sum
 *
 * BFS
 *
 * @param {TreeNode} root
 * @return {number}
 */
var deepestLeavesSum = function (root) {
  let queue = [root]
  let answer = 0

  while (queue.length) {
    let nextLevel = []
    let sameLevelSum = 0

    for (const node of queue) {
      sameLevelSum += node.val

      if (node.left) {
        nextLevel.push(node.left)
      }

      if (node.right) {
        nextLevel.push(node.right)
      }
    }

    queue = nextLevel
    answer = sameLevelSum
  }

  return answer
}

/**
 *
 * Optimized BFS
 * use the trait that the last currentLevel is the last leaves
 *
 * @param {TreeNode} root
 * @returns {number}
 */
var deepestLeavesSum = function (root) {
  let nextLevel = [root]
  let currentLevel

  while (nextLevel.length) {
    currentLevel = nextLevel // save current level
    nextLevel = [] // initialize

    for (const node of currentLevel) {
      if (node.left) {
        nextLevel.push(node.left)
      }

      if (node.right) {
        nextLevel.push(node.right)
      }
    }
  }

  // current level end up being the last level
  return currentLevel.reduce((acc, node) => (acc += node.val), 0)
}

/**
 * https://leetcode.com/problems/deepest-leaves-sum/description/
 * 1302. Deepest Leaves Sum
 *
 * DFS
 *
 * @param {TreeNode} root
 * @return {number}
 */
var deepestLeavesSum = function (root) {
  let answer = []

  const DFS = (node, level) => {
    if (node == null) {
      return
    }

    answer[level] = (answer[level] ?? 0) + node.val
    DFS(node.left, level + 1)
    DFS(node.right, level + 1)
    return
  }

  DFS(root, 0)
  return answer.at(-1)
}
