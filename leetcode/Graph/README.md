# Introduction

## Nodes and graphs

- the most common type
- trees and graphs are abstract data structures
- **Node** stores data(integer, boolean, hash map, custom objects) and pointers to other nodes
- **Graph** is any collection of nodes and their pointers to other nodes
- Linked Lists and trees are both types of graphs

## a tree

- a tree is a type of graph
- Trees are implemented in real-life
  - File systems
  - a comment thread
  - a company's organization chart
- **Binary Tree**
  - **root**: the start of a binary tree, has no **parent**
  - a node has pointers to its **children**
  - a node cannot have more than one parent
  - all nodes have a maximum of two children, **left** and **right**
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
- **directed**

  - you can only traverse in one direction
  - arrows between nodes
  - ex) binary tree, once reaching a child, can't move back to the parent

- **undirected**

  - you can traverse in both directions
  - straight lines between nodes

- **connected component**

  - a group of nodes that are connected by edges
  - in binary trees, there must only be one connected component because all nodes are reachable from the root

- **indegree** : the number of edges that can be used to **reach** the node
- **outdegree** : the number of edges that can be used to **leave** the node
- **neighbors**: the nodes that are connected by an edge
- In binary trees, all noes expect the root to have an in-degree of 1 (due to their parent). All nodes have an outdegree of 0, 1, or 2. An outdegree of 0 means that it is a leaf node

- A graph can be either cyclic or acyclic. Cyclic means the graph has a cycle, acyclic means it doesn't
- Binary trees by definition cannot have a cycle

## How are tey given in the problems?

- the **root** of the tree is given
- With Linked lists, Binary trees, given objects in memory that contain data and pointers
- With Graphs, the graph doesn't exist in memory
- In fact, the **idea** of the graph exists!
- IT IS UP TO ME TO FIGURE OUT HOW TO REPRESENT AND TRAVERSE THE GRAPH WITH CODE
- The problem may or may not explicitly state the input is graph

  - ex) "There are n cities labeled from 0 to n - 1"
  - each city as a node, each city has a unique label

- A node can have any number of neighbors

### 1. Array of Edges

- with a stroy for edges like cities
- _[[0, 1], [1, 2], [2, 0], [2, 3]]_, it exists only as an idea derived from array

```js
let buildGraph = edges => {
  let graph = new Map()
  for (const [x, y] of edges) {
    if (!graph.has(x)) {
      graph.set(x, [])
    }

    graph.get(x).push(y)

    // if (!graph.has(y)) {
    //     graph.set(y, []);
    // }

    // graph.get(y).push(x);
    // uncomment the above lines if the graph is undirected
  }
}
```

### 2. Adjacency list

- the nodes will be numbered from _0 to n - 1_
- **graph[i]** is a list of all the outgoing edges from ith node
- don't need to do any pre-processing

### 3. Adjacency matrix

- **graph[i][j] == 1**, there is an outgoing edge from node i to node j
- Build a hash map and then iterate over the entire graph.
- **graph[i][j] == 1**, put j in the list associated with graph[i]
- O(N^2)

### 4. matrix

- with a story, each square will represent something, the squares connected in some way
- _(row, col)_ of the matrix is a node
- **the neighbors**: _(row - 1, col), (row, col - 1), (row + 1, col), (row, col + 1)_

## Differences between graphs and trees

- Graph needs a set named **seen**, it checks if this node has been seen or not to visit only once
- without **seen**, DFS recursively will go infinite cycle
- this isn't necessary with trees because only moved **down** - once left, there's no way to get back, but graphs have _A<->B_ relationship
- array much better in speed for seen if the range is known, _(0 to n - 1)_

# Implicit Graphs

## [Example 1: 752. Open the Lock](https://leetcode.com/problems/open-the-lock/description/)

```js
var openLock = function (deadends, target) {
  const possibilities = [
    [0, 1],
    [1, 1],
    [2, 1],
    [3, 1],
    [0, -1],
    [1, -1],
    [2, -1],
    [3, -1],
  ]

  const wheel = (num, way) => {
    return (Number(num) + way + 10) % 10
  }

  const getPossibles = number => {
    return possibilities.map(([idx, way]) => {
      return `${number.slice(0, idx)}${wheel(number[idx], way)}${number.slice(
        idx + 1
      )}`
    })
  }

  let seen = new Set(deadends)
  if (seen.has('0000')) {
    return -1
  }

  let queue = ['0000']
  seen.add('0000')
  let moves = 0

  while (queue.length) {
    const nextQueue = []

    for (const curr of queue) {
      if (curr === target) {
        return moves
      }

      const possibles = getPossibles(curr)
      for (const next of possibles) {
        if (!seen.has(next)) {
          seen.add(next)
          nextQueue.push(next)
        }
      }
    }

    queue = nextQueue
    moves += 1
  }

  return -1
}
```

- deadends can just set as _seen_, because it is blocked means it has been seen and cannot be reached
- At each state, O(N^2 + D): loop over the n slots while performing string concatenation, O(N) for immutable strings, D is _deadends.length_ into a set

## Example 2: 399. Evaluate Division

```js
var calcEquation = function (equations, values, queries) {
  const graph = new Map()
  const characters = new Set()
  equations.forEach(([a, b], idx) => {
    const value = values[idx]
    if (!graph.has(a)) {
      graph.set(a, [])
    }
    graph.get(a).push([b, value])

    if (!graph.has(b)) {
      graph.set(b, [])
    }
    graph.get(b).push([a, 1 / value])

    characters.add(a)
    characters.add(b)
  })

  const DFS = (c, d, acc, seen) => {
    const neighbors = graph.get(c)
    let answer = -1
    for (const [next, value] of neighbors) {
      if (next === d) {
        return acc * value
      } else if (!seen.has(next)) {
        seen.add(next)
        answer = Math.max(answer, DFS(next, d, value * acc, seen))
      }
    }
    return answer
  }

  return queries.map(([c, d]) => {
    if (!characters.has(c) || !characters.has(d)) {
      return -1
    } else if (c === d) {
      return 1
    }

    return DFS(c, d, 1, new Set([c]))
  })
}
```

- a weight is a value associated with an edge
- the edges are provided in `equations`, and the weights are provided in `values`
- edges are undirected
- Time: O(Q \* (N + E))
  - Q: the length of queries to iterate
  - N: the number of nodes
  - E: the number of edges
- Space: O(N + E), building _graph_, _seen_, and the recursion call stack
