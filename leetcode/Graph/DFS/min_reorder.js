/**
 * https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/
 * 1466. Reorder Routes to Make All Paths Lead to the City Zero
 *
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 0 to n - 1 cities, n - 1 roads
 connections[i] = [a, b], a road from city a to city b
 one direction
 capital: city 0, many people want to come to this
 task: reorientating some roads that each city can visit the city 0
 return the minimum number of edges changes (roads changed)
 guaranteed that each city can reach city 0 after reorder
 */
var minReorder = function (n, connections) {
  const oneway = new Map()
  const bi = new Map()
  for (const [from, to] of connections) {
    if (!oneway.has(from)) {
      oneway.set(from, [])
    }
    oneway.get(from).push(to)

    if (!bi.has(from)) {
      bi.set(from, [])
    }
    bi.get(from).push(to)

    if (!bi.has(to)) {
      bi.set(to, [])
    }
    bi.get(to).push(from)
  }

  let seen = Array(n).fill(false)
  let constructed = 0
  const rebuild = origin => {
    seen[origin] = true
    const unseen = bi.get(origin).filter(city => seen[city] == false)
    if (unseen.length === 0) {
      return
    }

    for (const city of unseen) {
      const canReach = oneway.get(city)?.includes(origin)
      if (!canReach) {
        constructed += 1
      }
      rebuild(city)
    }
  }

  seen[0] = true
  rebuild(0)
  return constructed
}

/**
 *
 * one way using set
 */
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
