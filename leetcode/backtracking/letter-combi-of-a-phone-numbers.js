/**
https://leetcode.com/problems/letter-combinations-of-a-phone-number/description/
17. Letter Combinations of a Phone Number
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  if (digits.length === 0) {
    return []
  }

  const answer = []
  const mapper = digit => {
    const nums = digit === 5 || digit === 7 ? 4 : 3
    const start = digit === 6 || digit == 7 ? digit * 3 + 1 : digit * 3
    return [...Array(nums).keys()].map(v => String.fromCharCode(97 + start + v))
  }
  const digitToAlphabets = new Map(
    [...Array(8).keys()].map(v => [v + 2, mapper(v)])
  )
  const graph = [...digits].map(v => digitToAlphabets.get(Number(v)))

  const backtrack = (str, curr) => {
    if (str.length === digits.length) {
      answer.push(str)
      return
    }

    const chars = graph[curr] ?? []
    for (const c of chars) {
      str += c
      backtrack(str, curr + 1)
      str = str.slice(0, -1)
    }
  }

  backtrack('', 0)
  return answer
}

/**
https://leetcode.com/problems/letter-combinations-of-a-phone-number/description/
17. Letter Combinations of a Phone Number
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  if (digits.length === 0) {
    return []
  }

  const mapper = {
    2: 'abc',
    3: 'def',
    4: 'ghi',
    5: 'jkl',
    6: 'mno',
    7: 'pqrs',
    8: 'tuv',
    9: 'wxyz',
  }

  const answer = []

  const backtrack = (path, index) => {
    if (path.length === digits.length) {
      answer.push(path.join(``))
      return
    }

    const curr = mapper[digits[index]]
    for (const s of curr) {
      path.push(s)
      backtrack(path, index + 1)
      path.pop()
    }
  }

  backtrack([], 0)
  return answer
}

/**
 * Time: O(4^N * N),
 * Worst Case Scenario
 * 4 is the maximum value in the hasp map, N is the length of digits
 * Space: O(N), N is the length of digits, recursion call
 */
