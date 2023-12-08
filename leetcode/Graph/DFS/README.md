## [Example 1: 547. Number of Provinces](https://leetcode.com/problems/number-of-provinces/)

### stack

```js
/**
 *
 * DFS with stack
 */
var findCircleNum = function (isConnected) {
  const graph = new Map()
  isConnected.forEach((cities, i) => {
    cities.forEach((connected, j) => {
      if (connected === 1) {
        if (!graph.has(i)) {
          graph.set(i, [])
        }

        if (i !== j) {
          graph.get(i).push(j)
        }
      }
    })
  })

  let seen = new Array(isConnected.length).fill(false)
  const DFS = node => {
    let stack = [node]
    while (stack.length) {
      const city = stack.pop()
      seen[city] = true
      for (const neighbor of graph.get(city)) {
        if (seen[neighbor] == false) {
          seen[neighbor] = true
          stack.push(neighbor)
        }
      }
    }
  }

  let provinces = 0
  for (let city = 0; city < isConnected.length; city++) {
    if (seen[city] == false) {
      provinces += 1
      DFS(city)
    }
  }

  return provinces
}
```

### Recursion

```js
var findCircleNum = function (isConnected) {
  const graph = new Map()
  isConnected.forEach((cities, i) => {
    cities.forEach((connected, j) => {
      if (connected === 1) {
        if (!graph.has(i)) {
          graph.set(i, [])
        }

        if (i !== j) {
          graph.get(i).push(j)
        }
      }
    })
  })

  let seen = new Array(isConnected.length).fill(false)
  const DFS = node => {
    seen[node] = true
    for (const neighbor of graph.get(node)) {
      if (seen[neighbor] == false) {
        seen[neighbor] = true
        DFS(neighbor)
      }
    }

    return
  }

  let provinces = 0
  for (let city = 0; city < isConnected.length; city++) {
    if (seen[city] == false) {
      provinces += 1
      DFS(city)
    }
  }

  return provinces
}
```

- to avoid cycles with undirected graphs, use a set _seen_ to track if the node has already been visited
- DFS will visit all the nodes connected to a node
- at each iteration, if a node has not been seen, it is another province
- With a graph, a node could have any amount of neighbors, so a loop needed
- DFS
  - Time: O(N+E), N is the number of nodes and E is the number of edges
  - worst case: every node is connected with every other node, E = N^2
  - each node is visited only once
  - iterating => O(N), and a node's edges are only iterated over once, O(E)
- In this problem, to build a hash map from adjacency matrix
  - Time: O(N^2)
  - Space: O(N+E), for recursion stack and seen

## [Example 2: 200. Number of Islands](https://leetcode.com/problems/number-of-islands/)

```js
var numIslands = function (grid) {
  const LAND = '1'
  const WATER = '0'
  const VISITED = '-1'

  const rows = grid.length
  const columns = grid[0].length

  const DFS = (i, j) => {
    const notSafe = (i, j) => i < 0 || i >= rows || j < 0 || j >= columns
    // not safe, water, visited just end the search
    if (notSafe(i, j) || grid[i][j] === WATER || grid[i][j] === VISITED) {
      return
    }

    grid[i][j] = VISITED // mark the current point as VISITED
    DFS(i - 1, j)
    DFS(i, j - 1)
    DFS(i + 1, j)
    DFS(i, j + 1)
  }

  let lands = 0
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (grid[i][j] === LAND) {
        // when reaches land start the search
        lands += 1
        DFS(i, j)
      }
    }
  }

  return lands
}

var numIslands = function (grid) {
  const LAND = '1'
  const WATER = '0'
  const rows = grid.length
  const columns = grid[0].length

  let seen = [...Array(rows)].map(_ => Array(columns).fill(false))
  const DFS = (i, j) => {
    const notSafe = (i, j) => i < 0 || i >= rows || j < 0 || j >= columns
    if (notSafe(i, j) || grid[i][j] === WATER || seen[i][j] == true) {
      return
    }

    seen[i][j] = true
    const directions = [
      [i - 1, j],
      [i, j - 1],
      [i + 1, j],
      [i, j + 1],
    ]
    for (const [i, j] of directions) {
      DFS(i, j)
    }
  }

  let lands = 0
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (grid[i][j] === LAND && seen[i][j] == false) {
        lands += 1
        DFS(i, j)
      }
    }
  }

  return lands
}
```

- directions in four way
- can avoid using the set by modifying the input
- some interviewers may not want me to modify the input
- especially if it is something passed by reference like an array => it modifies the input array
- Time: O(N+E), at most 4 edges, which is constant so finally, O(M\*N), M is rows, N is columns

## [Example 3: 1466. Reorder Routes to Make All Paths Lead to the City Zero](https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/)

```js
var minReorder = function (n, connections) {
  const roadHash = (from, to) => `${from}-${to}`
  const roads = new Set()
  const graph = new Map()
  for (const [from, to] of connections) {
    if (!graph.has(from)) {
      graph.set(from, [])
    }
    graph.get(from).push(to)

    if (!graph.has(to)) {
      graph.set(to, [])
    }
    graph.get(to).push(from)

    roads.add(roadHash(from, to))
  }

  let seen = Array(n).fill(false)
  let constructed = 0
  const rebuild = origin => {
    seen[origin] = true
    const unseen = graph.get(origin).filter(city => seen[city] == false)
    if (unseen.length === 0) {
      return
    }

    for (const city of unseen) {
      // needs rebuilding because, there's only one way, city must have a road to origin
      if (roads.has(roadHash(origin, city))) {
        constructed += 1
      }
      rebuild(city)
    }
  }

  seen[0] = true
  rebuild(0)
  return constructed
}
```

- Time: O(N), only visit each node once, do constant work
- Space: O(N), **roads**, **graph**, **seen** are all at most O(N) space
- The point
  - Although it is a directed graph, convert it into an undirected so that we can reach all nodes from _the capital 0_
  - when there's no unseen cities it is a leaf node, just return
  - if _roads(set)_ has _a road from origin to city_, this means it needs reconstruction because there's no way to get back to origin from the city we're going to traverse!
  - since we started from _0_, _seen_ needs to prevent revisiting cities
