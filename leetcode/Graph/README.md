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

# Graphs

- graphs are part of everyday lives
