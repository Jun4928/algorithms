/**
https://leetcode.com/problems/combination-sum-iii/description/
216. Combination Sum III
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function (k, n) {
  const answer = []
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  const backtrack = (curr, start, sum) => {
    if (curr.length === k && sum === n) {
      answer.push([...curr])
      return
    }

    for (let i = start; i < numbers.length; i++) {
      const num = numbers[i]
      if (sum + num > n) {
        continue
      }

      if (!curr.includes(num)) {
        curr.push(num)
        backtrack(curr, i + 1, sum + num)
        curr.pop(num)
      }
    }
  }

  backtrack([], 0, 0)
  return answer
}
