/**
 * @param {number[]} gain
 * @return {number}
 */
var largestAltitude = function (gain) {
  let acc = 0
  let largest = 0

  for (const altitude of gain) {
    acc += altitude
    largest = Math.max(largest, acc)
  }

  return largest
}

module.exports = { largestAltitude }
