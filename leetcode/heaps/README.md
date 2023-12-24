# Heaps

- a heap is a data structure, an implementation of the priority queue
- a heap is a container that stores elements
  - Add an element: O(logN)
  - Remove the minimum element: O(logN)
  - Find the minimum element: O(1)
- min heap, max heap
- find the max and min value in constant time, while only needing logarithmic time to maintain it through changes

## [Example 239. Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/)

```js
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
```

### [Priority Queue API Interface](https://github.com/datastructures-js/priority-queue/tree/fb4fdb984834421279aeb081df7af624d17c2a03)

> For Priority Queue / Queue data structures, you may use 5.3.0 version of datastructures-js/priority-queue and 4.2.1 version of datastructures-js/queue.

```js
export interface PriorityQueueOptions<T> {
  priority?: (element: T) => number;
  compare?: (a: T, b: T) => number;
}

export interface PriorityQueueItem<T> {
  priority: number;
  element: T;
}

export abstract class PriorityQueue<T> {
  constructor(options?: PriorityQueueOptions<T>);
  size(): number;
  isEmpty(): boolean;
  front(): PriorityQueueItem<T> | T;
  back(): PriorityQueueItem<T> | T;
  enqueue(element: T, priority?: number): PriorityQueue<T>;
  dequeue(): PriorityQueueItem<T> | T;
  toArray(): (PriorityQueueItem<T> | T)[];
  clear(): void;
}

```

```js
const employeesQueue = new PriorityQueue({
  compare: (e1, e2) => {
    if (e1.salary > e2.salary) return -1 // do not swap
    if (e1.salary < e2.salary) return 1 // swap

    // salaries are the same, compare rank
    return e1.rank < e2.rank ? 1 : -1
  },
})

employeesQueue
  .enqueue({ name: 'employee 1', salary: 2000, rank: 1 })
  .enqueue({ name: 'employee 2', salary: 1500, rank: 0 })
  .enqueue({ name: 'employee 3', salary: 4000, rank: 4 })
  .enqueue({ name: 'employee 4', salary: 2000, rank: 2 })
  .enqueue({ name: 'employee 5', salary: 3000, rank: 3 })

console.log(employeesQueue.front())
console.log(employeesQueue.dequeue())
console.log(employeesQueue.front())
console.log(employeesQueue.back())
console.log(employeesQueue.toArray())
```

## How is a heap implemented?

**Min Heap**

- the most popular way is called a **binary heap** using array.
- each element in the array is a node in the tree
- the smallest element in the tree is the root, and the following property is maintained at every node
- the tree must be a **complete tree**
- 0 is the root, then the elements at indices 1 and 2 are the root's children
- **root: i, children: [2 * i + 1, 2 * i + 2]**
- when new element is added or the first one is removed, operations are done to maintain _parent.val <= child.val_, bubbling up

> In many problems, using a heap can improve an algorithm's time complexity from O(N^2) to O(N\*logN), it's a great option when finding the maximum or minimum of something repeatedly

## [Example 1: 1046. Last Stone Weight](https://leetcode.com/problems/last-stone-weight/)

```js
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
```

- on each smash, at least one rock is destroyed, at most N iterations
- Time: O(N \* log N)
- Space: O(N) for heap usage

## [Example 2: 2208. Minimum Operations to Halve Array Sum](https://leetcode.com/problems/minimum-operations-to-halve-array-sum/)

```js
/**
 * https://leetcode.com/problems/minimum-operations-to-halve-array-sum/
 * 2208. Minimum Operations to Halve Array Sum
 *
 * @param {number[]} nums
 * @return {number}
 */
var halveArray = function (nums) {
  const half = nums.reduce((a, b) => a + b, 0) / 2
  const pq = nums.reduce(
    (acc, curr) => {
      acc.enqueue(curr)
      return acc
    },
    new PriorityQueue({
      compare: (a, b) => {
        if (a > b) return -1
        return 1
      },
    })
  )

  let totalHalved = 0
  let operations = 0
  while (totalHalved < half) {
    const max = pq.dequeue()
    const halved = max / 2
    pq.enqueue(halved)

    totalHalved += halved
    operations += 1
  }

  return operations
}
```

- Each iteration takes O(logN) for heal operations
- Time: O(N \* logN)

## [Example 3: 295. Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/description/)

```js
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
```

> all the elements in the min heap are larger than or equal to all the elements in the max heap, because the min heap stores the larger half

- Push new number onto the max heap, it should be sorted in the heap
- Pop from the max heap, which is the biggest in the max heap, and push it onto the min heap, which is the way to meet the need above
- compare the difference, which should be less than _ONE_, if more elements in the min heap, moves the minimum value onto the max heap
- if they are the same length, the fronts would be middle values
- otherwise, the min heap's front is the median because I chose to move max heap's front onto the min heap
- min heap's size always must be 1 more or equal to the size of the max heap

- **O(1) to findMedian and O(logN) for addNum**
- Space: O(N) to store the heaps

> A heap is usually just a tool to accomplish something efficiently, in Greedy chapter, have a look at how they can help use implement efficient algorithms

# Tok K

- _k_ best elements, with "best" being defined by the problem
- the easiest way to solve it is to just sort the input according to the criteria, and return th top _k_ elements. => O(N\*logN) for sorting N is the length of the input array
- **using a heap, O(N \* logK). Logically, _K < N_, this is an improvement**
- Even though log is so fast and it's not a big deal in terms of a speed increase, this is what the interviewers are asking for

> max heap at the start, push every element onto the heap (according to the criteria), pop from the hep once the size exceeds _K_, which makes the heap size bounded by _K_, operations are at worst O(logK). And N iterations to get O(N \* logK), pops remove the "worst" elements, at the end, the _K_ "best" elements will remain in the heap!

## [Example 1: 347. Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/)

```js
/**
https://leetcode.com/problems/top-k-frequent-elements/
347. Top K Frequent Elements

 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 * 
 * O (N * logN): sorting
 */
var topKFrequent = function (nums, k) {
  const frequency = new Map()
  for (const num of nums) {
    if (!frequency.has(num)) {
      frequency.set(num, 0)
    }
    frequency.set(num, frequency.get(num) + 1)
  }

  return [...frequency.entries()]
    .sort((a, b) => {
      if (a[1] > b[1]) return -1
      return 1
    })
    .map(([val]) => val)
    .slice(0, k)
}

/**
 * using min heap, when the size is over the K limit
 * then removes the minimum value
 *
 * O(N * logK), because the heap size is just K
 * means O(logK) for heap add and remove
 *
 */
var topKFrequent = function (nums, k) {
  const frequency = new Map()
  for (const num of nums) {
    if (!frequency.has(num)) {
      frequency.set(num, 0)
    }
    frequency.set(num, frequency.get(num) + 1)
  }

  const minHeap = new PriorityQueue({
    compare: (a, b) => {
      if (a[1] > b[1]) return 1
      return -1
    },
  })

  for (const freq of frequency.entries()) {
    minHeap.enqueue(freq)
    if (minHeap.size() > k) {
      minHeap.dequeue()
    }
  }

  return minHeap.toArray().map(([v]) => v)
}
```

- Time: O(N \*logK)
  - Counting: O(N)
  - Iterate: N times and perform O(logK) heap operations
- Space: O(K) for the heap

## [Example 2: 658. Find K Closest Elements](https://leetcode.com/problems/find-k-closest-elements/)

```js
/**
https://leetcode.com/problems/find-k-closest-elements/
658. Find K Closest Elements

 * @param {number[]} arr
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
var findClosestElements = function (arr, k, x) {
  const maxHeap = new PriorityQueue({
    compare: (a, b) => {
      const first = Math.abs(a - x)
      const second = Math.abs(b - x)

      if (first === second) {
        return a > b ? -1 : 1
      }

      return first > second ? -1 : 1
    },
  })

  for (const num of arr) {
    maxHeap.enqueue(num)
    if (maxHeap.size() > k) {
      maxHeap.dequeue()
    }
  }

  return maxHeap.toArray().sort((a, b) => (a < b ? -1 : 1))
}
```

- When we want maximum(further), use min heap and removes the smaller ones reaching the size K, removes the closer ones
- When we want minimum(closer), use max heap and removes the larger ones reaching the size K, removes the further ones
- Time: O((N + K) \* logK)
  - heap operation: O(logK), N iterations O(N \*log K)
  - O(K \* logK) to sort
- Space: O(K)
- This approach doesn't use the fact that the array is sorted, so.. it's slower than **Binary Search**
