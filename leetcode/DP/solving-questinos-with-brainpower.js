/**
https://leetcode.com/problems/solving-questions-with-brainpower/description/
2140. Solving Questions With Brainpower
 * @param {number[][]} questions
 * @return {number}
 */
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

/**
 * FAILED!
https://leetcode.com/problems/solving-questions-with-brainpower/description/
2140. Solving Questions With Brainpower
 * @param {number[][]} questions
 * @return {number}
 */
var mostPoints = function (questions) {
  const q = questions.length
  const memo = new Map()
  const getKey = (i, prev) => `${i}-${prev}`
  const DP = (i, prev, p) => {
    if (i >= q) {
      return p
    }

    const key = getKey(i, prev)
    if (memo.has(key)) {
      return memo.get(key)
    }

    const [point, brain] = questions[i]
    const result = Math.max(DP(i + brain + 1, i, p + point), DP(i + 1, prev, p))
    memo.set(key, result)
    return result
  }

  let result = 0
  for (let i = 0; i < q; i++) {
    const [point, brain] = questions[i]
    result = Math.max(result, DP(i + brain + 1, i, point)) // starting point
  }
  return result
}
