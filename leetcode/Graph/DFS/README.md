## Example 1: 547. Number of Provinces

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
      seen[city] = true
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
      seen[city] = true
      DFS(city)
    }
  }

  return provinces
}
```