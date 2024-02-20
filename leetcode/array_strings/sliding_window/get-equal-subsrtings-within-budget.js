/**
 * https://leetcode.com/problems/get-equal-substrings-within-budget/
 * 1208. Get Equal Substrings Within Budget
 *
 * @param {string} s
 * @param {string} t
 * @param {number} maxCost
 * @return {number}
 */
var equalSubstring = function (s, t, maxCost) {
  const calculateCost = (first, second) => {
    return Math.abs(first.charCodeAt(0) - second.charCodeAt(0))
  }

  let took = 0
  let maxLength = 0
  let left = 0
  for (let right = 0; right < s.length; right++) {
    took += calculateCost(s[right], t[right])
    while (took > maxCost) {
      took -= calculateCost(s[left], t[left])
      left++
    }

    maxLength = Math.max(maxLength, right - left + 1) // window size
  }

  return maxLength
}
