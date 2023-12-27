/**
https://leetcode.com/problems/ipo/description/
502. IPO
 * @param {number} k
 * @param {number} w
 * @param {number[]} profits
 * @param {number[]} capital
 * @return {number}
 */
var findMaximizedCapital = function (k, w, profits, capital) {
  const projects = capital
    .map((c, i) => [c, profits[i]])
    .sort(([a], [b]) => (a < b ? -1 : 1))
  const maxHeap = new PriorityQueue({ compare: (a, b) => (a > b ? -1 : 1) })

  let currCapital = w
  let pick = 0
  let idx = 0
  while (pick < k) {
    while (idx < projects.length && projects[idx][0] <= currCapital) {
      maxHeap.enqueue(projects[idx][1])
      idx += 1
    }

    if (maxHeap.size() === 0) {
      return currCapital
    }

    currCapital += maxHeap.dequeue()
    pick += 1
  }

  return currCapital
}
