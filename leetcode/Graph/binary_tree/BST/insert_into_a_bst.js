/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * https://leetcode.com/problems/insert-into-a-binary-search-tree/description/
 * 701. Insert into a Binary Search Tree
 *
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var insertIntoBST = function (root, val) {
  const DFS = node => {
    if (node == null) {
      return new TreeNode(val)
    }

    if (val < node.val) {
      // go to insert into the left subtree
      node.left = DFS(node.left)
    }

    if (val > node.val) {
      // go to insert into the right subtree
      node.right = DFS(node.right)
    }

    return node
  }

  return DFS(root)
}

// Time: O(H), H is a tree height, O(logN) in the average, O(N) in the worst case
// Space: O(H), recursion stack, O(logN) in the average, O(N) in the worst case

var insertIntoBST = function (root, val) {
  if (root == null) {
    return new TreeNode(val)
  }

  const DFS = node => {
    if (node == null) {
      return
    }

    if (val < node.val && node.left == null) {
      node.left = new TreeNode(val)
      return
    }

    if (val > node.val && node.right == null) {
      node.right = new TreeNode(val)
      return
    }

    if (val > node.val) {
      DFS(node.right)
    }
    if (val < node.val) {
      DFS(node.left)
    }

    return
  }

  DFS(root)
  return root
}
