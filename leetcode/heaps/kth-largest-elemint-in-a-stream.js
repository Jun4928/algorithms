/**
https://leetcode.com/problems/kth-largest-element-in-a-stream/description/
703. Kth Largest Element in a Stream
 * @param {number} k
 * @param {number[]} nums
 */
var KthLargest = function (k, nums) {
  nums.sort((a, b) => (a > b ? -1 : 1))
  this.limit = k
  this.minHeap = new PriorityQueue({ compare: (a, b) => (a < b ? -1 : 1) })

  let idx = 0
  while (idx < this.limit) {
    this.minHeap.enqueue(nums[idx] ?? -Infinity)
    idx++
  }
}

/**
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function (val) {
  this.minHeap.enqueue(val)
  this.minHeap.dequeue()
  return this.minHeap.front()
}

/**
 * Time: O(N * logN + M * logN)
 *  - O(N*logN): the sorting
 *  - O(M*logN): the call M * the enqueue logN
 * Space: O(N) to store elements
 */
