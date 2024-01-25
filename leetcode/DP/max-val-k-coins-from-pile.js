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

/**
 * 
 * FAILED: Time Limit Exceeded!
https://leetcode.com/problems/maximum-value-of-k-coins-from-piles/description/
2218. Maximum Value of K Coins From Piles
 * @param {number[][]} piles
 * @param {number} k
 * @return {number}
 */
var maxValueOfCoins = function (piles, k) {
  const memo = new Map()
  const getKey = (row, col, remain) => `${row}-${col}-${remain}`
  const DP = (row, col, remain) => {
    if (remain === 0 || piles[row] == null || piles[row][col] == null) {
      return 0
    }

    const key = getKey(row, col, remain)
    if (memo.has(key)) {
      return memo.get(key)
    }
    const max = Math.max(
      DP(row + 1, 0, remain),
      DP(row + 1, 0, remain - 1) + piles[row][col],
      DP(row, col + 1, remain - 1) + piles[row][col]
    )

    memo.set(key, max)
    return memo.get(key)
  }

  const result = DP(0, 0, k)
  return result
}
s
