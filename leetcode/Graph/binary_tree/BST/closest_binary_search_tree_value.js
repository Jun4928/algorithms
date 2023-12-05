/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * https://leetcode.com/problems/closest-binary-search-tree-value/description/
 * 270. Closest Binary Search Tree Value
 *
 * @param {TreeNode} root
 * @param {number} target
 * @return {number}
 *
 *
 * Approach #1
 * Recursive Inorder, O(N) time
 * Time: O(N), to build inorder traversal and linear search
 * Space: O(N)
 */
var closestValue = function (root, target) {
  let minDiff = Infinity
  let answer = root.val

  const DFS = node => {
    if (node == null) {
      return
    }

    DFS(node.left)
    const currDiff = Math.abs(target - node.val)
    if (currDiff < minDiff) {
      minDiff = currDiff
      answer = node.val
    }
    prev = node.val

    DFS(node.right)
    return
  }

  DFS(root)
  return answer
}

var closestValue = function (root, target) {
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

  return values
    .sort((a, b) => {
      return Math.abs(target - a) < Math.abs(target - b) ? -1 : 1
    })
    .at(0)
}

/*
 * Approach #2
 * Binary Search, O(H) Time
 * Time: O(H), H is the height
 * Space: O(1)
 */
var closestValue = function (root, target) {
  const DFS = (node, closest) => {
    if (node == null) {
      return closest
    }

    let curr = closest
    if (Math.abs(target - node.val) < Math.abs(target - closest)) {
      curr = node.val
    } else if (
      Math.abs(target - node.val) === Math.abs(target - closest) &&
      node.val < closest
    ) {
      curr = node.val
    }

    return target < node.val ? DFS(node.left, curr) : DFS(node.right, curr)
  }

  return DFS(root, root.val)
}
