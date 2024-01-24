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

/**
https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/description/
188. Best Time to Buy and Sell Stock IV
TRY AND FAILED
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (k, prices) {
  const memo = new Map()
  const getKey = (curr, remain) => `${curr}-${remain}`

  const DP = (curr, remain) => {
    if (remain < 0) {
      return 0
    }

    if (curr >= prices.length) {
      return 0
    }

    const key = getKey(curr, remain)
    if (memo.has(key)) {
      return memo.get(key)
    }

    let profit = 0
    let diff = 0
    let dontSell = 0
    for (let j = curr + 1; j < prices.length; j++) {
      if (remain >= 0) {
        const result = DP(j + 1, remain - 1)
        if (result >= profit) {
          profit = result
          diff = Math.max(diff, prices[j] - prices[curr])
        }
      }

      dontSell = Math.max(dontSell, prices[j] - prices[curr])
    }

    memo.set(key, Math.max(profit + diff, dontSell))
    return memo.get(key)
  }

  let max = -1
  for (let i = 0; i < prices.length; i++) {
    max = Math.max(max, DP(i, k - 1))
  }

  return max
}
