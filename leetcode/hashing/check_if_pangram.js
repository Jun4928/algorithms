/**
 * https://leetcode.com/problems/check-if-the-sentence-is-pangram/description/
 * # 1832. Check if Sentence is Pangram
 *
 * @param {string} sentence
 * @return {boolean}
 */
var checkIfPangram = function (sentence) {
  return new Set(sentence).size === 26
}

module.exports = { checkIfPangram }
