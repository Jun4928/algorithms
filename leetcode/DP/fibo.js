/**
 * @param {number} n
 * @return {number}
 */
var fibonacciWorst = function (n) {
  if (n == 0) {
    return 0
  }

  if (n == 1) {
    return 1
  }

  return fibonacci(n - 1) + fibonacci(n - 2)
}

/**
 * @param {number} n
 * @return {number}
 */
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

console.log(fibonacci(10))
