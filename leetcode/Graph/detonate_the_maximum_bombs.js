/**
 * https://leetcode.com/problems/detonate-the-maximum-bombs/description/
 * 2101. Detonate the Maximum Bombs
 *
 * @param {number[][]} bombs
 * @return {number}
 */
var maximumDetonation = function (bombs) {
  const isInTheZone = (origin, target) => {
    const [x, y, r] = origin
    const [tX, tY] = target
    const distance = Math.sqrt(Math.pow(tX - x, 2) + Math.pow(tY - y, 2))
    return distance <= r
  }

  const denotes = bombs.map((_, idx) => [idx, []])
  const graph = new Map(denotes)
  bombs.forEach((origin, originIdx) => {
    bombs.forEach((target, targetIdx) => {
      if (targetIdx !== originIdx && isInTheZone(origin, target)) {
        graph.get(originIdx).push(targetIdx)
      }
    })
  })

  const DFS = (node, seen) => {
    const inTheZone = graph.get(node) ?? []
    if (inTheZone.length === 0) {
      return seen.size
    }

    for (const target of inTheZone) {
      if (!seen.has(target)) {
        seen.add(target)
        DFS(target, seen)
      }
    }

    return seen.size
  }

  return Math.max(...denotes.map(([node]) => DFS(node, new Set([node]))))
}
