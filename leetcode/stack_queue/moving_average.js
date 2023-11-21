/**
 * @param {number} size
 */
var MovingAverage = function (size) {
  this.queue = []
  this.max = size
  this.sum = 0
}

/**
 * https://leetcode.com/problems/moving-average-from-data-stream/description/
 * 346. Moving Average from Data Stream
 *
 * @param {number} val
 * @return {number}
 */
MovingAverage.prototype.next = function (val) {
  this.sum += val
  this.queue.push(val)

  if (this.queue.length > this.max) {
    const first = this.queue.shift() ?? 0
    this.sum -= first
  }

  return this.sum / this.queue.length
}

/**
 * Your MovingAverage object will be instantiated and called as such:
 * var obj = new MovingAverage(size)
 * var param_1 = obj.next(val)
 */
