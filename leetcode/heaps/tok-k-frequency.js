/**
https://leetcode.com/problems/top-k-frequent-elements/
347. Top K Frequent Elements

 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 * 
 * O (N * logN): sorting
 */
var topKFrequent = function (nums, k) {
  const frequency = new Map()
  for (const num of nums) {
    if (!frequency.has(num)) {
      frequency.set(num, 0)
    }
    frequency.set(num, frequency.get(num) + 1)
  }

  return [...frequency.entries()]
    .sort((a, b) => {
      if (a[1] > b[1]) return -1
      return 1
    })
    .map(([val]) => val)
    .slice(0, k)
}

/**
 * using min heap, when the size is over the K limit
 * then removes the minimum value
 *
 * O(N * logK), because the heap size is just K
 * means O(logK) for heap add and remove
 *
 */
var topKFrequent = function (nums, k) {
  const frequency = new Map()
  for (const num of nums) {
    if (!frequency.has(num)) {
      frequency.set(num, 0)
    }
    frequency.set(num, frequency.get(num) + 1)
  }

  const minHeap = new PriorityQueue({
    compare: (a, b) => {
      if (a[1] > b[1]) return 1
      return -1
    },
  })

  for (const freq of frequency.entries()) {
    minHeap.enqueue(freq)
    if (minHeap.size() > k) {
      minHeap.dequeue()
    }
  }

  return minHeap.toArray().map(([v]) => v)
}
