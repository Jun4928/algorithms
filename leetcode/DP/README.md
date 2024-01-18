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
