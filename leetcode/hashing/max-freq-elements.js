/**
 * @param {number[]} nums
 * @return {number}
 */
var maxFrequencyElements = function (nums) {
  const m = new Map()
  let max = 0
  for (const num of nums) {
    m.set(num, (m.get(num) ?? 0) + 1)
    max = Math.max(max, m.get(num))
  }

  return [...m.values()].filter(v => v === max).reduce((a, b) => a + b, 0)
}
