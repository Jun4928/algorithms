/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/
 * 236. Lowest Common Ancestor of a Binary Tree
 *
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 *
 *
 * - the number range [2, 10^5]
 * - all val is unique
 * - p != q and both will exist in the tree
 * - if both have a parent, return the parent
 * - if p has q in the tree, return the p, vice versa
 */

var lowestCommonAncestor = function (root, p, q) {
  let lca = root

  const DFS = node => {
    if (node == null) {
      return false
    }

    if (node === p || node === q) {
      lca = node
      return true
    }

    const left = DFS(node.left)
    const right = DFS(node.right)

    if (left && right) {
      lca = node
    }

    return left || right
  }

  DFS(root)
  return lca
}

var lowestCommonAncestor = function (root, p, q) {
  const DFS = node => {
    // if (node == null) {
    //   return null
    // }

    // if (node === p || node === q) {
    //   return node
    // }
    if (node == null || node === p || node === q) {
      return node
    }

    const left = DFS(node.left)
    const right = DFS(node.right)

    if (left && right) {
      return node
    }

    return left || right
  }

  return DFS(root)
}
