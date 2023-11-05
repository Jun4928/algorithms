# Sliding Window

> Like two pointers, it works with iterables with ordered elements.
> actually implemented using two pointers

## Sub-arrays

- a sub-array is a contiguous section of the array. They must be adjacent to each other in the original array with their original order

- [ [1], [2], [3], [4] ]
- [ [1, 2], [2, 3], [3, 4] ]
- [ [1, 2, 3], [2, 3, 4] ]
- [ 1, 2, 3, 4 ]

- they can be defined by two indexes, left and right

## When Sliding Window?

**First**

- criteria says sub-array `valid`
- a constraint metric
  - ex. sum, the number of unique elements, the frequency of a specific element, etc.
- a numeric restriction on the constraint metric, which is for a sub-array
  - the sum of sub-array <= 10, this is valid

**Second**

- `best` valid sub-array, defined what makes a sub-array better than another, longest
- the number of valid sub-arrays

> When a problem is about sub-arrays, consider if sliding window is good option

- Find the longest sub-array with a sum less than or equal to k
- Find the longest substring that has at most one "0"
- Find the number of sub-arrays that have a product less than k

## The algorithm

- sliding window is only about valid sub-arrays
- `left` and `right`, represent the current under consideration
- at first, `left=right=0`, the first sub-array is just the first element of the array
- expand this size of window by incrementing `right`, adding a new element to the window
- remove some elements from the window until it becomes valid again, by incrementing `left`, shirking the window
- the window grows and shrinks, but always slides along to the right, until it reaches the end of the input iterable

## Example1

- `nums = [3, 2, 1, 3, 1, 1] and k = 5.` find the longest sub-array, the sum of which is less or equal than K.

- `left=0, right=2`, the sub-array is `[3, 2, 1]`
- the sum is 6, greater than K.
- it's broken that's why remove 3, because it's never going to be valid by adding elements to the right

- we don't actually need a sub-array to store the elements
- just need a variable that stores the current value whether it is valid or not **curr**, all operations are done in O(1)
- In each iteration, add the element **array[right]** to the window, which grows the window
- only remove **array[left]**, when it becomes invalid

```js
function findLongestSumLessAndEqualThanK(nums, K) {
  let left = 0
  let curr = 0
  let answer = 0
  for (let right = 0; right < nums.length; right++) {
    curr += nums[right]
    while (curr > k) {
      // until it's valid
      curr -= nums[left]
      left++
    }

    answer = Math.max(answer, right - left + 1) // to find the longest
  }

  return answer
}
```

```js
function fn(arr):
    left = 0
    for (int right = 0; right < arr.length; right++):
        Do some logic to "add" element at arr[right] to window

        while WINDOW_IS_INVALID:
            Do some logic to "remove" element at arr[left] from window
            left++

        Do some logic to update the answer
```

## why efficient?

- any algorithm that visits every sub-array will be at least O(n^2), too slow
- Sliding window guarantees a maximum of 2n window iterations
  - the right n times
  - the left n times
  - each window is O(1)
  - O(2n) = O(n), much faster
- the while loop to increase left pointer, it starts at 0, only increases and never exceeds n

## Example2

- binary string s (only "0" and "1"), you may choose up to one "0" and flip it to a "1". What is the length of the longest substring achievable that contains only "1"?
- s = "1101100111", the answer is 5, if the flip happens at index 2, the string becomes **11111**00111

```js
/**
 *
 * @param {string} s
 * @return {number} the longest substring that only contains "1"
 */
function flipZero(s) {
  let left = 0
  let curr = 0
  let result = 0

  // it's much easier to find the longest substring that contains at most one "0"
  for (let right = 0; right < s.length; right++) {
    if (s[right] === '0') {
      curr += 1
    }

    // while it's invalid
    while (curr > 1) {
      if (s[left] === '0') {
        curr -= 1
      }

      left++
    }

    // store current window size
    result = Math.max(result, right - left + 1)
  }

  return result
}
```

- another way to look at the problem!
- what if we find the longest substring that contains at most one "0"?
- we can use an integer **curr** to keep track of how many "0" currently in the window
- we didn't actually flip the number..., which is the point, breakthrough!

---

# Number of sub-arrays

- math trick that helps to calculate the number of sub-arrays
- (left, right) how many valid windows end at index right?
- (left, right), (left + 1, right), (left + 2, right) ... (right, right)
- the number of valid windows ending at index right is equal to the size of the window, which is **right - left + 1**

## Example3

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numSubarrayProductLessThanK = function (nums, k) {
  if (k <= 1) {
    return 0
  }

  let left = 0
  let curr = 1
  let result = 0

  for (let right = 0; right < nums.length; right++) {
    curr *= nums[right]

    // while it's invalid
    while (curr >= k) {
      curr /= nums[left]
      left++
    }

    // when the sub-array becomes valid
    result += right - left + 1
  }

  return result
}

// left = 0, right = 0 => [10] count: 1
// left = 0, right = 1 => [10, 5], [5] count: 2
// left = 1, right = 2 => [5, 2], [2], count: 2
// left = 1, right = 3 => [5, 2, 6], [2, 6], [6], count: 3
```

---

# Fixed Window Size

- sometimes, problems will require a fixed length sub-array
- add one element on the right and remove one element on the left to maintain the fixed length

```js
function fn(arr, k):
    curr = some data to track the window

    // build the first window
    for (int i = 0; i < k; i++)
        Do something with curr or other variables to build first window

    ans = answer variable, probably equal to curr here depending on the problem
    for (int i = k; i < arr.length; i++)
        Add arr[i] to window
        Remove arr[i - k] from window
        Update ans

    return ans
```

## Example4

- given an integer array nums and an integer k, find the sum of the subarray with the largest sum whose length is k.

```js
/**
 *
 * @param {number[]} nums
 * @param {number} k
 *
 * @return {number} the sum of the subarray
 */
function findLargestSumWithK(nums, k) {
  let curr = 0
  let left = 0
  let currentSum = 0
  let largestSum = 0

  for (let right = 0; right < nums.length; right++) {
    curr += 1
    currentSum += nums[right]

    while (curr > k) {
      curr -= 1
      currentSum -= nums[left]
      left++
    }

    largestSum = Math.max(largestSum, currentSum)
  }

  return largestSum
}
```
