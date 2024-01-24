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
