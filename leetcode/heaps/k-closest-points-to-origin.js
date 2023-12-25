/**
https://leetcode.com/problems/k-closest-points-to-origin/description/
973. K Closest Points to Origin
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
var kClosest = function (points, k) {
  const maxHeap = new PriorityQueue({
    compare: ([x1, y1], [x2, y2]) => {
      const distance1 = Math.sqrt(Math.pow(0 - x1, 2) + Math.pow(0 - y1, 2))
      const distance2 = Math.sqrt(Math.pow(0 - x2, 2) + Math.pow(0 - y2, 2))

      return distance1 > distance2 ? -1 : 1
    },
  })

  for (const point of points) {
    maxHeap.enqueue(point)
    if (maxHeap.size() > k) {
      maxHeap.dequeue()
    }
  }

  return maxHeap.toArray()
}
