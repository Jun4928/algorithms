/**
 * https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/
 * 1456. Maximum Number of Vowels in a Substring of Given Length
 *
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxVowels = function (s, k) {
  const allowed = new RegExp(/[aeiou]/)

  let left = 0
  let windowSize = 0
  let vowels = 0
  let answer = 0
  for (let right = 0; right < s.length; right++) {
    windowSize += 1
    if (allowed.test(s[right])) {
      vowels += 1
    }

    while (windowSize === k) {
      answer = Math.max(answer, vowels)
      windowSize -= 1
      if (allowed.test(s[left])) {
        vowels -= 1
      }
      left++
    }
  }

  return answer
}
