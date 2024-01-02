/**
https://leetcode.com/problems/successful-pairs-of-spells-and-potions/
2300. Successful Pairs of Spells and Potions
 * @param {number[]} spells
 * @param {number[]} potions
 * @param {number} success
 * @return {number[]}
 */
var successfulPairs = function (spells, potions, success) {
  potions.sort((a, b) => (a < b ? -1 : 1))

  let products = []
  for (const spell of spells) {
    const minTarget = Math.ceil(success / spell)
    let left = 0
    let right = potions.length - 1

    while (left < right) {
      const mid = Math.floor((left + right) / 2)
      if (potions[mid] >= minTarget) {
        right = mid
      } else {
        left = mid + 1
      }
    }

    products.push(potions[left] >= minTarget ? potions.length - left : 0)
  }

  return products
}

/**
 * solution
 *
 */
var successfulPairs = function (spells, potions, success) {
  let binarySearch = (arr, target) => {
    left = 0
    right = arr.length - 1
    while (left <= right) {
      let mid = Math.floor((left + right) / 2)
      if (arr[mid] >= target) {
        right = mid - 1
      } else {
        left = mid + 1
      }
    }

    return left
  }

  potions.sort((a, b) => a - b)
  let ans = []
  let m = potions.length

  for (const spell of spells) {
    let i = binarySearch(potions, success / spell)
    ans.push(m - i)
  }

  return ans
}
