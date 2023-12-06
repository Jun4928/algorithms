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
var maxDepthWithStack = function (root) {
  if (root == null) {
    return 0
  }

  let maxDepth = 0
  const stack = [{ node: root, depth: 1 }]
  while (stack.length) {
    const { node, depth } = stack.pop()
    maxDepth = Math.max(maxDepth, depth)

    if (node.right) {
      stack.push({ node: node.right, depth: depth + 1 })
    }

    if (node.left) {
      stack.push({ node: node.left, depth: depth + 1 })
    }
  }

  return maxDepth
}
```

- the depth of the children will be `depth + 1`
- in each iteration, it handles single node - equivalent to the recursive implementation
- the thing is, we use stack, which pops the last in, so it iterates the left one with the above example
- compare the maximum value at each iteration, when handling every single node, like done in the recursive call

## [Example 2: 112. Path Sum](https://leetcode.com/problems/path-sum/)

```js
var hasPathSum = function (root, targetSum) {
  const DFS = (node, sum) => {
    if (node == null) {
      return false
    }

    // ending condition is when both children all null, the node is a leaf
    if (!node.left && !node.right) {
      return sum + node.val === targetSum
    }

    const left = DFS(node.left, sum + node.val)
    const right = DFS(node.right, sum + node.val)
    return left || right
  }

  return DFS(root, 0)
}

var hasPathSumWithStack = function (root, targetSum) {
  if (root == null) {
    return false
  }

  const stack = [[root, 0]]
  while (stack.length) {
    const [node, sum] = stack.pop()
    if (!node.left && !node.right) {
      if (sum + node.val === targetSum) {
        return true // when found the target, just return true
      }
    }

    if (node.left) {
      stack.push([node.left, sum + node.val])
    }

    if (node.right) {
      stack.push([node.right, sum + node.val])
    }
  }

  return false
}
```

- Time: O(N), call stack
- Space: O(N), stack all visited
- in the worst case scenario for space, the recursion call stack will grow to the same size as the number of nodes

## [Example 3: 1448. Count Good Nodes in Binary Tree](https://leetcode.com/problems/count-good-nodes-in-binary-tree/)

```js
var goodNodes = function (root) {
  let count = 0
  const DFS = (node, prevMax) => {
    if (node == null) {
      return
    }

    if (node.val >= prevMax) {
      count += 1
    }

    DFS(node.left, Math.max(prevMax, node.val))
    DFS(node.right, Math.max(prevMax, node.val))
    return
  }

  DFS(root, root.val)
  return count
}

var goodNodesWithStack = function (root) {
  if (root == null) {
    return 0
  }

  let count = 0
  const stack = [[root, root.val]]

  while (stack.length) {
    const [node, prevMax] = stack.pop()
    if (node.val >= prevMax) {
      count += 1
    }

    if (node.left) {
      stack.push([node.left, Math.max(prevMax, node.val)])
    }

    if (node.right) {
      stack.push([node.right, Math.max(prevMax, node.val)])
    }
  }

  return count
}
```

- Time: O(N)
- Space: O(N)

## [Example 4: 100. Same Tree](https://leetcode.com/problems/same-tree/)

```js
var isSameTree = function (p, q) {
  const DFS = (a, b) => {
    if (a == null && b == null) {
      return true
    }

    if (a == null || b == null) {
      return false
    }

    const left = DFS(a.left, b.left)
    const right = DFS(a.right, b.right)
    return left && right && a.val === b.val
  }

  return DFS(p, q)
}

var isSameTreeWithStack = function (p, q) {
  const stack = [[p, q]]
  while (stack.length) {
    const [a, b] = stack.pop()
    if (a == null && b == null) {
      continue
    }

    if (a == null || b == null) {
      return false
    }

    if (a.val !== b.val) {
      return false
    }

    stack.push([a.left, b.left])
    stack.push([a.right, b.right])
  }

  return true
}
```

- Time: O(N)
- Space: O(N)

## [Bonus Example 236. Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)

```js
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
```

- if the node is p or q, return right away
- if both left and right branches have p and q in each other one, return the node right away
- otherwise, use **||** operator to return which branch has p or q

- I did with boolean flag, use the trait of **||** operator
- Time: O(N), each node is visited at most once and O(1) at each node
- Space: O(N), the recursion call stack could use up to O(N) space
