/**
 * https://leetcode.com/problems/number-of-provinces/description/
 * 547. Number of Provinces
 * 
 * @param {number[][]} isConnected
 * @return {number}

 a province is a group of directly or indirectly connected cities
 isConnected[i][j] = 1, i and j are directly connected
 isConnected[i][j] = 0, otherwise

 the total number of provinces

my solution
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
  const stack = [...graph.keys()]
  let provinces = 0
  while (stack.length) {
    const city = stack.pop()
    if (seen[city] === 1) {
      continue
    }
    seen[city] = 1

    const connected = graph.get(city)
    stack.push(...connected)

    const isProvince =
      connected.every(city => seen[city] == false) || connected.length === 0
    if (isProvince) {
      provinces += 1
    }
  }

  return provinces
}

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

/**
 *
 * DFS with recursion
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
