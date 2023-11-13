/**
 *https://leetcode.com/problems/longest-substring-without-repeating-characters/description/
 * # 3. Longest Substring Without Repeating Characters
 *
 * @param {string} s
 * @return {number}
 */
// var lengthOfLongestSubstring = function (s) {
//   // substring that has no repeat
//   // sliding window
//   if (s.length === 0) return 0

//   let longest = 0
//   let left = 0
//   let current = new Map()

//   for (let right = 0; right < s.length; right++) {
//     current.set(s[right], (current.get(s[right]) ?? 0) + 1)

//     while ([...current.values()].every(freq => freq === 1) == false) {
//       current.set(s[left], (current.get(s[left]) ?? 0) - 1)
//       if (current.get(s[left]) <= 0) {
//         current.delete(s[left])
//       }

//       left++ // left 를 하나씩 증가시키는 것이 아닌.. 점프를 시킬 수 있다?
//     }

//     longest = Math.max(longest, current.size)
//   }

//   return longest
// }

var lengthOfLongestSubstring = function (s) {
  // substring that has no repeat
  // sliding window
  if (s.length === 0) return 0

  let longest = 0
  let left = 0
  let current = new Map()

  for (let right = 0; right < s.length; right++) {
    if (current.has(s[right])) {
      // if there is a repeat
      left = Math.max(current.get(s[right]), left) // jump left to the recent right pointer
    }

    longest = Math.max(longest, right - left + 1)
    current.set(s[right], right + 1) // save next pointer to start left from there
  }

  return longest
}

console.log(lengthOfLongestSubstring('abcabcbb')) // abc, 3
console.log(lengthOfLongestSubstring('bbbbb')) // b, 1
console.log(lengthOfLongestSubstring('pwwkew')) // wke 3

// pwke is a subsequence not a substring,
// that's whay wke is the longest
