/**
 * https://leetcode.com/problems/group-anagrams/
 * # 49. Group Anagrams
 *
 * @param {string[]} strings
 * @return {string[][]}
 */
var groupAnagrams = function (strings) {
  // group by same alphabet frequency
  // key: alphabet order sorted
  const anagrams = strings.reduce((acc, curr) => {
    const key = [...curr].sort().join('')
    const values = acc.get(key) ?? []
    values.push(curr)
    acc.set(key, values)
    return acc
  }, new Map())

  return [...anagrams.values()]
}

console.log(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']))
// [["bat"],["nat","tan"],["ate","eat","tea"]]
console.log(groupAnagrams([''])) // [[""]]
console.log(groupAnagrams(['a'])) // [["a"]]
