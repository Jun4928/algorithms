/**
 * @param {number[]} arr
 * @return {boolean}
 */
var uniqueOccurrences = function (arr) {
  const m = new Map()
  for (const num of arr) {
    m.set(num, (m.get(num) ?? 0) + 1)
  }
  const values = [...m.values()]
  return values.length === new Set(values).size
}
