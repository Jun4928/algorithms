/**
https://leetcode.com/problems/reduce-array-size-to-the-half/description/
1338. Reduce Array Size to The Half
 * @param {number[]} arr
 * @return {number}
 */
var minSetSize = function (arr) {
  const freq = new Map()
  for (const num of arr) {
    freq.set(num, (freq.get(num) ?? 0) + 1)
  }
  const byFreq = [...freq.entries()].sort((a, b) => (a[1] > b[1] ? -1 : 1))

  const half = arr.length / 2
  let left = arr.length
  let pick = 0

  for (let i = 0; i < byFreq.length; i++) {
    left -= byFreq[i][1]
    pick++

    if (left <= half) {
      return pick
    }
  }

  return pick
}

/**
 *
 * Time: O(N * logN) to sort
 * Space: O(N) to build a hash map
 *
 */
