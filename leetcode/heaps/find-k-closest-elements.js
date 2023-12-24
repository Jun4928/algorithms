/**
https://leetcode.com/problems/find-k-closest-elements/
658. Find K Closest Elements

 * @param {number[]} arr
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
var findClosestElements = function (arr, k, x) {
  const maxHeap = new PriorityQueue({
    compare: (a, b) => {
      const first = Math.abs(a - x)
      const second = Math.abs(b - x)

      if (first === second) {
        return a > b ? -1 : 1
      }

      return first > second ? -1 : 1
    },
  })

  for (const num of arr) {
    maxHeap.enqueue(num)
    if (maxHeap.size() > k) {
      maxHeap.dequeue()
    }
  }

  return maxHeap.toArray().sort((a, b) => (a < b ? -1 : 1))
}
