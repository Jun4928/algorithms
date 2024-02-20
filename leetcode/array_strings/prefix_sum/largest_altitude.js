/**
 * https://leetcode.com/problems/find-the-highest-altitude/description/
 * 1732. Find the Highest Altitude
 *
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

// var largestAltitude = function (gain) {
//   let highest = 0
//   let sum = 0
//   for (const net of gain) {
//     sum += net
//     highest = Math.max(highest, sum)
//   }

//   return highest
// }

module.exports = { largestAltitude }
