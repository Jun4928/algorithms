/**
 * https://leetcode.com/problems/minimum-genetic-mutation/description/
 * 433. Minimum Genetic Mutation
 *
 * @param {string} startGene
 * @param {string} endGene
 * @param {string[]} bank
 * @return {number}
 */
var minMutation = function (startGene, endGene, bank) {
  let queue = [startGene]
  const seen = new Set(queue)
  const allowed = new Set(bank)
  const genes = ['A', 'C', 'G', 'T']

  const mutations = gene => {
    return Array(8)
      .fill(gene)
      .flatMap((origin, idx) => {
        return genes.map(gene => {
          return `${origin.slice(0, idx)}${gene}${origin.slice(idx + 1)}`
        })
      })
  }

  let mutation = 0
  while (queue.length) {
    const nextQueue = []

    for (const curr of queue) {
      if (curr === endGene) {
        return mutation
      }

      const possibles = mutations(curr)
      for (const next of possibles) {
        if (!seen.has(next) && allowed.has(next)) {
          seen.add(next)
          nextQueue.push(next)
        }
      }
    }

    queue = nextQueue
    mutation += 1
  }

  return -1
}
