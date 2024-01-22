# Dynamic Programming

- a problem solving technique
  **Large Stigma**
- if you don't know DP, it is almost impossible to solve a DP problem
- DP isn't as common in interviews

# What exactly is it?

> Just Optimised Recursion

- Define some recursive function, usually called **dp**
- It returns the answer to the original problem as if the **arguments passed to it were input**
- The arguments represents a **state**
- In DFS, using **seen** in order not to visit the same status

> The difference is states can be repeated, usually an exponential number of times, to avoid repeating computation, just use **memoization**

- cache that value (in a map, with the state)
- if hits, just use the value, if not, calculate with the state

## Fibonacci (classic example)

```js
/**
 * @param {number} n
 * @return {number}
 */
var fibonacci = function (n) {
  if (n == 0) {
    return 0
  }

  if (n == 1) {
    return 1
  }

  return fibonacci(n - 1) + fibonacci(n - 2)
}
```

- Time: O(2^n), every call creates 2 more calls
  - f(1), f(1), f(2)... they are duplicated
  - repeating computation
- Just **memoize** the results from the function call

## Fibonacci with DP

```js
var fibonacci = function (n) {
  const memo = new Map()
  const dp = v => {
    if (v == 0) {
      return 0
    } else if (v == 1) {
      return 1
    }

    if (memo.has(v)) {
      return memo.get(v)
    }

    memo.set(v, dp(v - 1) + dp(v - 2))
    return memo.get(v)
  }

  return dp(n)
}
```

- Time: O(N)
- Top-Down dynamic programming, move down towards the base cases

## Top-down vs. Bottom-up

- another way to approach is with a **bottom-up** algorithm
- start at the bottom(base-cases), work way up to larger problems
- **tabulation**

```js
/**
 * @param {number} n
 * @return {number}
 */
var fibonacci = function (n) {
  let arr = new Array(n + 1).fill(0)
  // base case - the second Fibonacci number is 1
  arr[1] = 1
  for (let i = 2; i <= n; i++) {
    arr[i] = arr[i - 1] + arr[i - 2]
  }

  return arr[n]
}
```

- You can both ways,
- **Bases cases** and **recurrence relation** matter
- A bottom-up is faster, iteration has less overhead than recursion
- A top-down is usually easier to write, with recursion, the order that visits states does not matter, with iteration, when it comes to multidimensional,, difficult figuring out the correct configuration of the loops

## When SHOULD I USE DP?

- Two Main Characters

**1. Optimal value(max or min) of something or the numbers of ways to do something**

- what is the min cost of doing...
- what is the max profit of...
- how many ways are there to...
- what is the longest possible...

**2. At each step, make a decision, decisions affect future decisions**

- a decision could be picking between two elements
- decisions affecting future decisions "If you take an element x, you can't take an element y in the future"

## Another Typical DP: [House Robber](https://leetcode.com/problems/house-robber/description/)

**TOP-TO-BOTTOM(RECURSION)**

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  let memo = Array(nums.length).fill(-1)
  const DP = idx => {
    if (idx < 0) {
      return 0
    }

    if (memo[idx] >= 0) {
      return memo[idx]
    }

    const result = Math.max(DP(idx - 2) + nums[idx], DP(idx - 1))
    memo[idx] = result
    return result
  }

  return DP(nums.length - 1)
}
```

- There's two ways in the current state
  - choose current: **DP(idx - 2) + curr**
  - not choose current **DP(idx - 1)**

**BOTTOM-TO-TOP**

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  let memo = Array(nums.length).fill(-1)
  for (let i = 0; i < memo.length; i++) {
    memo[i] = Math.max((memo[i - 2] ?? 0) + nums[i], memo[i - 1] ?? 0)
  }

  return memo.at(-1)
}
```

- It's the same, store the current value in memo array

## Time and Space

- if there are N possible states, and each step needs F
- Time: O(N \* F)
- Space: O(N)
  - top-down: hash map, recursions
  - bottom-up: array for tabulation
- If there were three states
  - I: iteration
  - K: given in the problem
  - Holding: boolean
  - I _ K _ 2 => O(N\* K)

---

# Framework for DP

### 1. A function or data structure that will compute/contain the answer to the problem for any given state

- What the function is returning
- What arguments the function should take (state variables)

> Think about state variables as if the problem was a real-life scenario. What information needed to 100% describe a scenario

### 2. A recurrence relation to transition between states

- DP(100) = min(DP(99) + cost[100], DP(98) + cost[100])
- you take this step, it could come from either the two steps before or the one step before

### 3. Base Cases

- need base cases
- if curr < 0 means there is no step, cost

## TOP-DOWN

```js
/**
https://leetcode.com/problems/min-cost-climbing-stairs/
746. Min Cost Climbing Stairs
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function (cost) {
  let memo = Array(cost.length).fill(-1)
  const DP = curr => {
    if (curr < 0) {
      return 0
    }

    if (memo[curr] >= 0) {
      return memo[curr]
    }

    const result = Math.min(
      DP(curr - 2) + cost[curr],
      DP(curr - 1) + cost[curr]
    )
    memo[curr] = result
    return result
  }

  DP(cost.length - 1)
  return Math.min(memo.at(-1), memo.at(-2))
}
```

## BOTTOM-TO-TOP

```js
var minCostClimbingStairs = function (cost) {
  let memo = Array(cost.length).fill(-1)
  memo[0] = cost[0]
  memo[1] = cost[1]
  for (let curr = 2; curr < memo.length; curr++) {
    memo[curr] = Math.min(
      memo[curr - 2] + cost[curr],
      memo[curr - 1] + cost[curr]
    )
  }

  return Math.min(memo.at(-1), memo.at(-2))
}
```

## [Example2](https://leetcode.com/problems/longest-increasing-subsequence/description/)

**TOP-DOWN**

```js
var lengthOfLIS = function (nums) {
  let memoize = Array(nums.length).fill(-1)
  const DP = index => {
    if (memoize[index] > 0) {
      return memoize[index]
    }

    let subsequence = 1
    for (let pointer = 0; pointer < index; pointer++) {
      if (nums[index] > nums[pointer]) {
        subsequence = Math.max(subsequence, DP(pointer) + 1)
      }
    }

    memoize[index] = subsequence
    return subsequence
  }

  let longest = 0
  for (let i = 0; i < nums.length; i++) {
    longest = Math.max(longest, DP(i))
  }

  return longest
}
```

- The problem is asking the longest increasing subsequence. The function should return it
- For state variables, just stick with index, **DP(index)** return the LIS that ends with the Ith element
- if the previous element was strictly less than the current number, send this pointer to DP, to figure out the LIS and add one.
- The base case is length 1 (subsequence including itself)

**BOTTOM-UP**

```js
/**
https://leetcode.com/problems/longest-increasing-subsequence/
300. Longest Increasing Subsequence
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  let memoize = Array(nums.length).fill(1)
  let longest = 1
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        memoize[i] = Math.max(memoize[i], memoize[j] + 1)
        longest = Math.max(longest, memoize[i])
      }
    }
  }

  return longest
}
```

## [Example 3: 2140. Solving Questions With Brainpower](https://leetcode.com/problems/solving-questions-with-brainpower/)

**TOP-DOWN**

```js
var mostPoints = function (questions) {
  const q = questions.length
  let memo = Array(q).fill(-1)
  const DP = curr => {
    if (curr >= q) {
      return 0
    }

    if (memo[curr] > -1) {
      return memo[curr]
    }

    const [point, brain] = questions[curr]
    memo[curr] = Math.max(DP(curr + brain + 1) + point, DP(curr + 1))
    return memo[curr]
  }

  return DP(0)
}
```

**BOTTOM-UP**

```js
/**
 * @param {number[][]} questions
 * @return {number}
 */
var mostPoints = function (questions) {
  let n = questions.length
  let dp = new Array(n + 1).fill(0) // n + 1 to avoid out of bounds

  for (let i = n - 1; i >= 0; i--) {
    let j = i + questions[i][1] + 1
    // need to make sure we don't go out of bounds
    dp[i] = Math.max(questions[i][0] + dp[Math.min(j, n)], dp[i + 1])
  }

  return dp[0]
}
```