var RecentCounter = function () {
  const requests = []
}

/**
 * https://leetcode.com/problems/number-of-recent-calls/
 * 933. Number of Recent Calls
 *
 * @param {number} t
 * @return {number}
 *
 * [t - 3000, t]
 */
RecentCounter.prototype.ping = function (t) {
  this.requests.push(t)

  while (this.requests[0] < t - 3000) {
    this.requests.shift()
  }

  return this.requests.length
}

/**
 * Your RecentCounter object will be instantiated and called as such:
 * var obj = new RecentCounter()
 * var param_1 = obj.ping(t)
 */
