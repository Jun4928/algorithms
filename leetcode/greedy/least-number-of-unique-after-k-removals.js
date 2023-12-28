/**
https://leetcode.com/problems/least-number-of-unique-integers-after-k-removals/
1481. Least Number of Unique Integers after K Removals

 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var findLeastNumOfUniqueInts = function (arr, k) {
  const freq = new Map()
  for (const num of arr) {
    if (!freq.has(num)) {
      freq.set(num, 0)
    }
    freq.set(num, freq.get(num) + 1)
  }
  const minHeap = new PriorityQueue({
    compare: (a, b) => {
      if (a[1] < b[1]) {
        return -1
      } else if (a[1] === b[1]) {
        return a[0] < b[0] ? -1 : 1
      } else {
        return 1
      }
    },
  })

  for (const [num, f] of freq.entries()) {
    let i = 0
    while (i < f) {
      minHeap.enqueue([num, f])
      i += 1
    }
  }

  let del = 0
  while (del < k) {
    minHeap.dequeue()
    del += 1
  }

  const set = minHeap.toArray().reduce((acc, [num]) => {
    acc.add(num)
    return acc
  }, new Set())

  return set.size
}

/**
https://leetcode.com/problems/least-number-of-unique-integers-after-k-removals/
1481. Least Number of Unique Integers after K Removals

 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var findLeastNumOfUniqueInts = function (arr, k) {
  const freq = new Map()
  for (const num of arr) {
    if (!freq.has(num)) {
      freq.set(num, 0)
    }
    freq.set(num, freq.get(num) + 1)
  }

  let ordered = [...freq.values()].sort((a, b) => (a > b ? -1 : 1))
  let removal = 0

  while (removal < k) {
    let head = ordered.at(-1)
    while (head > 0) {
      head -= 1
      removal += 1

      if (head === 0) {
        ordered.pop()
      }

      if (removal === k) {
        break
      }
    }
  }

  return ordered.length
}
