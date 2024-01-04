# Binary Search

- a search algorithm that runs in O(logN) in the worst case, N is the size of the search space

> Search Space usually needs to be sorted. Normally it is done on an array of sorted elements, but can be used in more creative ways

- a sorted **array** an an element **X** that we are searching for, it takes O(logN) time and O(1) space
  - find the index of X if is in arr
  - find the first of the last index in which X can be inserted to maintain the sorted array
- We can discard the half that cannot contain X, repeat the process on the other half, keep doing this until we find X

```
1. Declare left = 0 and right = arr.length - 1, these are inclusive bounds
2. while left <= right:
    - calculate the middle: Math.floor((left + right) / 2)
    - check arr[mid]
        - if arr[mid] === X, found, return
        - if arr[mid] > x, keep searching by doing right = mid - 1
        - if arr[mid] < x, keep searching by doing left = mid + 1
3. without reaching arr[mid] === X, then search is unsuccessful.
The left pointer will be the index where X should be inserted
```

- The search space is halved at every iteration, binary search's worst-case is O(logN), which is very fast compared to linear time. For example, searching a word in a dictionary

## Implementation

- with duplicates, to find either the first or the last position of a given element

```js
const binarySearch = (arr, x) => {
  let left = 0
  let right = arr.length - 1

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (arr[mid] === x) {
      // do something in the right spot!
      return mid
    }

    if (arr[mid] > x) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }

  return left // this is the insertion point
}
```

## Duplicate Elements

**On the left most index**

- it returns first left target element index

```js
let binarySearch = (arr, target) => {
  let left = 0
  let right = arr.length
  while (left < right) {
    const mid = Math.floor((left + right) / 2)
    if (arr[mid] >= target) {
      right = mid
    } else {
      left = mid + 1
    }
  }

  return left
}
```

**On the right most plus one index**

- it returns the right most plus one

```js
let binarySearch = (arr, target) => {
  let left = 0
  let right = arr.length
  while (left < right) {
    const mid = Math.floor((left + right) / 2)
    if (arr[mid] > target) {
      right = mid
    } else {
      left = mid + 1
    }
  }

  return left
}
```

---

# On Arrays

- **left** and **right** represent the bounds of the subarray currently considering
- **mid** represents the index of the middle in the search space

## [Example 1: 704. Binary Search](https://leetcode.com/problems/binary-search/)

```js
/**
https://leetcode.com/problems/binary-search/
704. Binary Search
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let left = 0
  let right = nums.length - 1

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (nums[mid] === target) {
      return mid
    }

    if (nums[mid] > target) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }

  return -1
}
```

- Time: O(logN)
- Space: O(1)

## [Example 2: 74. Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix/)

```js
/**
https://leetcode.com/problems/search-a-2d-matrix/
74. Search a 2D Matrix
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  // let's consider this matrix as one single array
  const m = matrix.length
  const n = matrix[0].length
  let left = 0
  let right = m * n - 1

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    const row = Math.floor(mid / n)
    const col = mid % n

    if (matrix[row][col] === target) {
      return true
    }

    if (matrix[row][col] > target) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }

  return false
}
```

- consider the 2d matrix as a single array
- M = matrix.length, N = matrix[0].length
- indices are in the boundary **[0, M * N - 1]**
- **row = Math.floor(index / N)**
- **col = index % N**
- because it is ensured that each row has N elements
- O(log(M \* N))

## [Example 3: 2300. Successful Pairs of Spells and Potions](https://leetcode.com/problems/successful-pairs-of-spells-and-potions/description/)

```js
/**
 * @param {number[]} spells
 * @param {number[]} potions
 * @param {number} success
 * @return {number[]}
 * when the target is not on the list, but wants to find the bigger ones than the target
 */
var successfulPairs = function (spells, potions, success) {
  let binarySearch = (arr, target) => {
    left = 0
    right = arr.length - 1
    while (left <= right) {
      let mid = Math.floor((left + right) / 2)
      if (arr[mid] >= target) {
        right = mid - 1
      } else {
        left = mid + 1
      }
    }

    return left
  }

  potions.sort((a, b) => a - b)
  let ans = []
  let m = potions.length

  for (const spell of spells) {
    let i = binarySearch(potions, success / spell)
    ans.push(m - i)
  }

  return ans
}
```

- The brute force would O(N \* M)
- by sorting **potions**, it can be done with binary search
- Time: O((M + N) \* logM), O(M _ logM) for sorting, O(N _ logN) for iterations with binary search
- Space: for sorting

---

# On solution spaces

- a more creative way to use binary search - on a solution space/answer
- very common type: **What is the max/min that something can be done**
- if the task is **possible for a number target**,
  - A maximum, then it is also possible for all numbers less than target
  - A minimum, then it is also possible for all numbers greater than target
- if the task is **not possible for a number target**,
  - A maximum, then it is also impossible for all numbers greater than target
  - A minimum, then it is also impossible for all numbers less than target
- **A threshold is the answer and can be binary searched for**

## method

- establish the possible solution space by identifying the minimum possible and the maximum possible
- do binary search on the solution space. For each **mid**, perform a check to see if the task is possible. Depending on the result, halve the search space. Eventually, find the threshold
- Time: O(N \* logK), K is the solution space's range

## [Example 1: 875. Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/description/)

```js
var minEatingSpeed = function (piles, h) {
  const canEatAll = k => {
    let hours = 0
    for (const bananas of piles) {
      hours += Math.ceil(bananas / k)
    }

    return hours <= h
  }

  let left = 1
  let right = Math.max(...piles)
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (canEatAll(mid)) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }

  return left
}
```

- Time: O(N \* logK)
  - _K = max(piles)_
  - binary search: O(logK)
  - canEatAll: O(N)
- Given speed K. **Math.ceil(bananas / K)** in each pile is the time to eat all bananas in the pile

## [Example 2: 1631. Path With Minimum Effort](https://leetcode.com/problems/path-with-minimum-effort/description/)

```js
var minimumEffortPathDFSIterative = function (heights) {
  const rows = heights.length
  const cols = heights[0].length

  const notSafe = (row, col) => row < 0 || col < 0 || row >= rows || col >= cols
  const directions = [
    [0, -1],
    [0, 1],
    [1, 0],
    [-1, 0],
  ]

  const can = effort => {
    let seen = [...Array(rows)].map(_ => Array(cols).fill(false))
    seen[0][0] = true

    let stack = [[0, 0]]
    while (stack.length) {
      const [currX, currY] = stack.pop()
      if (currX === rows - 1 && currY === cols - 1) {
        return true
      }

      for (const [dx, dy] of directions) {
        const x = currX + dx
        const y = currY + dy
        if (!notSafe(x, y) && !seen[x][y]) {
          const diff = Math.abs(heights[currX][currY] - heights[x][y])
          if (diff <= effort) {
            seen[x][y] = true
            stack.push([x, y])
          }
        }
      }
    }

    return false
  }

  let left = 0
  let right = 0
  for (const values of heights) {
    right = Math.max(right, ...values)
  }

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (can(mid)) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }

  return left
}
```

- Time: O(M \* N \* logK)
  - O(M \* N): DFS
  - O(logK): binary search
- Space: O(M \* N): space for the stack and seen
