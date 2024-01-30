/**
https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/description/
309. Best Time to Buy and Sell Stock with Cooldown
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  const memo = new Map()
  const DP = (curr, bought) => {
    if (curr >= prices.length) {
      return 0
    }

    const key = `${curr}-${bought}`
    if (memo.has(key)) {
      return memo.get(key)
    }

    let max = DP(curr + 1, bought)
    if (bought) {
      max = Math.max(max, DP(curr + 2, 0) + prices[curr])
    } else {
      max = Math.max(max, DP(curr + 1, 1) - prices[curr])
    }

    memo.set(key, max)
    return memo.get(key)
  }

  return DP(0, 0)
}
