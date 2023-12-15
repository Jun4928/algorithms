# Graphs - BFS

- In many graph problems, it doesn't really matter if I choose DFS or BFS
- there are rarely scenarios where DFS is better than BFS, but DFS is faster/cleaner to implement, recursively
- when finding _shortest path_, BFS is clearly better, the case when tree levels should be concerned
- BFS visits the nodes _according to their distance from the root_ in trees
- In graphs, **starting point**, **every time it visits a node**, must have reached it in the minimum steps possible
  - In graphs, there could be many paths from a given starting point to any other node
  - BFS will ensure that ouf of all possible paths, **take the shortest one**

## [Example 1: 1091. Shortest Path in Binary Matrix](https://leetcode.com/problems/shortest-path-in-binary-matrix/)

```js
var shortestPathBinaryMatrix = function (grid) {
  const end = grid.length - 1
  if (grid[0][0] === 1 || grid[end][end] === 1) {
    return -1
  }

  let queue = [[0, 0]]
  let seen = [...Array(grid.length)].map(_ => Array(grid.length).fill(false))
  seen[0][0] = true

  let level = 0
  const notSafe = (row, col) => row < 0 || col < 0 || row > end || col > end
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ]

  while (queue.length) {
    level += 1
    const nextQueue = []

    for (const [row, col] of queue) {
      if (row === end && col === end) {
        return level
      }

      for (const [dx, dy] of directions) {
        const x = row + dx
        const y = col + dy
        if (!notSafe(x, y) && !seen[x][y] && grid[x][y] === 0) {
          seen[x][y] = true
          nextQueue.push([x, y])
        }
      }
    }

    queue = nextQueue
  }

  return -1
}
```

- treat the matrix as a graph where each square is a node
- With BFS, every time visiting a node, it is guaranteed that it reached the node in the fewest steps possible
- Time: O(N^2), equal to the number of nodes
- Space: O(N^2) as _seen_ can grow to the size
- when iterating neighbors, check the _seen_ and add it to the _queue_

## [Example 2: 863. All Nodes Distance K in Binary Tree](https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/)

```js
var distanceK = function (root, target, k) {
  const graph = new Map()
  const DFS = (node, parent) => {
    if (node == null) {
      return
    }

    const curr = node.val
    if (parent != null) {
      if (!graph.has(curr)) {
        graph.set(curr, [])
      }
      graph.get(curr).push(parent)

      if (!graph.has(parent)) {
        graph.set(parent, [])
      }
      graph.get(parent).push(curr)
    }

    DFS(node.left, curr)
    DFS(node.right, curr)
  }
  DFS(root, null)

  const seen = new Set([target.val])
  let queue = [target.val]
  let level = 0
  while (queue.length) {
    if (level === k) {
      return queue
    }

    level += 1
    const nextLevel = []
    for (const node of queue) {
      const connected = graph.get(node) ?? []
      for (const next of connected) {
        if (!seen.has(next)) {
          seen.add(next)
          nextLevel.push(next)
        }
      }
    }
    queue = nextLevel
  }

  return []
}
```

- In a binary tree, we can go only from parents to children
- convert the tree into a graph
- Both DFS and BFS perform constant work at each node
- Time: O(N), Space: O(N)

## [Example 3: 542. 01 Matrix](https://leetcode.com/problems/01-matrix/description/?source=submission-noac)

### O(M^2\*N^2): Runtime Error solution

```js
var updateMatrix = function (mat) {
  const rows = mat.length
  const columns = mat[0].length
  const notSafe = (row, col) =>
    row < 0 || col < 0 || row >= rows || col >= columns
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ]

  let seen = [...Array(rows)].map(_ => Array(columns).fill(false))
  const BFS = (row, col) => {
    let queue = [[row, col]]
    let level = 0
    while (queue.length) {
      const nextQueue = []
      for (const [currX, currY] of queue) {
        for (const [dx, dy] of directions) {
          const x = currX + dx
          const y = currY + dy

          if (notSafe(x, y)) {
            continue
          }

          if (mat[x][y] === 0) {
            mat[row][col] = level + 1
            return
          }

          nextQueue.push([x, y])
        }
      }

      queue = nextQueue
      level += 1
    }
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      if (mat[row][col] !== 0) {
        BFS(row, col)
      }
    }
  }

  return mat
}
```

- BFS from each 1 that stops until finding the first 0, very inefficient
- Time: **O(M^2\*N^2)**
  - each BFS costs _O(M\*N)_
  - _O(M\*N)_ for different BFS if the entire matrix is only 1, except for single 0 in a corner

### O(M\*N) solution

```js
var updateMatrix = function (mat) {
  const rows = mat.length
  const columns = mat[0].length
  const notSafe = (row, col) =>
    row < 0 || col < 0 || row >= rows || col >= columns
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ]

  let seen = [...Array(rows)].map(_ => Array(columns).fill(false))
  let queue = []
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      if (mat[row][col] === 0) {
        seen[row][col] = true
        queue.push([row, col])
      }
    }
  }

  let level = 0
  while (queue.length) {
    const nextQueue = []
    for (const [currX, currY] of queue) {
      mat[currX][currY] = level

      for (const [dx, dy] of directions) {
        const x = currX + dx
        const y = currY + dy

        if (!notSafe(x, y) && !seen[x][y]) {
          seen[x][y] = true
          nextQueue.push([x, y])
        }
      }
    }

    queue = nextQueue
    level += 1
  }

  return mat
}
```

- What if BFS starts from the zeros?, whenever encounters a one, the current level is the answer for that 1, _seen_ prevents the answer from being overridden
- Multiple nodes in the 0th level in the queue is also possible
  - I have only looked at problems where the 0th level ahd only one node
  - source is any node with a value of 0
  - each BFS iteration, the level is _the fewest steps possible_ from the source
- Time: O(M\*N), only visits each square once, does a constant amount of work each time
- Space: O(M\*N), _the queue_ and _seen_
