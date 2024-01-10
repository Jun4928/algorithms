/**
https://leetcode.com/problems/combinations/
77. Combinations
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  const answer = []

  const backtrack = (comb, prev) => {
    if (comb.length === k) {
      answer.push([...comb])
      return
    }

    for (let num = prev; num <= n; num++) {
      if (!comb.includes(num)) {
        comb.push(num)
        backtrack(comb, num + 1)
        comb.pop()
      }
    }
  }

  backtrack([], 1)
  return answer
}
