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

---

# Multi-dimensional Problems

## [Example 1: 1143. Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/description/)

```js
/**
https://leetcode.com/problems/longest-common-subsequence/description/
1143. Longest Common Subsequence
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
  let memo = [...Array(text1.length)].map(_ => Array(text2.length).fill(-1))

  const DP = (i, j) => {
    if (i >= text1.length || j >= text2.length) {
      return 0
    }

    if (memo[i][j] > -1) {
      return memo[i][j]
    }

    let result
    if (text1[i] === text2[j]) {
      result = DP(i + 1, j + 1) + 1
    } else {
      result = Math.max(DP(i, j + 1), DP(i + 1, j))
    }

    memo[i][j] = result
    return memo[i][j]
  }

  return DP(0, 0)
}
```

- DP returns LCS(longest common subsequence)
- two index **[i, j]**
  - if they are the same character, move pointer next
  - if not, either move i or j and find the maximum
- Time: O(N \* M), each state is O(1)

## [Example 2: 188. Best Time to Buy and Sell Stock IV](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/description/)

**TOP-DOWN**

```js
/**
https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/description/
188. Best Time to Buy and Sell Stock IV
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (k, prices) {
  const memo = new Map()
  const getKey = (curr, holding, remain) => `${curr}-${holding}-${remain}`

  const DP = (curr, holding, remain) => {
    if (remain === 0 || curr === prices.length) {
      return 0
    }

    const key = getKey(curr, holding, remain)
    if (memo.has(key)) {
      return memo.get(key)
    }

    let max = DP(curr + 1, holding, remain) // just skip
    // holding means if there's a stock to sell
    if (holding) {
      // should sell before buying something, after transaction remain - 1
      max = Math.max(max, DP(curr + 1, 0, remain - 1) + prices[curr])
    } else {
      // should buy first
      max = Math.max(max, DP(curr + 1, 1, remain) - prices[curr])
    }

    memo.set(key, max)
    return memo.get(key)
  }

  return DP(0, 0, k)
}
```

**BOTTOM-UP**

```js
/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (k, prices) {
  let n = prices.length
  let dp = []
  for (let i = 0; i <= n; i++) {
    dp.push([])
    for (let j = 0; j < 2; j++) {
      dp[i].push(new Array(k + 1).fill(0))
    }
  }

  for (let i = n - 1; i >= 0; i--) {
    for (let remain = 1; remain <= k; remain++) {
      for (let holding = 0; holding < 2; holding++) {
        let ans = dp[i + 1][holding][remain]
        if (holding == 1) {
          ans = Math.max(ans, prices[i] + dp[i + 1][0][remain - 1])
        } else {
          ans = Math.max(ans, -prices[i] + dp[i + 1][1][remain])
        }

        dp[i][holding][remain] = ans
      }
    }
  }

  return dp[0][0][k]
}
```

### [Example 3: 2218. Maximum Value of K Coins From Piles](https://leetcode.com/problems/maximum-value-of-k-coins-from-piles/description/)

**TOP-DOWN**

```js
/**
https://leetcode.com/problems/maximum-value-of-k-coins-from-piles/description/
2218. Maximum Value of K Coins From Piles
 * @param {number[][]} piles
 * @param {number} k
 * @return {number}
 */
var maxValueOfCoins = function (piles, k) {
  const memo = new Map()
  const getKey = (row, remain) => `${row}-${remain}`
  const DP = (row, remain) => {
    if (remain === 0 || row >= piles.length) {
      return 0
    }

    const key = getKey(row, remain)
    if (memo.has(key)) {
      return memo.get(key)
    }

    let max = DP(row + 1, remain) // skip the pile
    let wallet = 0
    for (
      // choose coins from the pile until it consumes remain ones
      let choose = 0;
      choose < Math.min(piles[row].length, remain);
      choose++
    ) {
      wallet += piles[row][choose]
      max = Math.max(max, wallet + DP(row + 1, remain - choose - 1))
    }

    memo.set(key, max)
    return memo.get(key)
  }

  return DP(0, k)
}
```

- at each pile,
  - skip to the next pile
  - take some, choose how many coins to take
  - choose starts from 0, so should minus one to calculate remain ones

**BOTTOM-UP**

```js
/**
 * @param {number[][]} piles
 * @param {number} k
 * @return {number}
 */
var maxValueOfCoins = function (piles, k) {
  let n = piles.length
  let dp = []
  for (let i = 0; i <= n; i++) {
    dp.push(new Array(k + 1).fill(0))
  }

  for (let i = n - 1; i >= 0; i--) {
    for (let remain = 1; remain <= k; remain++) {
      dp[i][remain] = dp[i + 1][remain] // skip this pile
      let curr = 0
      for (let j = 0; j < Math.min(remain, piles[i].length); j++) {
        curr += piles[i][j]
        dp[i][remain] = Math.max(
          dp[i][remain],
          curr + dp[i + 1][remain - j - 1]
        )
      }
    }
  }

  return dp[0][k]
}
```

---

# Matrix DP

- DP on a matrix is a common pattern
- the matrix can be modeled as a graph, each square is a node and there will be edges along adjacent squares

## [Example 1: 62. Unique Paths](https://leetcode.com/problems/unique-paths/description/)

**Recursive**

```js
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  const rows = m
  const cols = n
  const directions = [
    [0, 1],
    [1, 0],
  ]
  const notSafe = (x, y) => x < 0 || y < 0 || x >= rows || y >= cols
  let memo = [...Array(rows)].map(_ => Array(cols).fill(-1))

  const DP = (row, col) => {
    if (notSafe(row, col)) {
      return 0
    }

    if (row === rows - 1 && col === cols - 1) {
      return 1
    }

    if (memo[row][col] !== -1) {
      return memo[row][col]
    }

    let ways = 0
    for (const [dx, dy] of directions) {
      ways += DP(row + dx, col + dy)
    }

    memo[row][col] = ways
    return memo[row][col]
  }

  return DP(0, 0)
}
```

**Iteration**

```js
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  const rows = m
  const cols = n
  let memo = [...Array(rows)].map(_ => Array(cols).fill(0))
  const directions = [
    [0, 1],
    [1, 0],
  ]
  const notSafe = (x, y) => x >= rows || y >= cols

  memo[rows - 1][cols - 1] = 1
  for (let row = rows - 1; row >= 0; row--) {
    for (let col = cols - 1; col >= 0; col--) {
      for (const [dx, dy] of directions) {
        const [x, y] = [row + dx, col + dy]
        memo[row][col] += notSafe(x, y) ? 0 : memo[x][y]
      }
    }
  }

  return memo[0][0]
}
```

- base case is.. when we reach the end
- Time: O(N \* M)
- Space: O(N \* M)

## [Example 2: 64. Minimum Path Sum](https://leetcode.com/problems/minimum-path-sum/description/)

**Recursive**

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
  const rows = grid.length
  const cols = grid[0].length
  const notSafe = (x, y) => x >= rows || y >= cols
  const directions = [
    [0, 1],
    [1, 0],
  ]

  let memo = [...Array(rows)].map(_ => Array(cols).fill(-1))
  memo[rows - 1][cols - 1] = grid[rows - 1][cols - 1]

  const DP = (row, col) => {
    if (notSafe(row, col)) {
      return null
    }

    if (memo[row][col] !== -1) {
      return memo[row][col]
    }

    let min = Infinity
    for (const [dx, dy] of directions) {
      const res = DP(row + dx, col + dy)
      if (res != null) {
        min = Math.min(min, grid[row][col] + res)
      }
    }

    memo[row][col] = min
    return memo[row][col]
  }

  return DP(0, 0)
}
```

**iteration**

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
  const rows = grid.length
  const cols = grid[0].length
  const notSafe = (x, y) => x >= rows || y >= cols
  const directions = [
    [0, 1],
    [1, 0],
  ]

  let memo = [...Array(rows)].map(_ => Array(cols).fill(Infinity))
  memo[rows - 1][cols - 1] = grid[rows - 1][cols - 1]

  for (let row = rows - 1; row >= 0; row--) {
    for (let col = cols - 1; col >= 0; col--) {
      for (const [dx, dy] of directions) {
        const [x, y] = [row + dx, col + dy]
        if (!notSafe(x, y)) {
          memo[row][col] = Math.min(memo[row][col], memo[x][y] + grid[row][col])
        }
      }
    }
  }

  return memo[0][0]
}
```

- Time: O(M \* N)
- Space: O(M \* N)
