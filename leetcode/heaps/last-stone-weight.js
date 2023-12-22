/**
https://leetcode.com/problems/last-stone-weight/
1046. Last Stone Weight
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function (stones) {
  const pq = new PriorityQueue({
    compare: (e1, e2) => {
      if (e1 > e2) {
        return -1
      }

      return 1
    },
  })

  stones.forEach(stone => {
    pq.enqueue(stone)
  })

  while (pq.size() > 1) {
    const first = pq.dequeue()
    const second = pq.dequeue()

    if (first !== second) {
      pq.enqueue(first - second)
    }
  }

  return pq.front()
}
