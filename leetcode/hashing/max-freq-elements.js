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

  return [...m.values()]
    .sort((a, b) => {
      if (a > b) {
        return 1
      } else if (a < b) {
        return -1
      }

      return 0
    })
    .filter(v => v === max)
    .reduce((a, b) => a + b, 0)
}
