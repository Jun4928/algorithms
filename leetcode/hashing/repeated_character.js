/**
 * https://leetcode.com/problems/first-letter-to-appear-twice/description/
 *
 * # 2351. First Letter to Appear Twice
 *
 * @param {string} s
 * @return {character}
 */
var repeatedCharacter = function (s) {
  const occurred = new Set()

  for (const c of s) {
    if (occurred.has(c)) {
      return c
    }

    occurred.add(c)
  }

  throw TypeError('MUST BE EXIST')
}

module.exports = { repeatedCharacter }
