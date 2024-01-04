/**
https://leetcode.com/problems/koko-eating-bananas/description/
875. Koko Eating Bananas
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function (piles, h) {
  // too so long time
  // const canEatAll = (K) => {
  //   let hours = h
  //   for (let pile of piles) {
  //     while (pile > 0) {
  //       pile -= K
  //       hours -= 1

  //       if (hours < 0) {
  //         return false
  //       }
  //     }
  //   }

  //   return true
  // }

  const canEatAll = k => {
    let hours = 0
    for (const bananas of piles) {
      hours += Math.ceil(bananas / k)
    }

    return hours <= h
  }

  let left = 1
  let right = Math.max(...piles)
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (canEatAll(mid)) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }

  return left
}
