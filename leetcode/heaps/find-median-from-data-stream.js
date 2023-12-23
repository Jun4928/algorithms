/**
 * https://leetcode.com/problems/find-median-from-data-stream/description/
 * 295. Find Median from Data Stream
 *
 */
var MedianFinder = function () {
  this.maxHeap = new PriorityQueue({
    compare: (a, b) => (a > b ? -1 : 1),
  }) // the first half
  this.minHeap = new PriorityQueue({
    compare: (a, b) => (a < b ? -1 : 1),
  }) // the second half
  this.ALLOWED_SIZE_DIFF = 1
}

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
  this.maxHeap.enqueue(num)
  this.minHeap.enqueue(this.maxHeap.dequeue())
  if (this.minHeap.size() - this.maxHeap.size() > this.ALLOWED_SIZE_DIFF) {
    this.maxHeap.enqueue(this.minHeap.dequeue())
  }
}

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
  if (this.maxHeap.size() === this.minHeap.size()) {
    return (this.maxHeap.front() + this.minHeap.front()) / 2
  }

  return this.minHeap.front()
}
