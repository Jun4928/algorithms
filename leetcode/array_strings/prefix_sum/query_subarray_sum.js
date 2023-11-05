/**
 *
 * @param {number[]} nums
 * @param {number[][]} queries
 * @param {number} limit
 *
 * @return {boolean[]}
 */
function querySubArraySum(nums, queries, limit) {
  const prefixSum = nums.reduce((acc, curr, idx) => {
    acc.push((acc[idx - 1] ?? 0) + curr)
    return acc
  }, [])

  return queries.map(query => {
    const [i, j] = query
    const subSum = prefixSum[j] - prefixSum[i] + nums[i]

    if (subSum < limit) {
      return true
    }

    return false
  })
}

module.exports = { querySubArraySum }
