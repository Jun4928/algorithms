/**
https://leetcode.com/problems/minimum-speed-to-arrive-on-time/
1870. Minimum Speed to Arrive on Time
 * @param {number[]} dist
 * @param {number} hour
 * @return {number}
 */
var minSpeedOnTime = function (dist, hour) {
  if (dist.length > Math.ceil(hour)) {
    return -1
  }

  const can = speed => {
    let take = 0
    for (const d of dist) {
      take = Math.ceil(take)
      take += d / speed
    }

    return take <= hour
  }

  let left = 1
  let right = Math.pow(10, 7)
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (can(mid)) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }

  return left
}
