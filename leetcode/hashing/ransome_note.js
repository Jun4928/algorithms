/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function (ransomNote, magazine) {
  const ransomMap = [...ransomNote].reduce((acc, curr) => {
    acc.set(curr, (acc.get(curr) ?? 0) + 1)
    return acc
  }, new Map())

  Array.from(magazine).forEach(char => {
    const freq = ransomMap.get(char)
    if (freq > 0) {
      ransomMap.set(char, ransomMap.get(char) - 1)
    }
  })

  return [...ransomMap.values()].every(v => v === 0)
}

console.log(canConstruct('a', 'b')) //false
console.log(canConstruct('aa', 'ab')) //false
console.log(canConstruct('aa', 'aab')) // true
