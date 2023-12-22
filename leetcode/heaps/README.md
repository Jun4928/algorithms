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
