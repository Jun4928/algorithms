# Binary trees - BFS

- prioritise BREADTH
- In DFS, always tried to go down as far as it could
- In BFS, traverse **all nodes at a given depth before moving to the next depth**
- depth as **LEVEL**
- BFS is implemented iteratively with a queue
- it can be done with recursion, but a lot more difficult without any benefit

## When to use BFS vs DFS?

- In terms of binary tree algorithm problems, it is very rare to find a problem that using DFS is better than using BFS
- However, implementing DFS with recursion is easier and less code
- Usually, any problem to do with handling the nodes according to the level, it makes more sense to use BFS

## Disadvantages of each method

- **DFS**: with **huge** tree, you have to go down left side entirely, which could be hundreds of thousands.
  - Space: O(logN), perfect binary tree, the tree has a depth of logN
  - Space: O(N), a lopsided tree (a straight line)
- **BFS**: if the node we are searching for is near the bottom, will waste a lot of time searching through all the levels to reach the bottom
  - Space: O(N), perfect binary tree
  - Space: O(1), a lopsided tree (a straight line)

## Implementation with a queue

```js
let BFS = root => {
  let queue = [root]
  while (queue.length) {
    let nodesInCurrentLevel = queue.length
    let nextQueue = []

    // look at the nodes on the same level
    for (let i = 0; i < nodesInCurrentLevel; i++) {
      let node = queue[i]

      // do some logic here on the current node
      console.log(node.val)

      // put the next level onto the queue
      if (node.left) {
        nextQueue.push(node.left)
      }
      if (node.right) {
        nextQueue.push(node.right)
      }
    }

    queue = nextQueue // store next queue
  }
}
```

```js
let printAllNodes = root => {
  let queue = [root]
  while (queue.length) {
    let nextLevel = []
    for (const node of queue) {
      // do some logic with node
      console.log(node.val)

      if (node.left) {
        nextLevel.push(node.left)
      }

      if (node.right) {
        nextLevel.push(node.right)
      }
    }

    queue = nextLevel
  }
}
```

- JavaScript doesn't support a built-in efficient queue, the work-around is using a second array **nextQueue** to implement an efficient BFS
- **for loop**: look at the same nodes on the current level

## [Example 1: 199. Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view/)

```js
var rightSideView = function (root) {
  if (root == null) {
    return []
  }

  let queue = [root]
  let answer = []

  while (queue.length) {
    let nextQueue = []
    answer.push(queue[queue.length - 1].val) // the rightmost side node for the current level

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
```

- Space: O(N), the queue could hold up to O(N) nodes because it visits all nodes

## [Example 2: 515. Find Largest Value in Each Tree Row](https://leetcode.com/problems/find-largest-value-in-each-tree-row/description/)

```js
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
```

- Time: O(N)
- Space: O(N)
