/**
 * @param {number[]} arr
 * @return {number}
 */
var findLucky = function (arr) {
  const m = new Map()
  for (const num of arr) {
    m.set(num, (m.get(num) ?? 0) + 1)
  }

  return (
    [...m.entries()]
      .filter(([k, v]) => k === v)
      .map(([k]) => k)
      .sort((a, b) => b - a)
      .at(0) ?? -1
  )
}
