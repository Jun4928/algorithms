/**
 * https://leetcode.com/problems/minimum-operations-to-halve-array-sum/
 * 2208. Minimum Operations to Halve Array Sum
 *
 * @param {number[]} nums
 * @return {number}
 */
var halveArray = function (nums) {
  const half = nums.reduce((a, b) => a + b, 0) / 2
  const pq = nums.reduce(
    (acc, curr) => {
      acc.enqueue(curr)
      return acc
    },
    new PriorityQueue({
      compare: (a, b) => {
        if (a > b) return -1
        return 1
      },
    })
  )

  let totalHalved = 0
  let operations = 0
  while (totalHalved < half) {
    const max = pq.dequeue()
    const halved = max / 2
    pq.enqueue(halved)

    totalHalved += halved
    operations += 1
  }

  return operations
}
