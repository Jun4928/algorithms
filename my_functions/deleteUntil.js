/**
 *
 * @param {T[]} arr
 * @param {number} k
 */
const deleteUntil = (arr, k) => {
  arr.splice(-k, k)
  return arr
}

console.log(deleteUntil([1, 2, 3, 4], 2))
console.log(deleteUntil([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3))
