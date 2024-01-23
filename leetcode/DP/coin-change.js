/**
https://leetcode.com/problems/coin-change/
322. Coin Change
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  if (amount === 0) {
    return 0
  }

  const memo = new Map()
  const DP = remain => {
    if (memo.has(remain)) {
      // check if it is already visited
      return memo.get(remain)
    }

    if (remain < 0) {
      // cut the tree
      return -1
    }

    if (remain === 0) {
      // right solution
      return 0
    }

    let minCost = Infinity
    for (const coin of coins) {
      const result = DP(remain - coin)
      if (result > -1) {
        minCost = Math.min(minCost, result + 1)
      }
    }

    memo.set(remain, minCost === Infinity ? -1 : minCost)
    return memo.get(remain)
  }

  return DP(amount)
}

/**
 * TOP-DOWn, amount is the state!
 * iterate through coin to find out it is possible to consume all amount
 * if it can't consume amount return -1
 * if it can consume amount return 0
 * calculate minCost if it is not -1
 * if minCost remains Infinity after iteration, it means it couldn't find
 * the right solution at this amount
 *
 * It uses backtracking and cut the partial solutions in the tree
 * and should store the solutions of the already calculated sub-problems
 *
 *
 * Time: O(S * n), S is the amount, n is denomination count
 * in the worst case, recursive tree has height of S, each subproblem is computed with n iterations
 * Space: O(S), S is the amount to change, extra space for memo
 */
