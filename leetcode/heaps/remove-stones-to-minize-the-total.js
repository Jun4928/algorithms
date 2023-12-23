/**
https://leetcode.com/problems/remove-stones-to-minimize-the-total/description/
1962. Remove Stones to Minimize the Total
 * @param {number[]} piles
 * @param {number} k
 * @return {number}
 */
var minStoneSum = function (piles, k) {
  const maxHeap = new PriorityQueue({ compare: (a, b) => (a > b ? -1 : 1) })
  piles.forEach(n => maxHeap.enqueue(n))

  let count = 0
  while (count < k) {
    const max = maxHeap.dequeue()
    maxHeap.enqueue(Math.ceil(max / 2))
    count++
  }

  return maxHeap.toArray().reduce((a, b) => a + b, 0)
}

/**
 * 
  Time: O((N + K) * logN)
    - to convert piles into maxHeap O(N logN)
    - perform K operations and each costs O(K logN)
  Space: O(N): heap's length
 */
