/**
 * https://leetcode.com/problems/check-if-all-characters-have-equal-number-of-occurrences/
 * # 1941. Check if All Characters Have Equal Number of Occurrences
 *
 * @param {string} s
 * @return {boolean}
 */
var areOccurrencesEqual = function (s) {
  const freqMap = new Map()

  for (const character of s) {
    if (freqMap.has(character)) {
      freqMap.set(character, freqMap.get(character) + 1)
    } else {
      freqMap.set(character, 1)
    }
  }

  return Array.from(freqMap).every(([_, freq]) => {
    return s.length / freqMap.size === freq
  })
}

// var areOccurrencesEqual = function (s) {
//   const counter = new Map()
//   for (const character of s) {
//     if (counter.has(character)) {
//       counter.set(character, counter.get(character) + 1)
//     } else {
//       counter.set(character, 1)
//     }
//   }

//   return new Set(counter.values()).size === 1
// }

console.log(areOccurrencesEqual('abacbc'))
console.log(areOccurrencesEqual('aaabb'))
