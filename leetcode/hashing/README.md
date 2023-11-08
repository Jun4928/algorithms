# Hashing

### Hash Functions

- Hash functions can convert any input into an integer
- when a hash function is combined with an array, it creates a hash map, also known as hash table
- With arrays, map indices to values
- With hash maps, map keys to values, a key can be almost anything
- he only constraint is the keys are immutable

> A Hash map is an unordered ds that stores key-value paris.
> Add and Remove elements in O(1), as well as update and check existence in O(1).
> iteration won't necessarily guarantee any order

### Comparison with Arrays

**the same**

- find length/number of elements
- updating values
- iterate over elements
- with hash maps, don't need to worry about the maximum size, the key will be converted to a new integer within the size limit anyways.

**disadvantages**

- For smaller input sizes, slower due to overhead
- every key needs to go through hash function, and there can be collisions
- can also take up more space.
- Dynamic arrays are fixed-size arrays that resize themselves when they go beyond their capacity. The problem is resizing a hash table is much more expensive because every key needs to be re-hashed through hash function.
- when you don't know how many elements need to store, arrays are more flexible with resizing and not wasting space

### Collisions

- Without handling collisions, older keys will get overridden and data will be lost. One of the ways to handle this is **chaining**
- store linked lists inside the hash map's array instead of the elements themselves. The linked list nodes store both key and the value. If there are collisions, the collided key-value paris are linked together in a linked list. When accessing one of them, traverse through the linked list until the key matches.
- the size of hash table's array and modulus is a prime number.
  - ex. 10,007, 1,000,003, 1,000,000,007

### Sets

- Similar to Hash Table
- add, remove, check existence is all in O(1)
- they don't track frequency, which means it can give you unique results

### Arrays as Keys?

- arrays are mutable in many languages
- A string joined by separator can be a key in hash map, set

---

# Checking For Existence

- the most common applications of a hash table or set is to determine if an element exists in O(1). An array needs O(n) to do this.

### Example1

- Two Sum

```js
var twoSum = function (nums, target) {
  const previous = new Map()

  for (let idx = 0; idx < nums.length; idx++) {
    const num = nums[idx]
    const exists = previous.get(target - num)
    if (exists != null) {
      return [exists, idx]
    } else {
      previous.set(num, idx)
    }
  }

  throw TypeError('MUST BE EXIST')
}
```

- Time: O(n) as the hasp map operations are O(1).
- Space: O(n) the number of keys to store as the same as the length of the input array

### Example2

```js
var repeatedCharacter = function (s) {
  const occurred = new Set()

  for (const c of s) {
    if (occurred.has(c)) {
      return c
    }

    occurred.add(c)
  }

  throw TypeError('MUST BE EXIST')
}
```

- Time: O(n), for each loop, constant time of set operation
- Space: O(m), m is the number of allowable characters

### Example3

> Given an integer array nums, find all the numbers x in nums that satisfy the following: x + 1 is not in nums, and x - 1 is not in nums.

```js
const findNumbers = function (nums) {
  const result = []
  const numbers = new Set(nums)
  for (const num of nums) {
    if (!numbers.has(num + 1) && !numbers.has(num - 1)) {
      result.push(num)
    }
  }
  return result
}
```

- Time: O(n)
- Space: O(n)

---

# Counting

- tracking the frequency of things
- For example, longest substring with at most `k 0`s. In those problems, only used `curr`, only focusing on one element(0).
- A Hash Map opens the door to solving problems with the constraint involving multiple elements.

### Example1

> You are given a string s and an integer k. Find the length of the longest substring that contains at most k distinct characters.

For example, given s = "eceba" and k = 2, return 3. The longest substring with at most 2 distinct characters is "ece".

```js
function distinctCharactersAtMostK(s, k) {
  const distinct = new Map()

  let left = 0
  let longest = 0
  for (let right = 0; right < s.length; right++) {
    distinct.set(s[right], (distinct.get(s[right]) ?? 0) + 1)

    // when invalid
    while (distinct.size > k) {
      distinct.set(s[left], distinct.get(s[left]) - 1)
      if (distinct.get(s[left]) === 0) {
        distinct.delete(s[left])
      }
      left++
    }

    // when valid
    longest = Math.max(longest, right - left + 1)
  }

  return longest
}
```

- Time: O(n), due to hash map having O(1) operations
- Space: O(k), the algorithm will delete elements from the hash map once it grows beyond target k

### [Example2](https://leetcode.com/problems/intersection-of-multiple-arrays/)

```js
var intersection = function (nums) {
  const intersectionMap = new Map()

  nums.forEach(arr => {
    arr.forEach(num => {
      if (intersectionMap.has(num)) {
        intersectionMap.set(num, intersectionMap.get(num) + 1)
      } else {
        intersectionMap.set(num, 1)
      }
    })
  })

  return Array.from(intersectionMap)
    .filter(([num, freq]) => freq === nums.length)
    .map(([num]) => num)
    .sort((a, b) => a - b)
}
```

- Time: O(N \* (N + logN))
  - O(N\*M) to iterate
  - O(N\*logM) to sort
- Space: O(N \* M)

### [Example3](https://leetcode.com/problems/check-if-all-characters-have-equal-number-of-occurrences/)

```js
var areOccurrencesEqual = function (s) {
  const freqMap = new Map()

  for (const character of s) {
    if (freqMap.has(character)) {
      freqMap.set(character, freqMap.get(character) + 1)
    } else {
      freqMap.set(character, 1)
    }
  }

  return Array.from(freqMap).every(([_, freq]) => {
    return s.length / freqMap.size === freq
  })
}

var areOccurrencesEqual = function (s) {
  const counter = new Map()
  for (const character of s) {
    if (counter.has(character)) {
      counter.set(character, counter.get(character) + 1)
    } else {
      counter.set(character, 1)
    }
  }

  return new Set(counter.values()).size === 1
}
```

- Time: O(N)
- Space: O(K), K is the number of characters that could be in the input

---

## Count the number of sub-arrays with an "exact" constraint

> For example, "Find the number of subarrays that have a sum less than k" with an input that only has positive numbers would be solved with sliding window. In this section, we would be talking about questions like "Find the number of subarrays that have a sum exactly equal to k".

- using prefix sum, differences in the prefix sum equal to K represents a sub-array with a sum equal to k.

### [Example4](https://leetcode.com/problems/subarray-sum-equals-k/)

```js
var subarraySum = function (nums, k) {
  const differences = new Map()
  differences.set(0, 1)

  let curr = 0
  let result = 0
  for (const num of nums) {
    curr += num
    const diff = curr - k
    result += differences.get(diff) ?? 0
    differences.set(curr, (differences.get(curr) ?? 0) + 1)
  }

  return result
}
```

- use this formula: `curr - (curr -K) = K`
- **curr** is to track the prefix sum, accumulator
- input numbers can be negative, so use a hash map to track how many `curr-k` have been occurred
- if there has been `[curr - K]` in the hash map, this means current sub-array sum is exactly K
- the thing is, you need to set up empty sub-array in the hash map, which is **counter.set(0, 1)**, otherwise the valid subarray will be lost
  - [1,2,3], K=1, sub-array is only [1]
  - if it wasn't initialized, [1] will be lost, because there's nothing in the hash map
- Time: O(n), each loop constant operation time
- Space: O(n), the hash map can grow to a size of n elements

### [Example5](https://leetcode.com/problems/count-number-of-nice-subarrays/)
