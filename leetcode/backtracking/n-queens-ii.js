/**
https://leetcode.com/problems/n-queens-ii/description/
52. N-Queens II
 * @param {number} n
 * @return {number}
 */
var totalNQueens = function (n) {
  const backtrack = (row, col, d, ad) => {
    if (row === n) {
      return 1
    }

    let solutions = 0
    for (let c = 0; c < n; c++) {
      if (col.has(c) || d.has(row - c) || ad.has(row + c)) {
        continue
      }

      col.add(c)
      d.add(row - c)
      ad.add(row + c)

      solutions += backtrack(row + 1, col, d, ad)

      col.delete(c)
      d.delete(row - c)
      ad.delete(row + c)
    }

    return solutions
  }

  return backtrack(0, new Set(), new Set(), new Set())
}
