# Introduction

## Nodes and graphs

- the most common type
- trees and graphs are abstract data structures
- **Node** stores data(integer, boolean, hash map, custom objects) and pointers to other nodes
- **Graph** is any collection of nodes and their pointers to other nodes
- Linked Lists and trees are both types of graphs

## a tree

- a tree is a type of graph
- Trees are implemented in real life
  - File systems
  - a comment thread
  - a company's organization chart
- **Binary Tree**
  - **root**: the start of a binary tree, has no **parent**
  - a node has pointers to its **children**
  - a node cannot have more than one parent
  - all nodes have a maximum two children, **left** and **right**
  - children: 0 ~ 2

## Terminology

- **root**: top of the tree
- A -> B: A is **parent**, B is **child**
- if a node has no children, it is **leaf** node
- **depth**: is how far a node is from the root node
- the root has 0, every child has a depth of **parentDepth + 1**
- if a node has node children, it is a **leaf** node
- **subtree**
  - a node and all its descendants
  - **take any given node and treat it as its own tree**, solving problems in a recursive way

```js
class TreeNode {
  constructor(val) {
    this.val = val
    this.left = null
    this.right = null
  }
}
```

---

# Binary Trees - DFS

- priorities depth by traversing as far down the tree as possible in one direction (til reaching a **leaf** node) before considering the other direction
- DFS chooses a branch and goes as far down as possible
- Once it fully explores the branch, it **backtracks** until it finds another unexplored branch
- DFS is typically implemented using **recursion**, it is also sometimes done iteratively using a stack

```js
let dfs = node => {
  if (!node) {
    // recursion ending condition = base case
    return
  }

  dfs(node.left)
  dfs(node.right)
  return
}
```

1. handle base case
2. do some logic for the current node
3. recursively call on the current node's children
4. return the answer

- 2 and 3 may happen in different orders
- **each function call solves and returns the answer to the original problem as if the subtree rooted at the current node was the input**
- subtree is the input and recursion

## Preorder

![Image](https://leetcode.com/explore/featured/card/leetcodes-interview-crash-course-data-structures-and-algorithms/707/traversals-trees-graphs/Figures/DSA/Chapter_5/25_1.png)

```js
let preorderDfs = node => {
  if (!node) {
    return
  }

  console.log(node.val)
  preorderDfs(node.left)
  preorderDfs(node.right)
  return
}
```

- `0, 1, 3, 4, 6, 2, 5`

## Inorder

```js
let inorderDfs = node => {
  if (!node) {
    return
  }

  inorderDfs(node.left)
  console.log(node.val)
  inorderDfs(node.right)
  return
}
```

- `3, 1, 4, 6, 0, 2, 5`

## Postorder

```js
let postorderDfs = node => {
  if (!node) {
    return
  }

  postorderDfs(node.left)
  postorderDfs(node.right)
  console.log(node.val)
  return
}
```

- `3, 6, 4, 1, 5, 2, 0`

> Pre -> before children
> In -> in the middle of children
> Post -> after children

## [Example 1: 104. Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)

```js
var maxDepth = function (root) {
  if (root == null) {
    return 0
  }

  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
}
```

- each function call stores its own variables
- every node has its own unique values of **left** and **right**, which would be roots of the subtrees

**iterative implementation**

```js

```

---
