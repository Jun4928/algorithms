/**
https://leetcode.com/problems/generate-parentheses/
22. Generate Parentheses
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  const answer = []
  const pair = ['(', ')']
  const BASE = n * 2

  const backtrack = (curr, stack, left) => {
    if (curr.length === BASE) {
      answer.push(curr)
      return
    }

    for (const char of pair) {
      if (char === '(') {
        if (stack.length < left) {
          curr += char
          stack.push(char)
          backtrack(curr, stack, left)
          curr = curr.slice(0, -1)
          stack.pop()
        }
      } else {
        if (stack.length > 0) {
          curr += char
          stack.pop()
          backtrack(curr, stack, left - 1)
          curr = curr.slice(0, -1)
          stack.push('(')
        }
      }
    }
  }

  backtrack('', [], n)
  return answer
}

/**
https://leetcode.com/problems/generate-parentheses/
22. Generate Parentheses
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  const answer = []
  const BASE = n * 2

  const backtrack = (curr, open, close) => {
    if (curr.length === BASE) {
      answer.push(curr.join(``))
      return
    }

    if (open < n) {
      curr.push('(')
      backtrack(curr, open + 1, close)
      curr.pop()
    }

    if (open > close) {
      curr.push(')')
      backtrack(curr, open, close + 1)
      curr.pop()
    }
  }

  backtrack([], 0, 0)
  return answer
}

/**
https://leetcode.com/problems/generate-parentheses/
22. Generate Parentheses
 * @param {number} n
 * @return {string[]}
 * 
 * string 의 특성상 새로운 값이 만들어지니까.. 위 아래로 더하고 뺄 필요 없이
 * 함수의 인자로 더해서 던져주면 됨.
 */
var generateParenthesis = function (n) {
  const answer = []
  const BASE = n * 2

  const backtrack = (curr, open, close) => {
    if (curr.length === BASE) {
      answer.push(curr)
      return
    }

    if (open < n) {
      backtrack(curr + '(', open + 1, close)
    }

    if (open > close) {
      backtrack(curr + ')', open, close + 1)
    }
  }

  backtrack('', 0, 0)
  return answer
}
