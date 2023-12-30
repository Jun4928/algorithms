/**
https://leetcode.com/problems/how-many-apples-can-you-put-into-the-basket/description/
1196. How Many Apples Can You Put into the Basket
 * @param {number[]} weight
 * @return {number}
 */
var maxNumberOfApples = function (weight) {
  weight.sort((a, b) => (a < b ? -1 : 1))

  let apples = 0
  let left = 5000
  for (const w of weight) {
    if (left - w < 0) {
      return apples
    }

    left -= w
    apples += 1
  }

  return apples
}

/**
 * Time: O(N * logN)
 * Space: O(1)
 */
