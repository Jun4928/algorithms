/**
https://leetcode.com/problems/numbers-with-same-consecutive-differences/description/
967. Numbers With Same Consecutive Differences
 * @param {number} n
 * @param {number} k
 * @return {number[]}
 */
var numsSameConsecDiff = function (n, k) {
  const answer = []

  const directions = k === 0 ? [0] : [k, -k]
  const backtrack = curr => {
    if (curr.length === n) {
      answer.push(Number(curr.join(``)))
      return
    }

    for (const dk of directions) {
      const next = curr.at(-1) + dk
      if (next >= 0 && next / 10 < 1) {
        curr.push(next)
        backtrack(curr)
        curr.pop()
      }
    }
  }

  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  for (const digit of digits) {
    backtrack([digit])
  }

  return answer
}
