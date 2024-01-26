/**
https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/
714. Best Time to Buy and Sell Stock with Transaction Fee
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
var maxProfit = function (prices, fee) {
  const memo = new Map()
  const DP = (curr, bought) => {
    if (curr === prices.length) {
      return 0
    }
    const key = `${curr}-${bought}`
    if (memo.has(key)) {
      return memo.get(key)
    }

    let max = DP(curr + 1, bought)
    if (bought) {
      max = Math.max(max, DP(curr + 1, 0) + prices[curr] - fee)
    } else {
      max = Math.max(max, DP(curr + 1, 1) - prices[curr])
    }

    memo.set(key, max)
    return memo.get(key)
  }

  return DP(0, 0)
}
