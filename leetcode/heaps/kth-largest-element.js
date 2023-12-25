/**
https://leetcode.com/problems/kth-largest-element-in-an-array/description/
215. Kth Largest Element in an Array
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  const minHeap = new PriorityQueue({ compare: (a, b) => (a < b ? -1 : 1) })

  for (const num of nums) {
    minHeap.enqueue(num)
    if (minHeap.size() > k) {
      minHeap.dequeue()
    }
  }

  return minHeap.front()
}
