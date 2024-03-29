/**
 * https://leetcode.com/problems/boats-to-save-people/
 * 881. Boats to Save People
 * @param {number[]} people
 * @param {number} limit
 * @return {number}
 */
var numRescueBoats = function (people, limit) {
  people.sort((a, b) => (a < b ? -1 : 1))

  let boats = 0
  let left = 0
  let right = people.length - 1
  while (left <= right) {
    if (people[left] + people[right] <= limit) {
      left++
    }

    right--
    boats++
  }

  return boats
}
