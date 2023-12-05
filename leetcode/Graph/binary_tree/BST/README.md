# Binary Search Tree

- is a type of binary tree, but with certain rules

1. **All values in the left subtree are less than the value in the node**
2. **All values in the right subtree are greater than the value in the node**
3. **All values must be unique**

- O(logN): searching, adding, removing, using **binary search**
- a tree that had no right children and is just a straight line, the worst case O(N)

> Inorder DFS traversal prioritizing left before right in sorted orders

## Example 1: 938. Range Sum of BST

```js
var rangeSumBST = function (root, low, high) {
  const DFS = node => {
    let sum = 0
    if (node == null) {
      return sum
    }

    if (node.val >= low && node.val <= high) {
      sum += node.val
    }

    // otherwise pointless!
    if (node.val > low) {
      sum += DFS(node.left)
    }

    if (node.val < high) {
      sum += DFS(node.right)
    }

    return sum
  }

  return DFS(root)
}
```

- Time: O(N) for the worst case, but on average this will perform better than visiting all nodes
- Space: O(N), recursion call stack

## [Example 2: 530. Minimum Absolute Difference in BST](https://leetcode.com/problems/minimum-absolute-difference-in-bst/)

```js
var getMinimumDifference = function (root) {
  let prev = null
  let minDiff = Infinity

  const DFS = node => {
    if (node == null) {
      return
    }

    DFS(node.left)

    // visit binary search using inorder: visit all values in sorted-order
    if (prev != null) {
      minDiff = Math.min(minDiff, node.val - prev)
    }
    prev = node.val

    DFS(node.right)
    return
  }

  DFS(root)

  return minDiff
}
```

- Time: O(N)
- Space: O(N)
- able to get the values in sorted order in leaner time by taking advantage of the Binary Search Tree, with in-order DFS
- `[2, 1, 3]`: 1, 2, 3 in order DFS, we can get the nodes in sorted order without the O(N\*logN) sort, just O(N)

## [Example 3: 98. Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/)

```js
var isValidBST = function (root) {
  const DFS = (node, small, large) => {
    if (node == null) {
      return true
    }

    // check current is in range
    if (small >= node.val || node.val >= large) {
      return false
    }

    let left = DFS(node.left, small, node.val) // in BST, current should be larger than left
    let right = DFS(node.right, node.val, large) // in BST, current should be smaller than right
    return left && right
  }

  return DFS(root, -Infinity, Infinity)
}
```

- a tree is BFS, if subtrees are also BST
- Time: O(N)
- Space: O(N)
