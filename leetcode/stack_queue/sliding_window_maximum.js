const { MaxPriorityQueue } = require('@datastructures-js/priority-queue')
/**
 * https://leetcode.com/problems/sliding-window-maximum/description/?source=submission-noac
 * 239. Sliding Window Maximum
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 *
 * using monotonic stack, which maintains decreasing order
 */
var maxSlidingWindow = function (nums, k) {
  let deque = []
  let answer = []

  for (let idx = 0; idx < nums.length; idx++) {
    while (deque.length && nums[deque[deque.length - 1]] < nums[idx]) {
      deque.pop()
    }
    deque.push(idx)

    if (deque[0] + k === idx) {
      deque.shift()
    }

    if (idx >= k - 1) {
      answer.push(nums[deque[0]])
    }
  }

  return answer
}

/**
 *
 * @param {number[]} nums
 * @param {number} k
 * @returns
 *
 * this is what I wanted to implement with the priority queue
 */
var maxSlidingWindowPQ = function (nums, k) {
  const pq = new MaxPriorityQueue({ priority: e => e.val })
  for (let i = 0; i < k; i++) {
    pq.enqueue({ val: nums[i], idx: i })
  }
  let answer = [pq.front().element.val]

  let left = 1
  for (let right = k; right < nums.length; right++) {
    while (!pq.isEmpty() && pq.front().element.idx < left) {
      pq.dequeue()
    }
    pq.enqueue({ val: nums[right], idx: right })

    answer.push(pq.front().element.val)
    left++
  }

  return answer
}

console.log(maxSlidingWindowPQ([1, 3, -1, -3, 5, 3, 6, 7], 3))
console.log(maxSlidingWindowPQ([1, -1], 1))
