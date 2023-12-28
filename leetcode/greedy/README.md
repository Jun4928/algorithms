# Greedy Algorithms

- it makes the locally optimal decision at every step
- **Optimal**
  - depending on the problem
  - between two numbers, the problem wants us to find the maximum sum of elements, then it is optimal to take the larger one
- **Local**
  - it considers only the available options at the current step
  - based on the information it has at the time
  - doesn't matter any consequences that may happen in the future

> Most greedy problems will be asking for the maximum and minimum of something, but not always

- a lot of algorithms involving heaps can be considered greedy
- a heap gives a max or min element, generally greedy approaches will be choosing max/min elements at each step
- many greedy problems, the input will be sorted at the start

> Implementing greedy algorithms is very easy. The thing is realizing/proving it actually works. A greedy may lead to an answer that is very close to the correct answer, but still wrong

- In real life, it can give good approximations with significantly less computation. A good example is [the travelling salesman problem (TSP)](https://en.wikipedia.org/wiki/Travelling_salesman_problem).
- it yields an answer that is only wrong by about 25%, with a time complexity O(N^2)

> greedy is a way to approach a problem. This concept is extremely general and to practice is recognizing when it applies

## [Example 1: 2126. Destroying Asteroids](https://leetcode.com/problems/destroying-asteroids/)

```js
/**
https://leetcode.com/problems/destroying-asteroids/
2126. Destroying Asteroids
 * @param {number} mass
 * @param {number[]} asteroids
 * @return {boolean}
 */
var asteroidsDestroyed = function (mass, asteroids) {
  asteroids.sort((a, b) => (a < b ? -1 : 1))

  let theMass = mass
  for (let i = 0; i < asteroids.length; i++) {
    if (theMass < asteroids[i]) {
      return false
    }

    theMass += asteroids[i]
  }

  return true
}
```

- Time: O(N \*log N) to sort
- Space: O(logN), quicksort

## [Example 2: 2294. Partition Array Such That Maximum Difference Is K](https://leetcode.com/problems/partition-array-such-that-maximum-difference-is-k/)

```js
/**
https://leetcode.com/problems/partition-array-such-that-maximum-difference-is-k/
2294. Partition Array Such That Maximum Difference Is K

 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var partitionArray = function (nums, k) {
  nums.sort((a, b) => (a < b ? -1 : 1))

  let partitions = 1
  let recentMin = nums[0]
  for (const num of nums) {
    if (num - recentMin > k) {
      partitions += 1
      recentMin = num
    }
  }

  return partitions
}
```

- Time: O(N \* logN), to sort

## [Example 3: 502. IPO](https://leetcode.com/problems/ipo/description/)

```js
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
```

- I came up with the idea sorting the capital in the ascending order
- but, I couldn't figure out how to manage heap within the size of k
- in each pick, you put all the possibilities in the max heap, after that pops the maximum and add it and move on to the next pick
- the thing is, if the max heap size is 0 means there's no possibilities so return currentCapital
- Should've come up with,, each pick, all the possibilities in the code
- Time: O((K + N) \* log N), N is the number of projects, K pop operations, N push operations
- Space: O(N) due to the heap

## [Example 4: 1481. Least Number of Unique Integers after K Removals](https://leetcode.com/problems/least-number-of-unique-integers-after-k-removals/description/)

```js
/**
https://leetcode.com/problems/least-number-of-unique-integers-after-k-removals/
1481. Least Number of Unique Integers after K Removals

 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var findLeastNumOfUniqueInts = function (arr, k) {
  const freq = new Map()
  for (const num of arr) {
    if (!freq.has(num)) {
      freq.set(num, 0)
    }
    freq.set(num, freq.get(num) + 1)
  }

  let ordered = [...freq.values()].sort((a, b) => (a > b ? -1 : 1))
  let removal = 0

  while (removal < k) {
    let head = ordered.at(-1)
    while (head > 0) {
      head -= 1
      removal += 1

      if (head === 0) {
        ordered.pop()
      }

      if (removal === k) {
        break
      }
    }
  }

  return ordered.length
}
```

- sort according to the frequencies of numbers
- Time: O(N \* logN): to sort, each iteration O(1)
- Space: O(N) to build a hash map
