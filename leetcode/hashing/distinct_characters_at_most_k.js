// You are given a string s and an integer k. Find the length of the longest substring that contains at most k distinct characters.
// For example, given s = "eceba" and k = 2, return 3. The longest substring with at most 2 distinct characters is "ece".

/**
 *
 * @param {string} s
 * @param {number} k
 *
 * @returns {number}
 *
 */
function distinctCharactersAtMostK(s, k) {
  const distinct = new Map()

  let left = 0
  let longest = 0
  for (let right = 0; right < s.length; right++) {
    distinct.set(s[right], (distinct.get(s[right]) ?? 0) + 1)

    // when invalid
    while (distinct.size > k) {
      distinct.set(s[left], distinct.get(s[left]) - 1)
      if (distinct.get(s[left]) === 0) {
        distinct.delete(s[left])
      }
      left++
    }

    // when valid
    longest = Math.max(longest, right - left + 1)
  }

  return longest
}

console.log(distinctCharactersAtMostK('eceba', 2)) // 3
