/**
 * https://leetcode.com/problems/intersection-of-multiple-arrays/
 * # 2448. Intersection of Multiple Arrays
 *
 * @param {number[][]} nums
 * @return {number[]}
 */
var intersection = function (nums) {
  const intersectionMap = new Map()

  nums.forEach(arr => {
    arr.forEach(num => {
      if (intersectionMap.has(num)) {
        intersectionMap.set(num, intersectionMap.get(num) + 1)
      } else {
        intersectionMap.set(num, 1)
      }
    })
  })

  return Array.from(intersectionMap)
    .filter(([num, freq]) => freq === nums.length)
    .map(([num]) => num)
    .sort((a, b) => a - b)
}

console.log(
  intersection([
    [3, 1, 2, 4, 5],
    [1, 2, 3, 4],
    [3, 4, 5, 6],
  ])
)

console.log(
  intersection([
    [4, 43, 15, 30, 27, 22],
    [15, 30, 43, 27, 10, 4],
  ])
)

console.log(
  intersection([
    [7, 34, 45, 10, 12, 27, 13],
    [27, 21, 45, 10, 12, 13],
  ])
)
