/**
 * https://leetcode.com/problems/jewels-and-stones/description/
 * # 771. Jewels and Stones
 *
 * @param {string} jewels
 * @param {string} stones
 * @return {number}
 */
var numJewelsInStones = function (jewels, stones) {
  const jewelSet = new Set(jewels)

  return [...stones]
    .map(type => (jewelSet.has(type) ? 1 : 0))
    .reduce((a, b) => a + b, 0)
}

console.log(numJewelsInStones('aA', 'aAAbbbb')) // 3
console.log(numJewelsInStones('z', 'ZZ')) // 0
