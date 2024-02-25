/**
 * @param {number[]} nums
 * @return {number}
 */
var sumOfUnique = function (nums) {
  const m = new Map()
  for (const num of nums) {
    m.set(num, (m.get(num) ?? 0) + 1)
  }

  return [...m.entries()]
    .filter(([k, v]) => v === 1)
    .map(([k]) => k)
    .reduce((a, b) => a + b, 0)
}
