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

## [Example 4: 1293. Shortest Path in a Grid with Obstacles Elimination](https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination/)

```js
/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
var shortestPath = function (grid, k) {
  const rows = grid.length
  const cols = grid[0].length
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ]
  const notSafe = (x, y) => x < 0 || y < 0 || x >= rows || y >= cols

  const getStateKey = (row, col, left) => `${row}-${col}-${left}`
  const seen = new Set()
  let queue = [[0, 0, k]]
  seen.add(getStateKey(0, 0, k))
  let level = 0

  while (queue.length) {
    const nextLevel = []
    for (let [currX, currY, left] of queue) {
      if (currX === rows - 1 && currY === cols - 1) {
        return level
      }

      for (const [dx, dy] of directions) {
        const x = currX + dx
        const y = currY + dy
        if (notSafe(x, y)) {
          continue
        }

        if (grid[x][y] === 0) {
          const state = getStateKey(x, y, left)
          if (!seen.has(state)) {
            seen.add(state)
            nextLevel.push([x, y, left])
          }
        } else if (left > 0) {
          // when obstacles
          const state = getStateKey(x, y, left - 1)
          if (!seen.has(state)) {
            seen.add(state)
            nextLevel.push([x, y, left - 1])
          }
        }
      }
    }

    queue = nextLevel
    level += 1
  }

  return -1
}
```

- This idea of associating additional information with nodes is a very common and useful one
- use (row, col, left) pair as the key for the state
- I've just been using **seen** to avoid visiting the same node twice. In reality, **seen** prevents the logic from visiting the same _state_ twice
  - just looked at problems where _the node(ex. row, col)_ entirely describes the state
  - need to store **(node, left)** as state in _seen_
- I was wondering when to decide eliminate the obstacles?!
  - just do it on the same square when different _left_ count, because it has been reached from different situation, and can be used in the way to get the destination
- Time: O(M*N*K), _M*N*K_ states
- Space: O(M*N*K), _M*N*K_ states

## [Example 5: 1129. Shortest Path with Alternating Colors](https://leetcode.com/problems/shortest-path-with-alternating-colors/description/)

```js
/**
 * @param {number} n
 * @param {number[][]} redEdges
 * @param {number[][]} blueEdges
 * @return {number[]}
 */
var shortestAlternatingPaths = function (n, redEdges, blueEdges) {
  const reds = new Map()
  for (const [from, to] of redEdges) {
    if (!reds.has(from)) {
      reds.set(from, [])
    }
    reds.get(from).push(to)
  }
  const blues = new Map()
  for (const [from, to] of blueEdges) {
    if (!blues.has(from)) {
      blues.set(from, [])
    }
    blues.get(from).push(to)
  }

  const RED = `r`
  const BLUE = `b`
  let answer = Array(n).fill(-1)
  const getState = (node, color) => `${node}-${color}`
  let queue = [
    [0, RED],
    [0, BLUE],
  ]
  const seen = new Set(queue.map(([n, color]) => getState(n, color)))

  let level = 0
  while (queue.length) {
    const nextQueue = []

    for (const [curr, color] of queue) {
      answer[curr] = answer[curr] === -1 ? level : Math.min(answer[curr], level)

      if (color === RED) {
        for (const node of blues.get(curr) ?? []) {
          const state = getState(node, BLUE)
          if (!seen.has(state)) {
            seen.add(state)
            nextQueue.push([node, BLUE])
          }
        }
      } else if (color === BLUE) {
        for (const node of reds.get(curr) ?? []) {
          const state = getState(node, RED)
          if (!seen.has(state)) {
            seen.add(state)
            nextQueue.push([node, RED])
          }
        }
      }
    }

    queue = nextQueue
    level += 1
  }

  return answer
}
```

- start from 0 considering both colors `[0, RED], [0, BLUE]`
- so introduce new state variable `color` and the seen must remember `node-color` as the key of the state
- remember the previous color and check if **the state = node + opposite color** has been seen
- color is always 2 way
- Time: O(N + E), N nodes, E edges (total number of edges both colors)
- Space: O(N + E)
