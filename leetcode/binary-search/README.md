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
