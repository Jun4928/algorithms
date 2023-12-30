/**
https://leetcode.com/problems/maximum-units-on-a-truck/description/
1710. Maximum Units on a Truck
 * @param {number[][]} boxTypes
 * @param {number} truckSize
 * @return {number}
 */
var maximumUnits = function (boxTypes, truckSize) {
  boxTypes.sort(([_, u1], [__, u2]) => {
    return u1 > u2 ? -1 : 1
  })

  let totalUnit = 0
  let boxes = 0
  for (let i = 0; i < boxTypes.length; i++) {
    let [box, unit] = boxTypes[i]
    while (box > 0) {
      boxes++
      totalUnit += unit

      if (boxes === truckSize) {
        return totalUnit
      }

      box--
    }
  }

  return totalUnit
}

/**
 * use min function to decide who many you take
 */
var maximumUnits = function (boxTypes, truckSize) {
  boxTypes.sort(([_, u1], [__, u2]) => {
    return u1 > u2 ? -1 : 1
  })

  let totalUnit = 0
  let left = truckSize
  for (let i = 0; i < boxTypes.length; i++) {
    const [box, unit] = boxTypes[i]
    const take = Math.min(box, left)
    totalUnit += take * unit
    left -= take

    if (left === 0) {
      return totalUnit
    }
  }

  return totalUnit
}

/**
 * Time: O(N * logN) to sort
 * Space: O(1)
 *
 */
