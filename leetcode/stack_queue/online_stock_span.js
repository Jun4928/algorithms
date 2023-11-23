var StockSpanner = function () {
  this.prices = []
}

/**
 * https://leetcode.com/problems/online-stock-span/description/
 * 901. Online Stock Span
 *
 * @param {number} price
 * @return {number}
 *
 * this version doesn't use monotonic stack
 */
StockSpanner.prototype.next = function (price) {
  let i = this.prices.length - 1
  for (i; i >= 0; i--) {
    if (this.prices[i] > price) {
      break
    }
  }

  this.prices.push(price)
  return this.prices.length - i - 1
}

/**
 * @param {number} price
 * @return {number}
 *
 *  with monotonic stack!
 *  the point is keep decreasing order,
 *  store the last price's span so that you can sum it up
 *
 *  when the last element is popped, it is in the span
 */
StockSpanner.prototype.next = function (price) {
  let answer = 1

  // keep decreasing order
  while (this.mono.length && this.mono.at(-1).price <= price) {
    answer += this.mono.pop().answer
  }

  this.mono.push({ price, answer })
  return answer
}

/**
 * Your StockSpanner object will be instantiated and called as such:
 * var obj = new StockSpanner()
 * var param_1 = obj.next(price)
 */
