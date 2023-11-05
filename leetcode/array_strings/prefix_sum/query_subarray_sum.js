/**
 *
 * @param {number[]} nums
 * @param {number[][]} queries
 * @param {number} limit
 *
 * @return {boolean[]}
 */
function querySubArraySum(nums, queries, limit) {
  let acc = 0
  const prefixSum = nums.map(n => (acc += n))

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
