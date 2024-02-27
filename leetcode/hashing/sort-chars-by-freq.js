/**
https://leetcode.com/problems/sort-characters-by-frequency/
451. Sort Characters By Frequency

 * @param {string} s
 * @return {string}
 */
var frequencySort = function (s) {
  const m = new Map()
  for (const c of s) {
    m.set(c, (m.get(c) ?? 0) + 1)
  }

  return [...m.entries()]
    .sort((a, b) => b[1] - a[1])
    .reduce((acc, [c, freq]) => {
      acc += c.repeat(freq)
      return acc
    }, '')
}
