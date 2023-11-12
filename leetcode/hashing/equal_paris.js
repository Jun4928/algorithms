/**
 * https://leetcode.com/problems/equal-row-and-column-pairs/description/
 * # 2352. Equal Row and Column Pairs
 *
 * @param {number[][]} grid
 * @return {number}
 */
var equalPairs = function (grid) {
  const columns = Array.from(Array(grid.length)).map(_ => [])
  grid.forEach(row => {
    row.forEach((value, idx) => {
      columns[idx].push(value)
    })
  })

  const columnMap = columns
    .map(column => column.join(`,`))
    .reduce((acc, curr) => {
      acc.set(curr, (acc.get(curr) ?? 0) + 1)
      return acc
    }, new Map())

  return grid
    .map(row => columnMap.get(row.join(`,`)) ?? 0)
    .reduce((a, b) => a + b)
}

console.log(
  equalPairs([
    [3, 2, 1],
    [1, 7, 6],
    [2, 7, 7],
  ])
) // 1
console.log(
  equalPairs([
    [3, 1, 2, 2],
    [1, 4, 4, 5],
    [2, 4, 2, 2],
    [2, 4, 2, 2],
  ])
) // 3

console.log(
  equalPairs([
    [3, 1, 2, 2],
    [1, 4, 4, 4],
    [2, 4, 2, 2],
    [2, 5, 2, 2],
  ])
) // 3

console.log(
  equalPairs([
    [11, 1],
    [1, 11],
  ])
) // 2
