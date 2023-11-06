/**
 * url: https://leetcode.com/problems/k-radius-subarray-averages/description/
 *
 * # 2090 K Radius Subarray Averages
 *
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var getAverages = function (nums, k) {
  const len = nums.length
  let acc = 0
  const prefixSum = nums.map(n => {
    acc += n
    return acc
  })

  let radiusAverage = nums.map(_ => -1)
  for (let idx = k; idx < len - k; idx++) {
    const j = idx + k
    const i = idx - k
    const subarraySum = prefixSum[j] - prefixSum[i] + nums[i]
    radiusAverage[idx] = Math.floor(subarraySum / (2 * k + 1))
  }

  return radiusAverage
}

module.exports = { getAverages }
