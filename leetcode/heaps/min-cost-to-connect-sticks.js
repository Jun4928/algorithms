/**
https://leetcode.com/problems/minimum-cost-to-connect-sticks/description/
1167. Minimum Cost to Connect Sticks

 * @param {number[]} sticks
 * @return {number}
 */
var connectSticks = function (sticks) {
  const minHeap = new PriorityQueue({ compare: (a, b) => (a < b ? -1 : 1) })
  sticks.forEach(stick => minHeap.enqueue(stick))

  let costs = 0
  while (minHeap.size() > 1) {
    const cost = minHeap.dequeue() + minHeap.dequeue()
    minHeap.enqueue(cost)
    costs += cost
  }

  return costs
}

/**
 * Time: O(N log N), N is the length of the input array
 *  - building minHeap O(N logN)
 *  - N - 1 operation, at each O(logN) to add and remove
 * Space: O(N) to store sticks into the minHeap
 *
 */
