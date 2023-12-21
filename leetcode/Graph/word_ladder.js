/**
 * https://leetcode.com/problems/word-ladder/description/
 * 127. Word Ladder
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength = function (beginWord, endWord, wordList) {
  const alphabets = [...Array(26).keys()].map(i => String.fromCharCode(97 + i))
  const formations = word => {
    return [...Array(word.length).keys()].flatMap(idx => {
      return alphabets.map(alphabet => {
        return `${word.slice(0, idx)}${alphabet}${word.slice(idx + 1)}`
      })
    })
  }

  let queue = [beginWord]
  const seen = new Set([beginWord])
  const allowed = new Set(wordList)

  let count = 1
  while (queue.length) {
    const nextQueue = []

    for (const curr of queue) {
      if (curr === endWord) {
        return count
      }

      const transformed = formations(curr)
      for (const next of transformed) {
        if (!seen.has(next) && allowed.has(next)) {
          seen.add(next)
          nextQueue.push(next)
        }
      }
    }

    count += 1
    queue = nextQueue
  }

  return 0
}
